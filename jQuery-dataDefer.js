/*!
 * jQuery dataDefer (+ dataDefault)
 * 
 * Copyright (c) 2011 Jacob Swartwood
 */

(function( $, undefined ) {
	
	$.dataDefer = function( el, key, func ) {
		if ( typeof key === "object" ) {
			return $.each(key, function( key, func) {
				jQuery.dataDefer(el, key, func);
			});
		}

		if (typeof func === "function") {
			var $el = $(el),
				parts = key.split("."),
				evtName = "getData" + (parts[1] ? "." + parts[1] : ""),
				getDataHandler = (function( el, key, func ) {
					return function( evt, evtKey ) {
						if (evtKey === key) {
							$.data(el, key, func.call(this));
						} else {
							$el.one(evtName, getDataHandler);
						}
					};
				})(el, parts[0], func);
			$el.one(evtName, getDataHandler);
		}
	};
	
	$.fn.dataDefer = function( key, func ) {
		return this.each(function() {
			$.dataDefer(this, key, func);
		});
	};
	
	// dataDefault is poorly written, should it even exist... limited use case
	$.dataDefault = function( el, key, func ) {
		var data = $.data(el, key);
		if (data === undefined) {
			$.dataDefer(el, key, func);
			data = $.data(el, key);
		}
		return data;
	};
	
	$.fn.dataDefault = function( key, func ) {
		var data = this.data(key);
		if (data === undefined) {
			this.dataDefer(key, func);
			data = this.data(key);
		}
		return data;
	};
	
})(jQuery);