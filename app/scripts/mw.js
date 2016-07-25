var MW = (function () {
	var _bgColor = 0;
	
	function _throwTypeError(func, input) {
		throw new TypeError(func + ' does not like ' + input + ' as input.');
	}
	function _validateArgCount(func, expected, received) {
		if (expected !== received) {
			throw new Error(func + ' expected ' + expected + ' input' + (expected === 1 ? '' : 's') + ' but received ' + received + '.');
			return false;
		}
		return true;
	}
	
	var MW = {
		/**
		 * Stands for absolute.  Reports the absolute value of its input.
		 * @param {Number} number
		 * @example
		 * show(abs(-33));
		 * 33
		 */
		abs: function (number) {
			if (!_validateArgCount('abs', 1, arguments.length)) {
				return;
			}
			if (typeof number !== 'number') {
				_throwTypeError('abs', number);
				return;
			}
			return Math.abs(number);
		},

		/**
		 * Displays a message in an alert box.  Clicking OK closes the box.
		 * @param {String} message
		 * @example
		 * alert('You win!!');
		 */
		alert: function (message) {
			if (!_validateArgCount('alert', 1, arguments.length)) {
				return;
			}
			window.alert(message);
		},
		
		//
		// Not implementing `and`.  Use JavaScript `&&` in boolean expressions.
		//
		
		//
		// TODO: answer
		//

		/**
		 * Stands for arc tangent.  Reports the arc tangent (the inverse function of the tangent) of its input.  See also {@link tan} and {@link cos}.
		 * @param {Number} number
		 * @example
		 * show(arctan(1));
		 * 45
		java */
		arctan: function (number) {
			if (!_validateArgCount('arctan', 1, arguments.length)) {
				return;
			}
			if (typeof number !== 'number') {
				_throwTypeError('arctan', number);
				return;
			}
			var radVal = Math.atan(number);
			return radVal / Math.PI * 180;
		},

		/**
		 * Stands for American Standard Code for Information Exchange.  Reports the ASCII number which represents the character.  See also {@link char}.
		 * @param {String} character
		 */
		ascii: function (character) {
			if (!_validateArgCount('ascii', 1, arguments.length)) {
				return;
			}
			if (typeof character !== 'string') {
				_throwTypeError('ascii', character);
				return;
			}
			return character.charCodeAt(0);
		},

		//
		// TODO: ask 
		//
		
		/**
		 * Shorthand for {@link butFirst}.
		 * @param {Array|String} stringOrList
		 */
		bf: function (stringOrList) {
			return this.butFirst(stringOrList);
		},
		
		/** Stands for background.  Reports a number representing the color of the background. */
		get bg() {
			return _bgColor;
		},
		
		/**
		 * Shorthand for {@link butLast}.
		 * @param {Array|String} stringOrList
		 */
		bl: function (stringOrList) {
			return this.butLast(stringOrList);
		},
		
		/**
		 * Reports all but the first component of a string or list.  See also {@link butLast}, {@link first}, {@link last}.
		 * @param {Array|String} stringOrList
		 * @example
		 * show(butFirst([0, 1, 2, 3]));
		 * 1, 2, 3
		 * show(butFirst('welcome'));
		 * elcome
		 */
		butFirst: function (stringOrList) {
			if (!_validateArgCount('butFirst', 1, arguments.length)) {
				return;
			}
			if (Array.isArray(stringOrList)) {
				return stringOrList.slice(1);
			} else if (typeof stringOrList !== 'string') {
				return stringOrList.substring(1);
			} else {
				_throwTypeError('butFirst', stringOrList);
				return;
			}
		},
		
		/**
		 * Reports all but the last component of a string or list.  See also {@link butFirst}, {@link first}, {@link last}.
		 * @param {Array|String} stringOrList
		 * @example
		 * show(butLast([0, 1, 2, 3]));
		 * 0, 1, 2
		 * show(butLast('welcome'));
		 * welcom
		 */
		butLast: function (stringOrList) {
			if (!_validateArgCount('butLast', 1, arguments.length)) {
				return;
			}
			if (Array.isArray(stringOrList)) {
				return stringOrList.slice(0, -1);
			} else if (typeof stringOrList !== 'string') {
				return stringOrList.substring(0, stringOrList.length - 1);
			} else {
				_throwTypeError('butLast', stringOrList);
				return;
			}
		},
		
		//
		// TODO: cancel
		//
		
		//
		// TODO: carefully
		//
		
		/**
		 * Stands for clear the command center.  Clears text in the command center.
		 */
		cc: function () {
			if (!_validateArgCount('cc', 0, arguments.length)) {
				return;
			}
			window.__editor.console.clear();
		},
		
		
		/**
		 * Stands for clear graphics.  Clears the graphics on the page and returns the current turtle to its home position, facing up.  See also {@link clean}.
		 */
		cg: function () {
			if (!_validateArgCount('cg', 0, arguments.length)) {
				return;
			}
			// TODO
		},
		
		/**
		 * Stands for character.  Reports the character represented by the ASCII number given as input.  The number must be between 32 and 255, with the exception that char 9 is also allowed.  See also {@link ascii} and {@link print}.
		 * @param {Number} input
		 * @example
		 * show(char(97));
		 * a
		 */
		char: function (input) {
			if (!_validateArgCount('char', 1, arguments.length)) {
				return;
			}
			if (typeof input !== 'number') {
				_throwTypeError('char', input);
			} else if (input < 32 && input !== 9) {
				window.__editor.console.error('The minimum value for char is 32.')
			} else if (input > 255) {
				window.__editor.console.error('The maximum value for char is 255.');
			}
			return String.fromCharCode(input);
		},
		
		//
		// TODO: chdir
		//
		
		/**
		 * Clears the graphics without changing any turtle's position.  See also {@link cg} and {@link freezebg}.
		 */
		clean: function () {
			if (!_validateArgCount('clean', 1, arguments.length)) {
				return;
			}
			// TODO
		},
		
		// 
		// Not implementing `clearname`.  Use `delete` instead.
		//
		
		// 
		// TODO: clearnames
		//
		
		//
		// TODO: clipboard
		//
		
		/**
		 * Creates a copy of the named turtle.  The new turtle takes the first available name on the current page (t followed by a number).  Except for the name and position, the new turtle is a perfect clone of the original.
		 * @param {Turtle} turtle
		 * @example
		 * clone('t1');
		 */
		clone: function (turtle) {
			if (!_validateArgCount('clone', 1, arguments.length)) {
				return;
			}
			var newTurtle = __env.createTurtle();
			newTurtle.color = turtle.color;
			newTurtle.shape = turtle.shape;
		},
		
		
		/**
		 * Prints a word or list in the command center.
		 * @param {String} stringOrList
		 * @example
		 * show('hello');
		 * hello
		 * show([1, 2, 3]);
		 * 1,2,3
		 */
		show: function (stringOrList, isError) {
			if ((!isError || typeof isError !== 'boolean') && !_validateArgCount('show', 1, arguments.length)) {
				return;
			}
			if (!isError) {
				window.__editor.console.log(stringOrList);
			} else {
				window.__editor.console.error(stringOrList);
			}
		}
	};
	
	Object.freeze(MW);
	return MW;
})();
