// Oh boy, here I go writing javascript again

// Hush
/* jshint multistr: true */

// Variables
var divContent = document.getElementById("sitbackcontent");
var imageLoad;
var imageDisp;
var imageSet = [];
var arrLen = 0;
var imageIndex = 0;
var timerID;

// Throw something on the page.
divContent.textContent = "Oh, hello there! Give us just a second to fetch your images...";

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return (false);
}

function getRSS(rssURL) {
  $.ajax({
    url: rssURL,
    dataType: 'json',
    success: function(xml) {
      arrLen = xml.responseData.feed.entries.length;
      //console.log("Array Length: ", arrLen);
      for (var i = 0; i < arrLen; i++) {
        imageSet.push(xml.responseData.feed.entries[i].mediaGroups[0].contents[0].url);
        //console.log("Image: ", imageSet[i]);
      }
      document.getElementById("sitbackcontent").textContent = "";
      setupImage();
      timerID = window.setInterval(displayNext, 5000);
      //displayNext();
    },
    error: function(jqXHR, textStatus, errorThrown) {
      // console.log('Unable to load feed, Incorrect path or invalid feed');
      // console.log('URL: ', googleUrl);
      // console.log("Returned text: ", textStatus);
    }
  });
}

function setupImage() {
  document.getElementById("sitbackcontent").textContent = "";
  var img1 = document.createElement("img");
  img1.id = "img_load";
  img1.className = "img_loading";
  document.getElementById("sitbackcontent").appendChild(img1);
  var img2 = document.createElement("img");
  img2.id = "img_disp";
  img2.className = "img_displayed";
  document.getElementById("sitbackcontent").appendChild(img2);

  imageLoad = $("#img_load");
  imageDisp = $("#img_disp");
}

function displayNext() {
  //console.log("Setting image to: ", imageSet[imageIndex]);
  imageLoad.attr('src', imageSet[imageIndex]);
  imageDisp.attr('src', imageSet[imageIndex + 1]);
  imageIndex++;
  if (imageIndex >= (arrLen - 1)) {
    imageIndex = 0;
  }
}

// Setup the RSS fetch
queryData = getQueryVariable('rssQuery');
rssUrl = 'http://backend.deviantart.com/rss.xml?type=deviation&q=' + queryData;
googleUrl = document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=-1&q=' + encodeURIComponent(rssUrl);
//getRSS(googleUrl);


// https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest
var oReq = new XMLHttpRequest();
var reqJson;
function transferComplete(event) {
  //console.log("data: ", this.responseText, event);
  var reg = /<media:content url=\"(.*)\" height/mg; // gross, I know.
  var match = reg.exec(this.responseText);
  while (match !== null) {
    imageSet.push(match[1]);
    match = reg.exec(this.responseText);
  }
  arrLen = imageSet.length;
  //console.log("data: ", imageSet);
  setupImage();
  timerID = window.setInterval(displayNext, 5000);
}
function transferFailed(event) {
  console.log("error: ", this, event);
}
// oReq.addEventListener("load", transferComplete);
// oReq.addEventListener("error", transferFailed);
// oReq.open("GET", rssUrl);
// oReq.send();


// DWait.ready("jms/lib/jquery/jquery.current.js",function(){
//   console.log("HERE");
// });

if (typeof jQuery != 'undefined') {
    alert("jQuery library is loaded!");
}else{
    alert("jQuery library is not found!");
}
