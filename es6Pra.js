var arr = [1, [[2, 3], 4], [5, 6]];
var flat = function* (a) {
    for (var i = 0; i < a.length; i++) {
        var item = a[i];
        if (typeof item !== 'number') {
            yield* flat(item);
        } else {
            yield item
        }
    }
};
for (var f of flat(arr)) {
    console.log(f);
}


