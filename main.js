let scene, camera, renderer;
let enemies = [];
let isVeil = false;

init();
animate();

function init() {
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x000000, 5, 50);

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.position.set(0, 2, 5);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // LIGHT
  const light = new THREE.PointLight(0x00fff2, 2);
  light.position.set(5, 10, 5);
  scene.add(light);

  // FLOOR (District Zero)
  const floorGeo = new THREE.PlaneGeometry(100, 100);
  const floorMat = new THREE.MeshStandardMaterial({ color: 0x111111 });
  const floor = new THREE.Mesh(floorGeo, floorMat);
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);

  // ENEMY
  spawnEnemy();

  // CONTROLS
  document.getElementById("shootBtn").onclick = shoot;
  document.getElementById("shiftBtn").onclick = toggleVeil;

  // TOUCH MOVE (simple drag)
  window.addEventListener("touchmove", (e) => {
    camera.position.x += (e.touches[0].clientX - window.innerWidth/2) * 0.0001;
    camera.position.z += (e.touches[0].clientY - window.innerHeight/2) * 0.0001;
  });
}

function spawnEnemy() {
  const geo = new THREE.BoxGeometry(1,1,1);
  const mat = new THREE.MeshStandardMaterial({ color: 0xff0000 });

  const enemy = new THREE.Mesh(geo, mat);
  enemy.position.set(0, 1, -10);

  scene.add(enemy);
  enemies.push(enemy);
}

function shoot() {
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(new THREE.Vector2(0,0), camera);

  const hits = raycaster.intersectObjects(enemies);

  if (hits.length > 0) {
    scene.remove(hits[0].object);
    enemies = enemies.filter(e => e !== hits[0].object);
    console.log("Enemy eliminated");
  }
}

function toggleVeil() {
  isVeil = !isVeil;

  if (isVeil) {
    scene.background = new THREE.Color(0x220022);
    scene.fog.color.set(0x5500ff);
    document.getElementById("hud").innerText = "VEIL MODE ACTIVE";
  } else {
    scene.background = new THREE.Color(0x000000);
    scene.fog.color.set(0x000000);
    document.getElementById("hud").innerText = "NEON VEIL | DISTRICT ZERO";
  }
}

function animate() {
  requestAnimationFrame(animate);

  // Enemy movement (basic AI)
  enemies.forEach(e => {
    e.position.z += 0.02;
    if (isVeil) e.position.x = Math.sin(Date.now() * 0.002) * 2;
  });

  renderer.render(scene, camera);
}