var __editor = {
	activeBottomTab: 'console',
	
	/**
	 * Initialize the editor.
	 */
	init: function () {
		this.console.init();
	},
	
	alertUsedNameError: function (name) {
		window.alert('The name ' + name + ' is already used or is a reserved word.');
	},
	
	alertInvalidNameError: function () {
		window.alert('Names can only include letters, numbers, and underscores.');
	},
	
	/**
	 * Ensure a name for an object does not collide with an existing object or a reserved word.
	 * @param {String} name - The name to validate
	 * @returns {Boolean} Whether the name is valid
	 */
	validateName: function (name) {
		var NAME_REGEX = /^[A-Za-z0-9_]+$/,
			RESERVED = [
'abstract', 'boolean', 'break', 'byte', 'case', 'catch', 'char', 'class', 'const', 'continue', 'debugger', 'default', 'delete', 'do', 'double', 'else', 'enum', 'export', 'extends', 'false', 'final', 'finally', 'float', 'for', 'function', 'goto', 'if', 'implements', 'import', 'in', 'instanceof', 'int', 'interface', 'let', 'long', 'native', 'new', 'null', 'package', 'private', 'protected', 'public', 'return', 'short', 'static', 'super', 'switch', 'synchronized', 'this', 'throw', 'throws', 'transient', 'true', 'try', 'typeof', 'var', 'void', 'volatile', 'while', 'with'];
		
		if (typeof(window[name]) !== 'undefined' || typeof(MW[name]) !== 'undefined' || RESERVED.indexOf(name) !== -1 || name.indexOf('__') === 0) {
			this.alertUsedNameError(name);
			return false;
		}
		if (!NAME_REGEX.test(name)) {
			this.alertInvalidNameError();
			return false;
		}
		return true;
	},
	
	createTurtle: function (x, y) {
		__env.createTurtle(x, y);
	},
	
	/**
	 * Rename a turtle on the current page.
	 * @param {String} oldName - The current name of the turtle being renamed
	 * @param {String} newName - The new name to give the turtle
	 */
	renameTurtle: function (oldName, newName) {
		// If no turtle exists with the old name, silently abort.
		if (typeof(__env.pages[__env.currentPage].turtles[oldName]) === 'undefined') {
			return;
		}
		
		// If the new name is not valid for some reason, abort after validateName shows the appropriate error message.
		if (!this.validateName(newName)) {
			return;
		}
		
		var turtle = __env.pages[__env.currentPage].turtles[oldName];
		__env.pages[__env.currentPage].turtles[newName] = turtle;
		window[newName] = turtle;
		delete __env.pages[__env.currentPage].turtles[oldName];
		delete window[oldName];
	},
	
	switchBottomTab: function (newTab) {
		document.getElementById('__' + this.activeBottomTab + 'Content').className = '';
		document.getElementById('__' + newTab + 'Content').className = 'selected';
		this.activeBottomTab = newTab;
	}
};

window.addEventListener('beforeunload', function (ev) {
	var message = 'Before you leave, did you remember to save your latest changes?';
	if (ev) {
		ev.returnValue = message;
	}
	return message;
}, false);
