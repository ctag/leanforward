/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://www.wtfpl.net/ for more details. */

// ==UserScript==
// @name            leanforward
// @namespace       http://berocs.com
// @description     Fix Deviantart's SitBack page.
// @version         01.00.15
// @author          Christopher Bero
// @license         WTFPL http://www.wtfpl.net/
// @homepageURL
// @supportURL
// @resource        license https://raw.github.com/LouCypher/userscripts/master/licenses/WTFPL/LICENSE.txt
// @resource        cssMod data/sitback_mod.css
// @include         /.*justsitback\.deviantart\.com.*/
// @grant           GM_xmlhttpRequest
// @require         http://s.deviantart.com/styles/jms/lib/jquery/jquery-stable.js
// @run-at          document-idle
// ==/UserScript==

console.log("Running user script leanforward.");



if (typeof jQuery != 'undefined') {
    console.log("jQuery library is loaded!");
}else{
    console.log("jQuery library is not found!");
}

if (typeof window.jQuery != 'undefined') {
    console.log("window jQuery library is loaded!");
}else{
    console.log("window jQuery library is not found!");
}

if (typeof document.jQuery != 'undefined') {
    console.log("document jQuery library is loaded!");
}else{
    console.log("document jQuery library is not found!");
}

if (typeof unsafeWindow.jQuery != 'undefined') {
    console.log("unsafeWindow jQuery library is loaded!");
}else{
    console.log("unsafeWindow jQuery library is not found!");
}

//this.$ = this.jQuery = unsafeWindow.jQuery;

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
    type: "GET",
    crossDomain: true,
    dataType: 'json',
    success: function(xml) {
      arrLen = xml.responseData.feed.entries.length;
      console.log("Array Length: ", arrLen);
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
      console.log('Unable to load feed, Incorrect path or invalid feed');
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
  imageLoad.css({
    "max-width": "100%",
    "max-height": "100%",
    "display": "none"
  });
  imageDisp.css({
    "max-width": "100%",
    "max-height": "100%"
  });
}

function displayNext() {
  console.log("Setting image to: ", imageSet[imageIndex]);
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

var reqJson;

function transferComplete(data) {
  console.log("transfer complete data: ", data.responseText);
  var reg = /<media:content url=\"(.*)\" height/mg; // gross, I know.
  var match = reg.exec(data.responseText);
  while (match !== null) {
    imageSet.push(match[1]);
    match = reg.exec(data.responseText);
  }
  arrLen = imageSet.length;
  console.log("Images: ", imageSet);
  setupImage();
  timerID = window.setInterval(displayNext, 5000);
}

function transferFailed(event) {
  console.log("error: ", this, event);
}

// var oReq = new XMLHttpRequest({
//   method: "GET",
//   url: rssUrl,
//   onload: transferComplete,
//   onerror: transferFailed
// });
//
// oReq.addEventListener("load", transferComplete);
// oReq.addEventListener("error", transferFailed);
// oReq.open("GET", rssUrl);
// oReq.send();

//console.log("CSS: ", cssMod);

GM_xmlhttpRequest({
  method: "GET",
  url: rssUrl,
  onload: transferComplete,
  onerror: transferFailed
});
