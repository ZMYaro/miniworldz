__editor.console = {
	/**
	 * @private
	 * Add a new message to the bottom of the console output.
	 * @param {String} message - The message to show
	 * @param {String} [msgClass] - The CSS class class of the message type
	 */
	_addMessage: function (message, msgClass) {
		var messagePara = document.createElement('p');
		messagePara.textContent = ('' + message);
		if (msgClass) {
			messagePara.className = msgClass;
		}
		// Add the new console message to the console.
		document.getElementById('__consoleOutput').appendChild(messagePara);
		// Scroll the console to the bottom.
		document.getElementById('__consoleOutput').scrollTop = Number.MAX_SAFE_INTEGER;
	},
	
	/**
	 * Initialize the editor console.
	 */
	init: function () {
		// Create the input history list.
		this._history = [''];
		this._historyIndex = 0;
		// Get the user input field.
		this._inputForm = document.getElementById('__consoleContent').getElementsByTagName('form')[0];
		this._inputField = this._inputForm.getElementsByTagName('input')[0];
		this._inputForm.addEventListener('submit', this.execute.bind(this));
		
		// Add event listeners for scrolling through past console inputs.
		this._inputField.onkeydown = (ev) => {
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
		};
	},
	
	/**
	 * Run the code typed into the console in the MiniWorldZ environment.
	 * @param {Event} ev - The form submit event
	 */
	execute: function (ev) {
		ev.preventDefault();
		ev.stopPropagation();
		
		// Get the user input.
		var input = this._inputForm.__consoleInput.value;
		
		// Add the typed input to the console's hisotry.
		this.addHistory(input);
		this._historyIndex = 0;
		
		// Run the code.
		__env.sandbox.runCode(input);
		
		// Clear the console input field.
		this._inputForm.__consoleInput.value = '';
	},
	
	/**
	 * Clear all the messages from the console.
	 */
	clear: function () {
		document.getElementById('__consoleOutput').innerHTML = '';
	},
	
	/**
	 * Add a message to the console's output window and input history.
	 * @param {String} message - The user's input
	 */
	addHistory: function (message) {
		// Show the new message in the console.
		this._addMessage(message, 'history');
		// Set the most recent history entry to that text.
		this._history[0] += message;
		// Add a new (blank) history entry for the now-empty console input field.
		this._history.unshift('');
	},
	
	/**
	 * Show an error message in the console's output window.
	 * @param {String} message - The error message text
	 */
	error: function (message) {
		this._addMessage(message, 'error');
	},
	
	/**
	 * Show an unstyled message in the console's output window.
	 * @param {String} message - The message text
	 */
	log: function (message) {
		this._addMessage(message, false);
	},
	
};
