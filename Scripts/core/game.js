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
var step = 0;
var bodyMesh;
var sun;
var p1;
var p2;
var p3;
var p4;
var orbit = 0;
var planets;
function init() {
    // Instantiate a new Scene object
    scene = new Scene();
    setupRenderer(); // setup the default renderer
    setupCamera(); // setup the camera
    // add an axis helper to the scene
    axes = new AxisHelper(15);
    scene.add(axes);
    console.log("Added  Helper to scene...");
    //Add a Plane to the Scene
    sun = new gameObject(new SphereGeometry(10, 30, 30), new THREE.MeshPhongMaterial({ color: 0x666600, emissive: 0x333300 }), 0, 0, 0);
    sun.rotation.x = -0.5 * Math.PI;
    var sunLight = new PointLight(0xFFFFFF, 10, 100);
    sunLight.castShadow = true;
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);
    scene.add(sun);
    planets = new Array();
    //planets
    planets.push(new objects.planet(new SphereGeometry(2, 10, 10), new LambertMaterial({ color: 0xFFFFFF }), 0, 0, 0, 0.002, 40, sun.position));
    planets.push(new objects.planet(new SphereGeometry(4, 10, 10), new LambertMaterial({ color: 0xFF00FF }), 0, 0, 0, 0.005, 20, sun.position));
    planets.push(new objects.planet(new SphereGeometry(6, 10, 10), new THREE.MeshPhongMaterial({ color: 0x00FFFF }), 0, 0, 0, -0.009, 70, sun.position));
    planets.push(new objects.planet(new SphereGeometry(3, 10, 10), new LambertMaterial({ color: 0xFFFF00 }), 0, 0, 0, 0.017, 95, sun.position));
    planets.push(new objects.planet(new SphereGeometry(1.5, 10, 10), new LambertMaterial({ color: 0xffffff }), 0, 0, 0, 0.055, 10, planets[2].position));
    //p2 = new gameObject(new SphereGeometry(7, 10, 10), new LambertMaterial({color:0x00ff00}), 0, 0, 0);
    //p3 = new gameObject(new SphereGeometry(4, 10, 10), new LambertMaterial({color:0x0000ff}), 0, 0, 0);
    //p4 = new gameObject(new SphereGeometry(2, 10, 10), new LambertMaterial({color:0xffff00}), 0, 0, 0);
    //p2.position = new Vector3(0, 50, 0);
    ///p3.position = new Vector3(0, 70, 0);
    //p4.position = new Vector3(0, 150, 0);
    //adding to stage
    for (var pl = 0; pl < planets.length; pl++) {
        scene.add(planets[pl]);
        planets[pl].castShadow = true;
        planets[pl].receiveShadow = true;
    }
    //scene.add(p1);
    //scene.add(p2);
    //scene.add(p3);
    //scene.add(p4);
    scene.add(ambientLight);
    console.log("Added an Ambient Light to Scene");
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