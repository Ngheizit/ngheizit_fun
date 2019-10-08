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
    'void main(){ \n' +
    '   gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0); \n' + //设置颜色
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
    gl.drawArrays(gl.POINTS, 0, n);
}

function initVertexBuffers(gl){
    var vertices = new Float32Array([
        // 顶点坐标和点的尺寸
        0.0, 0.5, 10.0, // 第一个点
        -0.5, -0.5, 20.0, // 第二个点
        0.5, -0.5, 30.0, // 第三个点
        -0.5, 0.0, 40.0
    ]);
    var n = vertices.length / 3;
    
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
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 3, 0);
    gl.enableVertexAttribArray(a_Position); // 开启分配

    // 获取a_PointSize的存储位置，分配缓冲区并开启
    var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
    if(a_PointSize < 0){
        console.log('Failed to get the storage location of a_PointSize');
        return;
    }
    gl.vertexAttribPointer(a_PointSize, 1, gl.FLOAT, false, FSIZE * 3, FSIZE * 2);
    gl.enableVertexAttribArray(a_PointSize);

    return n;
}