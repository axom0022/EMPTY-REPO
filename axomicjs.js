var axomic = (function() {
var axomic = {};

var Vector2 = function(x, y) { this.x = x || 0; this.y = y || 0; };
Vector2.prototype.set = function(x, y) { this.x = x; this.y = y; return this; };
Vector2.prototype.copy = function(v) { this.x = v.x; this.y = v.y; return this; };
Vector2.prototype.clone = function() { return new Vector2(this.x, this.y); };
Vector2.prototype.add = function(v) { this.x += v.x; this.y += v.y; return this; };
Vector2.prototype.sub = function(v) { this.x -= v.x; this.y -= v.y; return this; };
Vector2.prototype.multiplyScalar = function(s) { this.x *= s; this.y *= s; return this; };
Vector2.prototype.length = function() { return Math.sqrt(this.x * this.x + this.y * this.y); };
Vector2.prototype.normalize = function() { var l = this.length(); if (l > 0) { this.x /= l; this.y /= l; } return this; };
Vector2.prototype.dot = function(v) { return this.x * v.x + this.y * v.y; };
axomic.Vector2 = Vector2;

var Vector3 = function(x, y, z) { this.x = x || 0; this.y = y || 0; this.z = z || 0; };
Vector3.prototype.set = function(x, y, z) { this.x = x; this.y = y; this.z = z; return this; };
Vector3.prototype.copy = function(v) { this.x = v.x; this.y = v.y; this.z = v.z; return this; };
Vector3.prototype.clone = function() { return new Vector3(this.x, this.y, this.z); };
Vector3.prototype.add = function(v) { this.x += v.x; this.y += v.y; this.z += v.z; return this; };
Vector3.prototype.sub = function(v) { this.x -= v.x; this.y -= v.y; this.z -= v.z; return this; };
Vector3.prototype.multiplyScalar = function(s) { this.x *= s; this.y *= s; this.z *= s; return this; };
Vector3.prototype.applyMatrix4 = function(m) {
var e = m.elements, x = this.x, y = this.y, z = this.z;
var w = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]);
this.x = (e[0] * x + e[4] * y + e[8] * z + e[12]) * w;
this.y = (e[1] * x + e[5] * y + e[9] * z + e[13]) * w;
this.z = (e[2] * x + e[6] * y + e[10] * z + e[14]) * w;
return this;
};
Vector3.prototype.length = function() { return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z); };
Vector3.prototype.normalize = function() { var l = this.length(); if (l > 0) { this.x /= l; this.y /= l; this.z /= l; } return this; };
Vector3.prototype.dot = function(v) { return this.x * v.x + this.y * v.y + this.z * v.z; };
Vector3.prototype.cross = function(v) {
var ax = this.x, ay = this.y, az = this.z;
this.x = ay * v.z - az * v.y;
this.y = az * v.x - ax * v.z;
this.z = ax * v.y - ay * v.x;
return this;
};
Vector3.prototype.distanceTo = function(v) { var dx = this.x - v.x, dy = this.y - v.y, dz = this.z - v.z; return Math.sqrt(dx * dx + dy * dy + dz * dz); };
axomic.Vector3 = Vector3;

var Vector4 = function(x, y, z, w) { this.x = x || 0; this.y = y || 0; this.z = z || 0; this.w = w !== undefined ? w : 1; };
Vector4.prototype.set = function(x, y, z, w) { this.x = x; this.y = y; this.z = z; this.w = w; return this; };
axomic.Vector4 = Vector4;

var Matrix4 = function() {
this.elements = new Float32Array([1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]);
};
Matrix4.prototype.set = function(n11,n12,n13,n14,n21,n22,n23,n24,n31,n32,n33,n34,n41,n42,n43,n44) {
var e = this.elements;
e[0]=n11; e[4]=n12; e[8]=n13; e[12]=n14;
e[1]=n21; e[5]=n22; e[9]=n23; e[13]=n24;
e[2]=n31; e[6]=n32; e[10]=n33; e[14]=n34;
e[3]=n41; e[7]=n42; e[11]=n43; e[15]=n44;
return this;
};
Matrix4.prototype.identity = function() { this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1); return this; };
Matrix4.prototype.copy = function(m) {
var e = this.elements, me = m.elements;
for (var i=0;i<16;i++) e[i] = me[i];
return this;
};
Matrix4.prototype.multiply = function(m) {
var a = this.elements, b = m.elements, r = new Float32Array(16);
for (var i=0;i<4;i++) for (var j=0;j<4;j++) {
var s = 0;
for (var k=0;k<4;k++) s += a[i+4*k] * b[k+4*j];
r[i+4*j] = s;
}
this.elements = r;
return this;
};
Matrix4.prototype.multiplyMatrices = function(a, b) {
var ae = a.elements, be = b.elements, e = this.elements;
for (var i=0;i<4;i++) for (var j=0;j<4;j++) {
var s = 0;
for (var k=0;k<4;k++) s += ae[i+4*k] * be[k+4*j];
e[i+4*j] = s;
}
return this;
};
Matrix4.prototype.compose = function(position, quaternion, scale) {
var qx = quaternion.x, qy = quaternion.y, qz = quaternion.z, qw = quaternion.w;
var sx = scale.x, sy = scale.y, sz = scale.z;
var x2 = qx + qx, y2 = qy + qy, z2 = qz + qz;
var xx = qx * x2, xy = qx * y2, xz = qx * z2;
var yy = qy * y2, yz = qy * z2, zz = qz * z2;
var wx = qw * x2, wy = qw * y2, wz = qw * z2;
var e = this.elements;
e[0] = (1 - (yy + zz)) * sx; e[4] = (xy - wz) * sy; e[8] = (xz + wy) * sz; e[12] = position.x;
e[1] = (xy + wz) * sx; e[5] = (1 - (xx + zz)) * sy; e[9] = (yz - wx) * sz; e[13] = position.y;
e[2] = (xz - wy) * sx; e[6] = (yz + wx) * sy; e[10] = (1 - (xx + yy)) * sz; e[14] = position.z;
e[3] = 0; e[7] = 0; e[11] = 0; e[15] = 1;
return this;
};
Matrix4.prototype.lookAt = function(eye, target, up) {
var ez = new Vector3().copy(eye).sub(target).normalize();
var ex = new Vector3().copy(up).cross(ez).normalize();
var ey = new Vector3().copy(ez).cross(ex).normalize();
var e = this.elements;
e[0]=ex.x; e[4]=ey.x; e[8]=ez.x; e[12]=eye.x;
e[1]=ex.y; e[5]=ey.y; e[9]=ez.y; e[13]=eye.y;
e[2]=ex.z; e[6]=ey.z; e[10]=ez.z; e[14]=eye.z;
e[3]=0; e[7]=0; e[11]=0; e[15]=1;
return this;
};
Matrix4.prototype.perspective = function(fov, aspect, near, far) {
var f = 1.0 / Math.tan(fov * Math.PI / 360);
var nf = 1 / (near - far);
var e = this.elements;
e[0]=f/aspect; e[4]=0; e[8]=0; e[12]=0;
e[1]=0; e[5]=f; e[9]=0; e[13]=0;
e[2]=0; e[6]=0; e[10]=(far+near)*nf; e[14]=2*far*near*nf;
e[3]=0; e[7]=0; e[11]=-1; e[15]=0;
return this;
};
Matrix4.prototype.invert = function() {
var e = this.elements;
var a00=e[0],a01=e[1],a02=e[2],a03=e[3],
a10=e[4],a11=e[5],a12=e[6],a13=e[7],
a20=e[8],a21=e[9],a22=e[10],a23=e[11],
a30=e[12],a31=e[13],a32=e[14],a33=e[15];
var b00=a00*a11 - a01*a10, b01=a00*a12 - a02*a10, b02=a00*a13 - a03*a10,
b03=a01*a12 - a02*a11, b04=a01*a13 - a03*a11, b05=a02*a13 - a03*a12,
b06=a20*a31 - a21*a30, b07=a20*a32 - a22*a30, b08=a20*a33 - a23*a30,
b09=a21*a32 - a22*a31, b10=a21*a33 - a23*a31, b11=a22*a33 - a23*a32;
var det = b00*b11 - b01*b10 + b02*b09 + b03*b08 - b04*b07 + b05*b06;
if (det === 0) return this;
det = 1.0 / det;
this.elements[0] = (a11*b11 - a12*b10 + a13*b09)*det;
this.elements[1] = (-a01*b11 + a02*b10 - a03*b09)*det;
this.elements[2] = (a31*b05 - a32*b04 + a33*b03)*det;
this.elements[3] = (-a21*b05 + a22*b04 - a23*b03)*det;
this.elements[4] = (-a10*b11 + a12*b08 - a13*b07)*det;
this.elements[5] = (a00*b11 - a02*b08 + a03*b07)*det;
this.elements[6] = (-a30*b05 + a32*b02 - a33*b01)*det;
this.elements[7] = (a20*b05 - a22*b02 + a23*b01)*det;
this.elements[8] = (a10*b10 - a11*b08 + a13*b06)*det;
this.elements[9] = (-a00*b10 + a01*b08 - a03*b06)*det;
this.elements[10] = (a30*b04 - a31*b02 + a33*b00)*det;
this.elements[11] = (-a20*b04 + a21*b02 - a23*b00)*det;
this.elements[12] = (-a10*b09 + a11*b07 - a12*b06)*det;
this.elements[13] = (a00*b09 - a01*b07 + a02*b06)*det;
this.elements[14] = (-a30*b03 + a31*b01 - a32*b00)*det;
this.elements[15] = (a20*b03 - a21*b01 + a22*b00)*det;
return this;
};
axomic.Matrix4 = Matrix4;

var Quaternion = function(x, y, z, w) { this.x = x || 0; this.y = y || 0; this.z = z || 0; this.w = w !== undefined ? w : 1; };
Quaternion.prototype.setFromEuler = function(euler) {
var c1 = Math.cos(euler.x/2), s1 = Math.sin(euler.x/2);
var c2 = Math.cos(euler.y/2), s2 = Math.sin(euler.y/2);
var c3 = Math.cos(euler.z/2), s3 = Math.sin(euler.z/2);
this.x = s1*c2*c3 + c1*s2*s3;
this.y = c1*s2*c3 - s1*c2*s3;
this.z = c1*c2*s3 + s1*s2*c3;
this.w = c1*c2*c3 - s1*s2*s3;
return this;
};
axomic.Quaternion = Quaternion;

var Euler = function(x, y, z) { this.x = x || 0; this.y = y || 0; this.z = z || 0; };
Euler.prototype.set = function(x, y, z) { this.x = x; this.y = y; this.z = z; return this; };
axomic.Euler = Euler;

var Color = function(r, g, b) {
if (arguments.length === 1) { this.setHex(r); } else { this.r = r || 0; this.g = g || 0; this.b = b || 0; }
};
Color.prototype.setHex = function(hex) { this.r = ((hex>>16)&255)/255; this.g = ((hex>>8)&255)/255; this.b = (hex&255)/255; return this; };
axomic.Color = Color;

var Object3D = function() {
this.position = new Vector3();
this.rotation = new Euler();
this.quaternion = new Quaternion();
this.scale = new Vector3(1,1,1);
this.matrix = new Matrix4();
this.children = [];
this.parent = null;
this.visible = true;
};
Object3D.prototype.add = function(child) { if (child.parent) child.parent.remove(child); child.parent = this; this.children.push(child); return this; };
Object3D.prototype.remove = function(child) { var i = this.children.indexOf(child); if (i >= 0) { this.children.splice(i,1); child.parent = null; } return this; };
Object3D.prototype.updateMatrix = function() { this.quaternion.setFromEuler(this.rotation); this.matrix.compose(this.position, this.quaternion, this.scale); };
Object3D.prototype.updateWorldMatrix = function(parentMatrix) {
this.updateMatrix();
if (parentMatrix) this.matrix.multiplyMatrices(parentMatrix, this.matrix);
for (var i=0;i<this.children.length;i++) this.children[i].updateWorldMatrix(this.matrix);
};
axomic.Object3D = Object3D;

var Scene = function() { Object3D.call(this); };
Scene.prototype = Object.create(Object3D.prototype);
Scene.prototype.constructor = Scene;
axomic.Scene = Scene;

var Camera = function() { Object3D.call(this); };
Camera.prototype = Object.create(Object3D.prototype);
axomic.Camera = Camera;

var PerspectiveCamera = function(fov, aspect, near, far) {
Camera.call(this);
this.fov = fov || 60;
this.aspect = aspect || 1;
this.near = near || 0.1;
this.far = far || 2000;
this.projectionMatrix = new Matrix4();
this.updateProjectionMatrix();
};
PerspectiveCamera.prototype = Object.create(Camera.prototype);
PerspectiveCamera.prototype.constructor = PerspectiveCamera;
PerspectiveCamera.prototype.updateProjectionMatrix = function() {
this.projectionMatrix.perspective(this.fov, this.aspect, this.near, this.far);
};
PerspectiveCamera.prototype.lookAt = function(x, y, z) {
var target = new Vector3(x, y, z);
var up = new Vector3(0, 1, 0);
this.matrix.lookAt(this.position, target, up);
};
axomic.PerspectiveCamera = PerspectiveCamera;

var BufferGeometry = function() {
this.attributes = {};
this.index = null;
};
BufferGeometry.prototype.setAttribute = function(name, attr) { this.attributes[name] = attr; };
BufferGeometry.prototype.computeVertexNormals = function() {
var position = this.attributes.position;
if (!position) return;
var normals = new Float32Array(position.array.length);
var verts = position.array;
var indices = null;
if (this.index) indices = this.index.array;
var pA = new Vector3(), pB = new Vector3(), pC = new Vector3(), cb = new Vector3(), ab = new Vector3();
if (indices) {
for (var i=0;i<indices.length;i+=3) {
var iA = indices[i]*3, iB = indices[i+1]*3, iC = indices[i+2]*3;
pA.set(verts[iA], verts[iA+1], verts[iA+2]);
pB.set(verts[iB], verts[iB+1], verts[iB+2]);
pC.set(verts[iC], verts[iC+1], verts[iC+2]);
cb.sub(pC, pB); ab.sub(pA, pB); cb.cross(ab);
normals[iA] += cb.x; normals[iA+1] += cb.y; normals[iA+2] += cb.z;
normals[iB] += cb.x; normals[iB+1] += cb.y; normals[iB+2] += cb.z;
normals[iC] += cb.x; normals[iC+1] += cb.y; normals[iC+2] += cb.z;
}
} else {
for (var i=0;i<verts.length;i+=9) {
pA.set(verts[i], verts[i+1], verts[i+2]);
pB.set(verts[i+3], verts[i+4], verts[i+5]);
pC.set(verts[i+6], verts[i+7], verts[i+8]);
cb.sub(pC, pB); ab.sub(pA, pB); cb.cross(ab);
normals[i] += cb.x; normals[i+1] += cb.y; normals[i+2] += cb.z;
normals[i+3] += cb.x; normals[i+4] += cb.y; normals[i+5] += cb.z;
normals[i+6] += cb.x; normals[i+7] += cb.y; normals[i+8] += cb.z;
}
}
this.setAttribute('normal', new Float32BufferAttribute(normals, 3));
};
axomic.BufferGeometry = BufferGeometry;

var Float32BufferAttribute = function(array, itemSize) { this.array = array; this.itemSize = itemSize; this.count = array.length / itemSize; };
axomic.Float32BufferAttribute = Float32BufferAttribute;

var BoxGeometry = function(width, height, depth) {
BufferGeometry.call(this);
var w2 = width/2, h2 = height/2, d2 = depth/2;
var vertices = new Float32Array([
-w2,-h2, d2,  w2,-h2, d2,  w2, h2, d2,  -w2, h2, d2,
-w2,-h2,-d2,  w2,-h2,-d2,  w2, h2,-d2,  -w2, h2,-d2
]);
var indices = new Uint16Array([
0,1,2, 0,2,3, 1,5,6, 1,6,2, 5,4,7, 5,7,6, 4,0,3, 4,3,7, 3,2,6, 3,6,7, 4,5,1, 4,1,0
]);
var uvs = new Float32Array([
0,0, 1,0, 1,1, 0,1, 0,0, 1,0, 1,1, 0,1
]);
this.setAttribute('position', new Float32BufferAttribute(vertices, 3));
this.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
this.index = new Float32BufferAttribute(indices, 1);
this.computeVertexNormals();
};
BoxGeometry.prototype = Object.create(BufferGeometry.prototype);
axomic.BoxGeometry = BoxGeometry;

var PlaneGeometry = function(width, depth) {
BufferGeometry.call(this);
var w2=width/2, d2=depth/2;
var vertices = new Float32Array([-w2,0,-d2, w2,0,-d2, w2,0,d2, -w2,0,d2]);
var indices = new Uint16Array([0,1,2, 0,2,3]);
var uvs = new Float32Array([0,0, 1,0, 1,1, 0,1]);
this.setAttribute('position', new Float32BufferAttribute(vertices, 3));
this.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
this.index = new Float32BufferAttribute(indices, 1);
this.computeVertexNormals();
};
PlaneGeometry.prototype = Object.create(BufferGeometry.prototype);
axomic.PlaneGeometry = PlaneGeometry;

var SphereGeometry = function(radius, widthSegments, heightSegments) {
BufferGeometry.call(this);
widthSegments = Math.max(3, widthSegments||8);
heightSegments = Math.max(2, heightSegments||6);
var vertices = [], indices = [], uvs = [];
for (var y=0;y<=heightSegments;y++) {
var v = y/heightSegments;
var phi = v * Math.PI;
for (var x=0;x<=widthSegments;x++) {
var u = x/widthSegments;
var theta = u * Math.PI * 2;
var px = -radius * Math.cos(theta) * Math.sin(phi);
var py = radius * Math.cos(phi);
var pz = radius * Math.sin(theta) * Math.sin(phi);
vertices.push(px, py, pz);
uvs.push(u, v);
}
}
for (var y=0;y<heightSegments;y++) {
for (var x=0;x<widthSegments;x++) {
var a = y*(widthSegments+1)+x, b = a+widthSegments+1, c = a+1, d = b+1;
indices.push(a, b, c, c, b, d);
}
}
this.setAttribute('position', new Float32BufferAttribute(new Float32Array(vertices), 3));
this.setAttribute('uv', new Float32BufferAttribute(new Float32Array(uvs), 2));
this.index = new Float32BufferAttribute(new Uint16Array(indices), 1);
this.computeVertexNormals();
};
SphereGeometry.prototype = Object.create(BufferGeometry.prototype);
axomic.SphereGeometry = SphereGeometry;

var Material = function() {};
axomic.Material = Material;

var ShaderMaterial = function(parameters) {
Material.call(this);
this.uniforms = {};
this.vertexShader = parameters.vertexShader;
this.fragmentShader = parameters.fragmentShader;
};
ShaderMaterial.prototype = Object.create(Material.prototype);
axomic.ShaderMaterial = ShaderMaterial;

var MeshBasicMaterial = function(parameters) {
Material.call(this);
parameters = parameters || {};
this.color = parameters.color !== undefined ? new Color(parameters.color) : new Color(0xffffff);
};
MeshBasicMaterial.prototype = Object.create(Material.prototype);
axomic.MeshBasicMaterial = MeshBasicMaterial;

var MeshStandardMaterial = function(parameters) {
Material.call(this);
parameters = parameters || {};
this.color = parameters.color !== undefined ? new Color(parameters.color) : new Color(0xcccccc);
this.roughness = parameters.roughness !== undefined ? parameters.roughness : 0.5;
this.metalness = parameters.metalness !== undefined ? parameters.metalness : 0.5;
this.emissive = parameters.emissive !== undefined ? new Color(parameters.emissive) : new Color(0x000000);
};
MeshStandardMaterial.prototype = Object.create(Material.prototype);
axomic.MeshStandardMaterial = MeshStandardMaterial;

var Mesh = function(geometry, material) {
Object3D.call(this);
this.geometry = geometry;
this.material = material;
};
Mesh.prototype = Object.create(Object3D.prototype);
axomic.Mesh = Mesh;

var WebGL2Renderer = function(parameters) {
parameters = parameters || {};
var canvas = document.createElement('canvas');
this.canvas = canvas;
this.gl = canvas.getContext('webgl2', { antialias: true });
var gl = this.gl;
this.domElement = canvas;
canvas.width = parameters.width || window.innerWidth;
canvas.height = parameters.height || window.innerHeight;
gl.enable(gl.DEPTH_TEST);
gl.enable(gl.CULL_FACE);
gl.cullFace(gl.BACK);
this.clearColor = new Color(0x000000);
this.programCache = {};
};
WebGL2Renderer.prototype.setSize = function(width, height) {
this.canvas.width = width; this.canvas.height = height;
this.gl.viewport(0,0,width,height);
};
WebGL2Renderer.prototype.setClearColor = function(color) { this.clearColor = color; };
WebGL2Renderer.prototype.render = function(scene, camera) {
var gl = this.gl;
var clearColor = this.clearColor;
gl.clearColor(clearColor.r, clearColor.g, clearColor.b, 1);
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
scene.updateWorldMatrix(null);
var proj = camera.projectionMatrix.elements;
var view = new Matrix4().copy(camera.matrix).invert().elements;
var renderMesh = function(mesh, parentWorld) {
if (!mesh.visible) return;
var world = new Matrix4().copy(mesh.matrix);
if (parentWorld) world.multiplyMatrices(parentWorld, world);
if (mesh instanceof Mesh && mesh.geometry && mesh.material) {
var geo = mesh.geometry;
var mat = mesh.material;
var glProgram = getProgram(gl, mat, geo);
gl.useProgram(glProgram);
var uProj = gl.getUniformLocation(glProgram, 'uProjection');
var uView = gl.getUniformLocation(glProgram, 'uView');
var uModel = gl.getUniformLocation(glProgram, 'uModel');
var uColor = gl.getUniformLocation(glProgram, 'uColor');
var uLightPos = gl.getUniformLocation(glProgram, 'uLightPos');
var uAmbient = gl.getUniformLocation(glProgram, 'uAmbient');
if (uProj) gl.uniformMatrix4fv(uProj, false, proj);
if (uView) gl.uniformMatrix4fv(uView, false, view);
if (uModel) gl.uniformMatrix4fv(uModel, false, world.elements);
if (uColor) { var c = mat.color; gl.uniform3f(uColor, c.r, c.g, c.b); }
if (uLightPos) gl.uniform3f(uLightPos, 5, 10, 5);
if (uAmbient) gl.uniform3f(uAmbient, 0.3, 0.3, 0.3);
var posAttr = gl.getAttribLocation(glProgram, 'aPosition');
var normAttr = gl.getAttribLocation(glProgram, 'aNormal');
var uvAttr = gl.getAttribLocation(glProgram, 'aUV');
if (posAttr >= 0 && geo.attributes.position) {
var posBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
gl.bufferData(gl.ARRAY_BUFFER, geo.attributes.position.array, gl.STATIC_DRAW);
gl.vertexAttribPointer(posAttr, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(posAttr);
}
if (normAttr >= 0 && geo.attributes.normal) {
var normBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, normBuffer);
gl.bufferData(gl.ARRAY_BUFFER, geo.attributes.normal.array, gl.STATIC_DRAW);
gl.vertexAttribPointer(normAttr, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(normAttr);
}
if (uvAttr >= 0 && geo.attributes.uv) {
var uvBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
gl.bufferData(gl.ARRAY_BUFFER, geo.attributes.uv.array, gl.STATIC_DRAW);
gl.vertexAttribPointer(uvAttr, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(uvAttr);
}
var index = geo.index;
if (index) {
var indexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, index.array, gl.STATIC_DRAW);
gl.drawElements(gl.TRIANGLES, index.array.length, gl.UNSIGNED_SHORT, 0);
} else {
var count = geo.attributes.position ? geo.attributes.position.count : 0;
gl.drawArrays(gl.TRIANGLES, 0, count);
}
}
for (var i=0;i<mesh.children.length;i++) renderMesh(mesh.children[i], world);
};
renderMesh(scene, null);
};
function getProgram(gl, material, geometry) {
var needsNormal = geometry.attributes.normal ? true : false;
var cacheKey = material.constructor.name + (needsNormal?'N':'');
if (WebGL2Renderer._programCache[cacheKey]) return WebGL2Renderer._programCache[cacheKey];
var vs = 'attribute vec3 aPosition;';
if (needsNormal) vs += 'attribute vec3 aNormal;';
vs += 'attribute vec2 aUV; uniform mat4 uProjection; uniform mat4 uView; uniform mat4 uModel; varying vec3 vNormal; varying vec2 vUV; varying vec3 vWorldPos; void main() { vec4 worldPos = uModel * vec4(aPosition,1.0); vWorldPos = worldPos.xyz; vNormal = '+(needsNormal?'aNormal':'vec3(0,0,0)')+'; vUV = aUV; gl_Position = uProjection * uView * worldPos; }';
var fs = '';
if (material instanceof MeshBasicMaterial) {
fs = 'uniform vec3 uColor; varying vec3 vNormal; varying vec2 vUV; void main() { gl_FragColor = vec4(uColor, 1.0); }';
} else if (material instanceof MeshStandardMaterial) {
fs = 'uniform vec3 uColor; uniform vec3 uLightPos; uniform vec3 uAmbient; varying vec3 vNormal; varying vec3 vWorldPos; void main() { vec3 normal = normalize(vNormal); vec3 lightDir = normalize(uLightPos - vWorldPos); float diff = max(dot(normal, lightDir), 0.0); vec3 ambient = uAmbient * uColor; vec3 diffuse = diff * uColor; gl_FragColor = vec4(ambient + diffuse, 1.0); }';
}
var vShader = compileShader(gl, gl.VERTEX_SHADER, vs);
var fShader = compileShader(gl, gl.FRAGMENT_SHADER, fs);
var program = gl.createProgram();
gl.attachShader(program, vShader);
gl.attachShader(program, fShader);
gl.linkProgram(program);
if (!gl.getProgramParameter(program, gl.LINK_STATUS)) console.error(gl.getProgramInfoLog(program));
WebGL2Renderer._programCache[cacheKey] = program;
return program;
}
WebGL2Renderer._programCache = {};
function compileShader(gl, type, source) {
var shader = gl.createShader(type);
gl.shaderSource(shader, source);
gl.compileShader(shader);
if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(shader));
return shader;
}
axomic.WebGL2Renderer = WebGL2Renderer;

var Raycaster = function(origin, direction) { this.origin = origin || new Vector3(); this.direction = direction || new Vector3(0,0,-1); };
Raycaster.prototype.setFromCamera = function(coords, camera) {
var origin = new Vector3(coords.x, coords.y, -1).applyMatrix4(camera.projectionMatrix.clone().invert());
var direction = origin.clone().normalize();
this.origin.copy(camera.position);
this.direction.copy(direction);
};
Raycaster.prototype.intersectObjects = function(objects) {
var results = [];
for (var i=0;i<objects.length;i++) {
var obj = objects[i];
if (obj instanceof Mesh) {
obj.updateWorldMatrix(obj.parent ? obj.parent.matrix : null);
var worldPos = obj.position.clone();
var dist = worldPos.distanceTo(this.origin);
results.push({ object: obj, distance: dist, point: worldPos });
}
}
results.sort(function(a,b){return a.distance - b.distance;});
return results;
};
axomic.Raycaster = Raycaster;

var OrbitControls = function(camera, domElement) {
this.camera = camera;
this.target = new Vector3(0,0,0);
this.domElement = domElement;
this.isDragging = false;
this.spherical = { radius: 1, phi: Math.PI/4, theta: Math.PI/4 };
this.update();
var self = this;
domElement.addEventListener('mousedown', function(e) { self.isDragging = true; self.prevMouse = {x:e.clientX, y:e.clientY}; });
window.addEventListener('mouseup', function() { self.isDragging = false; });
window.addEventListener('mousemove', function(e) {
if (!self.isDragging) return;
var dx = e.clientX - self.prevMouse.x, dy = e.clientY - self.prevMouse.y;
self.spherical.theta -= dx * 0.005;
self.spherical.phi -= dy * 0.005;
self.spherical.phi = Math.max(0.1, Math.min(Math.PI-0.1, self.spherical.phi));
self.prevMouse = {x:e.clientX, y:e.clientY};
self.update();
});
domElement.addEventListener('wheel', function(e) {
e.preventDefault();
self.spherical.radius += e.deltaY * 0.01;
self.spherical.radius = Math.max(0.5, self.spherical.radius);
self.update();
});
};
OrbitControls.prototype.update = function() {
var sinPhi = Math.sin(this.spherical.phi);
var cosPhi = Math.cos(this.spherical.phi);
var sinTheta = Math.sin(this.spherical.theta);
var cosTheta = Math.cos(this.spherical.theta);
this.camera.position.x = this.target.x + this.spherical.radius * sinPhi * cosTheta;
this.camera.position.y = this.target.y + this.spherical.radius * cosPhi;
this.camera.position.z = this.target.z + this.spherical.radius * sinPhi * sinTheta;
this.camera.lookAt(this.target.x, this.target.y, this.target.z);
};
axomic.OrbitControls = OrbitControls;

return axomic;
})();
window.axomic = axomic;
