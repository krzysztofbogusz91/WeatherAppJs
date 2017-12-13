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

        } else {
            console.log("errrr");
        }



    }
    xhttp2.open("GET", getApi, true);
    xhttp2.send();

}
