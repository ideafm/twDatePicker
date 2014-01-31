(function($){
    var d = new Date(),
        currentMonth = new Date(d.getFullYear(), d.getMonth(), 1),
        monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
        calendar = '',
        selectStyle = '';

    function TwDatePicker(){

        this.render = function(){
            $('#calendar').html(createTable());
            calendar = '';
        }
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
            (d.getDate() == currentMonth.getDate())? selectStyle = 'style="background: green"' : selectStyle = '';
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

    $('#n').click(function(){
        d.setDate(1);
        d.setMonth(d.getMonth()+1);
        currentMonth = new Date(d.getFullYear(), d.getMonth(), 1);
        twDatePicker.render();
    })



    //createTable();

    var twDatePicker = new TwDatePicker();
    twDatePicker.render();
    console.log(twDatePicker);
})(jQuery)
