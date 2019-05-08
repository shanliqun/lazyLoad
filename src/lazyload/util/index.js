function checkVisible(node,offset=100,parent) {
    let parentNode = parent||document.documentElement;
    let {top,bottom} = node.getBoundingClientRect();
    let height = window.innerHeight||document.documentElement.clientHeight;
    let {top:parentTop,bottom:parentBottom} = parentNode.getBoundingClientRect();
    parentTop = Math.max(parentTop,0);
    parentBottom = Math.min(height,parentBottom);
    if(bottom+offset>=parentTop && top-offset<=parentBottom){
        return true;
    }else{
        return false;
    }
}

function getScrollParent(parent){
    if(!parent) return document.documentElement;
    let regexp = /(auto|scroll)/;
    while(parent){
        let {overflow} = window.getComputedStyle(parent);
        if(regexp.test(overflow)) return parent;
        parent = parent.parentNode;
    }
    return document.documentElement;
}

exports.checkVisible = checkVisible;
exports.getScrollParent = getScrollParent;