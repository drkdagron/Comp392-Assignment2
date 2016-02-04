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
        }
        
        // show scene objects
        public outputObjects(): void {
            console.log(scene.children);
        }
    }
}
