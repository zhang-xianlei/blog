export const findIndex = (arrayObj, keyStr, valueStr) => {
    let indexFind = -1;
    arrayObj.some((elem, index) => {
        indexFind = index;
        return elem.keyStr === valueStr
    })
    return indexFind
}

