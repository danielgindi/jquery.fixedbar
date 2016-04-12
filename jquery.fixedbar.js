// ==ClosureCompiler==
// @compilation_level ADVANCED_OPTIMIZATIONS
// @externs_url https://closure-compiler.googlecode.com/git/contrib/externs/jquery-1.9.js
// ==/ClosureCompiler==
/** @preserve    Library by Daniel Cohen Gindi (danielgindi@gmail.com)
    MIT License!
    Version: 2014-02-18
*/
(function($){
    function safeEval(value) {
        try {
            return new Function('return ' + value).call({});
        } catch (e) {
            return null;
        }
    };
	
    var hasComputedStyle = document.defaultView && document.defaultView.getComputedStyle;
	var computedStyle = function (el) {
		return hasComputedStyle ? document.defaultView.getComputedStyle(el) : el.currentStyle;
	};
    
    $(function(){
        $('.fixedbar').each(function(index){
            var $this = $(this),
                classMatch = this.className.match(/\bfixedbar\s*(\{[^}]*\})/), // Match a regex to find init options
                offsetParent = $this.closest('.fixedbar-parent-reduce-offset'), // Find the offset parent if exists
                options = safeEval(classMatch ? classMatch[1] : '{}') || {}, // Parse the options
                fixedNavPlaceholder, // This will hold the placeholder when the actual element is floating
                $window = $(window), // Hold a reference to the window jQuery collection
                fadeDuration = options['fade'];
                
            if (fadeDuration) {
                fadeDuration = parseFloat(fadeDuration);
                if (!fadeDuration || isNaN(fadeDuration)) {
                    fadeDuration = 400;
                }
            }
            
			var baseTopOffset;
			if (typeof options['topOffset'] === 'string') {
				baseTopOffset = $(options['topOffset']).offset().top;
			} else {
				baseTopOffset = parseFloat(options['topOffset']) || 0; // Start with the topOffset offset
			}
            var topOffset, bottomOffset;
			var fixedTop = options['top'] != null && options['top'] !== false ? parseFloat(options['top']) || 0 : false;
			var maxY = options['maxY'] != null ? parseFloat(options['maxY']) || 0 : null;
			
            function findMinMax () {
                topOffset = baseTopOffset; // Start with the topOffset offset
                bottomOffset = false; // By default, element is always floating below/equals topOffset
                
                var $el = fixedNavPlaceholder || $this;
                
                if (options['bottomOffset'] != null) { // Element needs to stay non-floating above the topOffset and below the bottomOffset
                    bottomOffset = $el.offset().top + $el[0].offsetHeight + // Start with the bottom position of the element
                            (parseFloat(options['bottomOffset']) || 0); // Add the bottomOffset
                } else { // Element needs to stay non-floating only above the topOffset
                    topOffset += $el.offset().top // Add the element's top position
                            - (offsetParent.length ? offsetParent.offset().top : 0); // Subtract the offsetParent element's top
                }
            }
                
            var wasBelow = false; // This will tell us from which direction we were scrolling, so we know if we need to fade in
            
            $window.scroll(function() {
			
				findMinMax();
				
                var scrollTop = $window.scrollTop(),
					windowHeight = $window.height(),
					thisComputedStyle = computedStyle($this[0]),
					thisHeight = thisComputedStyle.height,
					thisOuterHeight = $this[0].offsetHeight,
                    shouldFix = scrollTop >= topOffset && (!bottomOffset || scrollTop + windowHeight <= bottomOffset),
                    animatingClass = false,
					isAtBottom = maxY != null && scrollTop + fixedTop > document.documentElement.scrollHeight - maxY - thisOuterHeight;
                 
                if (shouldFix && !fixedNavPlaceholder) {
                    fixedNavPlaceholder = $('<div>')
                        .attr('class', $this.attr('class'))
                        .removeClass('fixedbar')
                        .addClass('fixed-placeholder')
                        .css('height', thisHeight)
                        .insertBefore($this);
                    if (fadeDuration && options['bottomOffset'] != null && scrollTop < $this.offset().top && !wasBelow) {
                        $this.removeData('fixed-fading-out').stop().hide().fadeIn({ duration: fadeDuration });
                    }
                } else if (!shouldFix && fixedNavPlaceholder) {
                    fixedNavPlaceholder.remove();
                    fixedNavPlaceholder = null;
                    $this.stop();
                    if (fadeDuration && options['bottomOffset'] != null && scrollTop < topOffset) {
                        animatingClass = true;
                        $this.data('fixed-fading-out', true).fadeOut({ duration: fadeDuration, complete: function () {
                            $this.removeClass('fixedbar-enabled').removeData('fixed-fading-out').show();
							if (fixedTop !== false) {
								$this.css('top', '');
							}
                        }});
                    } else {
                        $this.fadeIn({ duration: 0 }); // Reverse half-way fade outs...
                    }
                }
                if (!animatingClass && (!$this.data('fixed-fading-out') || shouldFix)) {
                    $this.toggleClass('fixedbar-enabled', shouldFix).toggleClass('fixedbar-at-bottom', shouldFix && isAtBottom);
					if (fixedTop !== false) {
						$this.css('top', shouldFix && !isAtBottom ? fixedTop : '');
					}
                }
                
                wasBelow = options['bottomOffset'] != null && (scrollTop + windowHeight > bottomOffset - (parseFloat(options['bottomOffset']) || 0));
            });
            
            var lastDocumentWidth = $(document).width();
            $window.resize(function () {
                var docWidth = $(document).width();
                if (docWidth !== lastDocumentWidth) {
                    if (fixedNavPlaceholder) {
                        var hadClass = $this.hasClass('fixedbar-enabled');
                        if (hadClass) {
                            $this.removeClass('fixedbar-enabled');
                        }
                        fixedNavPlaceholder.css('height', computedStyle($this[0]).height);
                        if (hadClass) {
                            $this.addClass('fixedbar-enabled');
                        }
                    }
                }
                lastDocumentWidth = docWidth;
            });
        });
    });
})(jQuery);
