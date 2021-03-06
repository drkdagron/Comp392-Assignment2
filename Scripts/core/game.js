//Game.ts
//Stephen McKillop
//Last Modified: Feb, 01, 2016
//Last Modified by: Stephen McKillop
//Global Controller for assignment 1
//Revision History: Initial and Complete, haha
/// <reference path="_reference.ts"/>
// MAIN GAME FILE
// THREEJS Aliases
var Scene = THREE.Scene;
var Renderer = THREE.WebGLRenderer;
var PerspectiveCamera = THREE.PerspectiveCamera;
var BoxGeometry = THREE.BoxGeometry;
var CubeGeometry = THREE.CubeGeometry;
var PlaneGeometry = THREE.PlaneGeometry;
var SphereGeometry = THREE.SphereGeometry;
var AxisHelper = THREE.AxisHelper;
var LambertMaterial = THREE.MeshLambertMaterial;
var MeshBasicMaterial = THREE.MeshBasicMaterial;
var Mesh = THREE.Mesh;
var SpotLight = THREE.SpotLight;
var PointLight = THREE.PointLight;
var AmbientLight = THREE.AmbientLight;
var Control = objects.Control;
var GUI = dat.GUI;
var Color = THREE.Color;
var Vector3 = THREE.Vector3;
//Custom Game Objects
var gameObject = objects.gameObject;
var scene;
var renderer;
var camera;
var axes;
var cube;
var sphere;
var ambientLight;
var spotLight;
var control;
var gui;
var stats;
var sun;
var planets;
var asteroid;
var astGeo;
function loadAsteroid() {
    var loader = new THREE.JSONLoader();
    loader.load('../../Assets/asteroid.json', function (geometry) {
        console.log("Loaded asteroid");
        astGeo = new THREE.Geometry();
        astGeo.vertices = geometry.vertices;
        //console.log(astGeo.vertices.length);
        //asteroid = new THREE.Mesh(geometry);
    });
}
function init() {
    // Instantiate a new Scene object
    scene = new Scene();
    setupRenderer(); // setup the default renderer
    setupCamera(); // setup the camera
    // add an axis helper to the scene
    axes = new AxisHelper(20);
    scene.add(axes);
    console.log("Added Helper to scene...");
    //Add a Plane to the Scene
    sun = new gameObject(new SphereGeometry(9, 30, 30), new THREE.MeshLambertMaterial({ emissive: 0xFFFF00 }), 0, 0, 0);
    sun.receiveShadow = true;
    sun.castShadow = true;
    console.log("created sun");
    scene.add(sun);
    console.log("Added sun to scene...");
    var sunLight = new PointLight(0xFFFFFF, 4, 125);
    //sunLight.castShadow= true;
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);
    scene.add(sun);
    var ambientLight = new THREE.AmbientLight(0xFFFFFF);
    scene.add(ambientLight);
    planets = new Array();
    //planets
    planets.push(new objects.planet(new SphereGeometry(3, 20, 20), new THREE.MeshPhongMaterial({ map: THREE.ImageUtils.loadTexture('../../Assets/Planets/1.jpg') }), new THREE.Vector3(0, 0, 0), 0.002, 25, new Vector3(0, 0, 0), 0));
    planets.push(new objects.planet(new SphereGeometry(2, 20, 20), new THREE.MeshPhongMaterial({ map: THREE.ImageUtils.loadTexture('../../Assets/Planets/3.jpg') }), new THREE.Vector3(0, 0, 0), 0.155, 40, new Vector3(0, 0, 0), 0));
    planets.push(new objects.planet(new SphereGeometry(5, 20, 20), new THREE.MeshPhongMaterial({ map: THREE.ImageUtils.loadTexture('../../Assets/Planets/4.jpg') }), new THREE.Vector3(0, 0, 0), -0.009, 55, new Vector3(0, 0, 0), 0));
    planets.push(new objects.planet(new SphereGeometry(3, 20, 20), new THREE.MeshPhongMaterial({ map: THREE.ImageUtils.loadTexture('../../Assets/Planets/1.jpg') }), new THREE.Vector3(0, 0, 0), 0.017, 110, new Vector3(0, 0, 0), 0));
    planets.push(new objects.planet(new SphereGeometry(7, 20, 20), new THREE.MeshPhongMaterial({ map: THREE.ImageUtils.loadTexture('../../Assets/Planets/5.jpg') }), new THREE.Vector3(0, 0, 0), 0.03, 130, new Vector3(0, 0, 0), 0));
    planets.push(new objects.planet(new SphereGeometry(1.5, 20, 20), new THREE.MeshPhongMaterial({ map: THREE.ImageUtils.loadTexture('../../Assets/Planets/6.jpg') }), new THREE.Vector3(0, 0, 0), 0.055, 8, planets[2].position, 0));
    for (var ast = 0; ast < 15; ast++) {
        var dir = randomDir();
        dir = new THREE.Vector3(dir.x * 70, 0, dir.z * 70);
        planets.push(new objects.planet(new BoxGeometry(2, 1, 3), new THREE.MeshLambertMaterial({ color: 0xDDDDDD }), new THREE.Vector3(0, 0, 0), 0.003 + Math.random() % 0.05, 80 + Math.random() * 10, new Vector3(0, 0, 0), Math.random() * 360));
    }
    //p2 = new gameObject(new SphereGeometry(7, 10, 10), new LambertMaterial({color:0x00ff00}), 0, 0, 0);
    //p3 = new gameObject(new SphereGeometry(4, 10, 10), new LambertMaterial({color:0x0000ff}), 0, 0, 0);
    //p4 = new gameObject(new SphereGeometry(2, 10, 10), new LambertMaterial({color:0xffff00}), 0, 0, 0);
    //p2.position = new Vector3(0, 50, 0);
    ///p3.position = new Vector3(0, 70, 0);
    //p4.position = new Vector3(0, 150, 0);
    //adding to stage
    for (var pl = 0; pl < planets.length; pl++) {
        planets[pl].castShadow = true;
        planets[pl].receiveShadow = true;
        console.log("Adding: " + pl);
        scene.add(planets[pl]);
    }
    //scene.add(p1);
    //scene.add(p2);
    //scene.add(p3);
    //scene.add(p4);
    // add controls
    gui = new GUI();
    control = new Control(0.02, 60, 40, 0.01, 0.01, 0.01);
    addControl(control);
    console.log("Added Control to scene...");
    // Add framerate stats
    addStatsObject();
    console.log("Added Stats to scene...");
    document.body.appendChild(renderer.domElement);
    gameLoop(); // render the scene	
    window.addEventListener('resize', onResize, false);
}
function randomDir() {
    var num = Math.random() * 360;
    var x = Math.cos(num);
    var z = Math.sin(num);
    console.log(num);
    console.log(x + ', 0, ' + z);
    return new Vector3(x, 0, z);
}
function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
function addControl(controlObject) {
}
function resetControl(controlObject) {
}
function addStatsObject() {
    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
}
// Setup main game loop
function gameLoop() {
    stats.update();
    for (var pl = 0; pl < planets.length; pl++) {
        planets[pl].update();
    }
    // render using requestAnimationFrame
    requestAnimationFrame(gameLoop);
    // render the scene
    renderer.render(scene, camera);
}
// Setup default renderer
function setupRenderer() {
    renderer = new Renderer();
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;
    console.log("Finished setting up Renderer...");
}
// Setup main camera for the scene
function setupCamera() {
    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
    camera.position.x = -150;
    camera.position.y = 200;
    camera.position.z = 150;
    camera.lookAt(scene.position);
    console.log("Finished setting up Camera...");
}
//# sourceMappingURL=game.js.map