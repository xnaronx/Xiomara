// ===============================
// IMPORTACIONES
// ===============================

import * as THREE from "three";

import { OrbitControls } from 
"three/addons/controls/OrbitControls.js";



// ===============================
// ESCENA
// ===============================

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x000003);



// ===============================
// CÁMARA
// ===============================

const camera = new THREE.PerspectiveCamera(

60,

window.innerWidth / window.innerHeight,

0.1,

3000

);


camera.position.set(

0,

8,

35

);



// ===============================
// RENDER
// ===============================

const renderer = new THREE.WebGLRenderer({

antialias:true

});


renderer.setPixelRatio(

window.devicePixelRatio

);


renderer.setSize(

window.innerWidth,

window.innerHeight

);


document.body.appendChild(

renderer.domElement

);



// ===============================
// CONTROLES
// ===============================

const controls = new OrbitControls(

camera,

renderer.domElement

);


controls.enableDamping = true;

controls.dampingFactor = 0.05;

controls.minDistance = 8;

controls.maxDistance = 150;



// ===============================
// CARGADOR
// ===============================

const loader = new THREE.TextureLoader();



// ===============================
// ESTRELLAS
// ===============================

const starsGeometry = new THREE.BufferGeometry();


const starsCount = 30000;


const starsPositions = new Float32Array(

starsCount * 3

);



for(let i=0;i<starsCount;i++){


let i3=i*3;


starsPositions[i3]=

(Math.random()-0.5)*1000;


starsPositions[i3+1]=

(Math.random()-0.5)*1000;


starsPositions[i3+2]=

(Math.random()-0.5)*1000;


}



starsGeometry.setAttribute(

"position",

new THREE.BufferAttribute(

starsPositions,

3

)

);



const starsMaterial = new THREE.PointsMaterial({

color:0xffffff,

size:0.12,

transparent:true,

opacity:0.8,

blending:THREE.AdditiveBlending

});



const stars = new THREE.Points(

starsGeometry,

starsMaterial

);



scene.add(stars);




// ===============================
// 🌌 GALAXIA ESPIRAL
// ===============================


const galaxyGeometry = new THREE.BufferGeometry();


const galaxyCount = 160000;


const galaxyPositions = new Float32Array(

galaxyCount * 3

);



for(let i = 0; i < galaxyCount; i++){


let i3 = i * 3;



// distancia desde el centro

let radius =

Math.pow(Math.random(),0.55) * 24;



// cantidad de brazos

let arms = 5;



// ángulo formando espiral

let angle =

radius * 0.32 +

(Math.floor(Math.random()*arms)

*

(Math.PI * 2 / arms))

+

(Math.random()-0.5)*0.45;





// posición X

galaxyPositions[i3] =

Math.cos(angle) * radius;





// altura / grosor 3D

galaxyPositions[i3+1] =

(Math.random()-0.5) * 2.5;





// posición Z

galaxyPositions[i3+2] =

Math.sin(angle) * radius;



}



// crear atributo

galaxyGeometry.setAttribute(

"position",

new THREE.BufferAttribute(

galaxyPositions,

3

)

);



// mantener la galaxia abajo como antes

galaxyGeometry.computeBoundingSphere();

galaxyGeometry.setAttribute(

"position",

new THREE.BufferAttribute(

galaxyPositions,

3

)

);



const galaxyMaterial = new THREE.PointsMaterial({

color:0xb875ff,

size:0.045,

transparent:true,

opacity:0.95,

blending:THREE.AdditiveBlending

});



const galaxy = new THREE.Points(

galaxyGeometry,

galaxyMaterial

);



scene.add(galaxy);
galaxy.position.y = -10;




// ===============================
// RESIZE
// ===============================

window.addEventListener(

"resize",

()=>{


camera.aspect =

window.innerWidth /

window.innerHeight;


camera.updateProjectionMatrix();


renderer.setSize(

window.innerWidth,

window.innerHeight

);


});
// ===============================
// ❤️ GRUPO DEL CORAZÓN
// ===============================


const heartGroup = new THREE.Group();


scene.add(heartGroup);



heartGroup.position.set(

0,

-2,

0

);




// ===============================
// ❤️ CORAZÓN DE PÍXELES (MARCO)
// ===============================


const heartParticles = 50000;


const heartGeometry = new THREE.BufferGeometry();


const heartPositions = new Float32Array(

heartParticles * 3

);





for(let i=0;i<heartParticles;i++){



    // recorrer todo el contorno del corazón

    let t =

    Math.random()*Math.PI*2;



    let x =

    16*Math.pow(Math.sin(t),3);



    let y =

    13*Math.cos(t)

    -5*Math.cos(2*t)

    -2*Math.cos(3*t)

    -Math.cos(4*t);





    // tamaño del corazón

    x *= 0.38;

    y *= 0.38;






    let i3=i*3;





    // línea fina pero con profundidad

    heartPositions[i3] =

    x + (Math.random()-0.5)*0.12;



    heartPositions[i3+1] =

    y + (Math.random()-0.5)*0.12;



    heartPositions[i3+2] =

    (Math.random()-0.5)*1.2;



}







heartGeometry.setAttribute(

"position",

new THREE.BufferAttribute(

heartPositions,

3

)

);






// ===============================
// ✨ TEXTURA DEL CORAZÓN
// ===============================

const heartTexture = new THREE.TextureLoader().load(
    "https://threejs.org/examples/textures/sprites/spark1.png"
);


const heartMaterial = new THREE.PointsMaterial({

    color:0xff4fd8,

    size:0.12,

    map:heartTexture,

    transparent:true,

    opacity:0.9,

    blending:THREE.AdditiveBlending,

    depthWrite:false

});




const heart = new THREE.Points(

heartGeometry,

heartMaterial

);



heartGroup.add(heart);
// ===============================
// 📷 FOTO CENTRAL DENTRO DEL CORAZÓN
// ===============================


function createRoundedPhoto(url){


const canvas = document.createElement("canvas");


const size = 1024;


canvas.width=size;

canvas.height=size;



const ctx = canvas.getContext("2d");



const texture = new THREE.CanvasTexture(canvas);



const img = new Image();


img.src=url;



img.onload=()=>{


ctx.clearRect(

0,

0,

size,

size

);



ctx.save();



ctx.beginPath();


ctx.roundRect(

80,

80,

864,

864,

120

);



ctx.clip();



ctx.drawImage(

img,

0,

0,

size,

size

);



ctx.restore();



texture.needsUpdate=true;


};



return texture;

}




const photoTexture = createRoundedPhoto(

"./fotos/foto01.jpg"

);





const heartPhoto = new THREE.Mesh(

new THREE.PlaneGeometry(

5.8,

5.8

),


new THREE.MeshBasicMaterial({

map:photoTexture,

transparent:true,

side:THREE.DoubleSide

})

);



heartPhoto.position.z=0.2;


heartGroup.add(heartPhoto);





// ===============================
// 📷 FOTOS ORBITANDO
// ===============================


const planets=[];


const totalFotos=13;



for(let i=0;i<totalFotos;i++){


let numero=i+2;



const texture = loader.load(

`./fotos/foto${String(numero).padStart(2,"0")}.jpg`

);


const planetMaterial = new THREE.MeshBasicMaterial({

    map:texture,

    transparent:true,

    side:THREE.DoubleSide,

    toneMapped:false

});


const planet = new THREE.Mesh(

    new THREE.CircleGeometry(

        2.1,

        128

    ),

    planetMaterial

);

let angle =

(i/totalFotos)*Math.PI*2;




planet.userData={

angle:angle,

radius:17,

speed:0.00035

};





planet.position.set(

Math.cos(angle)*17,

-2,

Math.sin(angle)*17

);



scene.add(planet);


planets.push(planet);



}






// ===============================
// 🎬 ANIMACIÓN FINAL
// ===============================


function animate(){



requestAnimationFrame(animate);



let time = Date.now()*0.001;





// 🌌 galaxia girando

galaxy.rotation.y +=0.001;


stars.rotation.y +=0.00002;







// ❤️ latido del corazón + foto

let pulse =

1 +

Math.sin(time*5)*0.035;




heartGroup.scale.set(

pulse,

pulse,

pulse

);



heartGroup.position.y =

-2 +

Math.sin(time*5)*0.04;









// 📷 órbita de fotos


planets.forEach(p=>{


p.userData.angle +=

p.userData.speed;




p.position.x =

Math.cos(

p.userData.angle

)

*

p.userData.radius;



p.position.z =

Math.sin(

p.userData.angle

)

*

p.userData.radius;



p.lookAt(camera.position);


});





controls.update();


renderer.render(

scene,

camera

);



}




animate();