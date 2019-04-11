__env.err = {
	_formatForOutput: function (input) {
		if (typeof(input) === 'string') {
			return ('\'' + input + '\'');
		} else if (Array.isArray(input)) {
			var output = '[';
			for (var i = 0; i < input.length; i++) {
				input[i] = this._formatForOutput(input[i]);
			}
			return ('[' + input.join(', ') + ']');
		}
		return input;
	},
	
	showDeprecationWarning: function (oldFunc, newFunc) {
		if (__editor.console) {
			__editor.console.warn('You can use \u201c' + newFunc + '\u201d instead of \u201c' + oldFunc + '\u201d.');
		}
	},
	throwDeprecationError: function (oldFunc, newFunc) {
		throw new Error('Use \u201c' + newFunc + '\u201d instead of \u201c' + oldFunc + '\u201d.');
	},
	throwTypeError: function (func, input) {
		input = this._formatForOutput(input);
		throw new TypeError(func + ' does not like ' + input + ' as input.');
	},
	
	throwMaxError: function (func, max) {
		if (typeof(max) === 'undefined') {
			max = 9999;
		}
		throw new RangeError('The maximum value for ' + func + ' is ' + max + '.');
	},
	
	throwMinError: function (func, min) {
		if (typeof(min) === 'undefined') {
			min = -9999;
		}
		throw new RangeError('The minimum value for ' + func + ' is ' + min + '.');
	},
	
	clampValue: function (func, input, min, max) {
		if (typeof input !== 'number') {
			this.throwTypeError(func, input);
			return false;
		}
		if (typeof min === 'undefined') {
			min = -9999;
		}
		if (typeof max === 'undefined') {
			max = 9999;
		}
		if (input < min) {
			this.throwMinError(func, min);
			return false;
		} else if (input > max) {
			this.throwMaxError(func, max);
			return false;
		}
		return true;
	},
	
	validateArgCount: function (func, received, expected) {
		if (expected !== received) {
			throw new Error(func + ' expected ' + expected + ' input' + (expected === 1 ? '' : 's') + ' but received ' + received + '.');
			return false;
		}
		return true;
	},
	
	validateType: function (func, input, types, typeName) {
		if (typeof(types) === 'string') {
			types = [types];
		}
		if (types.indexOf(typeof(input)) === -1 &&
				!(types.indexOf('array') !== -1 && Array.isArray(input))) {
			if (typeof(typeName) === 'undefined') {
				typeName =
					(new Intl.ListFormat('en', { style: 'long', type: 'disjunction' }))
					.format(types);
			}
			input = this._formatForOutput(input);
			throw new TypeError(input + ' is not a ' + typeName + ' in ' + func + '.');
			return false;
		}
		return true;
	},
	
	validateSingleNumber: function (func, args, min, max) {
		this.validateArgCount(func, args.length, 1);
		this.validateType(func, args[0], 'number');
		if (typeof min !== 'undefined' && typeof max !== 'undefined') {
			this.clampValue(func, args[0], min, max);
		}
		return true;
	},
	
	validateAllNumbers: function (func, args, min, max) {
		for (var arg of args) {
			this.validateType(func, arg, 'number');
			if (typeof min !== 'undefined' && typeof max !== 'undefined') {
				this.clampValue(func, arg, min, max);
			}
		}
		return true;
	}
};
