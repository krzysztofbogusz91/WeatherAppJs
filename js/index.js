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
            let city2 = data.name;
            let forecastId = data.weather[0].id;
            let icon = data.weather[0].icon;
            let des = data.weather[0].description;
            let cel = Math.floor(kelvin - 273);
            let far = Math.floor(32 + ((9 / 5) * cel));

            document.getElementById("city").innerHTML = city2;
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




        } else {
            console.log("errrr");
        }



    }
    xhttp2.open("GET", getApi, true);
    xhttp2.send();

}
