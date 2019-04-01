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
			__env.err.validateSingleNumber('abs', arguments);
			
			return Math.abs(number);
		},

		/**
		 * Displays a message in an alert box.  Clicking OK closes the box.
		 * @param {String} message
		 * @example
		 * alert('You win!!');
		 */
		alert: function (message) {
			__env.err.validateArgCount('alert', arguments.length, 1);
			
			window.alert(message);
		},
		
		/**
		 * @deprecated function from MicroWorlds Logo.
		 * Reports true if all its inputs report true.
		 * @param {Boolean} trueOrFalse1
		 * @param {Boolean} trueOrFalse2
		 * @returns {Boolean} Whether all the inputs are true
		 * @example
		 * show(and(t1.xCor === 0, t1.yCor === 0, t1.heading === 0))
		 * true
		 */
		and: function () {
			__env.err.showDeprecationWarning('and(trueOrFalse1, trueOrFalse2)', 'trueOrFalse1 && trueOrFalse2');
			
			if (arguments.length < 2) {
				__env.error.validateArgCount('and', arguments.length, 'multiple');
			}
			
			var result = true;
			
			for (arg of arguments) {
				result = (result && arg);
			}
			
			return result;
		},
		
		/**
		 * @deprecated function from MicroWorlds Logo.
		 * Displays a message in an alert box.  Clicking OK closes the box.
		 * @param {String} message
		 * @example
		 * announce('You win!!');
		 */
		announce: function () {
			__env.err.showDeprecationWarning('announce(message)', 'alert(message)');
			
			return MW.alert.apply(MW, arguments);
		},
		
		//
		// TODO: answer
		//

		/**
		 * Stands for arc tangent.  Reports the arc tangent (the inverse function of the tangent) of its input.  See also {@link tan} and {@link cos}.
		 * @param {Number} number
		 * @example
		 * show(arctan(1));
		 * 45
		 */
		arctan: function (number) {
			__env.err.validateSingleNumber('arctan', arguments);
			
			var radVal = Math.atan(number);
			return radVal / Math.PI * 180;
		},

		/**
		 * Stands for American Standard Code for Information Exchange.  Reports the ASCII number which represents the character.  See also {@link char}.
		 * @param {String} character
		 */
		ascii: function (character) {
			__env.err.validateArgCount('ascii', arguments.length, 1);
			__env.err.validateType('ascii', character, 'string', 'character');
			
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
			__env.err.validateArgCount('butFirst', arguments.length, 1);
			
			if (Array.isArray(stringOrList)) {
				return stringOrList.slice(1);
			} else if (typeof stringOrList === 'string') {
				return stringOrList.substring(1);
			}
			
			throw new TypeError(stringOrList + ' is not text or a list in butFirst.');
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
			__env.err.validateArgCount('butLast', arguments.length, 1);
			
			if (Array.isArray(stringOrList)) {
				return stringOrList.slice(0, -1);
			} else if (typeof stringOrList === 'string') {
				return stringOrList.substring(0, stringOrList.length - 1);
			}
			
			throw new TypeError(stringOrList + ' is not text or a list in butLast.');
		},
		
		/**
		 * Stops the function given as input.  The function must have been launched using {@link forever}, buttons, or clickable turtles.  The input must be the exact same as the function that started the process.
		 * @input {Function} func
		 * @example
		 * forever(myFunc);
		 * wait(200);
		 * cancel(myFunc);
		 */
		cancel: function (func) {
			__env.err.validateArgCount('cancel', arguments.length, 1);
			__env.err.validateType('cancel', func, ['function', 'string'], 'function');
			
			__env.loops.forEach((loop, i) => {
				if (loop.func.toString() == func.toString()) {
					// Remove the function from the loop list.
					__env.loops.splice(i, 1);
				}
			});
		},
		
		//
		// TODO: carefully
		//
		
		/**
		 * Stands for clear the command center.  Clears text in the command center.
		 */
		cc: function () {
			__env.err.validateArgCount('cc', arguments.length, 0);
			
			if (!window.__editor) {
				// If this is not being run in the editor, silently abort.
				return;
			}
			window.__editor.console.clear();
		},
		
		
		/**
		 * Stands for clear graphics.  Clears the graphics on the page and returns the current turtle to its home position, facing up.  See also {@link clean}.
		 */
		cg: function () {
			__env.err.validateArgCount('cg', arguments.length, 0);
			
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
			__env.err.validateSingleNumber('char', arguments, 32, 255);
			
			return String.fromCharCode(input);
		},
		
		//
		// TODO: chdir
		//
		
		/**
		 * Clears the graphics without changing any turtle's position.  See also {@link cg} and {@link freezeBg}.
		 */
		clean: function () {
			if (!__env.err.validateArgCount('clean', arguments.length, 0)) {
				return;
			}
			// TODO
		},
		
		// 
		// TODO: clearname (not like `delete`, which only works on objects)
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
		
		/**
		 * @deprecated function from MicroWorlds Logo.
		 * Reports the number of components in the word or the list.
		 * @param {Array|String} stringOrList
		 * @example
		 * show(count('hello'))
		 * 5
		 * show(count(['hello', 'there']))
		 * 2
		 */
		count: function (stringOrList) {
			__env.err.showDeprecationWarning('count(stringOrList)', 'stringOrList.length');
			
			if (typeof(stringOrList.length) === 'undefined') {
				throw new TypeError(stringOrList + ' is not text or a list in count.');
			}
			
			return stringOrList.length;
		},
		
		//
		// TODO: cut
		//
		
		//
		// TODO: createProjectVar
		//
		
		/**
		 * @deprecated function from MicroWorlds Logo.
		 * Reports the result of subtracting number2 from number1.
		 * @param {Number} number1 - The number being subtracted from
		 * @param {Number} number2 - The number being subtracted
		 * @returns {Number} The difference of number1 - number2
		 * @example
		 * show(difference(7, 3))
		 * 4
		 */
		difference: function (number1, number2) {
			__env.err.showDeprecationWarning('difference(number1, number2)', 'number1 - number2');
			
			__env.err.validateArgCount('difference', arguments.length, 2);
			__env.err.validateAllNumbers('difference', arguments);
			
			return (number1 - number2);
		},
		
		/**
		 * @deprecated un-camelcased function from MicroWorlds Logo.
		 */
		dolist: function () {
			__env.err.throwDeprecationError('dolist(item, list, instructions)', 'list.forEach(instructions)');
		},
		
		/**
		 * @deprecated function from MicroWorlds Logo.
		 */
		doList: function () {
			__env.err.throwDeprecationError('doList(item, list, instructions)', 'list.forEach(instructions)');
		},
		
		//
		// TODO: done
		//
		
		/**
		 * @deprecated un-camelcased function from MicroWorlds Logo.
		 */
		dotimes: function () {
			__env.err.throwDeprecationError('dotimes(count, instructions)', 'doTimes(count, instructions)');
		},
		
		/**
		 * Runs the instruction list for each value specified in the range.
		 * @param {Number} count - The number of times to run the instructions function
		 * @param {Function} instructions - The instructions to run
		 * @example
		 * doTimes(5, (i) => show(i))
		 * 0
		 * 1
		 * 2
		 * 3
		 * 4
		 */
		doTimes: function (count, instructions) {
			__env.err.validateArgCount('doTimes', arguments.length, 2);
			__env.err.validateType('doTimes', count, 'number');
			__env.err.validateType('doTimes', instructions, 'function');
			
			for (var i = 0; i < count; i++) {
				instructions(i);
			}
		},
		
		/**
		 * Runs the function repeatedly.  Use {@link cancel} or the Stop All toolbar button to stop it.
		 * @param {Function} func
		 * @example
		 * forever(() => { t1.fd(1); t1.rt(2); });
		 */
		forever: function (func) {
			__env.loops.push({
				func: func,
				times: -1
			});
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
