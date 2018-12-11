/**
 * Copyright (c) 2017-present, Liu Jinyong
 * All rights reserved.
 *
 * https://github.com/huanxsd/MeiTuan
 * @flow
 *
 * change by liqiang  2018-9-11
 */



function contains(arr : Array, obj : Object) {
    //判断数组是否包含某一个元素   ---  看看这个员工是否被选中
    var i = arr.length;
    while (i--) {
        if (arr[i].USER_CODE === obj.USER_CODE) {
            return true;
        }
    }
    return false;
}


module.exports = {
    contains: contains,
}
