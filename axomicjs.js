(function(global) {
'use strict';
var axomicjs = {};

axomicjs.Math = {};
axomicjs.Math.DEG2RAD = Math.PI / 180;
axomicjs.Math.RAD2DEG = 180 / Math.PI;
axomicjs.Math.clamp = function(value, min, max) { return Math.max(min, Math.min(max, value)); };
axomicjs.Math.lerp = function(x, y, t) { return (1 - t) * x + t * y; };

axomicjs.Vector2 = function(x, y) { this.x = x || 0; this.y = y || 0; };
axomicjs.Vector2.prototype.set = function(x, y) { this.x = x; this.y = y; return this; };
axomicjs.Vector2.prototype.copy = function(v) { this.x = v.x; this.y = v.y; return this; };
axomicjs.Vector2.prototype.clone = function() { return new axomicjs.Vector2(this.x, this.y); };
axomicjs.Vector2.prototype.add = function(v) { this.x += v.x; this.y += v.y; return this; };
axomicjs.Vector2.prototype.sub = function(v) { this.x -= v.x; this.y -= v.y; return this; };
axomicjs.Vector2.prototype.multiplyScalar = function(s) { this.x *= s; this.y *= s; return this; };
axomicjs.Vector2.prototype.length = function() { return Math.sqrt(this.x * this.x + this.y * this.y); };
axomicjs.Vector2.prototype.normalize = function() { var l = this.length(); if (l > 0) { this.x /= l; this.y /= l; } return this; };
axomicjs.Vector2.prototype.dot = function(v) { return this.x * v.x + this.y * v.y; };
axomicjs.Vector2.prototype.distanceTo = function(v) { var dx = this.x - v.x, dy = this.y - v.y; return Math.sqrt(dx * dx + dy * dy); };

axomicjs.Vector3 = function(x, y, z) { this.x = x || 0; this.y = y || 0; this.z = z || 0; };
axomicjs.Vector3.prototype.set = function(x, y, z) { this.x = x; this.y = y; this.z = z; return this; };
axomicjs.Vector3.prototype.copy = function(v) { this.x = v.x; this.y = v.y; this.z = v.z; return this; };
axomicjs.Vector3.prototype.clone = function() { return new axomicjs.Vector3(this.x, this.y, this.z); };
axomicjs.Vector3.prototype.add = function(v) { this.x += v.x; this.y += v.y; this.z += v.z; return this; };
axomicjs.Vector3.prototype.sub = function(v) { this.x -= v.x; this.y -= v.y; this.z -= v.z; return this; };
axomicjs.Vector3.prototype.multiplyScalar = function(s) { this.x *= s; this.y *= s; this.z *= s; return this; };
axomicjs.Vector3.prototype.length = function() { return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z); };
axomicjs.Vector3.prototype.normalize = function() { var l = this.length(); if (l > 0) { this.x /= l; this.y /= l; this.z /= l; } return this; };
axomicjs.Vector3.prototype.dot = function(v) { return this.x * v.x + this.y * v.y + this.z * v.z; };
axomicjs.Vector3.prototype.cross = function(v) { var ax = this.x, ay = this.y, az = this.z; this.x = ay * v.z - az * v.y; this.y = az * v.x - ax * v.z; this.z = ax * v.y - ay * v.x; return this; };
axomicjs.Vector3.prototype.distanceTo = function(v) { var dx = this.x - v.x, dy = this.y - v.y, dz = this.z - v.z; return Math.sqrt(dx * dx + dy * dy + dz * dz); };
axomicjs.Vector3.prototype.applyMatrix4 = function(m) { var x = this.x, y = this.y, z = this.z; var e = m.elements; var w = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]); this.x = (e[0] * x + e[4] * y + e[8] * z + e[12]) * w; this.y = (e[1] * x + e[5] * y + e[9] * z + e[13]) * w; this.z = (e[2] * x + e[6] * y + e[10] * z + e[14]) * w; return this; };
axomicjs.Vector3.prototype.lerp = function(v, t) { this.x += (v.x - this.x) * t; this.y += (v.y - this.y) * t; this.z += (v.z - this.z) * t; return this; };

axomicjs.Vector4 = function(x, y, z, w) { this.x = x || 0; this.y = y || 0; this.z = z || 0; this.w = (w !== undefined) ? w : 1; };
axomicjs.Vector4.prototype.set = function(x, y, z, w) { this.x = x; this.y = y; this.z = z; this.w = w; return this; };
axomicjs.Vector4.prototype.copy = function(v) { this.x = v.x; this.y = v.y; this.z = v.z; this.w = v.w; return this; };
axomicjs.Vector4.prototype.clone = function() { return new axomicjs.Vector4(this.x, this.y, this.z, this.w); };

axomicjs.Matrix3 = function() { this.elements = [1,0,0, 0,1,0, 0,0,1]; };
axomicjs.Matrix3.prototype.set = function(n11,n12,n13,n21,n22,n23,n31,n32,n33) { var e = this.elements; e[0]=n11;e[1]=n21;e[2]=n31;e[3]=n12;e[4]=n22;e[5]=n32;e[6]=n13;e[7]=n23;e[8]=n33; return this; };
axomicjs.Matrix3.prototype.identity = function() { this.set(1,0,0,0,1,0,0,0,1); return this; };

axomicjs.Matrix4 = function() { this.elements = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]; };
axomicjs.Matrix4.prototype.set = function(n11,n12,n13,n14,n21,n22,n23,n24,n31,n32,n33,n34,n41,n42,n43,n44) {
var e=this.elements; e[0]=n11;e[4]=n12;e[8]=n13;e[12]=n14; e[1]=n21;e[5]=n22;e[9]=n23;e[13]=n24; e[2]=n31;e[6]=n32;e[10]=n33;e[14]=n34; e[3]=n41;e[7]=n42;e[11]=n43;e[15]=n44; return this;
};
axomicjs.Matrix4.prototype.identity = function() { this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1); return this; };
axomicjs.Matrix4.prototype.multiply = function(m) { var a=this.elements, b=m.elements, r=[]; for(var i=0;i<4;i++) for(var j=0;j<4;j++) { var s=0; for(var k=0;k<4;k++) s+=a[i+4*k]*b[k+4*j]; r[i+4*j]=s; } for(var i=0;i<16;i++) a[i]=r[i]; return this; };
axomicjs.Matrix4.prototype.compose = function(position, quaternion, scale) {
var x=quaternion.x, y=quaternion.y, z=quaternion.z, w=quaternion.w;
var x2=x+x, y2=y+y, z2=z+z;
var xx=x*x2, xy=x*y2, xz=x*z2, yy=y*y2, yz=y*z2, zz=z*z2;
var wx=w*x2, wy=w*y2, wz=w*z2;
var sx=scale.x, sy=scale.y, sz=scale.z;
var e=this.elements;
e[0]=(1-(yy+zz))*sx; e[4]=(xy-wz)*sy; e[8]=(xz+wy)*sz; e[12]=position.x;
e[1]=(xy+wz)*sx; e[5]=(1-(xx+zz))*sy; e[9]=(yz-wx)*sz; e[13]=position.y;
e[2]=(xz-wy)*sx; e[6]=(yz+wx)*sy; e[10]=(1-(xx+yy))*sz; e[14]=position.z;
e[3]=0; e[7]=0; e[11]=0; e[15]=1;
return this;
};
axomicjs.Matrix4.prototype.lookAt = function(eye, target, up) {
var z = new axomicjs.Vector3().copy(eye).sub(target).normalize();
var x = new axomicjs.Vector3().copy(up).cross(z).normalize();
var y = new axomicjs.Vector3().copy(z).cross(x).normalize();
var e=this.elements;
e[0]=x.x; e[4]=y.x; e[8]=z.x; e[12]=eye.x;
e[1]=x.y; e[5]=y.y; e[9]=z.y; e[13]=eye.y;
e[2]=x.z; e[6]=y.z; e[10]=z.z; e[14]=eye.z;
e[3]=0; e[7]=0; e[11]=0; e[15]=1;
return this;
};
axomicjs.Matrix4.prototype.perspective = function(fov, aspect, near, far) {
var f = 1.0 / Math.tan(fov * Math.PI / 360);
var nf = 1 / (near - far);
var e=this.elements;
e[0]=f/aspect; e[4]=0; e[8]=0; e[12]=0;
e[1]=0; e[5]=f; e[9]=0; e[13]=0;
e[2]=0; e[6]=0; e[10]=(far+near)*nf; e[14]=2*far*near*nf;
e[3]=0; e[7]=0; e[11]=-1; e[15]=0;
return this;
};
axomicjs.Matrix4.prototype.transformPoint = function(v) {
var e=this.elements;
var x=v.x, y=v.y, z=v.z;
var w = e[3]*x + e[7]*y + e[11]*z + e[15];
var iw = w!==0?1/w:1;
return new axomicjs.Vector3((e[0]*x+e[4]*y+e[8]*z+e[12])*iw, (e[1]*x+e[5]*y+e[9]*z+e[13])*iw, (e[2]*x+e[6]*y+e[10]*z+e[14])*iw);
};

axomicjs.Quaternion = function(x, y, z, w) { this.x = x || 0; this.y = y || 0; this.z = z || 0; this.w = (w !== undefined) ? w : 1; };
axomicjs.Quaternion.prototype.set = function(x,y,z,w) { this.x=x; this.y=y; this.z=z; this.w=w; return this; };
axomicjs.Quaternion.prototype.copy = function(q) { this.x=q.x; this.y=q.y; this.z=q.z; this.w=q.w; return this; };
axomicjs.Quaternion.prototype.setFromEuler = function(euler) {
var c1=Math.cos(euler.x/2), s1=Math.sin(euler.x/2);
var c2=Math.cos(euler.y/2), s2=Math.sin(euler.y/2);
var c3=Math.cos(euler.z/2), s3=Math.sin(euler.z/2);
this.x = s1*c2*c3 + c1*s2*s3;
this.y = c1*s2*c3 - s1*c2*s3;
this.z = c1*c2*s3 + s1*s2*c3;
this.w = c1*c2*c3 - s1*s2*s3;
return this;
};
axomicjs.Quaternion.prototype.slerp = function(q, t) {
if(t===0) return this;
if(t===1) return this.copy(q);
var cosHalfTheta = this.w*q.w + this.x*q.x + this.y*q.y + this.z*q.z;
if(cosHalfTheta<0) { q = new axomicjs.Quaternion(-q.x,-q.y,-q.z,-q.w); cosHalfTheta = -cosHalfTheta; }
if(cosHalfTheta>=1.0) return this;
var sinHalfTheta = Math.sqrt(1-cosHalfTheta*cosHalfTheta);
if(Math.abs(sinHalfTheta)<0.001) { this.w=this.w*0.5+q.w*0.5; this.x=this.x*0.5+q.x*0.5; this.y=this.y*0.5+q.y*0.5; this.z=this.z*0.5+q.z*0.5; return this; }
var halfTheta = Math.atan2(sinHalfTheta, cosHalfTheta);
var ratioA = Math.sin((1-t)*halfTheta)/sinHalfTheta;
var ratioB = Math.sin(t*halfTheta)/sinHalfTheta;
this.w = this.w*ratioA + q.w*ratioB;
this.x = this.x*ratioA + q.x*ratioB;
this.y = this.y*ratioA + q.y*ratioB;
this.z = this.z*ratioA + q.z*ratioB;
return this;
};

axomicjs.Euler = function(x,y,z) { this.x=x||0; this.y=y||0; this.z=z||0; };
axomicjs.Euler.prototype.set = function(x,y,z) { this.x=x; this.y=y; this.z=z; return this; };
axomicjs.Euler.prototype.copy = function(e) { this.x=e.x; this.y=e.y; this.z=e.z; return this; };

axomicjs.Color = function(r,g,b) {
if (arguments.length === 1) { this.setHex(r); } else { this.r = r || 0; this.g = g || 0; this.b = b || 0; }
};
axomicjs.Color.prototype.setRGB = function(r,g,b) { this.r=r; this.g=g; this.b=b; return this; };
axomicjs.Color.prototype.setHex = function(hex) { this.r=((hex>>16)&255)/255; this.g=((hex>>8)&255)/255; this.b=(hex&255)/255; return this; };
axomicjs.Color.prototype.clone = function() { return new axomicjs.Color(this.r, this.g, this.b); };
axomicjs.Color.prototype.multiplyScalar = function(s) { this.r=Math.min(1,this.r*s); this.g=Math.min(1,this.g*s); this.b=Math.min(1,this.b*s); return this; };
axomicjs.Color.prototype.toHex = function() { return (Math.floor(this.r*255)<<16)|(Math.floor(this.g*255)<<8)|Math.floor(this.b*255); };
axomicjs.Color.prototype.lerp = function(c, t) { this.r=axomicjs.Math.lerp(this.r,c.r,t); this.g=axomicjs.Math.lerp(this.g,c.g,t); this.b=axomicjs.Math.lerp(this.b,c.b,t); return this; };

axomicjs.EventDispatcher = function() { this._listeners = {}; };
axomicjs.EventDispatcher.prototype.addEventListener = function(type, listener) { if(!this._listeners[type]) this._listeners[type]=[]; this._listeners[type].push(listener); };
axomicjs.EventDispatcher.prototype.removeEventListener = function(type, listener) { if(!this._listeners[type]) return; var i=this._listeners[type].indexOf(listener); if(i>=0) this._listeners[type].splice(i,1); };
axomicjs.EventDispatcher.prototype.dispatchEvent = function(event) { if(!this._listeners[event.type]) return; for(var i=0;i<this._listeners[event.type].length;i++) this._listeners[event.type][i](event); };

axomicjs.Raycaster = function(origin, direction) { this.origin = origin || new axomicjs.Vector3(); this.direction = direction || new axomicjs.Vector3(); };
axomicjs.Raycaster.prototype.set = function(origin, direction) { this.origin.copy(origin); this.direction.copy(direction).normalize(); return this; };
axomicjs.Raycaster.prototype.intersectObject = function(object) {
var results = [];
if(!object.visible) return results;
object.updateMatrix();
var localOrigin = new axomicjs.Vector3().copy(this.origin).applyMatrix4(new axomicjs.Matrix4().identity().multiply(object.matrix).invert ? null : null);
return results;
};
axomicjs.Raycaster.prototype.intersectObjects = function(objects) { var results=[]; for(var i=0;i<objects.length;i++) results=results.concat(this.intersectObject(objects[i])); results.sort(function(a,b){return a.distance-b.distance;}); return results; };

axomicjs.Object3D = function() {
axomicjs.EventDispatcher.call(this);
this.position = new axomicjs.Vector3();
this.rotation = new axomicjs.Euler();
this.quaternion = new axomicjs.Quaternion();
this.scale = new axomicjs.Vector3(1,1,1);
this.matrix = new axomicjs.Matrix4();
this.children = [];
this.parent = null;
this.visible = true;
this.castShadow = false;
this.receiveShadow = false;
this.frustumCulled = true;
};
axomicjs.Object3D.prototype = Object.create(axomicjs.EventDispatcher.prototype);
axomicjs.Object3D.prototype.constructor = axomicjs.Object3D;
axomicjs.Object3D.prototype.add = function(child) { if(child.parent) child.parent.remove(child); child.parent=this; this.children.push(child); return this; };
axomicjs.Object3D.prototype.remove = function(child) { var i=this.children.indexOf(child); if(i>=0) { this.children.splice(i,1); child.parent=null; } return this; };
axomicjs.Object3D.prototype.clear = function() { for(var i=0;i<this.children.length;i++) this.children[i].parent=null; this.children.length=0; };
axomicjs.Object3D.prototype.updateMatrix = function() { this.quaternion.setFromEuler(this.rotation); this.matrix.compose(this.position, this.quaternion, this.scale); };
axomicjs.Object3D.prototype.getWorldPosition = function() { this.updateMatrix(); var wp=new axomicjs.Vector3(); var e=this.matrix.elements; wp.set(e[12],e[13],e[14]); if(this.parent){var pw=this.parent.getWorldPosition(); wp.add(pw);} return wp; };
axomicjs.Object3D.prototype.lookAt = function(x,y,z) { var target=new axomicjs.Vector3(x,y,z); var up=new axomicjs.Vector3(0,1,0); var m4=new axomicjs.Matrix4().lookAt(this.position,target,up); this.quaternion.setFromEuler(this.rotation); return this; };

axomicjs.Scene = function() { axomicjs.Object3D.call(this); this.fog=null; this.overrideMaterial=null; };
axomicjs.Scene.prototype = Object.create(axomicjs.Object3D.prototype);
axomicjs.Scene.prototype.constructor = axomicjs.Scene;

axomicjs.Fog = function(color, near, far) { this.color=new axomicjs.Color(color); this.near=near||1; this.far=far||1000; };

axomicjs.PerspectiveCamera = function(fov, aspect, near, far) {
axomicjs.Object3D.call(this);
this.fov = fov || 60;
this.aspect = aspect || 1;
this.near = near || 0.1;
this.far = far || 1000;
this.projectionMatrix = new axomicjs.Matrix4();
this.viewMatrix = new axomicjs.Matrix4();
this.updateProjectionMatrix();
};
axomicjs.PerspectiveCamera.prototype = Object.create(axomicjs.Object3D.prototype);
axomicjs.PerspectiveCamera.prototype.constructor = axomicjs.PerspectiveCamera;
axomicjs.PerspectiveCamera.prototype.updateProjectionMatrix = function() { this.projectionMatrix.perspective(this.fov, this.aspect, this.near, this.far); };
axomicjs.PerspectiveCamera.prototype.lookAt = function(x,y,z) { var t=new axomicjs.Vector3(x,y,z); this.viewMatrix.lookAt(this.position, t, new axomicjs.Vector3(0,1,0)); };
axomicjs.PerspectiveCamera.prototype.setViewOffset = function(fullWidth, fullHeight, x, y, width, height) {};

axomicjs.Geometry = function() { this.vertices=[]; this.normals=[]; this.uvs=[]; this.faces=[]; this.faceNormals=[]; };
axomicjs.Geometry.prototype.computeFaceNormals = function() {
this.faceNormals=[];
for(var i=0;i<this.faces.length;i++) {
var f=this.faces[i];
var v0=this.vertices[f[0]], v1=this.vertices[f[1]], v2=this.vertices[f[2]];
var a=new axomicjs.Vector3().copy(v1).sub(v0), b=new axomicjs.Vector3().copy(v2).sub(v0);
this.faceNormals.push(new axomicjs.Vector3().copy(a).cross(b).normalize());
}
};
axomicjs.Geometry.prototype.computeVertexNormals = function() {
this.normals=new Array(this.vertices.length);
for(var i=0;i<this.vertices.length;i++) this.normals[i]=new axomicjs.Vector3();
for(var i=0;i<this.faces.length;i++) {
var f=this.faces[i];
var fn=this.faceNormals[i]||new axomicjs.Vector3();
for(var j=0;j<3;j++) this.normals[f[j]].add(fn);
}
for(var i=0;i<this.normals.length;i++) this.normals[i].normalize();
};
axomicjs.BoxGeometry = function(w,h,d) { axomicjs.Geometry.call(this); w/=2; h/=2; d/=2; var v=[[-w,-h,d],[w,-h,d],[w,h,d],[-w,h,d],[-w,-h,-d],[w,-h,-d],[w,h,-d],[-w,h,-d]]; this.vertices=v.map(function(a){return new axomicjs.Vector3(a[0],a[1],a[2]);}); this.uvs=[new axomicjs.Vector2(0,0),new axomicjs.Vector2(1,0),new axomicjs.Vector2(1,1),new axomicjs.Vector2(0,1),new axomicjs.Vector2(0,0),new axomicjs.Vector2(1,0),new axomicjs.Vector2(1,1),new axomicjs.Vector2(0,1)]; this.faces=[[0,1,2],[0,2,3],[1,5,6],[1,6,2],[5,4,7],[5,7,6],[4,0,3],[4,3,7],[3,2,6],[3,6,7],[4,5,1],[4,1,0]]; this.computeFaceNormals(); };
axomicjs.BoxGeometry.prototype = Object.create(axomicjs.Geometry.prototype);
axomicjs.SphereGeometry = function(r,segW,segH){ axomicjs.Geometry.call(this); segW=segW||16; segH=segH||12; var vs=[], uvs=[]; for(var i=0;i<=segH;i++){ var phi=i/segH*Math.PI, y=Math.cos(phi)*r, rad=Math.sin(phi)*r; for(var j=0;j<=segW;j++){ var th=j/segW*Math.PI*2; vs.push(new axomicjs.Vector3(rad*Math.cos(th),y,rad*Math.sin(th))); uvs.push(new axomicjs.Vector2(j/segW,i/segH)); } } this.vertices=vs; this.uvs=uvs; this.faces=[]; for(var i=0;i<segH;i++) for(var j=0;j<segW;j++){ var a=i*(segW+1)+j, b=a+segW+1, c=a+1, d=b+1; this.faces.push([a,b,c]); this.faces.push([c,b,d]); } this.computeFaceNormals(); };
axomicjs.SphereGeometry.prototype = Object.create(axomicjs.Geometry.prototype);
axomicjs.CylinderGeometry = function(rT,rB,h,seg){ axomicjs.Geometry.call(this); seg=seg||16; var hh=h/2, vs=[]; vs.push(new axomicjs.Vector3(0,hh,0)); vs.push(new axomicjs.Vector3(0,-hh,0)); var topS=2, botS=topS+seg; for(var i=0;i<seg;i++){ var a=i/seg*Math.PI*2, x=Math.cos(a), z=Math.sin(a); vs.push(new axomicjs.Vector3(x*rT,hh,z*rT)); vs.push(new axomicjs.Vector3(x*rB,-hh,z*rB)); } this.vertices=vs; this.faces=[]; for(var i=0;i<seg;i++){ var n=(i+1)%seg, ti=topS+i, tn=topS+n, bi=botS+i, bn=botS+n; this.faces.push([0,ti,tn]); this.faces.push([1,bn,bi]); this.faces.push([ti,bi,bn]); this.faces.push([ti,bn,tn]); } this.computeFaceNormals(); };
axomicjs.CylinderGeometry.prototype = Object.create(axomicjs.Geometry.prototype);
axomicjs.PlaneGeometry = function(w,d){ axomicjs.Geometry.call(this); w/=2; d/=2; this.vertices=[new axomicjs.Vector3(-w,0,-d),new axomicjs.Vector3(w,0,-d),new axomicjs.Vector3(w,0,d),new axomicjs.Vector3(-w,0,d)]; this.uvs=[new axomicjs.Vector2(0,0),new axomicjs.Vector2(1,0),new axomicjs.Vector2(1,1),new axomicjs.Vector2(0,1)]; this.faces=[[0,1,2],[0,2,3]]; this.computeFaceNormals(); };
axomicjs.PlaneGeometry.prototype = Object.create(axomicjs.Geometry.prototype);
axomicjs.TorusGeometry = function(R,r,seg,rings){ axomicjs.Geometry.call(this); seg=seg||20; rings=rings||12; var vs=[]; for(var i=0;i<=rings;i++){ var phi=i/rings*Math.PI*2, cp=Math.cos(phi), sp=Math.sin(phi); for(var j=0;j<=seg;j++){ var th=j/seg*Math.PI*2, ct=Math.cos(th), st=Math.sin(th); vs.push(new axomicjs.Vector3((R+r*ct)*cp, r*st, (R+r*ct)*sp)); } } this.vertices=vs; this.faces=[]; var sp1=seg+1; for(var i=0;i<rings;i++) for(var j=0;j<seg;j++){ var a=i*sp1+j, b=a+sp1, c=a+1, d=b+1; this.faces.push([a,b,c]); this.faces.push([c,b,d]); } this.computeFaceNormals(); };
axomicjs.TorusGeometry.prototype = Object.create(axomicjs.Geometry.prototype);
axomicjs.OctahedronGeometry = function(r){ axomicjs.Geometry.call(this); this.vertices=[new axomicjs.Vector3(0,r,0),new axomicjs.Vector3(0,-r,0),new axomicjs.Vector3(r,0,0),new axomicjs.Vector3(-r,0,0),new axomicjs.Vector3(0,0,r),new axomicjs.Vector3(0,0,-r)]; this.faces=[[0,2,4],[0,4,3],[0,3,5],[0,5,2],[1,4,2],[1,3,4],[1,5,3],[1,2,5]]; this.computeFaceNormals(); };
axomicjs.OctahedronGeometry.prototype = Object.create(axomicjs.Geometry.prototype);

axomicjs.Texture = function(src) {
this.image = null;
this.src = src;
this.loaded = false;
var that = this;
if(src) {
this.image = new Image();
this.image.onload = function() { that.loaded=true; that.dispatchEvent({type:'load'}); };
this.image.src = src;
}
};
axomicjs.Texture.prototype = Object.create(axomicjs.EventDispatcher.prototype);
axomicjs.Texture.prototype.getPixel = function(u, v) {
if(!this.loaded||!this.image) return {r:255,g:255,b:255};
var x=Math.floor(u*(this.image.width-1));
var y=Math.floor((1-v)*(this.image.height-1));
var canvas=document.createElement('canvas');
canvas.width=this.image.width; canvas.height=this.image.height;
var ctx=canvas.getContext('2d');
ctx.drawImage(this.image,0,0);
var data=ctx.getImageData(x,y,1,1).data;
return {r:data[0],g:data[1],b:data[2]};
};

axomicjs.Material = function(opts) {
axomicjs.EventDispatcher.call(this);
opts=opts||{};
this.color=opts.color!==undefined?new axomicjs.Color(opts.color):new axomicjs.Color(0xffffff);
this.roughness=opts.roughness||0.5;
this.metalness=opts.metalness||0;
this.map=opts.map||null;
this.emissive=opts.emissive!==undefined?new axomicjs.Color(opts.emissive):new axomicjs.Color(0x000000);
this.transparent=opts.transparent||false;
this.opacity=opts.opacity!==undefined?opts.opacity:1;
this.wireframe=opts.wireframe||false;
this.side=opts.side||0;
};
axomicjs.Material.prototype = Object.create(axomicjs.EventDispatcher.prototype);
axomicjs.MeshStandardMaterial = function(opts) { axomicjs.Material.call(this,opts); };
axomicjs.MeshStandardMaterial.prototype = Object.create(axomicjs.Material.prototype);
axomicjs.MeshBasicMaterial = function(opts) { axomicjs.Material.call(this,opts); this.roughness=1; };
axomicjs.MeshBasicMaterial.prototype = Object.create(axomicjs.Material.prototype);
axomicjs.MeshPhongMaterial = function(opts) { axomicjs.Material.call(this,opts); this.specular=opts.specular!==undefined?new axomicjs.Color(opts.specular):new axomicjs.Color(0x111111); this.shininess=opts.shininess||30; };
axomicjs.MeshPhongMaterial.prototype = Object.create(axomicjs.Material.prototype);

axomicjs.Light = function(color,intensity) { axomicjs.Object3D.call(this); this.color=new axomicjs.Color(color!==undefined?color:0xffffff); this.intensity=intensity!==undefined?intensity:1; };
axomicjs.Light.prototype = Object.create(axomicjs.Object3D.prototype);
axomicjs.AmbientLight = function(color,intensity) { axomicjs.Light.call(this,color,intensity); };
axomicjs.AmbientLight.prototype = Object.create(axomicjs.Light.prototype);
axomicjs.DirectionalLight = function(color,intensity) { axomicjs.Light.call(this,color,intensity); };
axomicjs.DirectionalLight.prototype = Object.create(axomicjs.Light.prototype);
axomicjs.PointLight = function(color,intensity,range) { axomicjs.Light.call(this,color,intensity); this.range=range||10; };
axomicjs.PointLight.prototype = Object.create(axomicjs.Light.prototype);
axomicjs.SpotLight = function(color,intensity,range,angle,penumbra) { axomicjs.Light.call(this,color,intensity); this.range=range||10; this.angle=angle||Math.PI/6; this.penumbra=penumbra||0; };
axomicjs.SpotLight.prototype = Object.create(axomicjs.Light.prototype);

axomicjs.Mesh = function(geometry,material) { axomicjs.Object3D.call(this); this.geometry=geometry; this.material=material; };
axomicjs.Mesh.prototype = Object.create(axomicjs.Object3D.prototype);
axomicjs.Group = function() { axomicjs.Object3D.call(this); };
axomicjs.Group.prototype = Object.create(axomicjs.Object3D.prototype);

axomicjs.Sprite = function(material) { axomicjs.Object3D.call(this); this.material=material; };
axomicjs.Sprite.prototype = Object.create(axomicjs.Object3D.prototype);
axomicjs.SpriteMaterial = function(opts) { axomicjs.Material.call(this,opts); this.map=opts.map||null; };

axomicjs.ParticleSystem = function(maxParticles) {
axomicjs.Object3D.call(this);
this.particles = [];
this.maxParticles = maxParticles||1000;
this.particleGeometry = new axomicjs.Geometry();
};
axomicjs.ParticleSystem.prototype = Object.create(axomicjs.Object3D.prototype);
axomicjs.ParticleSystem.prototype.emit = function(position, velocity, life, color, size) {
if(this.particles.length>=this.maxParticles) return;
this.particles.push({
position: position.clone(),
velocity: velocity.clone(),
life: life||1,
maxLife: life||1,
color: color||new axomicjs.Color(1,1,1),
size: size||1
});
};
axomicjs.ParticleSystem.prototype.update = function(dt) {
for(var i=this.particles.length-1;i>=0;i--) {
var p=this.particles[i];
p.life-=dt;
if(p.life<=0) { this.particles.splice(i,1); continue; }
p.position.add(new axomicjs.Vector3().copy(p.velocity).multiplyScalar(dt));
}
};

axomicjs.AnimationClip = function(name,duration,tracks) { this.name=name; this.duration=duration; this.tracks=tracks||[]; };
axomicjs.KeyframeTrack = function(name,times,values) { this.name=name; this.times=times; this.values=values; };
axomicjs.AnimationMixer = function(root) { this.root=root; this.clips=[]; this._currentClip=null; this._currentTime=0; };
axomicjs.AnimationMixer.prototype.play = function(clip) { this._currentClip=clip; this._currentTime=0; };
axomicjs.AnimationMixer.prototype.update = function(dt) {
if(!this._currentClip) return;
this._currentTime+=dt;
if(this._currentTime>this._currentClip.duration) this._currentTime=this._currentTime%this._currentClip.duration;
var t=this._currentTime;
for(var i=0;i<this._currentClip.tracks.length;i++) {
var track=this._currentClip.tracks[i];
var val=track.values[0];
for(var j=1;j<track.times.length;j++) {
if(t<track.times[j]) {
var alpha=(t-track.times[j-1])/(track.times[j]-track.times[j-1]);
val=axomicjs.Math.lerp(track.values[j-1],track.values[j],alpha);
break;
}
val=track.values[track.values.length-1];
}
var parts=track.name.split('.');
if(parts[0]==='position'&&this.root.position) this.root.position[parts[1]]=val;
else if(parts[0]==='rotation'&&this.root.rotation) this.root.rotation[parts[1]]=val;
}
};

axomicjs.AudioListener = function() { axomicjs.Object3D.call(this); };
axomicjs.AudioListener.prototype = Object.create(axomicjs.Object3D.prototype);
axomicjs.Audio = function(listener) { this.listener=listener; this.source=null; this.loaded=false; };
axomicjs.Audio.prototype.load = function(src) { var that=this; this.source=new Audio(src); this.source.addEventListener('canplaythrough',function(){that.loaded=true;}); this.source.load(); };
axomicjs.Audio.prototype.play = function() { if(this.source) this.source.play(); };
axomicjs.Audio.prototype.pause = function() { if(this.source) this.source.pause(); };

axomicjs.AxesHelper = function(size) { axomicjs.Object3D.call(this); size=size||1; };
axomicjs.AxesHelper.prototype = Object.create(axomicjs.Object3D.prototype);
axomicjs.GridHelper = function(size,div) { axomicjs.Object3D.call(this); size=size||10; div=div||10; };
axomicjs.GridHelper.prototype = Object.create(axomicjs.Object3D.prototype);

axomicjs.JSONLoader = function() {};
axomicjs.JSONLoader.prototype.load = function(url,callback) {
var xhr=new XMLHttpRequest();
xhr.open('GET',url,true);
xhr.onload=function(){ if(xhr.status===200){ var data=JSON.parse(xhr.responseText); callback(data); } };
xhr.send();
};
axomicjs.TextureLoader = function() {};
axomicjs.TextureLoader.prototype.load = function(src,callback) {
var tex=new axomicjs.Texture(src);
if(callback) tex.addEventListener('load',function(){callback(tex);});
return tex;
};

axomicjs.Renderer = function(width,height,opts) {
opts=opts||{};
this.canvas=document.createElement('canvas');
this.canvas.width=width||800;
this.canvas.height=height||600;
this.ctx=this.canvas.getContext('2d');
this.bgColor=opts.bgColor||'#000000';
this.shadowMapEnabled=opts.shadowMapEnabled||false;
this.sortObjects=true;
};
axomicjs.Renderer.prototype.setSize = function(w,h) { this.canvas.width=w; this.canvas.height=h; };
axomicjs.Renderer.prototype.clear = function() {
this.ctx.fillStyle=this.bgColor||'#000000';
this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
};
axomicjs.Renderer.prototype.render = function(scene,camera) {
var ctx=this.ctx, w=this.canvas.width, h=this.canvas.height;
if(this.bgColor&&this.bgColor!=='transparent'){ctx.fillStyle=this.bgColor; ctx.fillRect(0,0,w,h);}
else{ctx.clearRect(0,0,w,h);}
var allFaces=[];
(function collectFaces(obj,pm) {
if(!obj.visible) return;
if(obj.frustumCulled===false){}
obj.updateMatrix();
var wm=new axomicjs.Matrix4().identity();
if(pm) wm.multiply(pm);
wm.multiply(obj.matrix);
if(obj instanceof axomicjs.Mesh && obj.geometry && obj.geometry.faces.length) {
var geo=obj.geometry;
var mat=obj.material;
for(var fi=0;fi<geo.faces.length;fi++) {
var face=geo.faces[fi];
var v0=wm.transformPoint(geo.vertices[face[0]]);
var v1=wm.transformPoint(geo.vertices[face[1]]);
var v2=wm.transformPoint(geo.vertices[face[2]]);
var v0v=camera.viewMatrix.transformPoint(v0);
var v1v=camera.viewMatrix.transformPoint(v1);
var v2v=camera.viewMatrix.transformPoint(v2);
if(v0v.z<=0.05&&v1v.z<=0.05&&v2v.z<=0.05) continue;
var p0=camera.projectionMatrix.transformPoint(v0v);
var p1=camera.projectionMatrix.transformPoint(v1v);
var p2=camera.projectionMatrix.transformPoint(v2v);
var crossZ=(p1.x-p0.x)*(p2.y-p0.y)-(p1.y-p0.y)*(p2.x-p0.x);
if(!mat.wireframe&&crossZ<=0) continue;
var sx0=(p0.x+1)*w/2, sy0=(-p0.y+1)*h/2;
var sx1=(p1.x+1)*w/2, sy1=(-p1.y+1)*h/2;
var sx2=(p2.x+1)*w/2, sy2=(-p2.y+1)*h/2;
var avgZ=(v0v.z+v1v.z+v2v.z)/3;
var normal=geo.faceNormals[fi]||null;
allFaces.push({
sx0:sx0, sy0:sy0, sx1:sx1, sy1:sy1, sx2:sx2, sy2:sy2,
avgZ:avgZ, material:mat, normal:normal,
wv0:v0, wv1:v1, wv2:v2,
uv0:geo.uvs[face[0]], uv1:geo.uvs[face[1]], uv2:geo.uvs[face[2]]
});
}
}
if(obj instanceof axomicjs.ParticleSystem) {
for(var i=0;i<obj.particles.length;i++) {
var p=obj.particles[i];
var screenPos=camera.projectionMatrix.transformPoint(camera.viewMatrix.transformPoint(p.position));
var sx=(screenPos.x+1)*w/2, sy=(-screenPos.y+1)*h/2;
var lifeRatio=p.life/p.maxLife;
var alpha=lifeRatio;
ctx.fillStyle='rgba('+Math.floor(p.color.r*255)+','+Math.floor(p.color.g*255)+','+Math.floor(p.color.b*255)+','+alpha+')';
ctx.beginPath();
ctx.arc(sx,sy,p.size*2,0,Math.PI*2);
ctx.fill();
}
}
for(var i=0;i<obj.children.length;i++) collectFaces(obj.children[i], wm);
})(scene, null);
allFaces.sort(function(a,b){ return b.avgZ - a.avgZ; });
var lights=[];
(function gatherLights(o){
if(o instanceof axomicjs.AmbientLight||o instanceof axomicjs.DirectionalLight||o instanceof axomicjs.PointLight) lights.push(o);
for(var i=0;i<o.children.length;i++) gatherLights(o.children[i]);
})(scene);
for(var i=0;i<allFaces.length;i++) {
var f=allFaces[i];
var mat=f.material;
var col=mat.color.clone();
if(mat.map&&mat.map.loaded) {
var u=(f.uv0?f.uv0.x:0.5), v=(f.uv0?f.uv0.y:0.5);
var texel=mat.map.getPixel(u,v);
col.setRGB(texel.r/255,texel.g/255,texel.b/255);
}
var lightFactor=0.15;
if(f.normal) {
var centroid=new axomicjs.Vector3((f.wv0.x+f.wv1.x+f.wv2.x)/3,(f.wv0.y+f.wv1.y+f.wv2.y)/3,(f.wv0.z+f.wv1.z+f.wv2.z)/3);
var diff=0, spec=0;
for(var li=0;li<lights.length;li++) {
var light=lights[li];
if(light instanceof axomicjs.AmbientLight) { diff+=light.intensity*0.2; continue; }
var dir, intensity=light.intensity;
if(light instanceof axomicjs.DirectionalLight) { dir=new axomicjs.Vector3().copy(light.position).normalize(); }
else if(light instanceof axomicjs.PointLight) {
dir=new axomicjs.Vector3().copy(light.position).sub(centroid);
var dist=dir.length();
if(dist>light.range) continue;
dir.normalize();
intensity*=Math.max(0,1-dist/light.range);
}
if(dir) {
var dot=Math.max(0,f.normal.dot(dir));
diff+=dot*intensity;
if(mat instanceof axomicjs.MeshPhongMaterial) {
var reflectDir=new axomicjs.Vector3().copy(dir).sub(new axomicjs.Vector3().copy(f.normal).multiplyScalar(2*dot));
var viewDir=new axomicjs.Vector3().copy(camera.position).sub(centroid).normalize();
var specDot=Math.max(0,reflectDir.dot(viewDir));
spec+=Math.pow(specDot,mat.shininess)*intensity;
}
}
}
lightFactor=Math.max(0.08,Math.min(1,diff));
if(mat instanceof axomicjs.MeshPhongMaterial) {
col.r=Math.min(1,col.r*lightFactor+mat.specular.r*spec);
col.g=Math.min(1,col.g*lightFactor+mat.specular.g*spec);
col.b=Math.min(1,col.b*lightFactor+mat.specular.b*spec);
}
}
if(mat instanceof axomicjs.MeshBasicMaterial) lightFactor=1;
var rough=1-mat.roughness*0.5;
lightFactor*=rough;
col.r=Math.min(1,col.r*lightFactor+mat.emissive.r);
col.g=Math.min(1,col.g*lightFactor+mat.emissive.g);
col.b=Math.min(1,col.b*lightFactor+mat.emissive.b);
var alpha=mat.transparent?mat.opacity:1;
var cr=Math.floor(col.r*255), cg=Math.floor(col.g*255), cb=Math.floor(col.b*255);
ctx.fillStyle='rgba('+cr+','+cg+','+cb+','+alpha+')';
ctx.strokeStyle=mat.wireframe?'rgb('+cr+','+cg+','+cb+')':'rgba(0,0,0,0.15)';
ctx.lineWidth=mat.wireframe?1:0.5;
ctx.beginPath(); ctx.moveTo(f.sx0,f.sy0); ctx.lineTo(f.sx1,f.sy1); ctx.lineTo(f.sx2,f.sy2); ctx.closePath();
ctx.fill();
if(!mat.wireframe||mat.wireframe) ctx.stroke();
if(mat.wireframe) { ctx.fillStyle='rgba(0,0,0,0)'; ctx.fill(); }
}
};

axomicjs.Utils = {};
axomicjs.Utils.arrayMax = function(arr) { return Math.max.apply(null,arr); };
axomicjs.Utils.arrayMin = function(arr) { return Math.min.apply(null,arr); };
axomicjs.Utils.generateUUID = function() { return 'xxxx-xxxx-xxxx-xxxx'.replace(/x/g,function(){return Math.floor(Math.random()*16).toString(16);}); };

axomicjs.WebGPU = {};
axomicjs.WebGPU.isAvailable = function() { return typeof navigator !== 'undefined' && !!navigator.gpu; };

global.axomicjs = axomicjs;
})(window);
