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
var plane;
var sphere;
var ambientLight;
var spotLight;
var control;
var gui;
var stats;
var step = 0;
var bodyMesh;
var body;
var head;
var larm;
var rarm;
var lleg;
var rleg;
function init() {
    // Instantiate a new Scene object
    scene = new Scene();
    setupRenderer(); // setup the default renderer
    setupCamera(); // setup the camera
    //scene.fog=new THREE.FogExp2( 0xffffff, 0.015 );
    scene.fog = new THREE.Fog(0xffffff, 0.015, 100);
    console.log("Added Fog to scene...");
    // add an axis helper to the scene
    axes = new AxisHelper(5);
    scene.add(axes);
    console.log("Added Axis Helper to scene...");
    //Add a Plane to the Scene
    plane = new gameObject(new PlaneGeometry(60, 40, 1, 1), new LambertMaterial({ color: 0xffffff }), 0, 0, 0);
    plane.rotation.x = -0.5 * Math.PI;
    scene.add(plane);
    console.log("Added Plane Primitive to scene...");
    bodyMesh = new THREE.Object3D();
    head = new gameObject(new CubeGeometry(3, 3, 3), new LambertMaterial({ color: 0xcc9900 }), 0, 0, 0);
    head.position.set(0, 15, 0);
    head.name = "head";
    bodyMesh.add(head);
    body = new gameObject(new CubeGeometry(6, 6, 2), new LambertMaterial({ color: 0x004d00 }), 0, 0, 0);
    body.position.set(0, 10, 0);
    body.name = "body";
    bodyMesh.add(body);
    lleg = new gameObject(new CubeGeometry(2, 6, 2), new LambertMaterial({ color: 0X000099 }), 0, 0, 0);
    lleg.position.set(2, 4, 0);
    lleg.name = "lleg";
    bodyMesh.add(lleg);
    rleg = new gameObject(new CubeGeometry(2, 6, 2), new LambertMaterial({ color: 0x000099 }), 0, 0, 0);
    rleg.position.set(-2, 4, 0);
    rleg.name = "rleg";
    bodyMesh.add(rleg);
    larm = new gameObject(new CubeGeometry(5, 1.2, 1.2), new LambertMaterial({ color: 0xcc9900 }), 0, 0, 0);
    larm.position.set(6, 12.5, 0);
    larm.name = "larm";
    bodyMesh.add(larm);
    rarm = new gameObject(new CubeGeometry(5, 1.2, 1.2), new LambertMaterial({ color: 0xcc9900 }), 0, 0, 0);
    rarm.position.set(-6, 12.5, 0);
    rarm.name = "rarm";
    bodyMesh.add(rarm);
    scene.add(bodyMesh);
    // Add an AmbientLight to the scene
    ambientLight = new AmbientLight(0x0c0c0c);
    scene.add(ambientLight);
    console.log("Added an Ambient Light to Scene");
    // Add a SpotLight to the scene
    spotLight = new SpotLight(0xffffff);
    spotLight.position.set(-40, 60, -10);
    spotLight.castShadow = true;
    scene.add(spotLight);
    console.log("Added a SpotLight Light to Scene");
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
    gui.add(controlObject, 'rotationSpeed', -1, 1);
    gui.add(controlObject, 'rotateX', -1, 1);
    gui.add(controlObject, 'rotateY', -1, 1);
    gui.add(controlObject, 'rotateZ', -1, 1);
    gui.add(controlObject, 'resetObject');
    gui.add(controlObject, 'randomColours');
    gui.add(controlObject, 'PresetColours');
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
    // rotate the cubes around its axes
    scene.traverse(function (threeObject) {
        if (threeObject == bodyMesh) {
            bodyMesh.rotation.x += control.rotateX * control.rotationSpeed;
            bodyMesh.rotation.y += control.rotateY * control.rotationSpeed;
            bodyMesh.rotation.z += control.rotateZ * control.rotationSpeed;
        }
    });
    // render using requestAnimationFrame
    requestAnimationFrame(gameLoop);
    // render the scene
    renderer.render(scene, camera);
}
// Setup default renderer
function setupRenderer() {
    renderer = new Renderer();
    renderer.setClearColor(0xEEEEEE, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;
    console.log("Finished setting up Renderer...");
}
// Setup main camera for the scene
function setupCamera() {
    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);
    console.log("Finished setting up Camera...");
}
//# sourceMappingURL=game.js.map