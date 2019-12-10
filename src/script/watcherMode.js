//观察者模式
var Observer = (function () {
    var _message = {};
    return {
        on: function (type, fn) { // 方法挂载
            if (typeof _message[type] === "undefined") {
                _message[type] = [fn];
            } else {
                _message[type].push(fn);
            }
        },
        subscribe: function (type, args) { // 方法触发
            if (!(_message[type])) return;
            var events = {
                type: type,
                args: args || {}
            };
            for (var i = 0; i < _message[type].length; i++) {
                _message[type][i].call(this, events);
            }
        },
        off: function (type, fn) { // 方法卸载
            if (_message[type] instanceof Array) {
                var i = _message[type].length - 1;
                for (; i >= 0; i--) {
                    _message[type][i] === fn && _message.splice(i, 1);
                }
            }
        }
    }
}());