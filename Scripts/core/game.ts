/// <reference path="_reference.ts"/>

// MAIN GAME FILE

// THREEJS Aliases
import Scene = THREE.Scene;
import Renderer = THREE.WebGLRenderer;
import PerspectiveCamera = THREE.PerspectiveCamera;
import BoxGeometry = THREE.BoxGeometry;
import CubeGeometry = THREE.CubeGeometry;
import PlaneGeometry = THREE.PlaneGeometry;
import SphereGeometry = THREE.SphereGeometry;
import AxisHelper = THREE.AxisHelper;
import LambertMaterial = THREE.MeshLambertMaterial;
import MeshBasicMaterial = THREE.MeshBasicMaterial;
import Mesh = THREE.Mesh;
import SpotLight = THREE.SpotLight;
import PointLight = THREE.PointLight;
import AmbientLight = THREE.AmbientLight;
import Control = objects.Control;
import GUI = dat.GUI;
import Color = THREE.Color;
import Vector3 = THREE.Vector3;

//Custom Game Objects
import gameObject = objects.gameObject;

var scene: Scene;
var renderer: Renderer;
var camera: PerspectiveCamera;
var axes: AxisHelper;
var cube: Mesh;
var plane: Mesh;
var sphere: Mesh;
var ambientLight: AmbientLight;
var spotLight: SpotLight;
var control: Control;
var gui: GUI;
var stats: Stats;
var step: number = 0;
var bodyMesh: THREE.Group;
var body:Mesh;
var head:Mesh;
var larm:Mesh;
var rarm:Mesh;
var lleg:Mesh;
var rleg:Mesh;

function init() {
    // Instantiate a new Scene object
    scene = new Scene();

    setupRenderer(); // setup the default renderer
	
    setupCamera(); // setup the camera
    
    //scene.fog=new THREE.FogExp2( 0xffffff, 0.015 );
    scene.fog=new THREE.Fog( 0xffffff, 0.015, 100 );
    console.log("Added Fog to scene...");
	
    // add an axis helper to the scene
    axes = new AxisHelper(5);
    scene.add(axes);
    console.log("Added Axis Helper to scene...");
    
    //Add a Plane to the Scene
    plane = new gameObject(
        new PlaneGeometry(60, 40, 1, 1),
        new LambertMaterial({ color: 0xffffff }),
        0, 0, 0);

    plane.rotation.x = -0.5 * Math.PI;

    scene.add(plane);
    console.log("Added Plane Primitive to scene...");
     
     bodyMesh = new THREE.Object3D();
     head = new gameObject(new CubeGeometry(3, 3, 3), 
     new LambertMaterial({color: 0xcc9900}), 0, 0, 0);
     head.position.set(0, 15, 0);
     head.name = "head";
     bodyMesh.add(head);
     
     body = new gameObject(new CubeGeometry(6, 6 , 2), 
     new LambertMaterial({color: 0x004d00}), 0, 0, 0);
     body.position.set(0, 10, 0);
     body.name = "body";
     bodyMesh.add(body);
     
     lleg = new gameObject(new CubeGeometry(2, 6, 2), 
     new LambertMaterial({color: 0X000099}), 0, 0, 0);
     lleg.position.set(2,4,0);
     lleg.name = "lleg";
     bodyMesh.add(lleg);
     
     rleg = new gameObject(new CubeGeometry(2, 6, 2),
     new LambertMaterial({color: 0x000099}), 0, 0, 0);
     rleg.position.set(-2, 4, 0);
     rleg.name = "rleg";
     bodyMesh.add(rleg);
     
     larm = new gameObject(new CubeGeometry(5, 1.2, 1.2),
     new LambertMaterial({color: 0xcc9900}), 0, 0, 0);
     larm.position.set(6, 12.5, 0);
     larm.name = "larm";
     bodyMesh.add(larm);

     
     rarm = new gameObject(new CubeGeometry(5, 1.2, 1.2),
     new LambertMaterial({color: 0xcc9900}), 0, 0, 0);
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
    control = new Control(0.02, 60, 40, 0, 0, 0);
    addControl(control);
    console.log("Added Control to scene...");
    
    // Add framerate stats
    addStatsObject();
    console.log("Added Stats to scene...");

    document.body.appendChild(renderer.domElement);
    gameLoop(); // render the scene	
    
    window.addEventListener('resize', onResize, false);
}

function onResize(): void {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}


function addControl(controlObject: Control): void {
    gui.add(controlObject, 'rotationSpeed', -1, 1);
    gui.add(controlObject, 'rotateX', -1, 1);
    gui.add(controlObject, 'rotateY', -1, 1);
    gui.add(controlObject, 'rotateZ', -1, 1);
    gui.add(controlObject, 'resetObject');
    gui.add(controlObject, 'randomColours');
    gui.add(controlObject, 'PresetColours');
}

function resetControl(controlObject: Control): void {
    
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
function gameLoop(): void {
    stats.update();
    
    // rotate the cubes around its axes
    scene.traverse(function(threeObject:THREE.Object3D) {
        if (threeObject == bodyMesh) {
            bodyMesh.rotation.x += control.rotateX * control.rotationSpeed;
            bodyMesh.rotation.y += control.rotateY * control.rotationSpeed;
            bodyMesh.rotation.z += control.rotateZ * control.rotationSpeed;
            
            //threeObject.rotation.x += control.rotationSpeed;
            //threeObject.rotation.y += control.rotationSpeed;
            //threeObject.rotation.z += control.rotationSpeed;
        }
    });
    
    // render using requestAnimationFrame
    requestAnimationFrame(gameLoop);
	
    // render the scene
    renderer.render(scene, camera);
}

// Setup default renderer
function setupRenderer(): void {
    renderer = new Renderer();
    renderer.setClearColor(0xEEEEEE, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;
    console.log("Finished setting up Renderer...");
}

// Setup main camera for the scene
function setupCamera(): void {
    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);
    console.log("Finished setting up Camera...");
}
