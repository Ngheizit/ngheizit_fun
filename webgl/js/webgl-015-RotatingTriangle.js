// 顶点着色器
var VSHADER_SOURCE = 
    'attribute vec4 a_Position; \n' +
    'uniform mat4 u_ModelMatrix; \n' +
    'void main() { \n' +
    '   gl_Position = u_ModelMatrix * a_Position; \n' +
    '} \n';

// 片元着色器
var FSHADER_SOURCE = 
'void main(){ \n' +
'   gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0); \n' +
'} \n';

// 旋转速度（度/秒）
var ANGLE_STEP = 40;

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
    var n = initVertexBuffers(gl);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // 获取u_ModelMatrix变量的存储位置
    var u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
    if(u_ModelMatrix < 0){
        console.log('Failed to get u_ModelMatrix variable');
        return;
    }
    // 三角形的当前旋转角
    var currentAngle = 0.0;
    // 模型矩阵
    var modelMatrix = new Matrix4();

    // 开始绘制三角形
    var tick = function(){
        currentAngle = animate(currentAngle); // 更新旋转角
        draw(gl, n, currentAngle, modelMatrix, u_ModelMatrix);
        requestAnimationFrame(tick); // 请求浏览器调用tick
    };
    tick();

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

function draw(gl, n, currentAngle, modelMatrix, u_ModelMatrix) {
    // 设置旋转矩阵
    modelMatrix.setRotate(currentAngle, 0, 0, 1);

    // 将旋转矩阵传输给顶点着色器
    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);

    // 清除<canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

    // 绘制三角形
    gl.drawArrays(gl.TRIANGLES, 0, n);
}

// 记录上一次调用函数的时刻
var g_last = Date.now();
function animate(angle) {
    // 计算距离上次调用经过多长的时间
    var now = Date.now();
    var elapsed = now - g_last; // 毫秒
    g_last = now;
    // 根据距离上次调用的时间，更新当前旋转角度
    var newAngle = angle + (ANGLE_STEP * elapsed) / 1000.0;
    return newAngle %= 360.0;
}