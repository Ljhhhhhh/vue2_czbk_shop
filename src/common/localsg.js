//负责操作localstorage
/**
 * 获取数据
 * 设置和追加数据
 * 移除数据
 */
export const KEY = 'goodsdata';
export var valueObj = {
    goodsid: 0,
    count: 0
};
export function setItem(value) {
    var jsonString = localStorage.getItem(KEY);
    jsonString = jsonString || '[]';
    var arr = JSON.parse(jsonString);
    arr.push(value);
    localStorage.setItem(KEY, JSON.stringify(arr));
}

export function getItem(value) {
    var jsonString = localStorage.getItem(KEY);
    jsonString = jsonString || '[]';
    return JSON.parse(jsonString);
}

export function removeItem(goodsid) {
    var arr = getItem();
    for (var i = arr.length - 1; i >= 0; i--) {

        console.log(arr[i]);
        if (arr[i].goodsid == goodsid) {
            arr.splice(i, 1);
        }
    }
    localStorage.setItem(KEY, JSON.stringify(arr));
}

export function getgoodsObject() {
    var arr = getItem();
    var resObj = {};
    for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        if (!resObj[item.goodsid]) {
            resObj[item.goodsid] = item.count
        } else {
            var count = resObj[item.goodsid];
            resObj[item.goodsid] = count + item.count;
        }
    }
    return resObj;
}

export function updateDate(obj) {
    var arr = getItem();
    var count = 1;
    if (obj.type == 'add') {
        arr.push({
            goodsid: obj.goodsid,
            count: count
        });
    } else {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].goodsid == obj.goodsid) {
                if (arr[i].count > 1) {
                    arr[i].count = arr[i].count - 1;
                    break;
                } else {
                    arr.splice(i, 1);
                    break;
                }
            }
        }
    }
    localStorage.setItem(KEY, JSON.stringify(arr));
}