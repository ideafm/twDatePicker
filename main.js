(function($){


    function TwDatePicker(element, options){
        var d = new Date(),
            today = new Date(),
            currentMonth = new Date(d.getFullYear(), d.getMonth(), 1),
            monthNamesRu = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            monthNamesEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            dayNamesRu = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
            dayNamesEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            monthNames,
            dayNames,
            calendar = '',
            selectStyle = '',
            self = this,
            selectDate = today,
            formattedDate;

        if(options.lang == 'ru') {
            monthNames = monthNamesRu;
            dayNames = dayNamesRu;
        } else {
            monthNames = monthNamesEn;
            dayNames = dayNamesEn;
        }

        this.elem = element;

        this.render = function(){
            this.elem.find('.tw-datepicker-year').html(currentMonth.getFullYear());
            this.elem.find('.tw-datepicker-controls span').html(monthNames[currentMonth.getMonth()]);
            this.elem.find('.tw-datepicker-calendar').html(createTable());

            this.elem.find('.tw-datepicker-calendar').on('click', 'a', setSelectDate);
            calendar = '';
        }

        this.next = function(){
            d.setDate(1);
            d.setMonth(d.getMonth()+1);
            currentMonth = new Date(d.getFullYear(), d.getMonth(), 1);
            this.render();
        }

        this.prev = function(){
            d.setDate(1);
            d.setMonth(d.getMonth()-1);
            currentMonth = new Date(d.getFullYear(), d.getMonth(), 1);
            this.render();
        }

        this.elem.find('.next, .prev').click(function(e){
            (e.target.className == 'next') ? self.next() : self.prev();
        });

        function setSelectDate(e){
            e.preventDefault();
            e.stopPropagation();

            self.elem.find('.selected').removeClass('selected');

            $(this).addClass('selected');
            selectDate = new Date(d.getFullYear(), d.getMonth(), $(this).text());

            if(options.separator == null)
                formattedDate = selectDate;
            else
                formattedDate = selectDate.getFullYear() + options.separator + parseInt(selectDate.getMonth() + 1) + options.separator + selectDate.getDate();



            if($(options.to).is('input'))
                $(options.to).val(formattedDate);
            else
                $('.tw-datepicker-selected-date').html(formattedDate);

            $('body').trigger('click');
        }

        function createTable(){
            calendar += '<table class="tw-datepicker-table"><tr>';
            for(var i = 0; i <= dayNames.length - 1; i++){
                calendar += '<th>' + dayNames[i] + '</th>';
            }
            calendar += '</tr><tr>';

            for(var i = 0; i < getDay(currentMonth); i++){
                var lastMonth = new Date(d.getFullYear(), d.getMonth(), - getDay(currentMonth) + i + 1 );
                calendar += '<td class="tw-disabled-date">' + lastMonth.getDate() + '</td>';
            }

            while(d.getMonth() == currentMonth.getMonth()){
                if(today.getFullYear() == currentMonth.getFullYear() && today.getMonth() == currentMonth.getMonth() && today.getDate() == currentMonth.getDate())
                    selectStyle = 'today';
                else if(selectDate.getFullYear() == currentMonth.getFullYear() && selectDate.getMonth() == currentMonth.getMonth() && selectDate.getDate() == currentMonth.getDate())
                    selectStyle = 'selected';
                else
                    selectStyle = '';
                calendar += '<td><a href="javascript: void(0)" class="' + selectStyle + '">' + currentMonth.getDate() + '</a></td>';
                currentMonth.setDate(currentMonth.getDate()+1);
                if(getDay(currentMonth) == 0) calendar += '</tr><tr>';
            }

            if(getDay(currentMonth) != 0){
                for(var i = getDay(currentMonth); i <= 6; i++){
                    var nextMonth = new Date(d.getFullYear(), d.getMonth() + 1, - getDay(currentMonth) + i + 1);
                    calendar += '<td class="tw-disabled-date">' + nextMonth.getDate() + '</td>';
                }
            }

            calendar += '</tr></table>';

            return calendar;
        }

        function getDay(fromDate){
            if(options.lang == 'ru'){
                var day = fromDate.getDay();
                if (day == 0) day = 7;
                return day - 1;
            } else {
                return fromDate.getDay();
            }
        }
    }

    $.fn.twDatePicker = function(options){
        var posFix, makeup, settings, toAppend;
        var defaultOptions = {
            'separator' : null,
            'to' : null,
            'lang': 'ru',
        };

        if($(this).is('input')){
            $(this).wrap('<div class="tw-datepicker-wrap"></div>');
            toAppend = $(this).parent('.tw-datepicker-wrap');
        }else{
            toAppend = $(this);
        }

        posFix = $(this).css('position');
        if(posFix != 'fixed' || posFix != 'absolute' || posFix != 'relative') $(this).css('position', 'relative');

        settings = !!options? $.extend({}, defaultOptions, options) : defaultOptions;


        if(settings.to != null && $(settings.to).length){
            settings.to = $(settings.to)[0];
        }else if($('[data-tw-datepicker]').length){
            settings.to = $('[data-tw-datepicker]')[0];
        }else{
            settings.to = $(this);
        }

        if(!$(settings.to).is('input'))
            $(settings.to).append('<div class="tw-datepicker-selected-date"></div>');

        makeup = '<div class="tw-datepicker"><div class="tw-datepicker-year"></div><div class="tw-datepicker-controls"><a class="prev" href="javascript:void(0)"><</a><a class="next" href="javascript:void(0)">></a><span></span></div><div class="tw-datepicker-calendar"></div></div>';
        toAppend.append(makeup);


        $('.tw-datepicker').css({'top': $(this).outerHeight(), 'left': 0}).on('click', function(e){
            e.stopPropagation();
        })

        $(this).click(function(e){
            e.stopPropagation();
            $('.tw-datepicker', toAppend).show();

            $('body').one('click', function(){
                $('.tw-datepicker', toAppend).hide();
            })
        })

        var twDatePicker = new TwDatePicker(toAppend, settings);
        twDatePicker.render();
        console.log(twDatePicker);
    }
})(jQuery)

$(window).load(function(){
    $('#calendar').twDatePicker({separator: '/', to: $('.asd'), lang: 'en'});
})