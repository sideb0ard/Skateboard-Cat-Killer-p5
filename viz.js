const backgroundColor = 0x00000F;

/*////////////////////////////////////////*/

var renderCalls = [];
function render () {
  requestAnimationFrame( render );
  renderCalls.forEach((callback)=>{ callback(); });
}
render();

/*////////////////////////////////////////*/

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(30, 80, 70);
camera.lookAt(new THREE.Vector3(0, 0, 0));

var renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( backgroundColor );

window.addEventListener( 'resize', function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}, false );

document.body.appendChild( renderer.domElement);

function renderScene(){ renderer.render( scene, camera ); }
renderCalls.push(renderScene);

/* ////////////////////////////////////////////////////////////////////////// */

var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.enableZoom = false;
//controls.autoRotate = true;

controls.rotateSpeed = 0.01;
controls.zoomSpeed = 0.3;

controls.enablePan = false;

controls.enableDamping = true;
controls.dampingFactor = 0.1;

controls.update();

renderCalls.push(function(){
  controls.update()
});


/* ////////////////////////////////////////////////////////////////////////// */


var spotLight = new THREE.SpotLight( 0xffffff, 1.25 );
spotLight.position.set( -200, 200, 600 );
camera.add( spotLight );
spotLight.position.set(-5, 2, 0);
scene.add(camera);

var pointLight = new THREE.PointLight(0xffffff, 0.25);
scene.add(pointLight);

var stats = initStats();
renderCalls.push(function(){
  stats.update()
});

var datcontrols = {
  Something : 0,
  SomethingElse : 0.01,
}

var gui = new dat.GUI();
gui.add(datcontrols, 'Something', 0, 10);
gui.add(datcontrols, 'SomethingElse', 0.01, 1);

/* ////////////////////////////////////////////////////////////////////////// */

var planeGeometry = new THREE.PlaneGeometry(70, 70);
var planeMaterial = new THREE.MeshBasicMaterial({ color: 0xAAAAAA });

var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -0.5 * Math.PI;
plane.position.set(0, 10, 0);
scene.add(plane);
