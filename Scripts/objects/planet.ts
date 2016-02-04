/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="gameObject.ts"/>

module objects {
    export class planet extends objects.gameObject {
        //PRIVATE INSTANCE VARIABLES +++++++++++++++++++++++++++++++++++++
        public orbit: number;
        public dist: number;
        public rot: number;
        
        public transform:Vector3;
        //CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor(geometry: THREE.Geometry, material: THREE.Material, x:number, y:number, z:number, orbit:number, dist:number, parent:Vector3) {
            super(geometry, material, x, y, z);
            this.orbit = orbit;
            this.dist = dist;
            this.rot = 0;
            
            this.transform = parent;
        }
        
        public update(): void
        {
            this.rot += this.orbit;
            var x = Math.cos(this.rot);    
            var y = Math.sin(this.rot);   
            
            this.position.set(this.transform.x + x*this.dist, this.transform.y + y*this.dist, 0);
        }
    }
}