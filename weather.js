$(document).ready(function() {
  $('input:text').focus(
    function(){
        $(this).css({'background-color' : '#e2c7d5'});
         $(this).css("border", "1px solid red")
    });

    $('input:text').blur(
    function(){
        $(this).css({'background-color' : '#DFD8D1'});
    });

		$("#send").click(function(){
			var city=$("#city").val(),
		 key='d9c25f84f2cd9cbf4fa2ca5b880d0aa8',
 url = "https://api.openweathermap.org/data/2.5/forecast";
 $("#showWeather").fadeIn(2000);

$.ajax({
  url: url, 
  dataType: "json",
  type: "GET",
  data: {
    q: city,
    appid: key,
    units: "metric",
    // lang:"hr"
  },
  error: function(xhr, ajaxOptions, thrownError){
  	if (xhr.status===400) {
  		alert("Must enter city name!");
  	}
     if(xhr.status===404){
  		alert("City not found!");
  	}
                           },

  success: function(data) {
  	var weekdays=["Sunday","Monday","Tuesday", "Wednesday","Thursday","Friday","Saturday"],
     weatherForecast = "<h1>" + data.city.name + "</h1>";
    
    $.each(data.list, function(index, val) {
 var date=val.dt_txt.split(' ')[1],
     hour= date.split(':')[0],
    MyDate = new Date(val.dt_txt);
 
  if (hour==="15") {weatherForecast += "<div id='cast'>" 
    	weatherForecast +="<h4>  "+ weekdays[MyDate.getDay()]+"</h4>";
      weatherForecast +="<p>  "+val.dt_txt.split(' ')[0] +"</p>";
      weatherForecast +="<p id='temp'>"+ Math.round(val.main.temp ) + "&degC"+"</p>"; 
      weatherForecast += "<p>  " + val.weather[0].description+"</p>"; 
      weatherForecast += "<p>  "+"Wind speed: " + val.wind.speed+"m/s"+"</p>"; 
      weatherForecast += "<img src='https://openweathermap.org/img/w/" + val.weather[0].icon + ".png'>"; 
      weatherForecast += "</div>" }
     });
    
    $("#showWeather").html(weatherForecast);
 }

});

      });

});