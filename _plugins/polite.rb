module Jekyll
    module Polite

        # http://man7.org/linux/man-pages/man3/strftime.3.html
        def fullName(name)
            names = name.split(",")
            lastname = names[0].upcase
            result = names[1].strip + " " + lastname.strip
        end
    end
end
    
Liquid::Template.register_filter(Jekyll::Polite)