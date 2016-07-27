var Turtle = (function () {
	'use strict';
	
	/**
	 * Create a new Turtle.
	 * @param {Number} xCor
	 * @param {Number} yCor
	 */
	function Turtle(xCor, yCor) {
		if (!__env.err.clampValue('Turtle', xCor) || !__env.err.clampValue('Turtle', yCor)) {
			return;
		}
		
		this.xCor = xCor;
		this.yCor = yCor;
		this._heading = 0;
		this._color = 9;
		this._penDown = false;
		this._penSize = 1;
		this._shape = 0;
		this._shapeCanvas = document.createElement('canvas');
		this._shapeCtx = this._shapeCanvas.getContext('2d');
		this.shape = this._shape;
	}
	
	Turtle.prototype = {
		__draw: function (ctx) {
			ctx.save();
			ctx.translate(this.xCor + (ctx.canvas.width / 2), this.yCor + (ctx.canvas.height / 2));
			ctx.rotate(this._heading);
			ctx.translate(-0.5 * this._shapeCanvas.width, -0.5 * this._shapeCanvas.height);
			ctx.drawImage(this._shapeCanvas, 0, 0);
			ctx.restore();
		},
		
		/**
		 * @private
		 */
		_recolorTurtle: function () {
			this._shapeCtx.save();
			this._shapeCtx.fillStyle = __env.COLORS[this._color];
			this._shapeCtx.globalCompositeOperation = 'source-in';
			this._shapeCtx.fillRect(0, 0, this._shapeCanvas.width, this._shapeCanvas.height);
			this._shapeCtx.restore();
		},
		
		/**
		 * Move the turtle backward.
		 * @param {Number} distance
		 * @example
		 * t1.back(20);
		 */
		back: function (distance) {
			if (!__env.err.validateSingleNumber('back', arguments, -9999, 9999)) {
				return;
			}
			
			this.forward(-distance);
		},
		
		/**
		 * Shorthand for {@link back}.
		 * @param {Number} distance
		 * @example
		 * t1.bk(20);
		 */
		bk: function (distance) {
			if (!__env.err.validateSingleNumber('bk', arguments, -9999, 9999)) {
				return;
			}
			
			this.forward(-distance);
		},
		
		/**
		 * Simulate a mouse click, turning it off if it was on.  This command will only have an effect if the turtle is programmed to react to a mouse click.  See also {@link clickOn} and {@link listen}.
		 */
		clickOff: function () {
			// TODO
		},
		
		/**
		 * Simulate a mouse click, turning it on if it was off.  This command will only have an effect if the turtle is programmed to react to a mouse click.  See also {@link clickOff}, {@link listen}.
		 */
		clickOn: function () {
			// TODO
		},
		
		/**
		 * Shorthand for {@link forward}.
		 * @param {Number} distance
		 * @example
		 * t1.fd(20);
		 */
		fd: function (distance) {
			if (!__env.err.validateSingleNumber('fd', arguments, -9999, 9999)) {
				return;
			}
			
			this.forward(distance);
		},
		
		/**
		 * Move the turtle forward.
		 * @param {Number} distance
		 * @example
		 * t1.forward(20);
		 */
		forward: function (distance) {
			if (!__env.err.validateSingleNumber('forward', arguments, -9999, 9999)) {
				return;
			}
			
			this.xCor += distance * Math.sin(this._heading);
			this.yCor += -distance * Math.cos(this._heading);
		},
		
		/**
		 * Turn the turtle to the left a number of degrees.
		 * @param {Number} degrees
		 * @example
		 * t1.left(90);
		 */
		left: function (degrees) {
			if (!__env.err.validateSingleNumber('left', arguments, -9999, 9999)) {
				return;
			}
			
			this._heading += (degrees * Math.PI / 180);
		},
		
		/**
		 * Shorthand for {@link left}
		 * @param {Number} degrees
		 * @example
		 * t1.lt(90);
		 */
		lt: function (degrees) {
			if (!__env.err.validateSingleNumber('lt', arguments, -9999, 9999)) {
				return;
			}
			
			this.left(degrees);
		},
		
		/**
		 * Turn the turtle to the right a number of degrees.
		 * @param {Number} degrees
		 * @example
		 * t1.right(90);
		 */
		right: function (degrees) {
			if (!__env.err.validateSingleNumber('right', arguments, -9999, 9999)) {
				return;
			}
			
			this.left(-degrees);
		},
		
		/**
		 * Shorthand for {@link right}
		 * @param {Number} degrees
		 * @example
		 * t1.rt(90);
		 */
		rt: function (degrees) {
			if (!__env.err.validateSingleNumber('rt', arguments, -9999, 9999)) {
				return;
			}
			
			this.left(-degrees);
		},
		
		get color() {
			return this._color;
		},
		set color(color) {
			if (!__env.err.validateArgCount('color', 1, arguments.length)) {
				return;
			}
			if ((typeof color !== 'number' && typeof color !== 'string') ||
					typeof __env.COLORS[color] === 'undefined') {
				__env.err.throwTypeError('color', color);
				return;
			}
			this._color = color;
			
			if (this._shape === 0) {
				this._recolorTurtle();
			}
		},
		
		get heading() {
			return this._heading * 180 / Math.PI;
		},
		set heading(heading) {
			if (!__env.err.validateSingleNumber('heading', arguments, -9999, 9999)) {
				return;
			}
			
			this._heading = heading * Math.PI / 180;
		},
		
		get shape() {
			return this._shape;
		},
		set shape(shape) {
			if (!__env.err.validateSingleNumber('shape', arguments, 0, 128)) {
				return;
			}
			
			// Save the new shape number.
			this._shape = shape;
			
			// Update the shape canvas.
			var shapeData = __env.shapes[shape];
			this._shapeCanvas.width = shapeData.width;
			this._shapeCanvas.height = shapeData.height;
			
			this._shapeCtx.drawImage(shapeData.image, 0, 0);
			
			if (shape === 0) {
				this._recolorTurtle();
			}
		}
	};
	
	
	Object.freeze(Turtle);
	return Turtle;
})();