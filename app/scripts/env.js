var __env = {
	COLORS: [
		"#FFFFFF", "#EFEFEF", "#E7E7E7", "#CECECE", "#BDBDBD", "#A5A5A5", "#848484", "#636363", "#393939", "#000000",
		"#FFE7E7", "#FFC6C6", "#FF9494", "#FF5A5A", "#FF0000", "#F70000", "#DE0000", "#C60000", "#A50000", "#7B0000",
		"#FFEFE7", "#FFDEC6", "#FFC694", "#FFA55A", "#FF8400", "#F77B00", "#DE6B00", "#C65A00", "#A54A00", "#7B3100",
		"#F7F7EF", "#EFE7DE", "#E7CEC6", "#D6BDA5", "#CEA584", "#BD947B", "#AD846B", "#94735A", "#7B5A4A", "#5A4231",
		"#FFFFE7", "#FFFFC6", "#FFFF94", "#FFFF5A", "#FFFF00", "#F7F700", "#DEDE00", "#C6C600", "#A5A500", "#7B7B00",
		"#EFFFE7", "#DEF7C6", "#C6EF94", "#A5EF5A", "#84E700", "#7BD600", "#6BC600", "#5AA500", "#4A8C00", "#316300",
		"#E7FFE7", "#C6FFC6", "#94FF94", "#5AFF5A", "#00FF00", "#00F700", "#00DE00", "#00C600", "#00A500", "#007B00",
		"#E7FFFF", "#C6FFF7", "#94FFEF", "#5AFFEF", "#00FFE7", "#00F7D6", "#00DEBD", "#00C6A5", "#00A58C", "#007B63",
		"#F7FFFF", "#C6FFFF", "#94FFFF", "#5AFFFF", "#00FFFF", "#00F7F7", "#00DEDE", "#00C6C6", "#00A5A5", "#007B7B",
		"#E7F7FF", "#C6E7FF", "#94D6FF", "#5AC6FF", "#00ADFF", "#00A5F7", "#008CDE", "#007BC6", "#0063A5", "#004A7B",
		"#E7E7FF", "#C6C6FF", "#9494FF", "#5A5AFF", "#0000FF", "#0000F7", "#0000DE", "#0000C6", "#0000A5", "#00007B",
		"#F7E7FF", "#E7C6FF", "#D694FF", "#C65AFF", "#AD00FF", "#A500F7", "#8C00DE", "#7B00C6", "#6300A5", "#4A007B",
		"#FFE7FF", "#FFC6FF", "#FF94FF", "#FF5AFF", "#FF00FF", "#F700F7", "#DE00DE", "#C600C6", "#A500A5", "#7B007B",
		"#FFE7F7", "#FFC6E7", "#FF94D6", "#FF5AC6", "#FF00AD", "#F700A5", "#DE008C", "#C6007B", "#A50063", "#5A005A"
	],
	loops: [],
	shapes: [
		{
			image: new Image(),
			width: 20,
			height: 30
		}
	],
	pages: undefined,
	currentPage: 0,
	
	init: function (pageData) {
		this.shapes[0].image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeAQMAAAAW3KwoAAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAAAEJJREFUCNdjYEhgYGD4wMDA+AOGQXwIfvijgOH7vw8M9f8fMNj/P8Ag/78BhMFsBEaI8/9ngMtX/nzAUJDwgAEHAAAhMybCgj+n6wAAAABJRU5ErkJggg==';
		
		this.bgCanvas = document.getElementById('__bgCanvas');
		this.bgCtx = this.bgCanvas.getContext('2d');
		this.preCanvas = document.getElementById('__preCanvas');
		this.preCtx = this.preCanvas.getContext('2d');
		this.turtleCanvas = document.getElementById('__turtleCanvas');
		this.turtleCtx = this.turtleCanvas.getContext('2d');
		
		if (!pageData) {
			this.pages = [this.createPage()];
		} else {
			this.pages = pageData;
		}
		
		// Get background image.
		this.bgImage = new Image();
		this.bgImage.addEventListener('load', () => this.bgCtx.drawImage(this.bgImage, 0, 0));
		this.bgImage.src = this.pages[0].bg;
		
		// Create the objects for each page.
		for (var i = 0; i < this.pages.length; i++) {
			this.currentPage = i;
			for (var turtleName in this.pages[i].turtles) {
				var turtleData = this.pages[i].turtles[turtleName];
					turtle = this.createTurtle(turtleData.x, turtleData.y);
				// Set the new turtle's color.
				turtle.color = turtleData.color;
				// Set the new turtle's shape, and add an event listener in case the browser has not loaded the shape's image.
				turtle.shape = turtleData.shape;
				this.shapes[turtleData.shape].image.addEventListener('load', () => turtle.shape = turtleData.shape);
				// Add the turtle to the page's dictionary of turtles.
				this.pages[i].turtles[turtleName] = turtle;
				window[turtleName] = turtle;
			}
		}
		
		this.boundUpdate = this.update.bind(this);
		requestAnimationFrame(this.boundUpdate);
	},
	
	createPage: function () {
		return {
			name: 'Page 1',
			turtles: {
				't1': { x: 0, y: 0, color: 9, shape: 0 }
			},
			buttons: [],
			textBoxes: {},
			sliders: {},
			bg: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAugAAAGqAQMAAABj7CMpAAAAA1BMVEX///+nxBvIAAAAPUlEQVR42u3BMQEAAADCIPuntsNuYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQHKcbAABaYlmjAAAAABJRU5ErkJggg=='
		};
	},
	
	createTurtle: function (x, y, name) {
		if (!name) {
			var newNumber = 1;
			while (typeof window['t' + newNumber] !== 'undefined') {
				newNumber++;
			}
			name = 't' + newNumber;
		}
		var newTurtle = new Turtle(x || 0, y || 0);
		window[name] = newTurtle;
		this.pages[this.currentPage].turtles[name] = newTurtle;
		return newTurtle;
	},
	
	update: function () {
		// Run loops.
		for (var i = 0; i < this.loops.length; i++) {
			this.loops[i].func();
			if (this.loops[i].times !== -1 && --this.loops[i].times === 0) {
				this.loops.splice(i, 1);
				i--;
			}
		}
		
		// Draw turtles.
		this.turtleCtx.clearRect(0, 0, this.turtleCanvas.width, this.turtleCanvas.height);
		for (var turtleName in this.pages[this.currentPage].turtles) {
			this.pages[this.currentPage].turtles[turtleName].__draw(this.turtleCtx);
		}
		
		// Undo default anti-aliasing.
		Utils.deAntiAlias(this.turtleCtx);
		
		requestAnimationFrame(this.boundUpdate);
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
			for (var mwFunc in MW) {
				eval('var ' + mwFunc + ' = function () { MW.' + mwFunc + '.apply(MW, arguments); };');
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
