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
            bodyMesh.rotation.set(0, 0, 0);
            this.rotationSpeed = 0;
            this.rotateX = 0;
            this.rotateY = 0;
            this.rotateZ = 0;
            gui.__controllers[0].setValue(0); //set rotation speed
            gui.__controllers[1].setValue(0); //set rotation x
            gui.__controllers[2].setValue(0); //set rotation y
            gui.__controllers[3].setValue(0); //set rotation z
        };
        // show scene objects
        Control.prototype.outputObjects = function () {
            console.log(scene.children);
        };
        Control.prototype.randomColours = function () {
            head.material.setValues({ color: Math.floor(Math.random() * 16777215) });
            body.material.setValues({ color: Math.floor(Math.random() * 16777215) });
            larm.material.setValues({ color: Math.floor(Math.random() * 16777215) });
            rarm.material.setValues({ color: Math.floor(Math.random() * 16777215) });
            lleg.material.setValues({ color: Math.floor(Math.random() * 16777215) });
            rleg.material.setValues({ color: Math.floor(Math.random() * 16777215) });
        };
        Control.prototype.PresetColours = function () {
            head.material.setValues({ color: 0xcc9900 });
            body.material.setValues({ color: 0x004d00 });
            larm.material.setValues({ color: 0xcc9900 });
            rarm.material.setValues({ color: 0xcc9900 });
            lleg.material.setValues({ color: 0x000099 });
            rleg.material.setValues({ color: 0x000099 });
        };
        return Control;
    })();
    objects.Control = Control;
})(objects || (objects = {}));
//# sourceMappingURL=control.js.map