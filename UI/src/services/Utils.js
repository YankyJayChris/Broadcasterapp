
const Utils = {
  //  get a url and break it into resource, id and verb

  getURL: () => {
    // let pathname = window.location.pathname;

    let url = location.hash.slice(1).toLowerCase() || "/";
    let r = url.split("/");
    let request = {
      resource: null,
      id: null,
      verb: null,
      url: null
    };
    request.resource = r[1];
    request.id = r[2];
    request.verb = r[3];
    request.url = url;

    console.log(request.url);
    return request;
  },
  routeTo: route => {
    window.location.href = `/UI/Broadcasterapp${route}`;
  },
  gmap: async (el, userLocation) => {
    let lat = userLocation.lat;
    let lng = userLocation.lng;

    // google map object
    let map = new window.google.maps.Map(document.getElementById(el), {
      center: new self.google.maps.LatLng(lat, lng),
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    // The marker, positioned at userLocation
    const marker = new window.google.maps.Marker({
      position: userLocation,
      map: map,
      icon:
        "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
    });

    // info window
    const infowindow = new window.google.maps.InfoWindow({
      content: "<h1>my info</h1>"
    });

    marker.addListener("click", () => {
      infowindow.open(map, marker);
    });
  },
  maphelper: async () => {
    const appendChild = Element.prototype.appendChild;

    const urlCatchers = [
      "/AuthenticationService.Authenticate?",
      "/QuotaService.RecordEvent?"
    ];

    Element.prototype.appendChild = function(element) {
      const isGMapScript =
        element.tagName === "SCRIPT" &&
        /maps\.googleapis\.com/i.test(element.src);
      const isGMapAccessScript =
        isGMapScript && urlCatchers.some(url => element.src.includes(url));

      if (!isGMapAccessScript) {
        return appendChild.call(this, element);
      }
      return element;
    };
  }
};

export default Utils;