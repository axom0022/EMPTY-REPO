class color {
  constructor(r,g,b) {
    this.r = r===undefined?1:r;
    this.g = g===undefined?1:g;
    this.b = b===undefined?1:b;
  }
  setHex(hex) {
    this.r = ((hex>>16)&255)/255;
    this.g = ((hex>>8)&255)/255;
    this.b = (hex&255)/255;
    return this;
  }
  clone() { return new color(this.r,this.g,this.b); }
}

class vector2 {
  constructor(x=0,y=0) { this.x=x; this.y=y; }
  set(x,y) { this.x=x; this.y=y; return this; }
  add(v) { this.x+=v.x; this.y+=v.y; return this; }
  sub(v) { this.x-=v.x; this.y-=v.y; return this; }
  multiplyScalar(s) { this.x*=s; this.y*=s; return this; }
  clone() { return new vector2(this.x,this.y); }
}

class vector3 {
  constructor(x=0,y=0,z=0) { this.x=x; this.y=y; this.z=z; }
  set(x,y,z) { this.x=x; this.y=y; this.z=z; return this; }
  add(v) { this.x+=v.x; this.y+=v.y; this.z+=v.z; return this; }
  sub(v) { this.x-=v.x; this.y-=v.y; this.z-=v.z; return this; }
  multiplyScalar(s) { this.x*=s; this.y*=s; this.z*=s; return this; }
  cross(v) {
    let x=this.y*v.z-this.z*v.y;
    let y=this.z*v.x-this.x*v.z;
    let z=this.x*v.y-this.y*v.x;
    this.x=x; this.y=y; this.z=z; return this;
  }
  dot(v) { return this.x*v.x+this.y*v.y+this.z*v.z; }
  length() { return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z); }
  normalize() { let l=this.length(); if(l!==0) this.multiplyScalar(1/l); return this; }
  clone() { return new vector3(this.x,this.y,this.z); }
}

class vector4 {
  constructor(x=0,y=0,z=0,w=1) { this.x=x; this.y=y; this.z=z; this.w=w; }
  clone() { return new vector4(this.x,this.y,this.z,this.w); }
}

class matrix3 {
  constructor() { this.elements=[1,0,0,0,1,0,0,0,1]; }
  clone() { let m=new matrix3(); m.elements=this.elements.slice(); return m; }
}

class matrix4 {
  constructor() { this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]; }
  makePerspective(left,right,top,bottom,near,far) {
    let x=2*near/(right-left);
    let y=2*near/(top-bottom);
    let a=(right+left)/(right-left);
    let b=(top+bottom)/(top-bottom);
    let c=-(far+near)/(far-near);
    let d=-2*far*near/(far-near);
    this.elements[0]=x; this.elements[4]=0; this.elements[8]=a; this.elements[12]=0;
    this.elements[1]=0; this.elements[5]=y; this.elements[9]=b; this.elements[13]=0;
    this.elements[2]=0; this.elements[6]=0; this.elements[10]=c; this.elements[14]=d;
    this.elements[3]=0; this.elements[7]=0; this.elements[11]=-1; this.elements[15]=0;
    return this;
  }
  makeOrthographic(left,right,top,bottom,near,far) {
    let w=right-left, h=top-bottom, d=far-near;
    this.elements[0]=2/w; this.elements[4]=0; this.elements[8]=0; this.elements[12]=-(right+left)/w;
    this.elements[1]=0; this.elements[5]=2/h; this.elements[9]=0; this.elements[13]=-(top+bottom)/h;
    this.elements[2]=0; this.elements[6]=0; this.elements[10]=-2/d; this.elements[14]=-(far+near)/d;
    this.elements[3]=0; this.elements[7]=0; this.elements[11]=0; this.elements[15]=1;
    return this;
  }
  lookAt(eye,target,up) {
    let z=new vector3().subVectors(eye,target).normalize();
    let x=new vector3().crossVectors(up,z).normalize();
    let y=new vector3().crossVectors(z,x);
    this.elements[0]=x.x; this.elements[4]=x.y; this.elements[8]=x.z; this.elements[12]=-x.dot(eye);
    this.elements[1]=y.x; this.elements[5]=y.y; this.elements[9]=y.z; this.elements[13]=-y.dot(eye);
    this.elements[2]=z.x; this.elements[6]=z.y; this.elements[10]=z.z; this.elements[14]=-z.dot(eye);
    this.elements[3]=0; this.elements[7]=0; this.elements[11]=0; this.elements[15]=1;
    return this;
  }
  multiply(m) {
    let a=this.elements, b=m.elements;
    let a00=a[0],a01=a[4],a02=a[8],a03=a[12];
    let a10=a[1],a11=a[5],a12=a[9],a13=a[13];
    let a20=a[2],a21=a[6],a22=a[10],a23=a[14];
    let a30=a[3],a31=a[7],a32=a[11],a33=a[15];
    let b00=b[0],b01=b[4],b02=b[8],b03=b[12];
    let b10=b[1],b11=b[5],b12=b[9],b13=b[13];
    let b20=b[2],b21=b[6],b22=b[10],b23=b[14];
    let b30=b[3],b31=b[7],b32=b[11],b33=b[15];
    this.elements[0]=a00*b00+a01*b10+a02*b20+a03*b30;
    this.elements[4]=a00*b01+a01*b11+a02*b21+a03*b31;
    this.elements[8]=a00*b02+a01*b12+a02*b22+a03*b32;
    this.elements[12]=a00*b03+a01*b13+a02*b23+a03*b33;
    this.elements[1]=a10*b00+a11*b10+a12*b20+a13*b30;
    this.elements[5]=a10*b01+a11*b11+a12*b21+a13*b31;
    this.elements[9]=a10*b02+a11*b12+a12*b22+a13*b32;
    this.elements[13]=a10*b03+a11*b13+a12*b23+a13*b33;
    this.elements[2]=a20*b00+a21*b10+a22*b20+a23*b30;
    this.elements[6]=a20*b01+a21*b11+a22*b21+a23*b31;
    this.elements[10]=a20*b02+a21*b12+a22*b22+a23*b32;
    this.elements[14]=a20*b03+a21*b13+a22*b23+a23*b33;
    this.elements[3]=a30*b00+a31*b10+a32*b20+a33*b30;
    this.elements[7]=a30*b01+a31*b11+a32*b21+a33*b31;
    this.elements[11]=a30*b02+a31*b12+a32*b22+a33*b32;
    this.elements[15]=a30*b03+a31*b13+a32*b23+a33*b33;
    return this;
  }
  compose(position,quaternion,scale) {
    let x=quaternion.x, y=quaternion.y, z=quaternion.z, w=quaternion.w;
    let x2=x+x, y2=y+y, z2=z+z;
    let xx=x*x2, xy=x*y2, xz=x*z2;
    let yy=y*y2, yz=y*z2, zz=z*z2;
    let wx=w*x2, wy=w*y2, wz=w*z2;
    let sx=scale.x, sy=scale.y, sz=scale.z;
    this.elements[0]=(1-(yy+zz))*sx;
    this.elements[4]=(xy-wz)*sy;
    this.elements[8]=(xz+wy)*sz;
    this.elements[12]=position.x;
    this.elements[1]=(xy+wz)*sx;
    this.elements[5]=(1-(xx+zz))*sy;
    this.elements[9]=(yz-wx)*sz;
    this.elements[13]=position.y;
    this.elements[2]=(xz-wy)*sx;
    this.elements[6]=(yz+wx)*sy;
    this.elements[10]=(1-(xx+yy))*sz;
    this.elements[14]=position.z;
    this.elements[3]=0; this.elements[7]=0; this.elements[11]=0; this.elements[15]=1;
    return this;
  }
  clone() { let m=new matrix4(); m.elements=this.elements.slice(); return m; }
}

class quaternion {
  constructor(x=0,y=0,z=0,w=1) { this.x=x; this.y=y; this.z=z; this.w=w; }
  setFromEuler(euler) {
    let cx=Math.cos(euler.x/2), cy=Math.cos(euler.y/2), cz=Math.cos(euler.z/2);
    let sx=Math.sin(euler.x/2), sy=Math.sin(euler.y/2), sz=Math.sin(euler.z/2);
    this.x=sx*cy*cz+cx*sy*sz;
    this.y=cx*sy*cz-sx*cy*sz;
    this.z=cx*cy*sz+sx*sy*cz;
    this.w=cx*cy*cz-sx*sy*sz;
    return this;
  }
  clone() { return new quaternion(this.x,this.y,this.z,this.w); }
}

class euler {
  constructor(x=0,y=0,z=0,order='xyz') { this.x=x; this.y=y; this.z=z; this.order=order; }
  clone() { return new euler(this.x,this.y,this.z,this.order); }
}

class object3d {
  constructor() {
    this.position=new vector3();
    this.quaternion=new quaternion();
    this.scale=new vector3(1,1,1);
    this.matrix=new matrix4();
    this.matrixWorld=new matrix4();
    this.parent=null;
    this.children=[];
    this.userData={};
    this.visible=true;
  }
  add(child) { if(child.parent) child.parent.remove(child); child.parent=this; this.children.push(child); return this; }
  remove(child) { let idx=this.children.indexOf(child); if(idx!==-1) { this.children.splice(idx,1); child.parent=null; } return this; }
  updateMatrix() { this.matrix.compose(this.position,this.quaternion,this.scale); }
  updateMatrixWorld(force) {
    if(this.parent) this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);
    else this.matrixWorld.copy(this.matrix);
    for(let c of this.children) c.updateMatrixWorld(force);
  }
  traverse(callback) { callback(this); for(let c of this.children) c.traverse(callback); }
  clone(recursive=true) {
    let obj=new object3d();
    obj.position.copy(this.position);
    obj.quaternion.copy(this.quaternion);
    obj.scale.copy(this.scale);
    obj.visible=this.visible;
    if(recursive) for(let c of this.children) obj.add(c.clone(true));
    return obj;
  }
}

class scene extends object3d {
  constructor() { super(); this.background=new color(0,0,0); }
}

class camera extends object3d {
  constructor() { super(); this.matrixWorldInverse=new matrix4(); this.projectionMatrix=new matrix4(); }
  updateMatrixWorld(force) { super.updateMatrixWorld(force); this.matrixWorldInverse.copy(this.matrixWorld).invert(); }
}

class perspectivecamera extends camera {
  constructor(fov=75,aspect=1,near=0.1,far=1000) {
    super();
    this.fov=fov; this.aspect=aspect; this.near=near; this.far=far;
    this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    let top=Math.tan(this.fov*Math.PI/360)*this.near;
    let bottom=-top;
    let right=top*this.aspect;
    let left=-right;
    this.projectionMatrix.makePerspective(left,right,top,bottom,this.near,this.far);
  }
}

class orthographiccamera extends camera {
  constructor(left=-1,right=1,top=1,bottom=-1,near=0.1,far=1000) {
    super();
    this.left=left; this.right=right; this.top=top; this.bottom=bottom; this.near=near; this.far=far;
    this.updateProjectionMatrix();
  }
  updateProjectionMatrix() { this.projectionMatrix.makeOrthographic(this.left,this.right,this.top,this.bottom,this.near,this.far); }
}

class bufferattribute {
  constructor(array,itemSize) { this.array=array; this.itemSize=itemSize; this.count=array.length/itemSize; }
}

class buffergeometry {
  constructor() { this.attributes={}; this.index=null; }
  setAttribute(name,attr) { this.attributes[name]=attr; }
  setIndex(indices) { this.index=new bufferattribute(indices,1); }
}

class material {
  constructor() { this.side=0; this.transparent=false; this.opacity=1; this.color=new color(1,1,1); }
}

class meshbasicmaterial extends material {
  constructor(params={}) { super(); if(params.color) this.color.setHex(params.color); }
}

class meshstandardmaterial extends material {
  constructor(params={}) { super(); if(params.color) this.color.setHex(params.color); this.roughness=params.roughness||0.5; this.metalness=params.metalness||0.5; }
}

class mesh extends object3d {
  constructor(geometry,material) { super(); this.geometry=geometry; this.material=material; }
}

class points extends object3d {
  constructor(geometry,material) { super(); this.geometry=geometry; this.material=material; }
}

class line extends object3d {
  constructor(geometry,material) { super(); this.geometry=geometry; this.material=material; }
}

class light extends object3d {
  constructor(color=0xffffff,intensity=1) { super(); this.color=new color().setHex(color); this.intensity=intensity; }
}

class ambientlight extends light {
  constructor(color,intensity) { super(color,intensity); }
}

class directionallight extends light {
  constructor(color,intensity) { super(color,intensity); }
}

class pointlight extends light {
  constructor(color,intensity,distance=0,decay=1) { super(color,intensity); this.distance=distance; this.decay=decay; }
}

class spotlight extends light {
  constructor(color,intensity,distance=0,angle=Math.PI/3,penumbra=0,decay=1) { super(color,intensity); this.distance=distance; this.angle=angle; this.penumbra=penumbra; this.decay=decay; }
}

class texture {
  constructor(image) { this.image=image; this.needsUpdate=true; }
}

class textureloader {
  load(url,onLoad) {
    let img=new Image(); img.crossOrigin='Anonymous';
    img.onload=()=>{ let tex=new texture(img); if(onLoad) onLoad(tex); };
    img.src=url; return null;
  }
}

class webglrenderer {
  constructor(params={}) {
    this.domElement=params.canvas||document.createElement('canvas');
    this.width=params.width||window.innerWidth;
    this.height=params.height||window.innerHeight;
    this.domElement.width=this.width; this.domElement.height=this.height;
    this.gl=this.domElement.getContext('webgl')||this.domElement.getContext('experimental-webgl');
    if(!this.gl) console.error('webgl not supported');
    this.gl.viewport(0,0,this.width,this.height);
    this.programCache=new Map();
  }
  setSize(width,height) { this.width=width; this.height=height; this.domElement.width=width; this.domElement.height=height; this.gl.viewport(0,0,width,height); }
  compileShader(type,source) { let shader=this.gl.createShader(type); this.gl.shaderSource(shader,source); this.gl.compileShader(shader); if(!this.gl.getShaderParameter(shader,this.gl.COMPILE_STATUS)) console.error(this.gl.getShaderInfoLog(shader)); return shader; }
  createProgram(vs,fs) { let program=this.gl.createProgram(); this.gl.attachShader(program,vs); this.gl.attachShader(program,fs); this.gl.linkProgram(program); if(!this.gl.getProgramParameter(program,this.gl.LINK_STATUS)) console.error(this.gl.getProgramInfoLog(program)); return program; }
  getDefaultShader() {
    let cacheKey='default';
    if(this.programCache.has(cacheKey)) return this.programCache.get(cacheKey);
    let vs=`attribute vec3 position; uniform mat4 modelViewMatrix; uniform mat4 projectionMatrix; void main(){ gl_PointSize=1.0; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`;
    let fs=`uniform vec3 color; void main(){ gl_FragColor=vec4(color,1.0); }`;
    let vsh=this.compileShader(this.gl.VERTEX_SHADER,vs);
    let fsh=this.compileShader(this.gl.FRAGMENT_SHADER,fs);
    let prog=this.createProgram(vsh,fsh);
    this.programCache.set(cacheKey,prog);
    return prog;
  }
  render(scene,camera) {
    let gl=this.gl;
    gl.clearColor(scene.background.r,scene.background.g,scene.background.b,1);
    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    scene.updateMatrixWorld();
    camera.updateMatrixWorld();
    let viewMatrix=camera.matrixWorldInverse;
    let projMatrix=camera.projectionMatrix;
    scene.traverse(obj=>{
      if(!obj.visible) return;
      if(obj.isMesh||obj.isPoints||obj.isLine) {
        let modelMatrix=obj.matrixWorld;
        let mvp=new matrix4().multiplyMatrices(projMatrix,new matrix4().multiplyMatrices(viewMatrix,modelMatrix));
        let program=this.getDefaultShader();
        gl.useProgram(program);
        let posLoc=gl.getAttribLocation(program,'position');
        let mvpLoc=gl.getUniformLocation(program,'projectionMatrix');
        let mvLoc=gl.getUniformLocation(program,'modelViewMatrix');
        let colorLoc=gl.getUniformLocation(program,'color');
        gl.uniformMatrix4fv(mvpLoc,false,mvp.elements);
        gl.uniformMatrix4fv(mvLoc,false,new matrix4().multiplyMatrices(viewMatrix,modelMatrix).elements);
        let col=obj.material?obj.material.color:{r:1,g:1,b:1};
        gl.uniform3f(colorLoc,col.r,col.g,col.b);
        let geom=obj.geometry;
        let posAttr=geom.attributes.position;
        if(posAttr) {
          let buffer=gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
          gl.bufferData(gl.ARRAY_BUFFER,posAttr.array,gl.STATIC_DRAW);
          gl.enableVertexAttribArray(posLoc);
          gl.vertexAttribPointer(posLoc,posAttr.itemSize,gl.FLOAT,false,0,0);
          let indexCount=geom.index?geom.index.count:posAttr.count;
          if(geom.index) {
            let idxBuf=gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,idxBuf);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,geom.index.array,gl.STATIC_DRAW);
            gl.drawElements(gl.TRIANGLES,indexCount,gl.UNSIGNED_SHORT,0);
          } else gl.drawArrays(gl.TRIANGLES,0,posAttr.count);
        }
      }
    });
  }
}

class orbitcontrols {
  constructor(camera,domElement) {
    this.camera=camera; this.domElement=domElement;
    this.enabled=true; this.target=new vector3();
    this.rotateSpeed=1.0; this.zoomSpeed=1.2;
    this._onMouseMove=this._onMouseMove.bind(this);
    this._onMouseDown=this._onMouseDown.bind(this);
    this._onMouseUp=this._onMouseUp.bind(this);
    this._onWheel=this._onWheel.bind(this);
    this.domElement.addEventListener('mousedown',this._onMouseDown);
    this.domElement.addEventListener('wheel',this._onWheel);
  }
  _onMouseDown(e) { if(!this.enabled) return; this._startX=e.clientX; this._startY=e.clientY; document.addEventListener('mousemove',this._onMouseMove); document.addEventListener('mouseup',this._onMouseUp); e.preventDefault(); }
  _onMouseMove(e) { if(!this.enabled) return; let dx=(e.clientX-this._startX)*0.005*this.rotateSpeed; let dy=(e.clientY-this._startY)*0.005*this.rotateSpeed; let pos=this.camera.position; let deltaPhi=dx; let deltaTheta=dy; let radius=Math.sqrt(pos.x*pos.x+pos.y*pos.y+pos.z*pos.z); let theta=Math.atan2(pos.z,pos.x); let phi=Math.acos(pos.y/radius); theta+=deltaPhi; phi+=deltaTheta; if(phi>Math.PI-0.01) phi=Math.PI-0.01; if(phi<0.01) phi=0.01; pos.x=radius*Math.sin(phi)*Math.cos(theta); pos.y=radius*Math.cos(phi); pos.z=radius*Math.sin(phi)*Math.sin(theta); this.camera.lookAt(this.target); this._startX=e.clientX; this._startY=e.clientY; }
  _onMouseUp() { document.removeEventListener('mousemove',this._onMouseMove); document.removeEventListener('mouseup',this._onMouseUp); }
  _onWheel(e) { if(!this.enabled) return; let delta=e.deltaY>0?1:-1; let pos=this.camera.position; let radius=Math.sqrt(pos.x*pos.x+pos.y*pos.y+pos.z*pos.z); radius+=delta*0.1*this.zoomSpeed; if(radius<0.1) radius=0.1; let theta=Math.atan2(pos.z,pos.x); let phi=Math.acos(pos.y/radius); pos.x=radius*Math.sin(phi)*Math.cos(theta); pos.y=radius*Math.cos(phi); pos.z=radius*Math.sin(phi)*Math.sin(theta); this.camera.lookAt(this.target); e.preventDefault(); }
}

let three={
  color,vector2,vector3,vector4,matrix3,matrix4,quaternion,euler,
  object3d,scene,camera,perspectivecamera,orthographiccamera,
  bufferattribute,buffergeometry,material,meshbasicmaterial,meshstandardmaterial,
  mesh,points,line,light,ambientlight,directionallight,pointlight,spotlight,
  texture,textureloader,webglrenderer,orbitcontrols
};

if(typeof window!=='undefined') window.three=three;
export default three;
