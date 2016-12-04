$(window).load(function() {
	require([ "jquery", "jquery-ui" ], function( $ ) {
		$("#datepickerBefore").datepicker({ 
			dateFormat: 'dd/mm/yy',
			currentText: 'Сегодня',
			prevText: '&#x3c;',
			nextText: '&#x3e;',
			monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
			monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'],
			dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
			dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
			dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
			onSelect: function(date){        
		            var date1 = $('#datepickerBefore').datepicker('getDate');           
		            var date = new Date( Date.parse( date1 ) ); 
		            date.setDate( date.getDate() + 1 );        
		            var newDate = date.toDateString(); 
		            newDate = new Date( Date.parse( newDate ) );                      
		            $('#datepickerAfter').datepicker("option","minDate",newDate);            
		    }
		});
		$("#datepickerAfter").datepicker({ 
			dateFormat: 'dd/mm/yy',
			currentText: 'Сегодня',
			prevText: '&#x3c;',
			nextText: '&#x3e;',
			monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
			monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'],
			dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
			dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
			dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
		});

		var datepiker = $(".calendar-news .dateInput");
		var cleanbtn = $(".calendar-news .clean-btn");
		var searchbtn = $(".calendar-news .search-btn");
		var param = window.location.search.slice(1);

		
		if (param) {
			var paramFrom = param.split('=')[1].split('&')[0];
			var paramTo = param.split('=')[2];
			$( "#datepickerBefore" ).val(paramFrom);
			$( "#datepickerAfter" ).val(paramTo);

            var dateParam = $('#datepickerBefore').datepicker('getDate');           
            var dateMinDay = new Date( Date.parse( dateParam ) ); 
            dateMinDay.setDate( dateMinDay.getDate() + 1 );        
            var newDateSearch = dateMinDay.toDateString(); 
            newDateSearch = new Date( Date.parse( newDateSearch ) );                      
            $('#datepickerAfter').datepicker("option","minDate",newDateSearch);      

			cleanbtn.show();
		}

		$(".ui-state-default, .ui-datepicker table td, .calendar-news .dateInput").on("click",function(){
			if (datepiker[0].value === "" && datepiker[1].value === "") {
				cleanbtn.hide();
			} else {
				cleanbtn.show();
			}
		});

		cleanbtn.on("click", function(){
			datepiker.val("");
			window.location.assign("?");
			cleanbtn.hide();
		});
		searchbtn.on("click", function(e){
			var fromDate = $(".calendar-news .dateInput")[0].value;
			var toDate = $(".calendar-news .dateInput")[1].value;
			window.location.assign("?fromDate="+fromDate+"&toDate="+toDate);
		});
	});
});
