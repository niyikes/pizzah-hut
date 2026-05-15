import './style.css';
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 30;

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);


const base = import.meta.env.BASE_URL;
const pizza_text = new THREE.TextureLoader().load(base + 'pizzah.jpg');
const cheese_text = new THREE.TextureLoader().load(base + 'cheese.jpg');
const pep_text = new THREE.TextureLoader().load(base + 'pepperoni.jpg');
const broc_text = new THREE.TextureLoader().load(base + 'broccoli.jpg');


//pizzah
const pizza_geo = new THREE.CylinderGeometry(10, 10, 1, 3);
const pizza_mat = new THREE.MeshBasicMaterial({ map: pizza_text });
const pizza = new THREE.Mesh(pizza_geo, pizza_mat);
pizza.position.set(0, 18, 0);

scene.add(pizza);




// cheeeese
const cheese_geo = new THREE.CylinderGeometry(7, 7, 5, 3);
const cheese_mat = new THREE.MeshBasicMaterial({ map: cheese_text });
const cheese = new THREE.Mesh(cheese_geo, cheese_mat);
cheese.position.set(0, 6, 0);
scene.add(cheese);


// PEPPERONI 
const pep_geo = new THREE.CylinderGeometry(5, 5, 0.5, 32);
const pep_mat = new THREE.MeshBasicMaterial({ map: pep_text });
const pepperoni = new THREE.Mesh(pep_geo, pep_mat);
pepperoni.position.set(0, -6, 0);
scene.add(pepperoni);


// BROC

//head
const broc_group = new THREE.Group(); 
const broc_head_geo = new THREE.ConeGeometry(5, 8, 8);
const broc_mat = new THREE.MeshBasicMaterial({ map: broc_text });
const broc_head = new THREE.Mesh(broc_head_geo, broc_mat);
//stem
const broc_stem_geo = new THREE.CylinderGeometry(1.5, 1.5, 4, 8);
const broc_stem = new THREE.Mesh(broc_stem_geo, broc_mat);
broc_stem.position.y = -5;

//addition
broc_group.add(broc_head);
broc_group.add(broc_stem);
broc_group.position.set(0, -18, 0);
scene.add(broc_group);

//mushroom 
//i gave up on mushroom

/*
const mush_geo = new THREE.SphereGeometry(4, 32, 32);
const mush_mat = new THREE.MeshBasicMaterial({ map: mush_text });
const mushroom = new THREE.Mesh(mush_geo, mush_mat);
mushroom.position.set(15, 0, 0);
scene.add(mushroom);
*/



// scrolly
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  pizza.rotation.y = t * 0.005;
  pizza.rotation.x = t * 0.002;

  cheese.rotation.x += 0.04
  cheese.rotation.y += 0.01;

  pepperoni.rotation.x += 0.01;
  pepperoni.rotation.z += 0.02;

  broc_group.rotation.x += 0.01;
  broc_group.rotation.y += 0.02;

  /*
  mushroom.rotation.y += 0.02;
  mushroom.rotation.z += 0.01;
  */

}

document.body.onscroll = moveCamera;


// enter
const landing = document.getElementById('landing');
const content = document.getElementById('content');
const enterBtn = document.getElementById('enterBtn');

enterBtn.addEventListener('click', () => {
  landing.style.display = 'none';
  content.classList.remove('hidden');
});


// animate
function animate() {
  requestAnimationFrame(animate);
  cheese.rotation.z += 0.003;
  pepperoni.rotation.y += 0.003;
  broc_group.rotation.y += 0.003;
  // mushroom.rotation.x += 0.003;

  renderer.render(scene, camera);
}

animate();