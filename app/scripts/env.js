var __env = {
	pages: undefined,
	currentPage: 0,
	
	init: function (pageData) {
		if (!pageData) {
			this.pages = [this.newPage()];
		} else {
			this.pages = pageData;
		}
		
		for (var i = 0; i < this.pages.length; i++) {
			for (var turtleName in this.pages.turtles) {
				this.currentPage = i;
				var turtleData = this.pages[i].turtles[turtleName];
					turtle = this.addTurtle(turtleData.x, turtleData.y, turtleName);
				turtle._color = turtleData._color;
				turtle._shape = turtleData._shape;
				this.pages.turtles[turtleName] = turtle;
				window[turtleName] = turtle;
			}
		}
	},
	
	newPage: function () {
		return {
			name: 'Page 1',
			turtles: {
				't1': new Turtle(0, 0)
			},
			buttons: [],
			textBoxes: {},
			sliders: {},
			bg: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAugAAAGqCAYAAABZIrFqAAAZm0lEQ…ABAgQMdD9AgAABAgQIECBAICRgoIfKEIUAAQIECBAgQIDAA6BJo13/TJ7nAAAAAElFTkSuQmCC'
		};
	},
	
	addTurtle: function (x, y, name) {
		if (!name) {
			var newNumber = 1;
			while (typeof window['t' + newNumber] !== 'undefined') {
				newNumber++;
			}
			name = 't' + newNumber;
		}
		var newTurtle = new Turtle(x || 0, y || 0);
		window[name] = newTurtle;
		__env.pages[currentPage].turtles[name] = newTurtle;
		return newTurtle;
	},
	
	
	sandbox: {
		runCode: function (__code) {
			// Browser globals
			var chrome = undefined,
				location = undefined,
				navigation = undefined,
				addEventListener = undefined,
				removeEventListener = undefined,
				document = '',
				arguments = undefined,
				
			// Element IDs
				__consoleContent = undefined,
				__consoleOutput = undefined,
				__shapesContent = undefined,
				__paintContent = undefined,
				__bgCanvas = undefined,
				__preCanvas = undefined,
				__turtleCanvas = undefined,
				__interact = undefined,
			// MW globals	
				__env = undefined,
				__editor = undefined;
			
			// Add MW commands to scope.
			for (arguments in MW) {
				eval('var ' + arguments + ' = function () { MW.' + arguments + '.apply(MW, arguments); };');
			}
			
			try {
				eval(__code);
			} catch (err) {
				MW.show(err.message, true);
				console.error(err);
			}
		}
	}
};
