const url = "http://ip-api.com/json";

requestData();

function requestData() {

    let xhttp = new XMLHttpRequest();

    //first xhttp request
    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            json = this.responseText;
            //get city and the cords
            json = JSON.parse(json)
            town = json.city;
            lat = json.lat;
            long = json.lon;
            console.log(town + lat + long);
            document.getElementById("city").innerHTML = town;
            //second xhttp request
            let api = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&APPID=34dc9025e629baa2dfdec264b2d3b55a';
            //pass corect api to second xhttp request
            secondXHTTP(api);

        } else {
            console.log("error - wait to load data");
        }
    }

    xhttp.open("GET", url, true);
    xhttp.send();

}

function secondXHTTP(getApi) {

    let xhttp2 = new XMLHttpRequest();
    let data;

    xhttp2.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            data = this.responseText;
            data = JSON.parse(data);
            console.log(data);
            let kelvin = data.main.temp;
            let forecastId = data.weather[0].id;
            let icon = data.weather[0].icon;
            let des = data.weather[0].description;
            let cel = Math.floor(kelvin - 273);
            let far = Math.floor(32 + ((9 / 5) * cel));


            document.getElementById("forecast").innerHTML = des;
            document.getElementById("temp").innerHTML = cel + " C";


            //change F to C on click
            let tempswap = true;
            document.getElementById("change").addEventListener("click", function () {

                if (tempswap === false) {
                    $("#temp").html(cel + " C");
                    tempswap = true;
                } else {
                    $("#temp").html(far + " F");
                    tempswap = false;
                }


            });
            //end click

            //switch function
            swi(data);




        } else {
            console.log("errrr");
        }



    }
    xhttp2.open("GET", getApi, true);
    xhttp2.send();

}
// function with switch to sets current weather img
function swi(someData) {

    let forecastId = Math.floor(someData.weather[0].id / 100);


    switch (forecastId) {
        case 2:
            document.getElementById("icon").src = "http://openweathermap.org/img/w/11d.png";
            break;
        case 3:
            document.getElementById("icon").src = "http://openweathermap.org/img/w/09d.png";
            break;
        case 5:
            document.getElementById("icon").src = "http://openweathermap.org/img/w/10d.png";
            break;
        case 6:
            document.getElementById("icon").src = "http://openweathermap.org/img/w/13d.png";
            break;
        case 7:
            document.getElementById("icon").src = "http://openweathermap.org/img/w/50d.png";
            break;
        case 8:
            document.getElementById("icon").src = "http://openweathermap.org/img/w/01d.png";
            break;

        default:
            document.getElementById("icon").src = "http://openweathermap.org/img/w/01n.png";
            break;
    }

}
