// 顶点着色器
var VSHADER_SOURCE = 
    'attribute vec4 a_Position; \n' +
    'uniform mat4 u_xformMatrix; \n' +
    'void main() { \n' +
    '   gl_Position = u_xformMatrix * a_Position; \n' +
    '} \n';

// 片元着色器
var FSHADER_SOURCE = 
'void main(){ \n' +
'   gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0); \n' + //设置颜色
'} \n';

// 旋转角度
var ANGLE = 90.0;
// 平移距离
var Tx = 0.5, Ty = 0.5, Tz = 0.0;

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

    // 设置顶点坐标
    var n = initVertexBuffers(gl);

    // 创建旋转举证
    var radian = Math.PI * ANGLE / 180.0; // 角度转弧度
    var cosB = Math.cos(radian), sinB = Math.sin(radian);
    // 注意WebGL中的矩阵是列主序的
    var xformMatrix = new Float32Array([
        cosB, sinB, 0.0, 0.0,
        -sinB, cosB, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        Tx, Ty, Tz, 1.0
    ]);

    // 将旋转举证传输给顶点着色器
    var u_xformMatrix = gl.getUniformLocation(gl.program, 'u_xformMatrix');
    if(!u_xformMatrix){
        console.log('Failed to get u_xformMatrix variable');
        return;
    }
    gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix);

    // 设置背景色
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // 绘制三角形
    gl.drawArrays(gl.TRIANGLES, 0, n);

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