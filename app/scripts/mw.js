var MW = (function () {
	var _bgColor = 0;
	
	var MW = {
		/**
		 * Stands for absolute.  Reports the absolute value of its input.
		 * @param {Number} number
		 * @example
		 * show(abs(-33));
		 * 33
		 */
		abs: function (number) {
			if (!__env.err.validateSingleNumber('abs', arguments)) {
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
			if (!__env.err.validateArgCount('alert', arguments.length, 1)) {
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
			if (!__env.err.validateSingleNumber('arctan', arguments)) {
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
			if (!__env.err.validateArgCount('ascii', arguments.length, 1)) {
				return;
			}
			if (typeof character !== 'string') {
				__env.err.throwTypeError('ascii', character);
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
			if (!__env.err.validateArgCount('butFirst', arguments.length, 1)) {
				return;
			}
			if (Array.isArray(stringOrList)) {
				return stringOrList.slice(1);
			} else if (typeof stringOrList !== 'string') {
				return stringOrList.substring(1);
			} else {
				__env.err.throwTypeError('butFirst', stringOrList);
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
			if (!__env.err.validateArgCount('butLast', arguments.length, 1)) {
				return;
			}
			if (Array.isArray(stringOrList)) {
				return stringOrList.slice(0, -1);
			} else if (typeof stringOrList !== 'string') {
				return stringOrList.substring(0, stringOrList.length - 1);
			} else {
				__env.err.throwTypeError('butLast', stringOrList);
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
			if (!__env.err.validateArgCount('cc', arguments.length, 0)) {
				return;
			}
			window.__editor.console.clear();
		},
		
		
		/**
		 * Stands for clear graphics.  Clears the graphics on the page and returns the current turtle to its home position, facing up.  See also {@link clean}.
		 */
		cg: function () {
			if (!__env.err.validateArgCount('cg', arguments.length, 0)) {
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
			if (!__env.err.validateSingleNumber('char', arguments, 32, 255)) {
				return;
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
			if (!__env.err.validateArgCount('clean', arguments.length, 0)) {
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
			if (!__env.err.validateArgCount('clone', arguments.length, 1)) {
				return;
			}
			if (!(turtle instanceof Turtle)) {
				__env.err.throwTypeError('clone', turtle);
				return;
			}
			
			var newTurtle = __env.createTurtle();
			newTurtle.color = turtle.color;
			newTurtle.shape = turtle.shape;
		},
		
		//
		// TODO: colorunder
		//
		
		//
		// TODO: copy
		//
		
		/**
		 * Stands for cosine.  Reports the cosine of its input.
		 * @param {Number} degrees
		 * @example
		 * show(cos(180));
		 * -1
		 */
		cos: function (degrees) {
			if (!__env.err.validateSingleNumber('cos', arguments)) {
				return;
			}
			
			var radVal = degrees * Math.PI / 180;
			return Math.cos(degrees);
		},
		
		//
		// Not implementing `count`.  Use `wordOrList.length` instead.
		//
		
		//
		// TODO: cut
		//
		
		
		
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
			if ((!isError || typeof isError !== 'boolean') && !__env.err.validateArgCount('show', arguments.length, 1)) {
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
