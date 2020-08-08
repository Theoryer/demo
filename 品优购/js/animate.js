 //原理是（目标值-现在的位置）/10；循环
 function animate(obj, target, callback) {
     clearInterval(obj.timer);
     obj.timer = setInterval(function() {
         //步长值写道定时器的里面
         // var step = Math.ceil((target - obj.offsetLeft) / 10); //取整数
         var step = (target - obj.offsetLeft) / 10;
         step = step > 0 ? Math.ceil(step) : Math.floor(step);
         if (obj.offsetLeft == target) {
             clearInterval(obj.timer);
             //回调函数写到定时器结束里面
             if (callback) {
                 callback(); //调用函数
             }
         }
         obj.style.left = obj.offsetLeft + step + 'px';
     }, 40)
 }