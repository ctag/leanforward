/**
 * LeanForward - Because Flashplayer isn't worth it.
 * By: Christopher Bero
 */


// Live and Die-Rekt

// SDK Variables
var self = require('sdk/self');
var pageMod = require('sdk/page-mod');

// http://backend.deviantart.com/rss.xml?type=deviation&q=by%3Aspyed+sort%3Atime+meta%3Aall
// http://justsitback.deviantart.com/?title=&rssQuery=boost%3Apopular%20cyber
pageMod.PageMod({
  include: /.*justsitback\.deviantart\.com.*/,
  //include: /http:\/\/www\.deviantart\.com.*/,
  contentScriptFile: [
    self.data.url("jquery-2.1.4.min.js"),
    self.data.url("sitback_mod.js")
  ],
  onAttach: function () {
    //console.log("INJECTED.");
  }
});
