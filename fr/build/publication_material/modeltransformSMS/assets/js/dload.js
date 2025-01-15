//research group staff data load by vsousa@iro.umontreal.ca

//load list of students in correct places

jQuery.get('/assets/data/students.csv', function (data) {
    data.split("\n").forEach(studentAppend);
});

function studentAppend(value, index, array) {
    if (value == "") {
        return;
    }
    var line = value.split(";");
    var name = line[0].trim();
    var program = line[1].trim();
    var status = line[2].trim();
    var web = "";
    if (line.length == 4) {
        web = line[3].trim();
    }
    var li = createCustomElement(name, web);
    li.innerHTML = li.innerHTML + " (" + program + ")";
    document.getElementById("students" + program + status).appendChild(li);
}

//load list of visitors in correct places

jQuery.get('/assets/data/visitors.csv', function (data) {
    data.split("\n").forEach(visitorAppend);
});

function visitorAppend(value, index, array) {
    if (value == "") {
        return;
    }
    var line = value.split(";");
    var status = line[1].trim();
    if (status != 's') {
        return;
    }
    var name = line[0].trim();
    var web = "";
    if (line.length == 3) {
        web = line[2].trim();
    }
    var li = createCustomElement(name, web);
    document.getElementById("visitor" + status).appendChild(li);
}

function createCustomElement(name, web) {
    var li = document.createElement('li');
    if (web.length != 0) {
        var a = document.createElement('a');
        a.innerHTML = a.innerHTML + name
        a.setAttribute('href', web);
        li.appendChild(a);
    } else {
        li.innerHTML = li.innerHTML + name;
    }
    return li;
}
