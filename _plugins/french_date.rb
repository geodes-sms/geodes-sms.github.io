module Jekyll
    module FrenchDates
        WEEKDAYS = {"0" => "Dimanche", "1" => "Lundi", "2" => "Mardi",
        "3" => "Mercredi", "4" => "Jeudi", "5" => "Vendredi", "6" => "Samedi"}
        MONTHS = {"01" => "janvier", "02" => "février", "03" => "mars",
                "04" => "avril", "05" => "mai", "06" => "juin",
                "07" => "juillet", "08" => "août", "09" => "septembre",
                "10" => "octobre", "11" => "novembre", "12" => "décembre"}
    
        # http://man7.org/linux/man-pages/man3/strftime.3.html
        def frenchDate(date)
            date_time = time(date)
            day = date_time.strftime("%e") # leading zero is replaced by a space
            wkday = date_time.strftime("%w")
            month = date_time.strftime("%m")
            year = date_time.strftime("%Y")
            WEEKDAYS[wkday]+' '+day+' '+MONTHS[month]+' '+year
        end

        def locale_date(date, lang)
            if lang == "en"
                time(date).strftime("%A, %B %d, %Y")
            elsif lang == "fr"
                frenchDate(date)
            end
        end
    
        def html5date(date)
            day = time(date).strftime("%d")
            month = time(date).strftime("%m")
            year = time(date).strftime("%Y")
            year+'-'+month+'-'+day
        end
    end
end
    
Liquid::Template.register_filter(Jekyll::FrenchDates)