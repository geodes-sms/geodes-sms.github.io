module Jekyll
    module StringManip
        def trad_key(val, prefix = "")
            result = val.strip.downcase.gsub(/\s+/, '_')
            prefix.strip.length == 0 ? result : prefix + "_" + result
        end

        def trad(val, dict, prefix = "")
            key = trad_key val, prefix
            result = dict[key]
            
            result = dict.key?(key) ? result : val
        end
    end
end
    
Liquid::Template.register_filter(Jekyll::StringManip)