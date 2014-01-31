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

        this.render = function(el){
            el.html(createTable());
            calendar = '';
        }

        this.next = function(){
            d.setDate(1);
            d.setMonth(d.getMonth()+1);
            currentMonth = new Date(d.getFullYear(), d.getMonth(), 1);
            this.render(this.elem);
        }

        function createTable(){
            calendar += '<div>' + monthNames[currentMonth.getMonth()] + '</div>'
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
            calendar += '<button id="n" class="asd" style="margin: 0 auto; display: block;">next month</button>';
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
        var twDatePicker = new TwDatePicker(this);
        twDatePicker.render(this);
        $('.asd', this).on('click', function(){
            twDatePicker.next();
        })
        console.log(twDatePicker);
    }
})(jQuery)

$(window).load(function(){
    $('#calendar').twDatePicker();
})