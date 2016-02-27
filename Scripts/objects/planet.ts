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
        constructor(geometry: THREE.Geometry, material: THREE.Material, pos:Vector3, orbit:number, dist:number, parent:Vector3, startRot:number){
            super(geometry, material, pos.x, pos.y, pos.z);
            this.orbit = orbit;
            this.dist = dist;
            this.rot = startRot;
            
            this.transform = parent;
        }
        
        
        public update(): void
        {
            this.rot += this.orbit;
            var x = Math.cos(this.rot);    
            var z = Math.sin(this.rot);   
            
            this.position.set(this.transform.x + x*this.dist, 0,this.transform.z + z*this.dist);
        }
    }
}