/*
 * jQuery MosaicIn.js
 * version 0.5
 * Copyright (c) 2015 Masa (http://wiz-code.digick.jp)
 * 
 * LICENSE: MIT license
 * http://wiz-code.digick.jp/dev/MIT-LICENSE.txt
 * 
 */

;(function (global, $) {
	var prefix, globalId, timerId, startTime, timeout, loaded, error, data, transitType, floor, random, ceil, sqrt, pow, max, min, noop, requestAnimationFrame, cancelAnimationFrame;
	
	prefix = 'mi_';
	globalId = 0;
	timerId = {};
	startTime = {};
	timeout = 10000;
	loaded = {};
	error = {};
	data = {};
	transitType = {
		easeInSine: function (current, total, dimension) {
			var ratio;
			ratio = easeInSine(current / total);
			return floor(dimension * ratio);
        },
        easeInQuad: function (current, total, dimension) {
			var ratio;
			ratio = easeInQuad(current / total);
			return floor(dimension * ratio);
        },
        easeInBounce: function (current, total, dimension) {
			var ratio;
			ratio = easeInBounce(current / total);
			return floor(dimension * ratio);
        },
		easeInCirc: function (current, total, dimension) {
			var ratio;
			ratio = easeInCirc(current / total);
			return floor(dimension * ratio);
		},
        normal: function (current, total, dimension) {
			var ratio;
			ratio = current / total;
			return floor(pow(dimension, ratio)) - 1;
        },
        linear: function linear(current, total, dimension) {
			var ratio;
			ratio = current / total;
			return floor(dimension * ratio);
        },
    };
	noop = function () {};
	floor = Math.floor;
	random = Math.random;
	ceil = Math.ceil;
	sqrt = Math.sqrt;
	pow = Math.pow;
	max = Math.max;
	min = Math.min;
	
	$.fn.mosaicIn = function (options) {
		var defaults, element;
		defaults = {
			duration: 800,
			intervalFrame: 1,
			
			transition: 'easeInCirc',
			horizontalPixels: 8,
			
			beforeStart: noop,
			afterFinish: noop,
			reverse: false
		};
		
		if (options instanceof HTMLImageElement) {
			element = options;
			options = $.extend(defaults, arguments[1] || {});
		} else {
			options = $.extend(defaults, options || {});
		}
		
		return this.each(function () {
			var id, parent, wrapper, canvas, context, reducedCanvas, reducedCanvasContext, image, imageHeightCache;
			
			if (typeof $(this).data('id') !== 'undefined') {
				id = getId(this);
				canvas = data[id]['canvas'];
				context = data[id]['context'];
				data[id]['options'] = options;
				
				$(this).hide();
				$(canvas).show();
				mosaicIn(canvas, context, options, this);
				return;
			} else if ($(this).children('DIV').hasClass('mi-image-wrapper')) {
				image = $(this).find('IMG').get(0);
				id = getId(image);
				canvas = data[id]['canvas'];
				context = data[id]['context'];
				data[id]['options'] = options;
				
				$(image).hide();
				$(canvas).show();
				mosaicIn(canvas, context, options, image);
				return;
			}
			
			wrapper = document.createElement('DIV');
			wrapper.className = 'mi-image-wrapper';
			$(wrapper).css({
				position: 'relative'
			});
			
			canvas = document.createElement('CANVAS');
			context = canvas.getContext('2d');
			
			reducedCanvas = document.createElement('CANVAS');
			reducedCanvasContext = reducedCanvas.getContext('2d');
			
			if (this.tagName.toUpperCase() === 'IMG') {
				id = setId(this);
				loaded[id] = false;
				error[id] = false;
				data[id] = {};
			
				parent = $(this).parent();
				
				data[id] = $.extend({
					parent: parent,
					wrapper: wrapper,
					canvas: canvas,
					context: context,
					options: options,
					
					reducedCanvas: reducedCanvas,
					reducedCanvasContext: reducedCanvasContext
				}, data[id]);
				
				startTime[id] = Date.now();
				$(this).on('load', $.proxy(onLoad, this, id));
				$(this).on('error', $.proxy(onError, this, id));
				timerId[id] = global.setTimeout($.proxy(waitUntilSuccess, this, id), 50);
			} else {
				if (typeof element !== 'undefined') {
					image = element;
				} else {
					image = document.createElement('IMG');
					image.className = options.imageClass || '';
					image.src = options.imageURL;
				}
				
				$(image).css('visibility', 'hidden');
				
				id = setId(image);
				loaded[id] = false;
				error[id] = false;
				
				parent = $(this);
				parent.append(image);
				
				data[id] = $.extend({
					parent: parent,
					wrapper: wrapper,
					canvas: canvas,
					context: context,
					options: options,
					
					reducedCanvas: reducedCanvas,
					reducedCanvasContext: reducedCanvasContext
				}, data[id]);
				
				startTime[id] = Date.now();
				$(image).on('load', $.proxy(onLoad, image, id));
				$(image).on('error', $.proxy(onError, image, id));
				timerId[id] = global.setTimeout($.proxy(waitUntilSuccess, image, id), 50);
			}
		});
	};
	
	function setId(element) {
		var id;
		globalId += 1;
		id = prefix + globalId;
		$(element).data('id', id);
		return id;
	}
	function getId(element) {
		var id;
		id = $(element).data('id');
		return id;
	}
	function onLoad(id) {
		loaded[id] = true;
	}
	function onError(id) {
		error[id] = true;
	}
	function waitUntilSuccess(id) {
		var canvas, context, parent, wrapper, options, imageHeightCache;
		
		if (!error[id] && (this.complete || loaded[id])) {
			parent = data[id]['parent'];
			wrapper = data[id]['wrapper'];
			canvas = data[id]['canvas'];
			context = data[id]['context'];
			options = data[id]['options'];
			
			imageHeightCache = this.height;
			setCanvasDimensions(canvas, context, this.width, imageHeightCache);
			
			parent.prepend(wrapper);
			$(wrapper).append(this, canvas);
			
			$(this).hide().css('visibility', 'visible');
			$(wrapper).height(imageHeightCache);
			
			global.clearTimeout(timerId[id]);
			mosaicIn(canvas, context, options, this);
		} else {
			if (Date.now() - startTime[id] > timeout) {
				global.clearTimeout(timerId[id]);
				try {
					throw new Error('逕ｻ蜒上�隱ｭ縺ｿ霎ｼ縺ｿ縺ｫ螟ｱ謨励＠縺ｾ縺励◆縲�');
				} catch (e) {
					console.log(e.message);
				}
			} else {
				timerId[id] = global.setTimeout($.proxy(waitUntilSuccess, this, id), 50);
			}
		}
	}
	
	function setCanvasDimensions(canvas, context, width, height) {
		canvas.width = width;
		canvas.height = height;
		context.webkitImageSmoothingEnabled = false;
		context.mozImageSmoothingEnabled = false;
		context.msImageSmoothingEnabled = false;
		context.imageSmoothingEnabled = false;
	}
	
	function initialDraw(canvas, context, reducedCanvas, reducedCanvasContext, image, reverse, minWidth, minHeight) {
		var reducedWidth, reducedHeight, width, height;
		if (!reverse) {
			reducedWidth = minWidth;
			reducedHeight = minHeight;
			width = canvas.width;
			height = canvas.height;
		} else {
			reducedWidth = width = canvas.width;
			reducedHeight = height = canvas.height;
		}
		
		reducedCanvasContext.clearRect(0, 0, width, height);
		context.clearRect(0, 0, width, height);
		
		reducedCanvas.width = reducedWidth;
		reducedCanvas.height = reducedHeight;
		reducedCanvasContext.drawImage(image, 0, 0, reducedWidth, reducedHeight);
		
		context.drawImage(reducedCanvas, 0, 0, width, height);
	}
		
	function mosaicIn(canvas, context, options, image) {
		var id, reducedCanvas, reducedCanvasContext, reducedWidth, reducedHeight, width, height, dRatio, minWidth, minHeight, restWidth, restHeight, frame, currentFrame, totalFrames, intervalFrame, prevW, prevH, transition, reverse, operator;
		id = getId(image);
		reducedCanvas = data[id].reducedCanvas;
		reducedCanvasContext = data[id].reducedCanvasContext;
		
		
		width = canvas.width;
		height = canvas.height;
		
		dRatio = width / height;
		minWidth = options.horizontalPixels;
		minHeight = ceil(minWidth / dRatio);
		restWidth = ceil(width / 2) - minWidth;
		restHeight = ceil(height / 2) - minHeight;
		
		frame = 1000 / 60;
		totalFrames = ceil(options.duration / frame);
		intervalFrame = options.intervalFrame;
		
		reverse = options.reverse;
		currentFrame = !reverse ? 0 : totalFrames - 1;
		operator = !reverse ? 1 : -1;
		
		prevW = 0;
		prevH = 0;
		transition = transitType[options.transition];
		
		options.beforeStart(image, canvas, context);
		
		initialDraw(canvas, context, reducedCanvas, reducedCanvasContext, image, reverse, minWidth, minHeight);
		
		requestAnimationFrame(loop);
		
		function loop() {
			var condition;
			condition = !reverse ? totalFrames > currentFrame : currentFrame >= 0;
			
			if (condition) {
				if (currentFrame % intervalFrame === 0) {
					reducedWidth = minWidth + transition(currentFrame, totalFrames, restWidth);
					reducedHeight = minHeight + transition(currentFrame, totalFrames, restHeight);
					
					if (reducedWidth !== prevW || reducedHeight !== prevH) {
						reducedCanvasContext.clearRect(0, 0, reducedWidth, reducedHeight);
						prevW = reducedWidth;
						prevH = reducedHeight;
						
						reducedCanvas.width = reducedWidth;
						reducedCanvas.height = reducedHeight;
						reducedCanvasContext.drawImage(image, 0, 0, reducedWidth, reducedHeight);
						
						context.clearRect(0, 0, width, height);
						context.drawImage(reducedCanvas, 0, 0, width, height);
					}
				}
				currentFrame += operator;
				
				requestAnimationFrame(loop);
			} else {
				if (!reverse) {
					$(canvas).hide();
					$(image).show();
				}
				
				options.afterFinish(image, canvas, context);
			}
		}
	}
	
	function easeInSine(t) {
		return 1 - Math.cos(t * Math.PI / 2);
	}
	
	function easeInQuad(t) {
		return t * t;
	}
	
	function easeInCirc(t) {
		return 1 - Math.sqrt(1 - t * t);
	}
	
	function easeInBounce(t) {
		return 1 - easeOutBounce(1 - t);
	}
	
	function easeOutBounce(t) {
		if (t < (1 / 2.75)) {
			return 7.5625 * t * t;
		} else if (t < (2 / 2.75)) {
			return 7.5625 * (t -= (1.5 / 2.75)) * t + 0.75;
		} else if (t < (2.5 / 2.75)) {
			return 7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375;
		} else {
			return 7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375;
		}
	}
        
	requestAnimationFrame = (function () {
		var lastTime = 0;
		return global.requestAnimationFrame ||
			global.webkitRequestAnimationFrame ||
			global.mozRequestAnimationFrame ||
			global.msRequestAnimationFrame ||
			global.oRequestAnimationFrame ||
			function (callback) {
				var currTime, timeToCall, id;
				currTime = new Date().getTime();
				timeToCall = max(0, 16 - (currTime - lastTime));
				id = global.setTimeout(function () {
					callback(currTime + timeToCall);
				}, timeToCall);
				lastTime = currTime + timeToCall;
				return id;
			};
	}());

	cancelAnimationFrame = (function () {
		return global.cancelAnimationFrame ||
			global.webkitCancelAnimationFrame ||
			global.mozCancelAnimationFrame ||
			global.msCancelAnimationFrame ||
			global.oCancelAnimationFrame ||
			function (id) {
				global.clearTimeout(id);
			};
	}());
}(this, jQuery));