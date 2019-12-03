/**
 * 请求数据 ajax请求
 * @constructor
 */
function FetchHandler() {
    /**
     * 数据请求错误提示语
     * @type {{timeout: string, error: string, abort: string, parsererror: string}}
     */
    this.FETCH_TIPS = {
        timeout: '请求超时，请刷新重试',
        error: '服务器错误，请稍后再试',
        abort: '请求中止，请联系维护人员',
        parsererror: '解析错误，请联系开发维护人员'
    };
    /**
     * 数据请求错误提示
     * @param tipInfo 提示内容
     */
    this.fetchTips = function (tipInfo, showTime) {
        var classStr = 'fetch-pop';
        classStr += '-' + new Date().getTime();
        $('body').append('<div class="' + classStr + '" style="display: none;">' + tipInfo + '</div>');
        $('.' + classStr).css({
            'position': 'fixed',
            'top': '50%',
            'left': '50%',
            'transform': 'translate(-50%, -50%)',
            'width': '200px',
            'padding': '10px',
            'color': '#fff',
            'background': 'rgba(0,0,0,.8)',
            'fontSize': '14px',
            'textAlign': 'center',
            'borderRadius': '4px'
        }).show();
        setTimeout(function () {
            $('div').remove('.' + classStr);
        }, showTime || 3000);
    };
    /**
     * ajax请求
     * @param queryData include url|String, queryData|Object, type|GET/POST, dataType|json/jsonp, timeout|Number
     * @param cb
     */
    this.fetch = function (queryData, cb) {
        var _this = this;
        $.ajax({
            url: queryData.url,
            data: queryData.data,
            type: queryData.type || 'GET',
            dataType: queryData.dataType || 'json',
            timeout: queryData.timeout || 8000,
            success: function (data) {
                if ((data || parseInt(data.code) === 0) && (cb && typeof cb === 'function')) {
                    cb(data);
                } else {
                    console.log(data);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.responseText) {
                    _this.fetchTips(jqXHR.responseText);
                } else if (textStatus) {
                    _this.fetchTips(_this.FETCH_TIPS[textStatus])
                } else if (errorThrown) {
                    _this.fetchTips(errorThrown);
                }
            }
        })
    }
}

var fetchData = new FetchHandler();