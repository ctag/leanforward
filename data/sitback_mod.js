// Oh boy, here I go writing javascript again

// Hush
/*jshint multistr: true */

// Variables
var divContent = $("#sitbackcontent");
var imageLoad;
var imageDisp;
var imageSet = [];
var arrLen = 0;
var imageIndex = 0;
var timerID;

// Like I know what I'm doing or something
console.log("Sitback Modifier loaded!");

// Throw something on the page.
divContent.html("Oh, hello there! Give us just a second to fetch your images...");

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
      console.log("Array Length: ", arrLen);
      for (var i = 0; i < arrLen; i++) {
        imageSet.push(xml.responseData.feed.entries[i].mediaGroups[0].contents[0].url);
        console.log("Image: ", imageSet[i]);
      }
      setupImage();
      timerID = window.setInterval(displayNext, 5000);
      //displayNext();
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log('Unable to load feed, Incorrect path or invalid feed');
      console.log('URL: ', googleUrl);
      console.log("Returned text: ", textStatus);
    }
  });
}

var styleText = '<style> \
#img_load { \
  max-height: 100%; \
  max-width: 100%; \
  z-index: 10; \
  display: none; \
} \
#img_disp { \
  max-height: 100%; \
  max-width: 100%; \
  z-index: 20; \
} \
</style>';

function setupImage() {
  divContent.html(styleText +
  '<img id="img_load"></img> <img id="img_disp"></img>');
  imageLoad = $("#img_load");
  imageDisp = $("#img_disp");
}

function displayNext() {
  //console.log("Setting image to: ", imageSet[imageIndex]);
  imageLoad.attr('src', imageSet[imageIndex]);
  imageDisp.attr('src', imageSet[imageIndex+1]);
  imageIndex++;
  if (imageIndex >= (arrLen-1)) {
    imageIndex = 0;
  }
}

// Setup the RSS fetch
queryData = getQueryVariable('rssQuery');
rssUrl = 'http://backend.deviantart.com/rss.xml?type=deviation&q=' + queryData;
googleUrl = document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=-1&q=' + encodeURIComponent(rssUrl);
getRSS(googleUrl);
