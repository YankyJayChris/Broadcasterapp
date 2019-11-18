import Utils from "./../../services/Utils.js";

let MyMap = {
  render: async () => {
    let view = /*html*/ `
            <div class="mymap">
                <div class="location">
                    <button class="btn find-me">find my location</button>
                    <h4 class="coord"></h4>
                </div>
                <div id="map"></div>
            </div>
            ${console.log("map run")}
        `;
    return view;
  },
  events: async () => {
        let lat = -1.9536;
        let lng = 30.0606;
        let findMe = document.querySelector(".find-me");
        let coord = document.querySelector(".coord");
        
        function getLocation() {
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
            } else {
                    alert("Geolocation is not supported by this browser.");
            }
            function geoSuccess(position) {
                lat = position.coords.latitude;
                lng = position.coords.longitude;
                console.log(lat,lng);
                coord.innerHTML = `Coordinates: ${parseFloat(lat).toFixed(4)}, ${parseFloat(lng).toFixed(4)}`;
                // loading the map
                Utils.gmap("map", userLocation);
                Utils.maphelper();
            }
            function geoError() {
              alert("Geocoder failed.");
               coord.innerHTML = "Geocoder not surpoted.";
            }
        }
        const userLocation = { lat:lat, lng:lng };
        console.log("user",userLocation);

        // loading the map
        Utils.gmap("map", userLocation);
        Utils.maphelper();
        
        findMe.addEventListener('click',()=>{
            getLocation();
        });;
  }
};
export default MyMap;
