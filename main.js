(function($){


    function TwDatePicker(name){
        var d = new Date(),
            today = new Date(),
            currentMonth = new Date(d.getFullYear(), d.getMonth(), 1),
            monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
            calendar = '',
            selectStyle = '';

        this.elem = name;

        this.render = function(){
            this.elem.find('.tw-datepicker-year').html(currentMonth.getFullYear());
            this.elem.find('.tw-datepicker-controls span').html(monthNames[currentMonth.getMonth()]);
            this.elem.find('.tw-datepicker-calendar').html(createTable());
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

        function createTable(){
            calendar += '<table><tr>';
            for(var i = 0; i <= dayNames.length - 1; i++){
                calendar += '<th>' + dayNames[i] + '</th>';
            }
            calendar += '</tr><tr>';

            for(var i = 0; i < getDay(currentMonth); i++){
                var lastMonth = new Date(d.getFullYear(), d.getMonth(), - getDay(currentMonth) + i + 1 );
                calendar += '<td style="background: grey">' + lastMonth.getDate() + '</td>';
            }

            while(d.getMonth() == currentMonth.getMonth()){
                if(today.getFullYear() == currentMonth.getFullYear() && today.getMonth() == currentMonth.getMonth() && today.getDate() == currentMonth.getDate())
                    selectStyle = 'style="background: green"';
                else
                    selectStyle = '';
                calendar += '<td ' + selectStyle + '>' + currentMonth.getDate() + '</td>';
                currentMonth.setDate(currentMonth.getDate()+1);
                if(getDay(currentMonth) == 0) calendar += '</tr><tr>';
            }

            for(var i = getDay(currentMonth); i <= 6; i++){
                var nextMonth = new Date(d.getFullYear(), d.getMonth() + 1, - getDay(currentMonth) + i + 1);
                calendar += '<td style="background: grey">' + nextMonth.getDate() + '</td>';
            }

            calendar += '</tr></table>';
            return calendar;
        }



        function getDay(fromDate){
            var day = fromDate.getDay();
            if (day == 0) day = 7;
            return day - 1;
        }
    }







    //createTable();
    $.fn.twDatePicker = function(){
        var makeup = '<div class="tw-datepicker"><div class="tw-datepicker-year"></div><div class="tw-datepicker-controls"><a class="prev" href="javascript:void(0)"><</a><a class="next" href="javascript:void(0)">></a><span></span></div><div class="tw-datepicker-calendar"></div></div>';
        $(this).append(makeup);
        var twDatePicker = new TwDatePicker(this);
        twDatePicker.render();
        $('.prev, .next', this).click(function(e){
            (e.target.className == 'next') ? twDatePicker.next() : twDatePicker.prev();
        });

        console.log(twDatePicker);
    }
})(jQuery)

$(window).load(function(){
    $('#calendar').twDatePicker();
})