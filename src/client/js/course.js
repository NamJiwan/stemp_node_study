const locationMap = document.getElementById("location-map");
let map;
let markers = [];
let isMapDrawn = false;
let userLatitue;
let userLongitude;
let clickCourseId = 0;

//지도그리는 함수
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

const deleteMarker = () => {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
};

//해당 위치로 지도를 이동한다.
const panTo = (latitude, longitude) => {
  map.panTo(new kakao.maps.LatLng(latitude, longitude));
};

//코스 마커 그리기
const addCourseMarker = (course) => {
  let markerImage = "/file/map_not_done.png";
  let markerSize = new kakao.maps.Size(24, 35);
  if (course.users_course_id) {
    markerImage = "/file/map_complete.jpg";
    markerSize = new kakao.maps.Size(40, 50);
  }

  const image1 = new kakao.maps.MarkerImage(markerImage, markerSize);
  const position1 = new kakao.maps.LatLng(course.course_latitude, course.course_longitude);
  new kakao.maps.Marker({
    map: map,
    position: position1,
    title: "영진",
    image: image1,
  });
};
/**
 * 코스 리스트 정보를 가지고 반복하며 마커 추가 함수를 호출합니다.
 */
const allCourserMarker = () => {
  for (let i = 0; i < courseListinfo.length; i++) {
    addCourseMarker(courseListinfo[i]);
  }
};

const clickCourseList = (e, courseId) => {
  if (clickCourseId !== courseId) {
    const courseWrap = document.querySelectorAll(".course");
    for (let i = 0; i < courseWrap.length; i++) {
      courseWrap[i].classList.remove("on");
    }
    e.currentTarget.classList.add("on");

    let courseLatitude;
    let courseLongitude;

    if (courseId === 0) {
      courseLatitude = userLatitue;
      courseLongitude = userLongitude;
    } else {
      let matchedCourse = courseListinfo.find((course) => course.course_id === courseId);
      courseLatitude = matchedCourse.course_latitude;
      courseLongitude = matchedCourse.course_longitude;
    }
    panTo(courseLatitude, courseLongitude);
    clickCourseId = courseId;
  }
};

// 현재 위치 감시 함수-> 위치정보를 가져오는 허락이 있으면 위치정보가 갱신된다
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
        allCourserMarker();
      }
      addUserMarker();
      if (clickCourseId === 0) {
        
        panTo(userLatitue, userLongitude);
      }
    });
  }
};

// drawMap(35.87556, 128.681821);

let courseListinfo = [];

//백엔드 서버로 코스정보 요청
const getCourseListFetch = async () => {
  const response = await fetch("/api/course");
  // console.log(response);

  const result = await response.json();
  // console.log(result);
  courseListinfo = result;
  console.log(courseListinfo);
  makeNavigationHtml();
  afterGetCourseList();
};

const makeNavigationHtml = () => {
  const courseWrap = document.getElementById("course-wrap");
  let html = "";
  for (let i = 0; i < courseListinfo.length; i++) {
    html += `<li class="course" onclick="clickCourseList(event, ${courseListinfo[i].course_id})">`;
    if (courseListinfo[i].users_course_id) {
      html += `<div class="mark-wrap"><img src="/file/complete.png" /></div>`;
    }
    html += ` <p>${courseListinfo[i].course_name}</p>`;
    html += `</li>`;
  }

  html += `<li id="myPosition" class="course on">나의위치</li>`;
  courseWrap.innerHTML = html;
};

//코스정보 받아온 다음 에 할일
const afterGetCourseList = () => {
  configurationLocationWatch();
};

getCourseListFetch();
