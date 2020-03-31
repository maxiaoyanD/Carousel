var $carousel = (function(){
    function show(conf){
        var $slider = $('<div class="slider" id="slider"></div>'),
            $lef = $('<span id="left"><</span>'),
            $rig = $('<span id="right">></span>'),
            $ul = $('<ul class="nav" id="nav"></ul>'),
            imgSrc = {
                imgList:[],
                num:0,
                time:0
            },
            wid=0,
            index = 1,
            timer,
            oNavlist = [], 
            isMoving = false;
        //生成DOM
        $("#box").append($slider);
        $("#box").append($ul);
        $("#box").append($lef);
        $("#box").append($rig);
        $.extend(imgSrc,conf);
        for(var i = 0;i<imgSrc.imgList.length;i++){
            (function(j){
                $slider.append('<div class="slide"><img src="'+imgSrc.imgList[j]+'" alt=" "></div>');
            }(i))
        }
        for(var i = 0;i<imgSrc.num;i++){
            (function(j){
                $ul.append($('<li>' + (j+1 + '</li>')))
            }(i))
            
        }
        oNavlist = document.getElementById('nav').children;
        wid = parseInt($('#slider').css('left'));
        //划上暂停
        $("#box")[0].onmouseover = function () {
            // console.log("jsiok")
            animate($("#left")[0], {
                opacity: 0.6
            })
            animate($("#right")[0], {
                opacity: 0.6
            })
            clearInterval(timer); //图片停止滚动
        }
        //移除开始轮播
        $("#box")[0].onmouseout = function () {
            animate($("#left")[0], {
                opacity: 0
            })
            animate($("#right")[0], {
                opacity: 0
            })
            timer = setInterval(next, imgSrc.time); //图片开始接着滚动
        }
        //点击左右切换
        $("#right")[0].onclick = prev;
        $("#left")[0].onclick = next;
        //下一页
        function next() {
            if (isMoving) {
                return;
            }
            isMoving = true;
            index++;
            console.log(index,"next");
            navmove();
            animate($("#slider")[0],{
                left: wid*index
            }, function () {
                if (index == (imgSrc.num+1)) {
                    $("#slider")[0].style.left = (wid) +'px';
                    index = 1;
                }
                isMoving = false;
            });
        }
        //上一页
        function prev() {
            if (isMoving) {
                return;
            }
            isMoving = true;
            index--;
            navmove();
            animate($("#slider")[0], {
                left: wid * index
            }, function () {
                if (index == 0) {
                    $("#slider")[0].style.left = (-wid)*imgSrc.num+'px';
                    index = imgSrc.num;
                }
                isMoving = false;
            });
        }
        // 按钮点击切换事件
        for (var i = 0; i < oNavlist.length; i++) {
            oNavlist[i].index = i;
            oNavlist[i].onclick = function () {
                index = this.index + 1;
                navmove();
                animate($("#slider")[0], {
                    left: wid * index
                });
            }
        }
        //图片切换时按钮样式跟着切换
        oNavlist[0].className = "active";
        function navmove() {
            for (var i = 0; i < oNavlist.length; i++) {
                oNavlist[i].className = "";
            }
            if (index > imgSrc.num) {
                oNavlist[0].className = "active";
            } else if (index <= 0) {
                oNavlist[imgSrc.num-1].className = "active";
            } else {
                oNavlist[index - 1].className = "active";
            }
        }
        // 页面打开时自动滚动切换
        timer = setInterval(next, imgSrc.time);
        
        function getStyle(obj, attr) { //返回值带有单位px
            if (obj.currentStyle) {
                return obj.currentStyle[attr];
            } else {
                return getComputedStyle(obj, null)[attr];
            }
        }
        
        function animate(obj, json, callback) {
            clearInterval(obj.timer);
            obj.timer = setInterval(function () {
                var flag = true;
                for (var attr in json) {
                    (function (attr) {
                        if (attr == "opacity") {
                            var now = parseInt(getStyle(obj, attr) * 100);
                            var dest = json[attr] * 100;
                        } else {
                            var now = parseInt(getStyle(obj, attr));
                            var dest = json[attr];
                        }
                        var speed = (dest - now) / 6;
                        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                        if (now != dest) {
                            flag = false;
                            if (attr == "opacity") {
                                obj.style[attr] = (now + speed) / 100;
                            } else {
                                obj.style[attr] = now + speed + "px";
                            }
                        }
                    })(attr);
                }
                if (flag) {
                    clearInterval(obj.timer);
                    callback && callback(); //如果回调函数存在，就调用回调函数
                }
            }, 30);
        }    
    }
    return{
        show:show
    }
}());

(function(){
    $carousel.show({
        imgList:["img/b5.png","img/b1.png","img/b2.png","img/b3.png","img/b4.png","img/b5.png","img/b1.png"],
        num:5,
        time:3000
    })
}());