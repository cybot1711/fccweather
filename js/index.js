//Lets start by getting our current location but first one page load 

$(document).ready(function() {
  //Store apiKey in a variable for easy access
  var apkey = "71a4c4be45a99d4a901ff5a062aff5a3";
  if (navigator.geolocation) {//Start retrieving location from built in navigator

    navigator.geolocation.getCurrentPosition(function(position) {

      // $("#success").html("latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude).fadeIn();
      var lati = position.coords.latitude;
        
      //create variable for lat and long
      var longi = position.coords.longitude;
        
      var unit = "metric";
      //Set units as metric for default this can be changed by clicking conversion buttons
      //Initialize api call to retrieve JSON data and start working on data with callback function
      $.getJSON('http://api.openweathermap.org/data/2.5/weather?lat=' + lati + 
      '&lon=' + longi + '&units=' + unit + '&APPID=' + apkey, function(data) {
                $('.glyphicon').html("<img src='http://openweathermap.org/img/w/" + 
                data.weather[0].icon + ".png ' alt=weather icon width=100 height=100  />");//Display weather icon
          
                var wder = getWind(data.wind.deg),//create variables for wind and temperature
                mTemp = Math.round(data.main.temp);
                
                //Update html with JSON data by accessing object in appropriate manner
                $('.temp').html(mTemp + '&#8451 / ' + data.main.humidity + '%');
                $('.trail').html(data.name + ' ' + data.sys.country);
                $('.oview').html(data.weather[0].main + ": " + data.weather[0].description);
                $('.wcloud').html(wder + ' ' + data.wind.speed + 'meter/sec | ' + data.clouds.all + '%');

            
            
                 //Create two click functions to toggle between Celcius and Fahrenheit    
                 $('#cel').click(function() {
                     
                      $('.temp').html(mTemp + '&#8451 / ' + data.main.humidity + '%');
                  });
    
                  $('#far').click(function() {
                      var newTemp = (mTemp * 1.8) + 32;
                      $('.temp').html(Math.round(newTemp) + '&#8457 / ' + data.main.humidity + '%');
                  });
                 //Get weather condition code to use for switching backgrounds      
                 var cond = data.weather[0].id;
                
                //Use if else if to decide on background and utilize jquery to update css
                if(cond == 800){
                    
                
                   $('body').css({
                        'background-image' : 'url("http://wallpaperswiki.org/wallpapers/2012/12/Planes-The-Sky-The-Trail-800x1280.jpg")',
                        'background-size'  : 'cover',
                        'background-repeat' : 'no-repeat'
                   });
                }else if(cond > 199 && cond < 300){
                    
                
                   $('body').css({
                        'background-image' : 'url("http://images.nationalgeographic.com/wpf/media-live/photos/000/274/cache/ngpc-wp-3_27475_990x742.jpg")',
                        'background-size'  : 'cover',
                        'background-repeat' : 'no-repeat'
                   });
                }else if(cond > 299 && cond < 500){
                    
                
                   $('body').css({
                        'background-image' : 'url("http://img07.deviantart.net/ea88/i/2012/198/6/b/drizzle__by_niki91-d57kcpt.jpg")',
                        'background-size'  : 'cover',
                        'background-repeat' : 'no-repeat'
                   });
                }else if(cond > 499 && cond < 600){
                    
                
                   $('body').css({
                        'background-image' : 'url("http://i.stack.imgur.com/goBR5.jpg")',
                        'background-size'  : 'cover',
                        'background-repeat' : 'no-repeat'
                   });
                }else if(cond > 599 && cond < 700){
                    
                
                   $('body').css({
                        'background-image' : 'url("https://i.ytimg.com/vi/ea1GMrjjJ1A/maxresdefault.jpg")',
                        'background-size'  : 'cover',
                        'background-repeat' : 'no-repeat'
                   });
                }     
                var prep = Math.round(data.rain['3h']);  
                $('.precip').html( '% chance of rain');
          

      }, "jsonp");
        
    });
    //Convert wind direction  
    function getWind(blow){ //Wind can be devided in eight equal sections according to meteorlogical degrees
        
        var points = ['N','NE','E', 'SE', 'S', 'SW', 'W', 'NW'];
        return points[Math.floor(blow / 45)] // 360 / 45 = 8 yeilding desired direction
    }

  }
                  //Use jquery and animate css to pulse active divs on mouse over
                  $('.card').mouseenter(function() {
                    $(this).addClass("animated pulse infinite");
                  });

                  $('.card').mouseleave(function() {
                    $(this).removeClass("animated pulse infinite");
                  });
                    
                

});