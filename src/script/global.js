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

function RatioHandle() {
    /**
     * 控制一个字符串可以显示的行数
     * string 源字符串
     * words_per_line 每行显示个数
     **/
    this.discernRation = () => {
        var ratio = 0,
            screen = window.screen,
            ua = navigator.userAgent.toLowerCase();
        if (typeof window.devicePixelRatio !== 'undefined') {
            ratio = window.devicePixelRatio;
        } else if (ua.indexOf('msie') > -1) {
            if (screen.deviceXDPI && screen.logicalXDPI) {
                ratio = screen.logicalXDPI / screen.deviceXDPI
            }
        } else if (typeof window.outerWidth !== "undefined" && typeof window.innerWidth !== "undefined") {
            ratio = window.outerWidth / window.innerWidth;
        }

        if (ratio) {
            ratio = Math.round(ratio * 100);
        }
        return ratio;
    }
    /**
     * 根据展示比例展示提示弹窗
     * @param ratio
     * @returns {boolean}
     */
    this.showRatioPop = function (ratio) {
        var canNotice = localStorage.getItem('ratioDoNotNotice');
        if (!ratio || ratio === 100 || canNotice) return false;
        if (ratio) {
            var ratioPop = document.createElement('div');
            ratioPop.setAttribute('id', 'ratio-pop');
            var html = '<div class="ratio-header">' +
                '<img class="close-ratio" src="#">' + // 关闭按钮图片地址
                '</div>' +
                '<div class="ratio-notice">' +
                '<div class="notice-main">页面缩放比例不正确</div>' +
                '<div class="notice-sub"><span>可能会影响某些功能的正常使用</span><br>' +
                '1、请尝试调整浏览器缩放比例为 100% （快捷键 ctrl + O）<br>' +
                '2、请尝试调整系统显示比例为 100% (控制面板 -> 显示 设置 100%)<br>' +
                '</div><div class="never-notice">不再提醒</div></div>';
            ratioPop.innerHTML = html;
            document.appendChild(ratioPop);
            // 关闭弹窗
            var closeBtn = document.querySelector('.close-ration');
            closeBtn.addEventListener('click', () => {
                ratioPop.style.display = 'none';
            }, false);
            // 关闭弹窗，不再提醒
            var neverNotice = document.querySelector('.never-notice');
            neverNotice.addEventListener('click', () => {
                localStorage.setItem('ratioDoNotNotice', true);
                ratioPop.style.display = 'none';
            }, false);
        }
    }
}

export const ratioPop = new RatioHandle()