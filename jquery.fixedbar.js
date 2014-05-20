// ==ClosureCompiler==
// @compilation_level ADVANCED_OPTIMIZATIONS
// @externs_url https://closure-compiler.googlecode.com/git/contrib/externs/jquery-1.9.js
// ==/ClosureCompiler==
/** @preserve    Library by Daniel Cohen Gindi (danielgindi@gmail.com) 054-5655765 
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
            
            var minY, maxY;
            
            function findMinMax () {
                minY = parseFloat(options['topOffset']) || 0; // Start with the topOffset offset
                maxY = false; // By default, element is always floating below/equals minY
                
                var $el = fixedNavPlaceholder || $this;
                
                if (options['bottomOffset'] != null) { // Element needs to stay non-floating above the minY and below the maxY
                    maxY = $el.offset().top + $el.outerHeight() + // Start with the bottom position of the element
                            (parseFloat(options['bottomOffset']) || 0); // Add the bottomOffset
                } else { // Element needs to stay non-floating only above the minY
                    minY += $el.offset().top // Add the element's top position
                            - (offsetParent.length ? offsetParent.offset().top : 0); // Subtract the offsetParent element's top
                }
            }   
            
            findMinMax();
            
            setInterval(findMinMax, 3000); // Update range when page layout changes
                
            var wasBelow = false; // This will tell us from which direction we were scrolling, so we know if we need to fade in
            
            $window.scroll(function() {
                var scrollTop = $window.scrollTop(),
                    shouldFix = scrollTop >= minY && (!maxY || scrollTop + $window.height() <= maxY),
                    animatingClass = false;
                    
                if (shouldFix && !fixedNavPlaceholder) {
                    fixedNavPlaceholder = $('<div>')
                        .attr('class', $this.attr('class'))
                        .removeClass('fixedbar')
                        .addClass('fixed-placeholder')
                        .height($this.height())
                        .insertBefore($this);
                    if (fadeDuration && options['bottomOffset'] != null && scrollTop < $this.offset().top && !wasBelow) {
                        $this.removeData('fixed-fading-out').stop().hide().fadeIn({ duration: fadeDuration });
                    }
                } else if (!shouldFix && fixedNavPlaceholder) {
                    fixedNavPlaceholder.remove();
                    fixedNavPlaceholder = null;
                    $this.stop();
                    if (fadeDuration && options['bottomOffset'] != null && scrollTop < minY) {
                        animatingClass = true;
                        $this.data('fixed-fading-out', true).fadeOut({ duration: fadeDuration, complete: function () {
                            $this.removeClass('fixedbar-enabled').removeData('fixed-fading-out').show();
                        }});
                    } else {
                        $this.fadeIn({ duration: 0 }); // Reverse half-way fade outs...
                    }
                }
                if (!animatingClass && (!$this.data('fixed-fading-out') || shouldFix)) {
                    $this.toggleClass('fixedbar-enabled', shouldFix);
                }
                
                wasBelow = options['bottomOffset'] != null && (scrollTop + $window.height() > maxY - (parseFloat(options['bottomOffset']) || 0));
            });
        });
    });
})(jQuery);