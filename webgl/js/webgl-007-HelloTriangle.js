// 顶点着色器
var VSHADER_SOURCE = 
    'attribute vec4 a_Position; \n' +
    'void main(){ \n' +
    '   gl_Position = a_Position; \n' + //设置坐标
    '} \n';

// 片元着色器
var FSHADER_SOURCE = 
    'void main(){ \n' +
    '   gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0); \n' + //设置颜色
    '} \n';

window.onload = function(){
    this.Main();
}

function Main(){

    // 获取<canvas>标签
    var canvas = document.getElementById("webgl");

    // 获取WebGL上下文
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

    // 设置顶点位置
    var n = initVertexBuffers(gl);

    // 设置背景色
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // 绘制三角形
    gl.drawArrays(gl.TRIANGLES, 0, n)

}

function initVertexBuffers(gl){
    var vertices = new Float32Array([
        0.0, 0.5, -0.5, -0.5, 0.5, -0.5
    ]);
    var n = parseInt(vertices.length / 2);

    // 创建缓冲区对象
    var vertexBuffer = gl.createBuffer();
    if(!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
    }

    // 将缓冲区对象绑定到目标
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

    // 向缓冲区对象中写入数据
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if(a_Position < 0){
        console.log('Failed to get the storage location of a_Position');
        return;
    }

    // 将缓冲区对象分配给a_Position变量
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

    // 连接a_Position变量与分配给它的缓冲区对象
    gl.enableVertexAttribArray(a_Position);

    return n;
}