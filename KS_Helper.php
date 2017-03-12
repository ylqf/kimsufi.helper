<?php
    /****************************************
     *  VERSION : v.20170312
     *  DATE    : 2016-10-06
     *
     *  Copyright (C) 201x (reruin#gmail.com) 
     *
     *  This is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the 
     *  Free Software Foundation, either version 2 of the License, or(at your option) any later version.
     *  
     *  This is distributed in the hope that it will be useful,but WITHOUT ANY WARRANTY;  without even the implied warranty of MERCHANTABILITY      
     *  or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details. 
     *
     *  You should have received a copy of the GNU General Public License along with Foobar. If not, see <http://www.gnu.org/licenses/>.
     *
     *****************************************/

    function notify(){

    }

    function checkOnline($id){
        $resp = file_get_contents("https://www.online.net/en/winter-2017/sales");
        $start = strpos($resp , $id);
        $end = strpos($resp , '</form>',$start);
        $m = substr($resp , $start , $end - $start);
        header('Content-type: application/json');

        if($m && strpos($m , 'disabled') === false ){
            echo('{"status":true}');
        }
        else{
            echo('{"status":false}');
        }
        exit();
    }

    function checkKimsufi($id){
        $resp = file_get_contents( "https://www.kimsufi.com/en/order/kimsufi.cgi?hard=" . $id);
        $status = array(
            'status'=> strpos($resp , 'icon-availability') !== false
        );
        header('Content-type: application/json');
        echo( json_encode($status));
        exit();
    }

    function checkWSI($id){
        $resp = file_get_contents( "https://www.wholesaleinternet.net/out-of-stock/?id=" . $id);
        $status = array(
            'status'=> strpos($resp , 'out of stock') === false
        );
        header('Content-type: application/json');
        echo( json_encode($status));
        exit();
    }

    if(!empty($_GET['hard'])){
        $id = $_GET['hard'];
        if( $_GET['type'] == 'online'){
            checkOnline($id);
        }
        else if($_GET['type'] == 'wsi'){
            checkWSI($id);
        }else{
            checkKimsufi($id);
        }
        
    }
?>

<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>KS Helper</title>
    <style type="text/css">
    body {
        background: #ffffff;
        margin: 0;
        color: #6c6c6c;
        font-family: "microsoft yahei", simhei;
        font-size: 12px;
    }
    
    ul,
    ol,
    li,
    dl,
    dd,
    dt,
    p,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    form,
    input {
        margin: 0;
        padding: 0;
    }
    
    img,
    fieldset {
        border: none;
    }
    
    li {
        list-style: none;
    }
    
    select,
    input,
    img {
        vertical-align: middle;
    }
    
    select,
    input,
    textarea {
        font-size: 12px;
    }
    
    a {
        color: #010101;
        text-decoration: none;
    }
    
    a:hover {
        color: #4c7d08;
        text-decoration: underline;
    }
    
    div,
    ul,
    dl {
        zoom: 1;
    }
    
    div:after,
    ul:after,
    dl:after {
        content: "";
        display: block;
        clear: both;
        height: 0;
        visibility: hidden;
    }
    
    #foot {
        position: absolute;
        left: 0;
        bottom: 0;
        border-top: 1px solid #ddd;
        width: 100%;
    }

    #foot div{ display:block; float:left ;padding:10px 20px;}

    
    /* 其他 */
    #all{
        padding:12px;overflow:auto;
    }
    .item {
        position:relative;
        height: 20px;
        padding: 8px;
        font-size: 11px;
        margin-bottom: 0px;
        border-bottom: #ececec 1px solid;
        /*#9ed8ec*/
        cursor: default;
    }
        
    .item span {
        width: 75px;
        display: block;
        float: left;
    }
    

    .item span{ width:100px; }
    .item span.w1 {
        width: 60px;
    }

    .item span.w2{
        width: 150px; 
        color:#333;
    }
    .item span.w3{
        width: 120px; 
    }

    .item span .uptime{ padding-left:8px; font-size: 9px; }
    .item span .status{ width:42px; }
    .item span.op{
        position:absolute;right:0;
        text-align:right;width:150px !important;
    }
    .item span.op a{ padding: 5px;}
    .item.head{
        border-bottom: #9ed8ec 2px solid;
    }

    .availabe {
        background: #d1f1c2;
    }

    audio{
        opacity: 0;width:1;height:1px;position: absolute;z-index:0;
    }
    </style>
</head>

<body>
    <audio preload loop id="clock">
        <source src="http://www.naobiao.com/web_system/naobiao_com_www/img/music/ka_nong_meng_huan/1.ogg" type="audio/ogg">
        <source src="http://www.naobiao.com/web_system/naobiao_com_www/img/music/ka_nong_meng_huan/1.mp3" type="audio/mpeg">
    </audio>
    <div id="all">
        <div class="head item">
            <span>类型(Model)</span>
            <span class="w2">状态(Status)</span>
            <span class="w3">CPU</span>
            <!--
            <span class="w3">核心(Cores/Threads)</span>
            <span>主频(Freq.)</span>
            -->
            <span>内存(RAM)</span>
            <span>磁盘(Disk)</span>
            <span>网络(Network)</span>
            <span class="w3">价格(Price/month)</span>
        </div>
    </div>

    <div id="foot">
        <div class="models"></div>

        <div class="tick">
            <span>刷新时间 </span>
            <select>
                <option value='0'>立即</option>
                <option value='1000'>1秒</option>
                <option value='5000' selected>5秒</option>
                <option value='10000'>10秒</option>
            </select>
        </div>

        <div class="filter">
            <span>方式 </span>
            <select>
                <option value='local'>默认</option>
                <!-- <option value='api'>官方API</option> -->
            </select>
        </div>

        <div class="help"><a href="#">帮助</a></div>

    </div>
    <script type="text/javascript" src='http://libs.baidu.com/jquery/1.9.1/jquery.min.js'></script>
    <script type="text/javascript" src='https://rawgit.com/reruin/kimsufi.helper/master/lib/kimsufi.js'></script>
    <script type="text/javascript">  
        $(function() {

            var store = window.localStorage;

            function template(str, data) {
                return str.replace(/\{ *([\w\.\_]+) *\}/g, function(str, key) {
                    var p = key.split('.');
                    var value;
                    for(var i=0; i<p.length;i++){
                        if(value === undefined) value = data;
                        value = value[p[i]];
                    }
                    if (value === undefined) {
                        console.log('No value provided for variable ' + str);
                        value = "{" + key + "}";
                    } else if (typeof value === 'function') {
                        value = value(data);
                    }
                    return value;
                })
            };

            function create_layout(app) {
                var tpl = "<option value ='{id}'>{title}</option>",
                    s = "";
                var list = kimsufi.models;
                for (var i = 0; i < list.length; i++) {
                    s += template(tpl, list[i]);
                }

                s = "添加&nbsp;<select>" + s + "</select>";
                $("#foot .models").append(s).find("select").change(function() {
                    app.add($(this).val());
                });


                $('#foot .help a').click(function() {
                    alert('提示: 本程序只做学习探讨之用。\r\n reruin@gmail.com')
                });

                $("#foot .tick select").change(function() {
                    app.setTick($(this).val());
                });

                $("#foot .filter select").change(function() {
                    app.setFilter($(this).val());
                });

                $('#all').on('click', 'a.remove' , function(){
                    var id = $(this).attr('data-id');
                    if(window.confirm('确定删除？')){
                        app.remove(id);
                    }
                })

            }

            function notify(){
                if($('#all').find('.availabe input:checked').length == 0){
                    $('#clock')[0].pause();
                }else{
                    if( $('#clock')[0].paused ){
                        $('#clock')[0].play();
                    }
                }
            }
            function start() {
                var tpl = '<div class="item" id="item_{id}">' +
                    '<span>{data.title}</span>' +
                    '<span class="w2">' +
                    '<span class="status">{status_str}</span>' +
                    '<span class="uptime"></span>' +
                    '</span>' +
                    '<span class="w3">{data.cpu}</span><span>{data.ram}</span><span>{data.disk}</span><span>{data.network}</span><span class="w3">{data.price}</span><span class="op"><label><input type="checkbox" checked />音乐提醒</label><a href="#" class="remove" data-id="{id}">移除</a></span>' +
                    '</div>';

                    //<a href="https://www.kimsufi.com/en/order/kimsufi.cgi?hard={id}" target="_blank">下单</a>
                var app = kimsufi();

                app
                    .setFilter('local')
                    .on('add', function(data) {
                        $('#all').append(template(tpl, data));
                        store.models = app.getModels().join(';');
                    })
                    .on('remove' , function(data){
                        var id = data.id;
                        $('#item_'+id).remove();
                        store.models = app.getModels().join(';');
                        notify();
                    })
                    .on('update', function(data) {
                        for (var i in data) {
                            var el = $('#item_' + data[i].id);
                            if (el) {
                                el.find('.uptime').html(data[i].uptime + '秒前');
                                el.find('.status').html(data[i].status_str);
                                el.toggleClass('availabe', data[i].status === true);
                            }
                        }
                        notify();
                    })

                    .add(store['models'] ? store['models'].split(';') : ['162sk32', '162sk42']);

                create_layout(app);
            }

            start();
        });
</script>
</body>
</html>
