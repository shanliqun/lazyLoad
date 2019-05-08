let inNode = (typeof window === ''+void 0 );

var commonGlobal = {};
commonGlobal.getGlobal = function () {
    return (typeof window === ''+void 0 ) ? global : (window.global || {});
};

commonGlobal.query = function (req) {
    if(inNode) {
        return req.query;
    } else {
        return req.location.search.replace(/^\?/, '').split('&').reduce(function (ret, pair) {
            pair = pair.split('=');
            ret[pair[0]] = pair[1];
            return ret;
        }, {});
    }
}

commonGlobal.getUA = function (req) {
    if(inNode) {
        return req.headers['user-agent'].toLowerCase();
    } else {
        return window.navigator.userAgent.toLowerCase();
    }
}

commonGlobal.getCookies = function (req) {
    let cookieobj;
    let Cookies = {};
    if(inNode) {
        cookieobj = req.headers.cookie;
    } else {
        cookieobj =  document.cookie;
    }

    if(cookieobj) {
        cookieobj.split(';').forEach(l=>{
            var arr = l.split('=')
            var parts = arr.splice(0,1);
            Cookies[parts[0].trim()] = (arr.join("=") || '').trim();

        });
    }
    return Cookies;
}


export default commonGlobal;