module Jekyll    
    module DateCompare
        def datespan(d1, d2)
            d1Date = Date.parse(d1)
            d2Date = Date.parse(d2)

            result = ((d1Date - d2Date).to_i).abs
        end

        def recent(events, days, date_prop)
            now = DateTime.now
            today = DateTime.new(now.year, now.month, now.day, 0, 0, 0, now.zone)
            target = today - days
        
            events.select do |event|
                event_date = event[date_prop].to_datetime
        
                if event_date < today && event_date > target
                    event
                end
            end
        end

        def past(events, days, date_prop)
            now = DateTime.now
            today = DateTime.new(now.year, now.month, now.day, 0, 0, 0, now.zone)
            limit = today - days
        
            events.select do |event|
                event_date = event[date_prop].to_datetime
        
                if event_date < limit
                    event
                end
            end
        end
    end
end
    
Liquid::Template.register_filter(Jekyll::DateCompare)