function parseQueryString(search) {
    if(search){
        return search.replace(/^\?/, '')
            .split('&')
            .map(function (pair) {
                return pair.split('=');
            })
            .reduce(function (obj, pair) {
                if (pair[0].trim()) {
                    obj[pair[0]] = pair[1];
                }

                return obj;
            }, {});
    } else {
        return {};
    }
}


export default {
    parseQueryString : parseQueryString
}