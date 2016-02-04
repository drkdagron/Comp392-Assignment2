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
        function planet(geometry, material, x, y, z, orbit, dist, parent) {
            _super.call(this, geometry, material, x, y, z);
            this.orbit = orbit;
            this.dist = dist;
            this.rot = 0;
            this.transform = parent;
        }
        planet.prototype.update = function () {
            this.rot += this.orbit;
            var x = Math.cos(this.rot);
            var y = Math.sin(this.rot);
            this.position.set(this.transform.x + x * this.dist, this.transform.y + y * this.dist, 0);
        };
        return planet;
    })(objects.gameObject);
    objects.planet = planet;
})(objects || (objects = {}));
//# sourceMappingURL=planet.js.map