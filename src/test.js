const string = `
.skin *{margin: 0;padding: 0;box-sizing: border-box;}
.skin *::after,::before{box-sizing: border-box;}

.skin{
    /* 相对定位 */
   position: relative;
   background: #ffe600;
   min-height: 100vh;
}
.nose{
    /* 三角形 */
    border: 10px solid black;
    border-color: black transparent green transparent;
    border-bottom: none;
    width: 0px;
    height: 0px;
    position: relative;
    left: 50%;
    top: 145px;
    /* 此时方块的左边线在中线，因此左移动方块长度一半居中 */
    margin-left: -10px;
    z-index: 10;
}
@keyframes wave{
    0%{
        transform: rotate(0deg);
    }
    33%{
        transform: rotate(5deg);
    }
    66%{
        transform: rotate(-5deg);
    }
    100%{
        transform: rotate(0deg);
    }
}
.nose:hover{
    transform-origin: 50% 100%;
    animation: wave 300ms infinite linear;
}
.yuan{
    /* 相对于三角形定位 */
    position: absolute;
    width: 20px;
    height: 6px;
    background: black;
    top: -16px;
    left: -10px;
    border-radius: 10px 10px 0 0;
}

.eye{
    border:2px solid #000;
    height: 64px;
    width: 64px;
    position: absolute;
    left: 50%;
    top: 100px;
    margin-left: -32px;
    background: #2e2e2e;
    border-radius: 50%;
}
.eye::before{
    content: '';
    display: block;
    border: 3px solid #000;
    height: 25px;
    width: 25px;
    border-radius: 50%;
    background: #fff;
    position: relative;
    left: 8px;
    top: 4px;
}
.eye.left{
    transform: translateX(-100px);
}
.eye.right{
    transform: translateX(100px);
}

.mouth{
    width: 200px;
    height: 200px;
    position: absolute;
    left: 50%;
    top: 170px;
    margin-left: -100px;
}
.mouth .up{
    position: relative;
    top: -20px;
    z-index: 1;
}
.mouth .up .lip{
    border: 3px solid black;
    height: 30px;
    width: 100px;
    background: #ffe600;
    border-top-color: transparent;
    border-right-color: transparent;
    position: relative;
    position: absolute;
    left: 50%;
    margin-left: -50px;
}
.mouth .up .lip.left{ 
    border-radius: 0 0 0 50px;
    /* 旋转21度 */
    transform: rotate(-15deg) translateX(-53px);
    /* 相对于mouth up定位 */ 
}
.mouth .up .lip.right{
    border-radius: 0 0 50px 0;
    transform: rotate(15deg) translateX(53px);
}
.mouth .up .lip::before{
    content: '';
    height: 30px;
    width: 7px;
    position: absolute;
    bottom: 0;
    background: #ffe600;
}
.mouth .up .lip.left::before{
    right: -6px;  
}

.mouth .up .lip.right::before{
    left: -6px;
}
.mouth .down{
    height: 180px;
    position: absolute;
    top: 5px;
    width: 100%;
    overflow: hidden;
}
.mouth .down .yuan1{
    border: 3px solid black;
    height: 1000px;
    width: 150px;
    position: absolute;
    bottom: 0px;
    left: 50%;
    margin-left: -75px;
    border-radius: 75px/300px;
    background: #9b000a;
    overflow: hidden;
}
.mouth .down .yuan1 .yuan2{
    width: 200px;
    height: 300px;
    background: #ff485f;
    position: absolute;
    bottom: -155px;
    left: 50%;
    margin-left: -100px;
    border-radius: 100px;
}

.face{
    border: 3px solid black;
    position: absolute;
    height: 88px;
    width: 88px;
    left: 50%;
    margin-left: -44px;
    top: 200px;
    z-index: 3;
}
.face > img{
    position: absolute;
    top: 50%;
    left: 50%;
}
.face.left{
    transform: translateX(-180px);
    background: #ff0000;
    border-radius: 50%;
}
.face.left > img{
    transform: rotateY(180deg);
    transform-origin: 0 0;
}
.face.right{
    transform: translateX(180px);
    background: #ff0000;
    border-radius: 50%;
}
`

const demo = document.querySelector('#demo')
const demo2 = document.querySelector('#demo2')
let n = 1
let time = 100
let id

const player ={
    init : ()=>{
        demo.innerText = string.substr(0,n)//子字符串
        demo2.innerHTML = string.substr(0,n)
        player.bindEvents()
        player.play()//播放  
    },
    events : {  //hashTable改名为event
        '#btnPause': 'pause',
        '#btnPlay': 'play',
        '#btnSlow': 'slow',
        '#btnNormal': 'normal',
        '#btnFast': 'fast'
    },
    bindEvents : ()=>{
        for(let key in player.events){
            if(player.events.hasOwnProperty(key)){
                const value = player.events[key]//value是字符串
                document.querySelector(key).onclick = player[value]
            }
        }
    },
    run : ()=>{
        n += 1
        if(n>string.length){
            window.clearInterval(id)
            return//后面的代码就不执行了
        }
        demo.innerText = string.substr(0,n)
        demo2.innerHTML = string.substr(0,n)
        demo.scrollTop = demo.scrollHeight//demo可以滚动的高度
    },
    play : ()=>{
        id = setInterval(player.run,time)
    },
    pause : ()=>{
        window.clearInterval(id)
    },
    slow : ()=>{
        player.pause()
        time = 300
        player.play()
    },
    normal : ()=>{
        player.pause()
        time = 100
        player.play()
    },
    fast : ()=>{
        player.pause()
        time = 0
        player.play()
    }
}

player.init()

