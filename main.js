const source = new EventSource("/events");

source.addEventListener('gyro_readings', function(e) {
  var obj = JSON.parse(e.data);
  document.getElementById("gyroX").innerHTML = obj.gyroX;
  document.getElementById("gyroY").innerHTML = obj.gyroY;
  document.getElementById("gyroZ").innerHTML = obj.gyroZ;

  cube.rotation.x = obj.gyroY;
  cube.rotation.z = obj.gyroX;
  cube.rotation.y = obj.gyroZ;
  renderer.render(scene, camera);

  setLED("ledX", obj.ledX);
  setLED("ledY", obj.ledY);
  setLED("ledZ", obj.ledZ);
}, false);

source.addEventListener('acc_readings', function(e) {
  var obj = JSON.parse(e.data);
  document.getElementById("accX").innerHTML = obj.accX;
  document.getElementById("accY").innerHTML = obj.accY;
  document.getElementById("accZ").innerHTML = obj.accZ;
}, false);

source.addEventListener('temp_reading', function(e) {
  document.getElementById("temp").innerHTML = e.data;
}, false);

function setLED(id, status) {
  const led = document.getElementById(id);
  if (status === "ON") {
    led.textContent = "ON";
    led.classList.add("led-on");
    led.classList.remove("led-off");
  } else {
    led.textContent = "OFF";
    led.classList.add("led-off");
    led.classList.remove("led-on");
  }
}

// 3D CUBE SETUP
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, 300 / 300, 0.1, 1000);
let renderer = new THREE.WebGLRenderer();
renderer.setSize(300, 300);
document.getElementById("3Dcube").appendChild(renderer.domElement);

let geometry = new THREE.BoxGeometry();
let material = new THREE.MeshNormalMaterial();
let cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 2;
renderer.render(scene, camera);

function resetPosition(button) {
  const id = button.id;
  if (id === "reset") {
    cube.rotation.set(0, 0, 0);
  } else if (id === "resetX") {
    cube.rotation.x = 0;
  } else if (id === "resetY") {
    cube.rotation.y = 0;
  } else if (id === "resetZ") {
    cube.rotation.z = 0;
  }
  renderer.render(scene, camera);
}
