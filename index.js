/**
 * LeanForward - Because Flashplayer isn't worth it.
 * By: Christopher Bero
 */

// SDK Variables
var self = require('sdk/self');
var pageMod = require('sdk/page-mod');

pageMod.PageMod({
  include: /.*justsitback\.deviantart\.com.*/,
  //include: /http:\/\/www\.deviantart\.com.*/,
  contentScriptFile: [
    self.data.url("jquery-2.1.4.min.js"),
    self.data.url("sitback_mod.js")
  ],
  contentStyleFile: [
    self.data.url("sitback_mod.css")
  ]
});
