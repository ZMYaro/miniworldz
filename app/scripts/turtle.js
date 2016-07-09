var Turtle = (function () {
	'use strict';
	
	function _throwTypeError(func, input) {
		throw new TypeError(func + ' does not like ' + input + ' as input.');
	}
	
	/**
	 * Create a new Turtle.
	 * @param {Number} xCor
	 * @param {Number} yCor
	 */
	function Turtle(xCor, yCor) {
		if (typeof xCor !== 'number') {
			_throwTypeError('Turtle', xCor);
			return;
		}
		if (typeof yCor !== 'number') {
			_throwTypeError('Turtle', yCor);
			return;
		}
		this.xCor = xCor;
		this.yCor = yCor;
		this._color = 9;
		this._shape = 0;
	}
	
	Turtle.prototype = {
		/**
		 * Moves the turtle backward.
		 * @param {Number} number
		 * @example
		 * t1.back(20);
		 */
		back: function (number) {
			// TODO
		},
		
		/**
		 * Shorthand for {@link back}.
		 * @param {Number} number
		 * @example
		 * t1.bk(20);
		 */
		bk: function (number) {
			this.back(number);
		},
		
		/**
		 * Simulates a mouse click, turning it off if it was on.  This command will only have an effect if the turtle is programmed to react to a mouse click.  See also {@link clickOn} and {@link listen}.
		 */
		clickOff: function () {
			// TODO
		},
		
		/**
		 * Simulates a mouse click, turning it on if it was off.  This command will only have an effect if the turtle is programmed to react to a mouse click.  See also {@link clickOff}, {@link listen}.
		 */
		clickOn: function () {
			// TODO
		},
		
		get color() {
			return this._color;
		},
		set color(color) {
			if ((typeof color === 'number' || typeof color === 'string') &&
					typeof _COLORS[color] !== 'undefined') {
				this._color = _COLORS[color];
			} else {
				_throwTypeError('color', color);
			}
		}
	};
	
	
	Object.freeze(Turtle);
	return Turtle;
})();