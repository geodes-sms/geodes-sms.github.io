
$(function(){
	
	var menu = $('#menu'),
		pos = menu.offset();
		
		$(window).scroll(function(){
			if($(this).scrollTop() > pos.top + menu.height() && menu.hasClass('default')){
				//$('.hw12').text("Fixed ."+menu.position().left+".");
				menu.removeClass('default').addClass('fixed');
				//menu.css("left", menu.position().left);
				menu.css("border-bottom", "1px navy solid");
			} else if($(this).scrollTop() <= pos.top && menu.hasClass('fixed')){
				//$('.hw12').text("Default");
				menu.removeClass('fixed').addClass('default');
				
				menu.css("border-bottom", "0px");
			}
		});

});