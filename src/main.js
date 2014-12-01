/**
 * This Source Code is licensed under the MIT license. If a copy of the
 * MIT-license was not distributed with this file, You can obtain one at:
 * http://opensource.org/licenses/mit-license.html.
 *
 * @author: Hein Rutjes (IjzerenHein)
 * @license MIT
 * @copyright Gloey Apps, 2014
 */

/*global define, console*/
/*eslint no-console:0 no-use-before-define:0*/

define(function(require) {

    //<webpack>
    require('famous-polyfills');
    require('famous/core/famous.css');
    require('./styles.css');
    require('./index.html');
    //</webpack>

    // Fast-click
    var FastClick = require('fastclick/lib/fastclick');
    FastClick.attach(document.body);

    // import dependencies
    var Engine = require('famous/core/Engine');
    var Surface = require('famous/core/Surface');
    var Modifier = require('famous/core/Modifier');
    var Transform = require('famous/core/Transform');
    var PhysicsEngine = require('famous/physics/PhysicsEngine');
    var Particle = require('famous/physics/bodies/Particle');
    var Drag = require('famous/physics/forces/Drag');
    var Distance = require('famous/physics/constraints/Distance');
    var Spring = require('famous/physics/forces/Spring');
    var Vector = require('famous/math/Vector');

    // Initialize
    var mainContext = Engine.createContext();
    var pe = new PhysicsEngine();
    var particle = _createParticle();
    var particle2 = _createParticle();
    var particle3 = _createParticle();
    var drag = _createDrag(particle);
    var drag3 = _createDrag(particle3);
    var shape = _createShape();
    var shape2 = _createShape();
    var shape3 = _createShape();
    var distance = _createDistance(particle, particle2);
    var spring = _createSpring(particle2, particle3);
    _setListeners();
    //_createLagometer();


    mainContext.add(particle).add(shape);
    mainContext.add(particle2).add(shape2);
    mainContext.add(particle3).add(shape3);



    function _createParticle() {
        var p = new Particle();
        pe.addBody(p);
        return p;
    }

    function _createDrag(particle) {
        var d = new Drag();
        pe.attach(d, particle);
        return d;
    }

    function _createShape() {
        return new Surface({
            size: [100, 100],
            classes: ['shape']
        });
    }

    function _createDistance(particle1, particle2) {
        var d = new Distance({
            anchor: particle1.position,
            length: 100
        });
        pe.attach(d, particle2);
        return d;
    }

    function _createSpring(particle1, particle2) {
        var s = new Spring({
            anchor: particle2.position,
            period: 1000,
            dampingRatio: 0.7
        });
        pe.attach(s, particle1);
        return s;
    }

    function _setListeners() {
        var left = true;
        shape.on('click', function() {
            particle.setVelocity([left ? 2 : -2, 0, 0]);
            particle3.setVelocity([left ? 2 : -2, 0, 0]);
            left = !left;
        });
    }

    particle.setPosition([150, 400, 0]);
    particle2.setPosition([150, 350, 0]);
    particle3.setPosition([150, 0, 0]);
    //particle.setVelocity([1, 0, 0]);

    //
    // Shows the lagometer
    //
    /*function _createLagometer() {
        var lagometerMod = new Modifier({
            size: [100, 100],
            align: [1.0, 0.0],
            origin: [1.0, 0.0],
            transform: Transform.translate(-10, 10, 1000)
        });
        var lagometer = new Lagometer({
            size: lagometerMod.getSize()
        });
        mainContext.add(lagometerMod).add(lagometer);
    }*/
});
