const locationMap = document.getElementById("location-map");
let map;
let markers = [];
let isMapDrawn = false;
let userLatitue;
let userLongitude;

const drawMap = (latitue, longitude) => {
  const options = {
    center: new kakao.maps.LatLng(latitue, longitude),
    level: 2,
  };

  map = new kakao.maps.Map(locationMap, options);
  map.setZoomable(false);
};

const addUserMarker = () => {
  let maker = new kakao.maps.Marker({
    map: map,
    position: new kakao.maps.LatLng(userLatitue, userLongitude),
  });
  // maker.setMap(map);
  markers.push(maker);
};

const deleteMarker=()=>{
  for(let i =0;i<markers.length;i++){
    markers[i].setMap(null);
  }
  markers = [];
}

const addCourseMarker = () => {
  let markerImage = "/file/map_not_done.png";
  let markerSize = new kakao.maps.Size(100, 100);

  const image1 = new kakao.maps.MarkerImage(markerImage, markerSize);
  const position1 = new kakao.maps.LatLng(35.87556, 128.681821);
  new kakao.maps.Marker({
    map: map,
    position: position1,
    title: "영진",
    image: image1,
  });
};

// 위치
const configurationLocationWatch = () => {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition((position) => {
      deleteMarker();
      // console.log(position);
      //내 위치 확인후 카카오맵에 중앙으로
      userLatitue = position.coords.latitude;
      userLongitude = position.coords.longitude;
      if (!isMapDrawn) {
        // console.log(position);
        isMapDrawn = true;
        drawMap(userLatitue, userLongitude);
      }
      addUserMarker();
    });
  }
};

configurationLocationWatch();
// drawMap(35.87556, 128.681821);
addCourseMarker();
