window.onload = function(){
	getWeatherByCity("Follonica");
}

$(function(){

	$("#cityName").submit(function(){

		getWeatherByCity( $("#city").val() );
		return false;

	});

});

function getWeatherByCity( request ){

	var key = "efa6f02761d89bccc4da7072252c5102";
	var apiUrl = "https://api.openweathermap.org/data/2.5/weather?appid=" + key + "&units=metric&lang=it&q=";

	$.ajax({
		dataType: "json",
		url: apiUrl + request,
		data: "",
		success: function(){ console.log("jsweather@> Request Completed") },
		statusCode: {
			400: function(){
				swal({
					title: "Ops..",
					text: "A quanto pare la tua richiesta non è valida. Prova ad inserire un'altra città!",
					icon: "error"
				});
			},

			404: function(){
				swal({
					title: "Attenzione",
					text: "Città non esistente, sicuro di averla scritta bene?",
					icon: "error"
				});
			}
		}
	});

	$.getJSON( apiUrl + request,  function( data ){

		myGet(data);

	});

}

function myGet( data ){

	$("#city-name").html( data.name );
	$("#country").html( data.sys.country );

	$("#state-icon").attr( "src", "weather-icons/" + data.weather[0].icon + ".png" );
	$("#state-icon").attr( "title", data.weather[0].main );

	$("#state").html( data.weather[0].description );
	$("#temp").html( data.main.temp + " °C" );

	$("#temp-max").html( data.main.temp_max + " °C" );
	$("#temp-min").html( data.main.temp_min + " °C" );
	$("#humidity").html( data.main.humidity + "%" );
	$("#pressure").html( data.main.pressure + " hpa" );

	var sunrise = new Date( data.sys.sunrise * 1000 ) ;
	var sunset = new Date( data.sys.sunset * 1000 );

	$("#sunrise").html( sunrise.getHours() + ":" + sunrise.getMinutes() + ":" + sunrise.getSeconds() );
	$("#sunset").html( sunset.getHours() + ":" + sunset.getMinutes() + ":" + sunrise.getSeconds() );

	$("#speed").html( Math.round(data.wind.speed * 3.6) + " km/h" );
}
