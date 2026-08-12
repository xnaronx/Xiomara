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

70

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



const starTexture = new THREE.TextureLoader().load(
    "https://threejs.org/examples/textures/sprites/spark1.png"
);


const starsMaterial = new THREE.PointsMaterial({

    color:0xffffff,

    size:2,

    map:starTexture,

    transparent:true,

    opacity:0.8,

    blending:THREE.AdditiveBlending,

    depthWrite:false

});



const stars = new THREE.Points(

starsGeometry,

starsMaterial

);



scene.add(stars);


// ===============================
// ☄️ ESTRELLAS FUGACES
// ===============================

const shootingStars = [];

for(let i = 0; i < 6; i++){

    const geo = new THREE.SphereGeometry(
    0.25,
    16,
    16
    );

    const mat = new THREE.MeshBasicMaterial({
        color:0xffffff
    });

    const star = new THREE.Mesh(
        geo,
        mat
    );

    resetStar(star);

    scene.add(star);

    shootingStars.push(star);

}


function resetStar(star){

   star.position.set(

    (Math.random()-0.5)*80,

    20 + Math.random()*40,

    -20 + Math.random()*40

    );


    star.userData.speed =

    1.5 + Math.random()*2;

}


// ===============================
// 🌌 GALAXIA ESPIRAL
// ===============================


const galaxyGeometry = new THREE.BufferGeometry();


const galaxyCount = 300000;


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



// ===============================
// ✨ TEXTURA DE LA GALAXIA
// ===============================

const galaxyTexture = new THREE.TextureLoader().load(
    "https://threejs.org/examples/textures/sprites/spark1.png"
);


const galaxyMaterial = new THREE.PointsMaterial({

    color:0x9b59ff,

    size:0.28,

    map:galaxyTexture,

    transparent:true,

    opacity:0.9,

    blending:THREE.AdditiveBlending,

    depthWrite:false

});


const galaxy = new THREE.Points(

galaxyGeometry,

galaxyMaterial

);



scene.add(galaxy);
galaxy.position.y = -10;
// ===============================
// ❤️ CORAZONES GIGANTES DE FONDO (MUCHOS Y DISPERSOS)
// ===============================

const backgroundHearts = [];

function createBackgroundHeart(size, position, color){

    const particles = 18000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particles * 3);
    const original = new Float32Array(particles * 3);

    for(let i=0;i<particles;i++){
        let t = Math.random() * Math.PI * 2;

        let x = 16 * Math.pow(Math.sin(t),3);
        let y = 13*Math.cos(t)
              -5*Math.cos(2*t)
              -2*Math.cos(3*t)
              -Math.cos(4*t);

        x *= size;
        y *= size;

        let i3=i*3;

        positions[i3]   = x + (Math.random()-0.5)*0.7;
        positions[i3+1] = y + (Math.random()-0.5)*0.7;
        positions[i3+2] = (Math.random()-0.5)*6;

        original[i3]   = positions[i3];
        original[i3+1] = positions[i3+1];
        original[i3+2] = positions[i3+2];
    }

    geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions,3)
    );

    const texture = new THREE.TextureLoader().load(
        "https://threejs.org/examples/textures/sprites/spark1.png"
    );

    const material = new THREE.PointsMaterial({
        color:color,
        size:0.18,
        map:texture,
        transparent:true,
        opacity:0.5,
        blending:THREE.AdditiveBlending,
        depthWrite:false
    });

    const heart = new THREE.Points(geometry,material);

    heart.position.set(position.x, position.y, position.z);

    heart.userData = {
        original,
        pulseOffset: Math.random()*Math.PI*2,
        pulseSpeed: 1 + Math.random()*2,
        floatOffset: Math.random()*Math.PI*2,
        floatSpeed: 0.2 + Math.random()*0.4
    };

    scene.add(heart);
    backgroundHearts.push(heart);
}

// Colores posibles
const heartColors = [
    0xff4fd8,
    0xff69b4,
    0x9b59ff,
    0xd98cff,
    0xff8ad8,
    0x00ffff
];

// ===============================
// ❤️ CORAZONES GIGANTES DISTRIBUIDOS
// ===============================

const heartLayers = 4;
const heartsPerLayer = 8;

for(let l=0; l<heartLayers; l++){

    const radius = 85 + l * 18;

    for(let i=0;i<heartsPerLayer;i++){

        const angle =
        (i / heartsPerLayer) * Math.PI * 2;

        const y =
        -55 + l * 22 + (Math.random()-0.5)*6;

        const pos = {

            x: Math.cos(angle) * radius,

            y: y,

            z: Math.sin(angle) * radius

        };

        const size =
        1 + Math.random()*1.8;

        const color =
        heartColors[
        Math.floor(Math.random()*heartColors.length)
        ];

        createBackgroundHeart(
            size,
            pos,
            color
        );

    }

}

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

const heartOriginalPositions = new Float32Array(

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


for(let i = 0; i < heartParticles * 3; i++){

    heartOriginalPositions[i] = heartPositions[i];

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

    canvas.width = size;
    canvas.height = size;


    const ctx = canvas.getContext("2d");


const texture = new THREE.CanvasTexture(canvas);

texture.colorSpace = THREE.SRGBColorSpace;
texture.minFilter = THREE.LinearFilter;
texture.magFilter = THREE.LinearFilter;


    const img = new Image();

    img.src = url;


    img.onload = ()=>{


        // limpiar canvas

        ctx.clearRect(
            0,
            0,
            size,
            size
        );


        // máscara circular

        ctx.save();


        ctx.beginPath();

        ctx.arc(
            size / 2,
            size / 2,
            430,
            0,
            Math.PI * 2
        );


        ctx.closePath();


        ctx.clip();



        // dibujar foto dentro del círculo

        ctx.drawImage(

            img,

            80,

            80,

            864,

            864

        );


        ctx.restore();



        // borde luminoso

        ctx.beginPath();


        ctx.arc(

            size / 2,

            size / 2,

            440,

            0,

            Math.PI * 2

        );


        ctx.strokeStyle =

        "rgba(255,80,220,0.8)";


        ctx.lineWidth = 18;


        ctx.stroke();



        texture.needsUpdate = true;


    };


    return texture;

}



const photoTexture = createRoundedPhoto(

"./fotos/foto01.jpg"

);

const heartPhoto = new THREE.Mesh(

    new THREE.CircleGeometry(
        2.9,
        128
    ),

    new THREE.MeshBasicMaterial({

        map: photoTexture,
        transparent:true,
        side:THREE.DoubleSide

    })

);


heartPhoto.position.z = 0.3;
heartGroup.add(heartPhoto);

// ===============================
// ❤️ CORAZONES FLOTANTES
// ===============================

const floatingHearts = [];

const heartSpriteTexture = new THREE.TextureLoader().load(
    "./texturas/heart.png"
);


function createFloatingHeart(){

    const material = new THREE.SpriteMaterial({

    map: heartSpriteTexture,

    color:0xffffff,

    transparent:true,

    opacity:1,

    depthWrite:false

    });


    const sprite = new THREE.Sprite(material);


    resetFloatingHeart(sprite);


    scene.add(sprite);


    floatingHearts.push(sprite);

}



function resetFloatingHeart(heart){

    // aparece cerca de las fotos

   heart.position.set(

    (Math.random()-0.5)*35,

    -2 + Math.random()*5,

    (Math.random()-0.5)*35

    );


    heart.scale.set(

    0.4,

    0.4,

    0.4
    
    );

    heart.material.opacity = 0.9;


    heart.userData = {

      speed:

      0.01 + Math.random()*0.05,


        grow:

        0.003 + Math.random()*0.004

    };

}



// cantidad de corazones

function spawnHeartLoop(){

    createFloatingHeart();


    let nextTime = 
    1000 + Math.random()*3500;


    setTimeout(
        spawnHeartLoop,
        nextTime
    );

}


spawnHeartLoop();

// ===============================
// 📷 FOTOS ORBITANDO
// ===============================

const planets=[];

// ===============================
// 💜 PANEL DE RECUERDOS (MENSAJES ÚNICOS + #11/05)
// ===============================

const photoPanel = document.getElementById("photoPanel");
const bigPhoto = document.getElementById("bigPhoto");
const photoTitle = document.getElementById("photoTitle");
const photoMessage = document.getElementById("photoMessage");
const closePanel = document.getElementById("closePanel");

const memories = [

{
title:"Mi reina hermosa 💜",
message:"Aún no nos hemos visto en persona, pero eres mi todo. Como quisiera poder estar contigo ahora mismo, no aguanto no poder dormir a tu lado... Te amo, me fascinas.<br><br>#11/05"
},

{
title:"Celosa y todo pero te amo 🌙",
message:"Cada vez que jugamos juntos la paso de maravilla. Me encantas toda tú, aunque a veces te pongas celosa. Eres mi reina y lo sabes muy bien.<br><br>#11/05"
},

{
title:"Borrachita y todo... 🍷",
message:"Borrachita, pero así te quiero mi amor. Aunque estés a la distancia, te siento tan mía. Muero por tenerte encima mío y comerte a besos.<br><br>#11/05"
},

{
title:"Que ganitas me das",
message:"La distancia es una tortura porque te tengo unas ganas treméndas. Deseo con toda el alma el momento en que podamos vernos al fin.<br><br>#11/05"
},

{
title:"Mi reina hermosa 👑",
message:"Me fascina que seas mayor que yo, me encantas en todos los sentidos. Eres esa mujer increíble que se robó mi corazón por completo.<br><br>#11/05"
},

{
title:"Te amo mi ammor ❤️🥰",
message:"Tú siempre me mandas regalitos hermosos y yo, aunque aún no he podido enviarte uno por la distancia, te hice esto con tanto amor espero te guste.<br><br>#11/05"
},

{
title:"Espero vernos pronto 🚀",
message:"No aguanto las ansias de que llegue el día de conocernos de frente. Espero podamos vernos pronto y fundirnos en un abrazo eterno.<br><br>#11/05"
},

{
title:"Jugando y amándote 🎮",
message:"Nuestras partidas juntos son lo mejor de mis días. La paso de maravilla contigo, riendo, peleando y amándonos a la distancia.<br><br>#11/05"
},

{
title:"Mi perdición 💫",
message:"Eres mi todo, mi reina, mi locura. Como quisiera tenerte encima mío y hacerte mía sin que nada ni nadie nos interrumpa.<br><br>#11/05"
},

{
title:"Aunque estemos lejos 🌷",
message:"No importa los kilómetros que nos separen, te pienso a cada segundo. Te amo con toda el alma, mi amor.<br><br>#11/05"
},

{
title:"🤭🤭🤭",
message:"Imagino mil veces el momento en que por fin nos veamos cara a cara. Nos tenemos unas ganas locas y este amor no hace más que crecer.<br><br>#11/05"
},

{
title:"Mi persona favorita 🌠",
message:"Gracias por cada detalle, por consentirme y por estar aun a la distancia. Eres mi reina, mi debilidad y mi gran debilidad.<br><br>#11/05"
},

{
title:"Por mil años más ♾️",
message:"Te amo hoy, mañana y siempre. Eres mi todo, y sé que cuando por fin nos crucemos de frente, esto será mágico. Te adoro, mi vida.<br><br>#11/05"
}

];


closePanel.onclick = ()=>{

photoPanel.classList.remove("active");

};

const totalFotos=13;


for(let i=0;i<totalFotos;i++){


    let numero=i+2;


    const texture = loader.load(
        `./fotos/foto${String(numero).padStart(2,"0")}.jpg`,
        (texture)=>{

            texture.colorSpace = THREE.SRGBColorSpace;

            texture.minFilter = THREE.LinearMipmapLinearFilter;

            texture.magFilter = THREE.LinearFilter;

            texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

        }
    );


  // 📷 FOTO ORBITANTE

const photoGeometry = new THREE.CircleGeometry(
    2.1,
    128
);


const planetMaterial = new THREE.MeshBasicMaterial({

    map:texture,

    transparent:true,

    side:THREE.DoubleSide

});


const planet = new THREE.Mesh(

    photoGeometry,

    planetMaterial

);

planet.userData.index = i;


// ✨ MARCO LUMINOSO

const frameGeometry = new THREE.RingGeometry(

    2.15, // radio interno
    2.28, // radio externo
    128

);


const frameMaterial = new THREE.MeshBasicMaterial({

    color:0xff4fd8, // rosa neón

    transparent:true,

    opacity:0.9,

    side:THREE.DoubleSide,

    blending:THREE.AdditiveBlending

});


const frame = new THREE.Mesh(

    frameGeometry,

    frameMaterial

);


// poner el marco delante de la foto

frame.position.z = 0.05;


// unir marco + foto

planet.add(frame);


    let angle = (i/totalFotos)*Math.PI*2;



  planet.userData={

    index:i,

    image:`./fotos/foto${String(i+2).padStart(2,"0")}.jpg`,

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

// ❤️ corazones gigantes latiendo y flotando
backgroundHearts.forEach(h=>{

    const pulse =
    1 +
    Math.sin(
        time*h.userData.pulseSpeed +
        h.userData.pulseOffset
    ) * 0.08;

    h.scale.set(pulse,pulse,pulse);

    // flotación lenta
    h.position.y +=
    Math.sin(
        time*h.userData.floatSpeed +
        h.userData.floatOffset
    ) * 0.002;

    // leve movimiento lateral
    h.position.x +=
    Math.cos(
        time*h.userData.floatSpeed*0.7 +
        h.userData.floatOffset
    ) * 0.0015;

    // ❤️ Siempre mirar a la cámara
    h.lookAt(camera.position);

});


    // ☄️ estrellas fugaces

    shootingStars.forEach(star=>{

        star.position.x -= star.userData.speed;
        star.position.y -= star.userData.speed * 0.45;


        if(
            star.position.x < -150 ||
            star.position.y < -50
        ){

            resetStar(star);

        }

    });



    // 🌌 galaxia

    galaxy.rotation.y += 0.001;

    stars.rotation.y += 0.00002;



    // ❤️ latido corazón

    const heartArray =
    heart.geometry.attributes.position.array;


    for(let i = 0; i < heartParticles; i++){

        let i3 = i*3;


        heartArray[i3] =
        heartOriginalPositions[i3] +
        Math.sin(time*2+i*0.15)*0.015;


        heartArray[i3+1] =
        heartOriginalPositions[i3+1] +
        Math.cos(time*2+i*0.15)*0.015;


        heartArray[i3+2] =
        heartOriginalPositions[i3+2] +
        Math.sin(time*4+i)*0.03;

    }


    heart.geometry.attributes.position.needsUpdate = true;



    let pulse = 1 + Math.sin(time*5)*0.035;


    heartGroup.scale.set(
        pulse,
        pulse,
        pulse
    );



    // 📷 foto central siempre mirando cámara




    // 📷 fotos orbitando

    planets.forEach(p=>{

        p.userData.angle += p.userData.speed;


        p.position.x =
        Math.cos(p.userData.angle)
        *
        p.userData.radius;


        p.position.z =
        Math.sin(p.userData.angle)
        *
        p.userData.radius;


        p.lookAt(camera.position);

    });



    // ❤️ corazones flotantes

    floatingHearts.forEach(h=>{


        h.position.y += h.userData.speed;

        h.position.z += 0.01;


        h.scale.x += h.userData.grow;
        h.scale.y += h.userData.grow;


        h.material.opacity -= 0.002;



        if(
            h.position.y > 25 ||
            h.material.opacity <= 0
        ){

            resetFloatingHeart(h);

        }

    });



    controls.update();


    renderer.render(
        scene,
        camera
    );

}



// 🎵 música

const bgm = document.getElementById("bgm");

if(bgm){

    bgm.volume = 0.25;


    bgm.play().catch(()=>{

        console.log(
        "Autoplay bloqueado"
        );

    });


    window.addEventListener(
    "click",
    ()=>{

        if(bgm.paused){

            bgm.play();

        }

    },
    {once:true});

}

// ===============================
// 🖱️ INTERACCIÓN CON FOTOS
// ===============================


const raycaster = new THREE.Raycaster();

const mouse = new THREE.Vector2();



window.addEventListener("click",(event)=>{


mouse.x =
(event.clientX / window.innerWidth) * 2 - 1;


mouse.y =
-(event.clientY / window.innerHeight) * 2 + 1;



raycaster.setFromCamera(
mouse,
camera
);



const intersects = raycaster.intersectObjects(planets);



if(intersects.length > 0){


const photo = intersects[0].object;


const index = photo.userData.index;



bigPhoto.src =
`./fotos/foto${String(index+2).padStart(2,"0")}.jpg`;



if(memories[index]){

photoTitle.textContent =
memories[index].title;


photoMessage.innerHTML =
memories[index].message;

}



photoPanel.classList.add("active");


}


});

// iniciar

animate();