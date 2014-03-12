AHAH.Example.MVC4
=================

###AHAH using ASP.net  MVC with ActionFilters + XMLHttpRequest + History API 



####AHAH (Async HTML and HTTP)
http://microformats.org/wiki/rest/ahah

####WHY?
   With most modern pages, the bulk of the payload is all the javascript libraries and CSS that not only needs to be fetched from a server but parsed and executed in the browser. This elegantly simple technique allows you to only change the page content that is actually different.  You can swap out all visible content or just the content between your header and footer, either way you get big savings in not loading and processing all the javascipt and CSS for every "page load".  You can also load HTML chunks into nested containers by specifying a data-container value.

#####What you need 
   Simple example outlining how to optionally employ AHAH based views in an MVC application.  All that is needed is to apply an attribute to each action method you want to use AHAH with and a small javascript file.  

#####Want improved UX with a modern browser but need to support the oldies too?
   One of the nice features of using this implementation is older browsers will simply request pages as normal, so no need to try and back-fill the history API with shims and hash hacks.


