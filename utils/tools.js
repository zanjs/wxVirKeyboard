function tools(key) {
    //唯一的key值，避免本地缓存，通知事件名称重复
    this.unique_key = key;
    // 保留当前页面，跳转到应用内的某个页面
    this.navUrl = function (args) {
        var self = this;
        var id = args.currentTarget.id,
            url = '../login/login?id=' + id;
        wx.navigateTo({
            url: url
        })
    }
    //关闭当前页面，跳转到应用内的某个页面。
    this.openUrl = function (args) {
        var self = this;
        var id = args.currentTarget.id,
            url = '../login/login?id=' + id;
        wx.redirectTo({
            url: url
        })
    }
    // 关闭当前页面，返回上一页面或多级页面。
    this.closeUrl = function (args) {
        wx.navigateBack({
            delta: args
        })
    }
    // 获取和设置本地缓存
    // 设置 storage('key','value');
    // 获取 var t=storage('key') ;
    this.storage = function () {
        var self = this;
        try {
            if (arguments.length === 1) {
                //说明是get
                var value = wx.getStorageSync(self.unique_key + arguments[0]);
                return value;
            } else if (arguments.length === 2) {
                //说明是set
                wx.setStorageSync(self.unique_key + arguments[0], arguments[1]);
            }
        } catch (e) {
            console.log("getStorageSync本地存储错误" + e.stack);
        }
    };
    // 删除本地缓存
    // removeStorage(); //删除所有缓存
    // removeStorage('key'); //删除确定的缓存
    this.removeStore = function (key) {
        var self = this;
        try {
        if (key) {
            //有传入具体的key
            wx.removeStorageSync(self.unique_key + key)
        } else {
            //没有传入key，默认删除本应用的缓存
            //返回值是数组，包含所有的key
            var res = wx.getStorageInfoSync();
            var keys = res.keys;
            // keys=['jzb','ayt','dky'];
            var i = 0, length = keys.length;
            //为了避免删除其他应用的缓存，所以先遍历所有的key
            for (i; i < length; i++) {
                var keyname = keys[i];//keyname=jzb ,self.unique_key=jzb
                if (keyname.indexOf(self.unique_key) == 0) {
                    //找到了，从头匹配的key，说明是本应用的缓存
                    wx.removeStorageSync(keyname);
                }
            }
        }
        } catch (e) {
            console.log("removeStore本地存储错误" + e.stack);
        }
    };
}

module.exports = new tools('jzb');