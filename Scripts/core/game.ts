//Game.ts
//Stephen McKillop
//Last Modified: Feb, 01, 2016
//Last Modified by: Stephen McKillop
//Global Controller for assignment 1

//Revision History: Initial and Complete, haha

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

var sphere: Mesh;
var ambientLight: AmbientLight;
var spotLight: SpotLight;
var control: Control;
var gui: GUI;
var stats: Stats;

var sun:gameObject;

var planets:objects.planet[];

function init() {
    // Instantiate a new Scene object
    scene = new Scene();

    setupRenderer(); // setup the default renderer
	
    setupCamera(); // setup the camera
   
    // add an axis helper to the scene
    axes = new AxisHelper(15);
    scene.add(axes);
    console.log("Added Helper to scene...");
    /*
    //Add a Plane to the Scene
    sun = new gameObject(new SphereGeometry(10, 30, 30), new LambertMaterial({ color: 0x666600 }), 0, 0, 0);
    console.log("created sun");
    scene.add(sun);
    console.log("Added sun to scene...");
    
    
    var spotAim1 = new THREE.Object3D();
    spotAim1.position.set(0, 2, 0);
    var spotAim2 = new THREE.Object3D();
    spotAim2.position.set(0, -2, 0);
    console.log("Spots:" + spotAim1.position + ", " + spotAim2.position);
    console.log("added helpers to scene...");
    
    var light1 = new THREE.SpotLight(0xFFFFFF, 10, 100, 180);
    light1.castShadow = true;
    light1.target = spotAim1;
    scene.add(light1);
    var light2 = new THREE.SpotLight(0xFFFFFF, 10, 100, 180);
    light2.castShadow = true;
    light2.target = spotAim2;
    scene.add(light2);
    console.log("Added lights to scene...");
    */
    
    //var sunLight = new PointLight(0xFFFFFF, 10, 100);
    //sunLight.castShadow= true;
    //sunLight.position.set(0, 0, 0);
    //scene.add(sunLight);
    
    /*
    
    planets = new Array<objects.planet>();
    
    //planets
    planets.push(new objects.planet(new SphereGeometry(2, 10, 10), new THREE.MeshPhongMaterial({color:0xFFFFFF}), 0, 0, 0, 0.002, 40, sun.position));
    planets.push(new objects.planet(new SphereGeometry(4, 10, 10), new THREE.MeshPhongMaterial({color:0xFF00FF}), 0, 0, 0, 0.005, 20, sun.position));
    planets.push(new objects.planet(new SphereGeometry(6, 10, 10), new THREE.MeshPhongMaterial({color:0x00FFFF}), 0, 0, 0, -0.009, 70, sun.position));
    planets.push(new objects.planet(new SphereGeometry(3, 10, 10), new THREE.MeshPhongMaterial({color:0xFFFF00}), 0, 0, 0, 0.017, 95, sun.position));
    planets.push(new objects.planet(new SphereGeometry(1.5, 10, 10), new THREE.MeshPhongMaterial({color:0xffffff}), 0, 0, 0, 0.055, 10, planets[2].position));
    
    //p2 = new gameObject(new SphereGeometry(7, 10, 10), new LambertMaterial({color:0x00ff00}), 0, 0, 0);
    //p3 = new gameObject(new SphereGeometry(4, 10, 10), new LambertMaterial({color:0x0000ff}), 0, 0, 0);
    //p4 = new gameObject(new SphereGeometry(2, 10, 10), new LambertMaterial({color:0xffff00}), 0, 0, 0);
    
    //p2.position = new Vector3(0, 50, 0);
    ///p3.position = new Vector3(0, 70, 0);
    //p4.position = new Vector3(0, 150, 0);
    
    //adding to stage
    for (var pl = 0; pl < planets.length; pl++)
    {
        scene.add(planets[pl]);
        //planets[pl].castShadow = true;
        //planets[pl].receiveShadow = true;
    }
    //scene.add(p1);
    //scene.add(p2);
    //scene.add(p3);
    //scene.add(p4);
    
    */
    
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

function onResize(): void {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}


function addControl(controlObject: Control): void {

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
    
    //for (var pl = 0; pl < planets.length; pl++)
    //{
    //    planets[pl].update();
    //}
    
    // render using requestAnimationFrame
    requestAnimationFrame(gameLoop);
	
    // render the scene
    renderer.render(scene, camera);
}

// Setup default renderer
function setupRenderer(): void {
    renderer = new Renderer();
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;
    console.log("Finished setting up Renderer...");
}

// Setup main camera for the scene
function setupCamera(): void {
    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
    camera.position.x = -150;
    camera.position.y = 200;
    camera.position.z = 150;
    camera.lookAt(scene.position);
    console.log("Finished setting up Camera...");
}
