# leanforward

Access DeviantArt's "Sit Back" page without Flash.

## What is this

Lean Forward started out as a Firefox extension, but I quickly learned that the task was better suited as a GreaseMonkey user script. So now it's that.

The idea is to allow people the same functionality on DeviantArt's sitback page without having to install Flash.

## Install

Just, uh, click on the userscript and download from 'raw' display mode?

## Dev Notes

### CORS

Had a lot of trouble working with cross site requests, which is a pain because I want access to an RSS feed from a different subdomain.

Anyway, right now I use GreaseMonkey's GM_xmlhttpRequest workaround that ignores CORS headers (which makes me ask, what good are they?), but ALSO places the user script in a sandbox..

### jQuery and DWait

Without including the GM_xmlhttpRequest, I could just work from the jQuery present, but once the userscript has been sandboxed I couldn't find a way to do that without invoking the unsafeWindow object.

I spent a lot of time trying to track down the origin of 'jms/lib/jquery/jquery.current.js' that's included with DWait from the sitback page. Eventually I found the location of [DWait](http://s.deviantart.com/styles/jms/dwait/dwait.js) from [this blog post](http://dt.deviantart.com/journal/DWait-and-Dependencies-222869979), and then worked backwards to find the link to DeviantArt's [jQuery package](http://s.deviantart.com/styles/jms/lib/jquery/jquery-stable.js). I wanted to use DWait.ready() from my user script, but it doesn't seem to work when not invoked directly from the s.deviantart subdomain, so now I'm not sure why I'm using this instead of a regular CDN copy of jQuery.

