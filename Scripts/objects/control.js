/// <reference path="../../typings/tsd.d.ts"/>
var objects;
(function (objects) {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    var Control = (function () {
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        function Control(rotationSpeed, planeWidth, planeHeight, x, y, z) {
            this.rotationSpeed = rotationSpeed;
            this.numberOfObjects = scene.children.length;
            this._planeWidth = planeWidth;
            this._planeHeight = planeHeight;
            this.rotateX = x;
            this.rotateY = y;
            this.rotateZ = z;
        }
        Control.prototype.resetObject = function () {
            //bodyMesh.rotation.set(0,0,0);
            this.rotationSpeed = 0;
            this.rotateX = 0;
            this.rotateY = 0;
            this.rotateZ = 0;
        };
        // show scene objects
        Control.prototype.outputObjects = function () {
            console.log(scene.children);
        };
        return Control;
    })();
    objects.Control = Control;
})(objects || (objects = {}));
//# sourceMappingURL=control.js.map