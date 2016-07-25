__editor.console = {
	_addMessage: function (message, msgClass) {
		var messagePara = document.createElement('p');
		messagePara.innerText = messagePara.textContent = ('' + message);
		if (msgClass) {
			messagePara.className = msgClass;
		}
		document.getElementById('__consoleOutput').appendChild(messagePara);
		document.getElementById('__consoleOutput').scrollTop = Number.MAX_VALUE;
	},
	
	init: function () {
		this._history = [''];
		this._historyIndex = 0;
		this._inputForm = document.getElementById('__consoleContent').getElementsByTagName('form')[0];
		this._inputField = this._inputForm.getElementsByTagName('input')[0];
		
		// Add event listeners for scrolling through past console inputs.
		this._inputField.onkeydown = (function (ev) {
			if (ev.keyCode === 38 && this._historyIndex < this._history.length - 1) {
				// Up
				if (this._historyIndex === 0) {
					this._history[0] = this._inputField.value;
				}
				this._historyIndex++;
				this._inputField.value = this._history[this._historyIndex];
				ev.preventDefault();
			} else if (ev.keyCode === 40 && this._historyIndex > 0) {
				// Down
				this._historyIndex--;
				this._inputField.value = this._history[this._historyIndex];
				ev.preventDefault();
			}
		}).bind(this);
	},
	
	execute: function (consoleForm, event) {
		event.preventDefault();
		event.stopPropagation();
		this.addHistory(consoleForm.__consoleInput.value);
		this._historyIndex = 0;
		__env.sandbox.runCode(consoleForm.__consoleInput.value);
		consoleForm.__consoleInput.value = '';
	},
	
	clear: function () {
		document.getElementById('__consoleOutput').innerHTML = '';
	},
	
	addHistory: function (message) {
		this._addMessage(message, 'history');
		this._history[0] += message;
		this._history.unshift('');
	},
	
	error: function (message) {
		this._addMessage(message, 'error');
	},
	
	log: function (message) {
		this._addMessage(message, false);
	},
	
};
