export const findIndex = (arrayObj, keyStr, valueStr) => {
    let indexFind = -1;
    arrayObj.some((elem, index) => {
        indexFind = index;
        return elem.keyStr === valueStr
    })
    return indexFind
}

export const getParams = () => {
    let seachStr = location.search.replace(/^\?/, '');
    if (!seachStr) return;
    let searchArr = seachStr.split('&');
    let resultObj = {};
    searchArr.forEach((item) => {
        var itemArr = item.split('=');
        resultObj[itemArr[0]] = itemArr[1];
    })
    return resultObj;
}