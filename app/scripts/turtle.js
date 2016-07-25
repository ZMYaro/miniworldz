var Turtle = (function () {
	'use strict';
	
	function _throwTypeError(func, input) {
		throw new TypeError(func + ' does not like ' + input + ' as input.');
	}
	function _throwMaxError(func) {
		throw new RangeError('The maximum value for ' + func + ' is 9999.');
	}
	function _throwMinError(func) {
		throw new RangeError('The minimum value for ' + func + ' is -9999.');
	}
	function _clampValue(func, input, min, max) {
		if (typeof input !== 'number') {
			_throwTypeError(func, input);
			return false;
		}
		if (typeof min === 'undefined') {
			min = -9999;
		}
		if (typeof max === 'undefined') {
			max = 9999;
		}
		if (input < min) {
			_throwMinError(func);
			return false;
		} else if (input > max) {
			_throwMaxError(func);
			return false;
		}
		return true;
	}
	
	/**
	 * Create a new Turtle.
	 * @param {Number} xCor
	 * @param {Number} yCor
	 */
	function Turtle(xCor, yCor) {
		if (!_clampValue('Turtle', xCor) || !_clampValue('Turtle', yCor)) {
			return;
		}
		
		this.xCor = xCor;
		this.yCor = yCor;
		this._heading = 0;
		this._color = 9;
		this._shape = 0;
		this._shapeCanvas = document.createElement('canvas');
		this._shapeCtx = this._shapeCanvas.getContext('2d');
		this.shape = this._shape;
	}
	
	Turtle.prototype = {
		__draw: function (ctx) {
			ctx.save();
			ctx.translate(this.xCor, this.yCor);
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
			if (!_clampValue('back', distance)) {
				return;
			}
			this.xCor += -distance * Math.sin(this._heading);
			this.yCor += distance * Math.cos(this._heading);
		},
		
		/**
		 * Shorthand for {@link back}.
		 * @param {Number} distance
		 * @example
		 * t1.bk(20);
		 */
		bk: function (distance) {
			this.back(distance);
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
		 * t1.fd(20)
		 */
		fd: function (distance) {
			this.forward(distance);
		},
		
		/**
		 * Move the turtle forward.
		 * @param {Number} distance
		 * @example
		 * t1.forward(20)
		 */
		forward: function (distance) {
			if (!_clampValue('forward', distance)) {
				return;
			}
			this.xCor += distance * Math.sin(this._heading);
			this.yCor += -distance * Math.cos(this._heading);
		},
		
		get color() {
			return this._color;
		},
		set color(color) {
			if ((typeof color !== 'number' && typeof color !== 'string') ||
					typeof __env.COLORS[color] === 'undefined') {
				_throwTypeError('color', color);
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
			if (!_clampValue('heading', heading)) {
				return;
			}
			this._heading = heading * Math.PI / 180;
		},
		
		get shape() {
			return this._shape;
		},
		set shape(shape) {
			if (typeof shape !== 'number' || typeof __env.shapes[shape] === 'undefined') {
				_throwTypeError('shape', shape);
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