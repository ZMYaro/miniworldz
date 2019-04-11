'use strict';

// Polyfills.
Math.TAU = Math.TAU || (2 * Math.PI);
Object.values = Object.values || function (obj) {
	var vals = [];
	for (var key in obj) {
		if (obj.hasOwnProperty(obj[key]) && obj.propertyIsEnumerable(obj[key])) {
			vals.push(obj[key]);
		}
	}
	return vals;
};

var Utils = {
	/**
	 * Undo anti-aliasing.
	 * @param {CanvasRenderingContext2D} ctx - The canvas to remove anti-aliasing from
	 * @param {Object} [color] - The color every pixel on the canvas should be
	 */
	deAntiAlias: function (ctx, color) {
		var imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
		for (var i = 3; i < imageData.data.length; i += 4) {
			if (imageData.data[i] >= 128) {
				// Set > 50% opaque pixels to be fully opaque.
				imageData.data[i] = 255;
				
				// If a color was specified, ensure each pixel matches that color.
				if (color) {
					imageData.data[i - 3] = color.r;
					imageData.data[i - 2] = color.g;
					imageData.data[i - 1] = color.b;
				}
			} else {
				// Reset < 50% opaque pixels to transparent black.
				imageData.data[i] =
				imageData.data[i - 3] =
					imageData.data[i - 2] =
					imageData.data[i - 1] = 0;
			}
		}
		ctx.putImageData(imageData, 0, 0);
	}
};
