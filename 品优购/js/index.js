window.addEventListener('load', function() {
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    //1鼠标经过FOCUS就显示隐藏左右按钮
    focus.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        //鼠标经过focus停止定时器
        clearInterval(timer);
        timer = null;
    })
    focus.addEventListener('mouseleave', function() {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function() {
            arrow_r.click();
        }, 2000);
    })

    //2小圆圈根据图片而增加
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('ol');
    // console.log(ul.children.length);
    for (var i = 0; i < ul.children.length; i++) {
        // 创建一个li
        var li = document.createElement('li');
        //记录当前小圆圈的索引号 通过自定义属性来做
        li.setAttribute('index', i)
            // 把li插入到ol里面
        ol.appendChild(li);
        //小圆圈排他变色
        li.addEventListener('click', function() {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            //3点击小圆圈，移动图片
            //ul的移动距离 小圆圈的索引号乘以图片的宽度，注意是负值
            //当我们点击了某个li,就拿到当前li的索引号
            var index = this.getAttribute('index');
            //当我们点击了某个li，就把这个Li的索引号返回给Num
            num = index;
            circle = index;
            console.log(focusWidth);

            animate(ul, index * -focusWidth);
        })
    }

    //把ol第一个li设置类为current
    ol.children[0].className = 'current';
    var num = 0;
    //控制小圆圈的播放
    var circle = 0;
    //flag节流阀
    var flag = true;
    //点击右侧按钮，图片滚动一张
    arrow_r.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num = ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * 721, function() {
                flag = true;
            });
            circle++;
            if (circle == ol.children.length) {
                circle = 0;
            }
            circleChange()
        }
    })

    //左侧按钮
    arrow_l.addEventListener('click', function() {
        if (num == 0) {
            num = ul.children.length - 1;
            ul.style.left = -num * focusWidth + 'px';

        }
        num--;
        animate(ul, -num * 721)
        circle--;
        if (circle < 0) {
            circle = ol.children.length - 1;
        }
        circleChange()
    });

    function circleChange() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';

        }
        ol.children[circle].className = 'current';
    }

    //自动播放轮播图
    var timer = setInterval(function() {
        arrow_r.click();
    }, 2000);


})