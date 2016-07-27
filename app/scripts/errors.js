__env.err = {
	throwTypeError: function (func, input) {
		throw new TypeError(func + ' does not like ' + input + ' as input');
	},
	
	throwMaxError: function (func) {
		throw new RangeError('The maximum value for ' + func + ' is 9999');
	},
	
	throwMinError: function (func) {
		throw new RangeError('The minimum value for ' + func + ' is -9999');
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
			this.throwMinError(func);
			return false;
		} else if (input > max) {
			this.throwMaxError(func);
			return false;
		}
		return true;
	},
	
	validateArgCount: function (func, received, expected) {
		if (expected !== received) {
			throw new Error(func + ' expected ' + expected + ' input' + (expected === 1 ? '' : 's') + ' but received ' + received);
			return false;
		}
		return true;
	},
	
	validateSingleNumber: function (func, args, min, max) {
		if (!this.validateArgCount(func, args.length, 1)) {
			return false;
		}
		if (typeof args[0] !== 'number') {
			this.throwTypeError(func, args[0]);
			return false;
		}
		if (typeof min !== 'undefined' && typeof max !== 'undefined') {
			return this.clampValue(func, args[0], min, max);
		}
		return true;
	}
};
