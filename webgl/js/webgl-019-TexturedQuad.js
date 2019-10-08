// 顶点着色器程序
var VSHADER_SOURCE = 
    'attribute vec4 a_Position; \n' +
    'attribute vec2 a_TexCoord; \n' +
    'varying vec2 v_TexCoord; \n' +
    'void main(){ \n' +
    '   gl_Position = a_Position; \n' +
    '   v_TexCoord = a_TexCoord; \n' + 
    '} \n';

// 片元着色器程序
var FSHADER_SOURCE = 
    'precision mediump float; \n' +
    'uniform sampler2D u_Sampler; \n' +
    'varying vec2 v_TexCoord; \n' +
    'void main(){ \n' +
    '   gl_FragColor = texture2D(u_Sampler, v_TexCoord); \n' + 
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

    // 配置纹理
    if(!initTextures(gl, n)){
        console.log('Failed to set the positions of the textures');
        return;
    }

}

function initVertexBuffers(gl){
    var vertices = new Float32Array([
        // 顶点坐标，纹理坐标
        -0.5, 0.5, 0.0, 1.0,
        -0.5, -0.5, 0.0, 0.0,
        0.5, 0.5, 1.0, 1.0,
        0.5, -0.5, 1.0, 0.0
    ]);
    var n = vertices.length / 4;
    
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
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 4, 0);
    gl.enableVertexAttribArray(a_Position); // 开启分配

    // 获取a_TexCoord的存储位置，分配缓冲区并开启
    var a_TexCoord = gl.getAttribLocation(gl.program, 'a_TexCoord');
    if(a_TexCoord < 0){
        console.log('Failed to get the storage location of a_TexCoord');
        return;
    }
    gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, FSIZE * 4, FSIZE * 2);
    gl.enableVertexAttribArray(a_TexCoord);

    return n;
}

function initTextures(gl, n) {
    var texture = gl.createTexture(); // 创建纹理对象

    // 获取u_Sampler的存储位置
    var u_Sampler = gl.getUniformLocation(gl.program, 'u_Sampler');
    if(u_Sampler < 0){
        console.log('Failed to get u_Sampler variable');
        return;
    }

    var image = new Image();

    // 注册图像加载事件的响应函数
    image.onload = function(){
        loadTexture(gl, n, texture, u_Sampler, image);
    };
    // image.src = 'https://ngheizit.fun/Older/img/mario.png';
    image.src = 'img\\firefly4.png';

    return true;
}

function loadTexture(gl, n, texture, u_Sampler, image) {
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); // 对象纹理图像进行y轴反转
    // 开启0号纹理单元
    gl.activeTexture(gl.TEXTURE0);
    // 向target绑定纹理对象
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // 配置纹理参数
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    // 配置纹理图像
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

    // 将0号纹理传递给着色器
    gl.uniform1i(u_Sampler, 0);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, n); // 绘制矩形
}