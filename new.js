
//document.getElementById('big').onclick = shiftLeft();

//var ml = 200;
//alert('potato');
//function shiftLeft()
//{
//alert('hi');
//// $('shift').css('margin-left', (ml - 100) + '%');
//// current++;
//}


//https://www.facebook.com/notifications?id=100004496133045

var selectedLink = 0;
var selectedLink2 = 0;
var links2 = 7;


var cwin = 3;
var cid = 3;
var gl = true;
//var col = '#929292';
//var col = '#2ecc71';
//var col2 = '#0FC'
var col = '#25913C';
var col2 = '#248C54';
var json;
var onnew = false;
var czip;
var links;
var logoOver = false;

function init() {

    $('#coverlogo').fadeOut(500);
    setTimeout(function () {
        $('#shift').fadeIn(500);
        $('#left').fadeIn(500);
        $('#right').fadeIn(500);

    }, 500);
    logoOver = true;

}

function pageScroll() {
    window.scrollBy(0, 50);
}

function traverse(j) {
            
    for (var i = 0; i < 2; i++) {
        $.each(j.current_condition[i], function (key, value) {
            alert(key + ': ' + value);
        });
    }

}

function setCols() {
    $('.info').css('background-color', 'rgba(0, 0, 0, 0.0)');
    $('body').css('background', '-webkit-gradient(linear,left top,left bottom,from(' + col + '),to(' + col2 + '))');
    //$('body').css('background-color', col);
    

}
function potato() {

    alert('i can count to potato');

}

function getOffset(num) {
    var f = $('#d' + num).offset();
    var g = f.left;
    //alert(g);
    return g;

}

function shiftRight() {
    if(cid > -500)
    cid -= 100;
    $('#shift').css('left', cid + '%');

}


//function logFeed(f) {

//    $.get({
//        url: f,
//        success: function (feed) {
//            console.log(feed.title);
//            console.log(feed);
//            // do more stuff here
//        }
//    });


//}


function logFeed(url) {
    $.ajax({
        url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(url),
        dataType: 'json',
        success: function (data) {
            callback(data.responseData.feed);
        }
    });
}






var speed = 500;


function bgi(url) {

    $('#gallery-background').css('background-image', "url(" + url + ")");
    $('#gallery-background').css('background-size', '100%', '100%');

}



function moveTo(num) {

    $('#shift').animate({

        left: "-=" + getOffset(num)
    }, speed);

}
function shiftTab(left) {



    if (left && cid > 1)
        cid--;
    else if(!left && cid < 5)
        cid++;
    var o = getOffset(cid);
    $('#shift').animate({
            left: "-=" + o
    }, speed);

    if (cid == 1)
        $('#left').fadeOut(500);
    else if(cid==5)
        $('#right').fadeOut(500);
    else
    {
        $('#left').fadeIn(500);
        $('#right').fadeIn(500);


    }




}

function savetext() {
    var s = document.getElementById("idTextarea").value;
    if (s != localStorage.savedtext) {
        localStorage.savedtext = s;
    }
}

function startup() {
    console.log('startup');
    if (typeof (Storage) == undefined) {
        document.getElementById("idCaveat").innerHTML = ", which unfortunately is not available in this browser";
    }
    else {
        if (localStorage.savedtext == undefined) {
            localStorage.savedtext = "";
        }
        document.getElementById("idTextarea").value = localStorage.savedtext;
        self.setInterval(function () { savetext() }, 500); //call every second
    }
}



function shiftTo(num) {
    if (num >= 6)
        num %= num;
    if (num == 0)
        num++;
    cid = num;
    var o = getOffset(cid);
    $('#shift').animate({
        left: "-=" + o
    }, speed);
}

function getWeather(zip) {
    var url = 'https://api.worldweatheronline.com/free/v1/weather.ashx?q=' + zip + '&format=json&num_of_days=1&key=2h56q8d8j3vd4yv3zdczfar9&callback=?';
    $.getJSON(url, function (data) {
        console.log(data);
        json = data;
        console.log('abc' + json);
        insertWeatherInfo(json);
        getIcon(json);


        //alert(data.current_condition[0].cloudcover);
    });
    return json;

}

function getFeed(u) {
    var td;
    $.getJSON(u, function (datad) {
        console.log('fb feed');
        console.log(datad);
        td = datad;

    });
    return td;


}


function getPrecip(obj) {
    var cp = obj.data.current_condition[0].precipMM;
    var fp = obj.data.weather[0].precipMM;
    if (parseFloat(cp) != 0 || parseFloat(fp) != 0)
        return 'Current precipitation: ' + cp + 'mm; Predicted precipitation: ' + fp + 'mm';
    else
        return '';

}


function getCondition(obj) {
        return obj.data.current_condition[0].weatherDesc[0].value;
}

function getTemp(obj) {
    return obj.data.current_condition[0].temp_F;
}

function getHighLow(obj) {
    return obj.data.weather[0].tempMinF + '&degF/' + obj.data.weather[0].tempMaxF + '&degF';
}

function getWind(obj) {
    return obj.data.current_condition[0].windspeedMiles + 'mph due ' + obj.data.current_condition[0].winddir16Point;
}

function getHumidity(obj) {
    return obj.data.current_condition[0].humidity + '%';
}



$(function () {



    if ($('#fancypants') != null) {

        $('#shift').hide();
        $('#left').hide();
        $('#right').hide();

        startTime();

        $('#more').hide();

        $('#left').click(function () {
            shiftTab(true);

        });

        $('#right').click(function () {
            shiftTab(false);

        });


        //bgi('/images/CompressedWave.jpg');
        czip = 19104;

        onnew = true;
        chrome.topSites.get(buildPopupDom);

        setCols();
        //$('body').click(function () {
        //    shiftTab(true);

        //});

        //$('body').keydown(function () {
        //    shiftTab(false);

        //});
        getWeather(czip);
        startup();




        //if (!logoOver) {
        //    $('body').click(function () {
        //        shiftTo(3);
        //        init();

        //    });
        //}

    }



});


//http://stackoverflow.com/questions/4935632/how-to-parse-json-in-javascript
//http://jsfiddle.net/eYmA9/
















function buildPopupDom(mostVisitedURLs) {
    var popupDiv = document.getElementById('d2');
    var ol = popupDiv.appendChild(document.createElement('div'));
    

    ol.id = 'urlContainer';
    if (mostVisitedURLs.length > 7)
        links = 7;
    else
        links = mostVisitedURLs.length;
    for (var i = 0; i < links; i++) {
        var li = ol.appendChild(document.createElement('p'));
        li.className = 'urlContainer';
        li.id = "l" + i;
        
        var a = li.appendChild(document.createElement('a'));
        a.href = mostVisitedURLs[i].url;
        a.className = 'urlContainer';
        a.id = "a" + i;
        console.log(mostVisitedURLs[i].url);
        a.appendChild(document.createTextNode(mostVisitedURLs[i].title));
        a.addEventListener('click', onAnchorClick);
    }

    $('#l0').css("background-color", "rgba(255,255,255,0.4)");
    $('#n0').css("background-color", "rgba(255,255,255,0.4)");



}

function onAnchorClick(event) {
    chrome.tabs.create({ url: event.srcElement.href });
    return false;
}


function reqURL() {

    chrome.runtime.sendMessage({ req: 'url' }, function (response) {
        console.log(response.u + 'abc');
    });
}



function insertWeatherInfo(obj) {
    
    $('#z').html(czip);
    var t = getTemp(obj) + '&degF';
    console.log(t);
    $('#temp').html(t);
    var hl = getHighLow(obj);
    console.log(hl);
    $('#hilo').html(hl);
    var p = getPrecip(obj);
    console.log(p);
    $('#desc').html(getCondition(obj));
    $('#rain').html(p);
    var w = getWind(obj);
    $('#wind').html(w);
    var h = getHumidity(obj);
    $('#humidity').html(h + ' Humidity');

    console.log(getCondition(obj));

}

function contains(a1, a2)
{
    a1 = a1.toLowerCase();
    a2 = a2.toLowerCase();
    return (a1.indexOf(a2) != -1 || a2.indexOf(a1) != -1)


}

function hideLogo() {



}


function getIcon(obj) {
    
    var night = false;
    var dt = new Date();
    if (dt.getHours() > 18 || dt.getHours() <= 4)
        night = true;
    var d = obj.data.current_condition[0].weatherDesc[0].value;
    if (contains(d, 'snow')) {

            $('#wsign').attr("src", '/images/WeatherIcons/Snow.png');
    }
    else if (contains(d, 'storm') || contains(d, 'lightning') || contains(d, 'inclement')) {
        if (night)
            $('#wsign').attr("src", '/images/WeatherIcons/NightThunderstorms.png');
        else
            $('#wsign').attr("src", '/images/WeatherIcons/Thunderstorms.png');
    }
    else if (contains(d, 'rain') || contains(d, 'drizzle')) {
        if (night)
            $('#wsign').attr("src", '/images/WeatherIcons/NightDrizzle.png');
        else
            $('#wsign').attr("src", '/images/WeatherIcons/Drizzle.png');
    }
    else if (contains(d, 'cloudy')) {
        if(night)
            $('#wsign').attr("src", '/images/WeatherIcons/NightCloudy.png');
        else
            $('#wsign').attr("src", '/images/WeatherIcons/Cloudy.png');
    }
    else {

        if (night)
            $('#wsign').attr("src", '/images/WeatherIcons/NightSunny.png');
        else
            $('#wsign').attr("src", '/images/WeatherIcons/Sunny.png');
    }




    console.log(i);
    return i;


    
}



    var timeout = 0;
    var timeTo = 100;
    var controller = new Leap.Controller({ enableGestures: true });

    Leap.loop(function (frame) {
            frame = controller.frame(0);
            if (timeout > 0)
                timeout--;
            var frame = controller.frame(0);
            if (frame.gestures.length > 0) {
                for (var i = 0; i < frame.gestures.length; i++) {
                    var gesture = frame.gestures[i];
                    if (timeout == 0)

                        switch (gesture.type) {
                            case "swipe":
                                var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
                                if (logoOver) {
                                    if (isHorizontal && frame.pointables.length <= 5) {
                                        if (gesture.direction[0] > 0) {
                                            // req('tr');
                                            console.log('swipe');
                                            shiftTab(true);
                                        } else {
                                            // req('tl');
                                            console.log('swipe back')
                                            shiftTab(false);
                                        }
                                        timeout = timeTo;
                                    }
                                    else {
                                        timeout = timeTo;
                                        //l + num
                                        if (cid == 4) {
                                            if (gesture.direction[1] > 0) {
                                                console.log('swipe up');
                                                $('#more').fadeIn(500);

                                            }
                                            else {
                                                console.log('swipe down');
                                                $('#more').fadeOut(500);

                                            }
                                        }
                                        else if (cid == 2) {
                                            $('#l' + selectedLink).css("background-color", "rgba(0,0,0,0.4)");





                                            if (gesture.direction[1] > 0) {
                                                console.log('swipe up');
                                                selectedLink--;
                                                selectedLink += links;
                                                selectedLink %= links;


                                            }
                                            else {
                                                console.log('swipe down');
                                                selectedLink++;
                                                selectedLink %= links;


                                            }
                                            $('#l' + selectedLink).css("background-color", "rgba(255,255,255,0.4)");



                                        }
                                        else if (cid == 1) {
                                            $('#n' + selectedLink2).css("background-color", "rgba(0,0,0,0.4)");





                                            if (gesture.direction[1] > 0) {
                                                console.log('swipe up');
                                                selectedLink2--;
                                                selectedLink2 += links;
                                                selectedLink2 %= links;


                                            }
                                            else {
                                                console.log('swipe down');
                                                selectedLink2++;
                                                selectedLink2 %= links;


                                            }
                                            $('#n' + selectedLink2).css("background-color", "rgba(255,255,255,0.4)");



                                        }



                                    }
                                }
                                else if(!isHorizontal)
                                {
                                    init();



                                }

                                break;
                            case "screenTap":
                                if (logoOver) {
                                    if (gesture.state == 'stop') {
                                        if (cid == 2) {
                                            console.log($('#a' + selectedLink).attr("href"));
                                            timeout = timeTo / 2;
                                            location.href = $('#a' + selectedLink).attr("href");
                                        }
                                        else if (cid == 1) {
                                            console.log($('#an' + selectedLink).attr("href"));
                                            timeout = timeTo / 2;
                                            location.href = $('#an' + selectedLink).attr("href");
                                        }
                                    }
                                }
                                break;
                        }
                }
            }







        
    });
    controller.connect();






    function startTime() {
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        m = checkTime(m);
        s = checkTime(s);
        if (h > 12)
            h -= 12;
        if (h == 0)
            h = 12;
        document.getElementById('clock').innerHTML = h + ":" + m + ":" + s;
        t = setTimeout(function () { startTime() }, 500);
    }

    function checkTime(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }





    chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
        if (request.action == "giveMeSomething")
            sendResponse({ result: "Some result from content script" });
        else
            sendResponse({}); // Send nothing..
    });