
Array.prototype.where = function (predicate) {
    if (predicate == null || typeof (predicate) !== 'function') throw new Error('predicate should');
    var result = [];
    for (var i = 0; i < this.length; i++) {
        if (predicate(this[i], i)) result.push(this[i]);
    }
    return result;
};

Array.prototype.select = function (selector) {
    if (selector == null || typeof (selector) !== 'function') throw new Error('selector should');
    var result = [];
    for (var i = 0; i < this.length; i++) {
        result.push(selector(this[i]));
    }
    return result;
};

guid = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}