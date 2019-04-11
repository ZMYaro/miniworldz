var TextBox = (function () {
	'use strict';
	
	function TextBox(name) {
		
		
		this.name = name;
		this.xCor = xCor;
		this.yCor = yCor;
		this.width = width;
		this.height = height;
		this.text = '';
		this.cursorPos = 0;
	}
	
	/**
	 * Puts the cursor (insertion point) at the end of the text.  See also {@link top}, {@link sol}, {@link eol}, and {@link eot}.
	 */
	TextBox.prototype.bottom = function () {
		this.text += '\n';
		this.cursorPos = this.text.length - 1;
	};
	
	/**
	 * Stands for cursor back.  Moves the cursor (insertion point) to the previous character.  See also {@link cf}, {@link cd}, and {@link cu}.
	 */
	TextBox.prototype.cb = function () {
		if (this.cursorPos > 0) {
			this.cursorPos--;
		}
	};
	
	/**
	 * Stands for cursor down.  Moves the cursor (insertion point) to the next physical line.  See also {@link cu}, {@link cf}, and {@link cb}.
	 */
	TextBox.prototype.cd = function () {
		// TODO
	};
	
	/**
	 * Stands for cursor froward.  Moves the cursor (insertion point) to the next character.  See also {@link cb}, {@link cd}, and {@link cu}.
	 */
	TextBox.prototype.cf = function () {
		if (this.cursorPos < this.text.length - 1) {
			this.cursorPos++;
		}
	};
	
	/**
	 * Stands for cursor up.  Moves the cursor (insertion point) to the previous physical line.  See also {@link cd}, {@link cb}, and {@link cf}.
	 */
	TextBox.prototype.cu = function () {
		// TODO
	};
	
	/**
	 * Deletes the character to the right of the insertion point, in the current text box.
	 */
	TextBox.prototype.delete = function () {
		// TODO
	};
	
	/**
	 * Stands for end of line. Brings the cursor (insertion point), in the current text box, to the end of the current logical line.  See also {@link sol}.
	 */
	TextBox.prototype.eol = function () {
		// TODO
	};
	
	/**
	 * @deprecated question mark function from MicroWorlds Logo.
	 */
	Object.defineProperty(TextBox.prototype, 'eot', {
		get: function () {
			__env.err.throwDeprecationError('textBox.eot', 'textBox.isEot');
		}
	});
	
	/**
	 * @deprecated function from MicroWorlds Logo.
	 */
	Object.defineProperty(TextBox.prototype, 'fontsize', {
		get: function () {
			__env.err.throwDeprecationError('textBox.fontsize', 'textBox.fontSize');
		}
	});
	
	/**
	 * The font size used at the insertion point in the current text box.  If text that has more than one font size is selected, fontsize reports the first one.
	 */
	Object.defineProperty(TextBox.prototype, 'fontSize', {
		get: function () {
			// TODO
		}
	});
	
	/**
	 * @deprecated question mark function from MicroWorlds Logo.
	 */
	Object.defineProperty(TextBox.prototype, 'found', {
		get: function () {
			__env.err.throwDeprecationError('textBox.found', 'textBox.wasFound');
		}
	});
	
	/**
	 * {Boolean} Stands for end of text.  Reports true if the cursor (insertion point), in the current text box, is at the end of the text.  See also {@link bottom}.
	 */
	Object.defineProperty(TextBox.prototype, 'isEot', {
		get: function () {
			// TODO
		}
	});
	
	/**
	 * {Boolean} Reports true if the last search instruction was successful
	 */
	Object.defineProperty(TextBox.prototype, 'wasFound', {
		get: function () {
			// TODO
		}
	});
	
	
	
	Object.freeze(TextBox);
	return TextBox;
});
