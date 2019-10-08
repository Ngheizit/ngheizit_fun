// 顶点着色器程序
var VSHADER_SOURCE = 
    'attribute vec4 a_Position; \n' +
    'attribute vec4 a_Color; \n' +
    'varying vec4 v_Color; \n' + // vaying 变量
    'void main(){ \n' +
    '   gl_Position = a_Position; \n' + //设置坐标
    '   gl_PointSize = 10.0; \n' + //设置尺寸
    '   v_Color = a_Color; \n' + // 将数据传给片元着色器
    '} \n';

// 片元着色器程序
var FSHADER_SOURCE = 
    'precision mediump float; \n' +
    'varying vec4 v_Color; \n' + 
    'void main(){ \n' +
    '   gl_FragColor = v_Color; \n' + //设置颜色
    '} \n';

window.onload = function(){
    this.Main();
}
function Main(){
    var canvas = document.getElementById("webgl");
    var gl = getWebGLContext(canvas);
    if(!gl){
        console.log('Failed to get the rendering context for WebGL');
        return;
    }
    if(!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)){
        console.log('Failed to initShaders for WebGL');
        return;
    }
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    // 设置顶点位置
    var n = initVertexBuffers(gl);
    if (n < 0){
        console.log('Failed to set the positions of the vertices');
        return;
    }

    // 绘制一点
    gl.drawArrays(gl.TRIANGLES, 0, n);
}

function initVertexBuffers(gl){
    var vertices = new Float32Array([
        // 顶点坐标和颜色
        0.0, 0.5, 1.0, 0.0, 0.0,
        -0.5, -0.5, 0.0, 1.0, 0.0,
        0.5, -0.5, 0.0, 0.0, 1.0
    ]);
    var n = vertices.length / 5;
    
    // 创建缓冲区对象
    var vertexBuffer = gl.createBuffer();
    if(!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
    }

    // 将顶点坐标和尺寸写入缓冲区并开启
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    var FSIZE = vertices.BYTES_PER_ELEMENT;
    // 获取a_Position的存储位置，分配缓冲区并开启
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if(a_Position < 0){
        console.log('Failed to get the storage location of a_Position');
        return;
    }
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 5, 0);
    gl.enableVertexAttribArray(a_Position); // 开启分配

    // 获取a_PointSize的存储位置，分配缓冲区并开启
    var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
    if(a_Color < 0){
        console.log('Failed to get the storage location of a_Color');
        return;
    }
    gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 5, FSIZE * 2);
    gl.enableVertexAttribArray(a_Color);

    return n;
}