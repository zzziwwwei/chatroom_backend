let mouse = {
    x: 0,
    y: 0,
}
window.addEventListener('mousemove', (event) => {
    mouse.x = event.pageX;
    mouse.y = event.pageY;
})
let mousedown = 0
window.addEventListener("mousedown", function () {
    mousedown = 1
});
window.addEventListener("mouseup", function () {
    mousedown = 0
    control_Circle = 0
});
let txtInput = document.getElementById("txtInput");
let txtShow = document.getElementById("txtShow");
let btnSend = document.getElementById("btnSend");
//window事件監聽
let ws = new WebSocket('ws://localhost:8080')
let message
txtShow.value = ''
ws.onopen = () => {
    console.log('open connection')
}
ws.onmessage = event => {
    let txt = event.data 
    txtShow.value = txtShow.value + "\n" + txt
}
btnSend.addEventListener('click',() => {
    let txt = txtInput.value;
    ws.send(txt);
  })

function animate() {
    requestAnimationFrame(animate)
    

}
animate()
