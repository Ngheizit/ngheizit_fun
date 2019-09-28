// 顶点着色器程序
var VSHADER_SOURCE = 
    'attribute vec4 a_Position; \n' +
    'attribute float a_PointSize; \n' +
    'void main(){ \n' +
    '   gl_Position = a_Position; \n' + //设置坐标
    '   gl_PointSize = a_PointSize; \n' + //设置尺寸
    '} \n';

// 片元着色器程序
var FSHADER_SOURCE = 
    'precision mediump float; \n' +
    'uniform vec4 u_FragColor; \n' +
    'void main(){ \n' +
    '   gl_FragColor = u_FragColor; \n' + //设置颜色
    '} \n';

window.onload = function(){
    this.Main();
}
function Main(){
    // 获取<canvas>标签
    var canvas = document.getElementById("webgl");

    // 获取WebGL绘图上下文
    var gl = getWebGLContext(canvas);
    if(!gl){
        console.log('Failed to get the rendering context for WebGL');
        return;
    }

    // 初始化着色器
    if(!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)){
        console.log('Failed to get the rendering context for WebGL');
        return;
    }

    // 获得attribute变量的存储位置
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if(a_Position < 0){
        console.log('Failed to get the storage location of a_Position');
        return;
    }
    var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
    if(a_PointSize < 0){
        console.log('Failed to get the storage location of a_PointSize');
        return;
    }

    // 获得uniform变量的存储位置
    var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
    if(!u_FragColor){
        console.log('Failed to get u_FragColor variable');
        return;
    }

    // 将顶点位置和尺寸传输给attribute变量
    // gl.vertexAttrib3f(a_Position, 0.5, 0.6, 0.0);
    gl.vertexAttrib1f(a_PointSize, 40.0);

    // 指定清空<canvas>的颜色(red, green, blue, alpha)
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    
    // 清空<canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

    // 注册鼠标点击事件响应函数
    canvas.onmousedown = function(ev){
        click(ev, gl, canvas, a_Position, u_FragColor);
    }

}

var g_points = []; // 鼠标点击位置数组
var g_colors = []; // 存储点颜色的数组
function click(ev, gl, canvas, a_Position, u_FragColor){
    var x = ev.clientX; // 鼠标点击处的x坐标
    var y = ev.clientY; // 鼠标点击处的y坐标
    var rect = ev.target.getBoundingClientRect();
    x = ((x - rect.left) - canvas.height / 2) / (canvas.height / 2);
    y = (canvas.width / 2 - (y -rect.top)) / (canvas.width / 2);

    // 将坐标存储到g_points数组中
    g_points.push([x, y]);
    // 将点的颜色存储到g_colors数组中
    if(x >= 0.0 && y >= 0.0){ // 第一象限
        g_colors.push([1.0, 0.0, 0.0, 1.0]);
    }else if(x >= 0.0 && y < 0.0){ // 第二象限
        g_colors.push([0.0, 1.0, 0.0, 1.0]);
    }else if(x < 0.0 && y < 0.0){ // 第三象限
        g_colors.push([1.0, 1.0, 1.0, 1.0]);
    }else{ // 第四象限
        g_colors.push([0.0, 0.0, 1.0, 1.0])
    }

    // 清除<canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

    var len = g_points.length;
    for(var i = 0; i < len; i += 1){
        var xy = g_points[i];
        var rgba = g_colors[i];
        // 将点的位置传递到变量a_Position中
        gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);
        // 将点的颜色传输到u_FragColor变量中
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
        // 绘制点
        gl.drawArrays(gl.POINTS, 0, 1);
    }
}