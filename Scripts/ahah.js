(function () {
    /*Used to track links that have already been processed*/
    var _activeLinks = [];
    /*Default link class to apply AHAH workflow*/
    var _ahahLinkClass = 'ahah';
    /*Optional container attribute to determine where link href's content is injected to*/
    var _ahahContainerDataAttrib = 'data-container';
    /*Default Id for injected content*/
    var _ahahDefaultContainer = 'content';

    function supportsHistoryAPI() {
        return !!(window.history && history.pushState);
    }

    function updateContent(state) {
        /*Not worrying about ActiveX XMLHttpRequest since all IE browsers 
        that support history API (IE>8) support the standard 'XMLHttpRequest'*/
        var req = new XMLHttpRequest();

        req.open('GET', state.href, false);
        req.setRequestHeader("AHAH", "true");
        req.send(null);
        if (req.status == 200) {
            var container = document.getElementById(state.container);
            if (container) {
                container.innerHTML = req.responseText;
                /*Check new content for links that may support the AHAH workflow*/
                initAhahLinks();
                return true;
            }
        }
        return false;
    }

    function addLinkClickHandler(link) {
        /*Not worrying older IE event hooking calls since all IE browsers
        that support history API (IE>8) support the standard 'addEventListener'*/
        link.addEventListener("click", function (e) {
            var state = {
                href: link.href,
                /*Try to use a defined container if specified, otherwise use the default*/
                container: link.getAttribute(_ahahContainerDataAttrib) || _ahahDefaultContainer 
            };

            if (updateContent(state)) {
                /*Content was updated so update the history API and prevent normal navigation*/
                history.pushState(state, null, state.href);
                e.preventDefault();
            }
        }, true);
    }

    function initAhahLinks() {
        /* Find all links with the desired class*/
        var links = document.getElementsByClassName(_ahahLinkClass);
        if (links) {

            for (var i = 0; i < links.length; i++) {
                /*If we have not already processed this link,
                then add a click handler and track it to prevent subsequent processing*/
                if (_activeLinks.indexOf(links[i]) < 0) {
                   
                    addLinkClickHandler(links[i]);
                    _activeLinks.push(links[i]);
                }
            }
        }
    }

    window.onload = function () {
        /*Bail if we are in an old browser*/
        if (!supportsHistoryAPI()) {
            return;
        }
        initAhahLinks();
        window.setTimeout(function () {
            window.addEventListener("popstate", function (e) {
               
                if (e.state) {
                    /*We came from an AHAH navigation, so revert using AHAH*/
                    updateContent(e.state);
                } else {
                    /*State has not been set previously so load current location*/
                    var state = {
                        href: location.href,
                        container: _ahahDefaultContainer
                    };
                    updateContent(state);
                }
            }, false);
        }, 1);
    }

})();
