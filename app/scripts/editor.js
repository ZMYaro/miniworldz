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
	
	validateName: function (name) {
		var NAME_REGEX = /^[A-Za-z0-9_]+$/,
			RESERVED = [
'abstract', 'boolean', 'break', 'byte', 'case', 'catch', 'char', 'class', 'const', 'continue', 'debugger', 'default', 'delete', 'do', 'double', 'else', 'enum', 'export', 'extends', 'false', 'final', 'finally', 'float', 'for', 'function', 'goto', 'if', 'implements', 'import', 'in', 'instanceof', 'int', 'interface', 'let', 'long', 'native', 'new', 'null', 'package', 'private', 'protected', 'public', 'return', 'short', 'static', 'super', 'switch', 'synchronized', 'this', 'throw', 'throws', 'transient', 'true', 'try', 'typeof', 'var', 'void', 'volatile', 'while', 'with'];
		
		if (typeof window[name] !== 'undefined' || typeof MW[name] !== 'undefined' || RESERVED.indexOf(name) !== -1 || name.indexOf('__') === 0) {
			alertUsedNameError(name);
			return false;
		}
		if (NAME_REGEX.test(name)) {
			alertInvalidNameError();
			return false;
		}
		return true;
	},
	
	addTurtle: function (x, y) {
		__env.addTurtle(x, y);
	},
	
	renameTurtle: function (oldName, newName) {
		if (!validateName(newName)) {
			return;
		}
		window[newName] = window[oldName];
		window[oldName] = undefined;
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
