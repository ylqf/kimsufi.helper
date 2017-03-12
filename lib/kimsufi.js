;
(function($, root) {
    var models = [
    { "id": "160sk1", "title": "KS-1", "cpu": "Atom™ N2800 / Atom™ D425", "ram": "2 GB", "disk": "500 GB", "network": "100 Mbps", "price": "€ 4.99" , "type":"ks" }, 
    { "id": "160sk2", "title": "KS-2A", "cpu": "Atom™ N2800", "ram": "4 GB", "disk": "1 TB", "network": "100 Mbps", "price": "€ 9.99" , "type":"ks"}, 
    { "id": "160sk21", "title": "KS-2B", "cpu": "Atom™ N2800", "ram": "4 GB", "disk": "40 GBSSD", "network": "100 Mbps", "price": "€ 9.99" , "type":"ks"}, 
    { "id": "160sk22", "title": "KS-2C" , "type":"ks"}, 
    { "id": "160sk23", "title": "KS-2D", "cpu": "Atom™ N2800", "ram": "4 GB", "disk": "80 GBSSD", "network": "100 Mbps", "price": "€ 11.99" , "type":"ks"}, 
    { "id": "161sk2", "title": "KS-2E", "cpu": "Atom™ N2800", "ram": "4 GB", "disk": "2 TB", "network": "100 Mbps", "price": "€ 14.99" , "type":"ks"}, 
    { "id": "160sk3", "title": "KS-3A", "cpu": "AMD Opteron 4122", "ram": "16 GB", "disk": "2 TB", "network": "100 Mbps", "price": "€ 19.99" , "type":"ks"}, 
    { "id": "160sk31", "title": "KS-3B", "cpu": "Core™ i5-750", "ram": "16 GB", "disk": "2 TB", "network": "100 Mbps", "price": "€ 19.99" , "type":"ks"}, 
    { "id": "160sk32", "title": "KS-3C", "cpu": "Core™ i3-2130/3240", "ram": "8 GB", "disk": "2 TB", "network": "100 Mbps", "price": "€ 16.99" , "type":"ks"}, 
    { "id": "160sk4", "title": "KS-4A", "cpu": "Core™ i7-920", "ram": "16 GB", "disk": "2 TB", "network": "100 Mbps", "price": "€ 21.99" , "type":"ks"}, 
    { "id": "160sk41", "title": "KS-4B" , "type":"ks"}, 
    { "id": "160sk42", "title": "KS-4C", "cpu": "Core™ i5-2300", "ram": "16 GB", "disk": "2 TB", "network": "100 Mbps", "price": "€ 21.99" , "type":"ks"}, 
    { "id": "160sk5", "title": "KS-5", "cpu": "Xeon 2 x E5504", "ram": "16 GBECC ", "disk": "2 TB", "network": "100 Mbps", "price": "€ 24.99" , "type":"ks"}, 
    { "id": "160sk6", "title": "KS-6" , "type":"ks"},
        { "id": "162sk2", "title": "KS-2E 特价", "cpu": "Atom™ N2800", "ram": "4 GB", "disk": "2 TB", "network": "100 Mbps", "price": "€ ?" , "type":"ks"},
        { "id": "162sk32", "title": "KS-3C 特价", "cpu": "Core™ i3-2130/3240", "ram": "8 GB", "disk": "2 TB", "network": "100 Mbps", "price": "€ 8.99" , "type":"ks"},
        { "id": "162sk42", "title": "KS-4C 特价", "cpu": "Core™ i5-2300", "ram": "16 GB", "disk": "2 TB", "network": "100 Mbps", "price": "€ 10.99" , "type":"ks"},
        { "id": "728", "title": "XC 1701.1 7欧 HDD", "cpu": "Intel C2750 2.40GHz", "ram": "8 GB", "disk": "1 TB", "network": "1 Gbps", "price": "€ 6.99", "type": "online" },
        { "id": "774", "title": "XC 1701.1 7欧 SSD", "cpu": "Intel C2750 2.40GHz", "ram": "8 GB", "disk": "128 GB SSD", "network": "1 Gbps", "price": "€ 6.99", "type": "online" },
        { "id": "714", "title": "LT 1701.3 17欧", "cpu": "Intel E3 1230v2", "ram": "16 GB", "disk": "2 x 1 TB", "network": "1 Gbps", "price": "€ 16.99", "type": "online" },
        { "id": "747", "title": "LT 1701.1 20欧", "cpu": "Intel E3 1230v3", "ram": "32 GB", "disk": "2 x 1 TB", "network": "1 Gbps", "price": "€ 19.99", "type": "online" },
        { "id": "756", "title": "ENT 1701.1", "cpu": "2 x Intel E5 2620v2", "ram": "128 GB", "disk": "2 x 600 GB SAS", "network": "1 Gbps", "price": "€ 84.99", "type": "online" },
        { "id": "250", "title": "WSI 10刀(Intel)", "cpu": "2 x Intel Core2Duo", "ram": "4 GB DDR2", "disk": "250GB SATA", "network": "100 Mbps", "price": "$ 10", "type": "wsi" },
        { "id": "265", "title": "WSI 10刀(AMD)", "cpu": "2 x AMD 248", "ram": "4 GB DDR2", "disk": "250GB SATA", "network": "100 Mbps", "price": "$ 10", "type": "wsi" },
        { "id": "256", "title": "WSI 30刀", "cpu": "2 x Intel i3-540", "ram": "8 GB DDR3", "disk": "500GB SATA", "network": "100 Mbps", "price": "$ 20", "type": "wsi" },
    ];

    var filters = {
        
        //本地接口
        'local': function(id, type, callback) {

            var url = '?hard=' + id + '&type=' + type + '&r=' + Date.now();
            $.ajax({
                url: url,
                success: function(resp) {
                    callback && callback(resp.status)

                },
                error: function() {
                    callback && callback(false);
                }
            })
        }
    }

    var utils = {
        s2t: function(v) {
            v = Math.floor(v / 1000);
            var h = utils.zero(Math.floor(v / 3600)),
                m = utils.zero(Math.floor((v - h * 3600) / 60)),
                s = utils.zero(v % 60);
            return [h, m, s].join(":");
        },
        zero: function(v) {
            return (v < 10 ? "0" : "") + v
        },
        copy: function(v) {
            var obj = {}
            for (var i in v) {
                obj[i] = v[i];
            }
            return obj;
        }

    }

    function kimsufi() {
        this.handlers = {};
        this.models = [];
        this.tick = 5000;
        this.process();
        this.filter = filters['default'];
        this.models_hash = {};
        for (var i = 0, l = models.length; i < l; i++) {
            this.models_hash[models[i].id] = models[i];
        }
    }

    kimsufi.prototype.add = function(m) {
        if (typeof(m) == 'string') m = [m];

        for (var i = 0, l = m.length; i < l; i++) {
            if (this.find(m[i])) {
                alert('已存在');
            } else {
                var hit = this.models_hash[m[i]];
                if (hit) {
                    var model = {
                        "id": hit.id,
                        "data": hit,
                        "status": 'loading',
                        "status_str": 'loading',
                        "start_time": new Date().getTime(),
                        "last_time": new Date().getTime(),
                        "type": hit.type,
                        "timer": null
                    }

                    this.models.push(model);
                    this.check(model.id);
                    this.fire('add', model);
                }
            }

        }

        return this;
    }

    kimsufi.prototype.remove = function(id) {
        var index = this.find(id, true);
        if (index != -1) {
            var model = this.models[index];
            if (model.timer) window.clearTimeout(model.timer);
            this.models.splice(index, 1);
            this.fire('remove', utils.copy(model));
        }

    }

    kimsufi.prototype.find = function(id, index) {
        for (var i = 0, l = this.models.length; i < l; i++) {
            if (this.models[i].id == id) {
                return index ? i : this.models[i];
            }
        }
        return index ? -1 : null;
    }

    kimsufi.prototype.process = function() {
        var local = this;
        if (this.models) {
            this.fire('update', this.getStatus());
        }

        window.setTimeout(function() {
            local.process();
        }, 1000);
    }

    kimsufi.prototype.check = function(id , type) {
        var local = this;

        if (this.filter) {
            this.filter(id , type, function(status) {
                local.setStatus(id, status);
            })
        }

    }

    kimsufi.prototype.getStatus = function(id) {
        var models = id ? [this.find(id)] : this.models;
        for (var i = 0, l = models.length; i < l; i++) {
            models[i].uptime = Math.round((new Date().getTime() - models[i].last_time) / 1000);
            models[i].status_str = models[i].status == 'loading' ? 'loading' : (models[i].status ? '有货' : '缺货');

        }

        return this.models;
    }

    kimsufi.prototype.setStatus = function(id, status) {
        var model = this.find(id),
            local = this;
        if (model) {
            var last_status = model.status;
            var type = model.type;
            model.status = status;
            model.last_time = new Date().getTime();
            model.timer = setTimeout(function() {
                local.check(id , type);
            }, this.tick);
            this.fire('update', this.getStatus());

            if (model.status /* && last_status !== true*/ ) {
                this.fire('hit', model);
            }
        }
    }

    kimsufi.prototype.setFilter = function(f) {
        if (typeof(f) == 'string' && filters[f]) {
            this.filter = filters[f];
        } else if (typeof(f) == 'function') {
            this.filter = f;
        }
        return this;
    }

    kimsufi.prototype.setTick = function(v) {
        this.tick = parseInt(v);
    }

    kimsufi.prototype.getModels = function() {
        var ret = [];
        for (var i = 0; i < this.models.length; i++) {
            ret.push(this.models[i].id);
        }
        return ret;
    }

    kimsufi.prototype.on = function(evt, callback) {
        if (!this.handlers[evt]) this.handlers[evt] = [];
        this.handlers[evt].push(callback);
        return this;
    }

    kimsufi.prototype.fire = function(evt, data) {
        if (this.handlers[evt]) {
            var handlers = this.handlers[evt];

            for (var i = 0; i < handlers.length; i++) {
                handlers[i].call(this, data);
            }

        }
    }

    root.kimsufi = function() {
        return new kimsufi();
    }

    root.kimsufi.models = models;

    root.kimsufi.getOrderUrl = function(id) {
        return 'https://www.kimsufi.com/en/order/kimsufi.cgi?hard=' + id;
    }

    //用于注册第三方检测方式
    root.kimsufi.register = function(name, filter) {
        if (name && name != 'default' && name != 'local' && name != 'api') {
            filters[name] = filter;
        }
    }
}(jQuery, this));
