/// <reference path="../../typings/tsd.d.ts"/>

module objects {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    export class Control { 
        // PRIVATE INSTANCE VARIABLES
        private _planeWidth: number;
        private _planeHeight: number;
        
        // PUBLIC INSTANCE VARIABLES
        public rotationSpeed: number;
        public numberOfObjects: number;
        
        public rotateX: number;
        public rotateY: number;
        public rotateZ: number;
        
        public body: THREE.Group;
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        constructor(rotationSpeed: number, planeWidth: number, planeHeight: number, x:number, y:number, z:number) {
            this.rotationSpeed = rotationSpeed;
            this.numberOfObjects = scene.children.length;
            this._planeWidth = planeWidth;
            this._planeHeight = planeHeight;
            this.rotateX = x;
            this.rotateY = y;
            this.rotateZ = z;
        }

        public resetObject(): void {
            bodyMesh.rotation.set(0,0,0);
            this.rotationSpeed = 0;
            this.rotateX = 0;
            this.rotateY = 0;
            this.rotateZ = 0;
            gui.__controllers[0].setValue(0); //set rotation speed
            gui.__controllers[1].setValue(0); //set rotation x
            gui.__controllers[2].setValue(0); //set rotation y
            gui.__controllers[3].setValue(0); //set rotation z
        }
        
        // show scene objects
        public outputObjects(): void {
            console.log(scene.children);
        }
        
        public randomColours(): void {
              head.material.setValues({color: Math.floor(Math.random()*16777215)});
              body.material.setValues({color: Math.floor(Math.random()*16777215)});
              larm.material.setValues({color: Math.floor(Math.random()*16777215)});
              rarm.material.setValues({color: Math.floor(Math.random()*16777215)});
              lleg.material.setValues({color: Math.floor(Math.random()*16777215)});
              rleg.material.setValues({color: Math.floor(Math.random()*16777215)});
        }
        
        public PresetColours(): void {
            head.material.setValues({color: 0xcc9900});
            body.material.setValues({color: 0x004d00});
            larm.material.setValues({color: 0xcc9900});
            rarm.material.setValues({color: 0xcc9900});
            lleg.material.setValues({color: 0x000099});
            rleg.material.setValues({color: 0x000099});
        }
    }
}
