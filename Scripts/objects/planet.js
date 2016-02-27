/// <reference path="../../typings/tsd.d.ts"/>
/// <reference path="gameObject.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var planet = (function (_super) {
        __extends(planet, _super);
        //CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++++
        function planet(geometry, material, pos, orbit, dist, parent, startRot) {
            _super.call(this, geometry, material, pos.x, pos.y, pos.z);
            this.orbit = orbit;
            this.dist = dist;
            this.rot = startRot;
            this.transform = parent;
        }
        planet.prototype.update = function () {
            this.rot += this.orbit;
            var x = Math.cos(this.rot);
            var z = Math.sin(this.rot);
            this.position.set(this.transform.x + x * this.dist, 0, this.transform.z + z * this.dist);
        };
        return planet;
    })(objects.gameObject);
    objects.planet = planet;
})(objects || (objects = {}));
//# sourceMappingURL=planet.js.map