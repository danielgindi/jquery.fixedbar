/*
    Library by Daniel Cohen Gindi (danielgindi@gmail.com) 054-5655765 
    MIT License!
    Version: 2014-02-18
*/
(function(f){f(function(){f(".fixedbar").each(function(){function n(){g=parseFloat(c.topOffset)||0;h=!1;var a=d||b;null!=c.bottomOffset?h=a.offset().top+a.outerHeight()+(parseFloat(c.bottomOffset)||0):g+=a.offset().top-(p.length?p.offset().top:0)}var b=f(this),q=this.className.match(/\bfixedbar\s*(\{[^}]*\})/),p=b.closest(".fixedbar-parent-reduce-offset"),e;try{e=(new Function("return "+(q?q[1]:"{}"))).call({})}catch(s){e=null}var c=e||{},d,l=f(window),a=c.fade;a&&(a=parseFloat(a),!a||isNaN(a))&&
(a=400);var g,h;n();setInterval(n,3E3);var r=!1;l.scroll(function(){var k=l.scrollTop(),m=k>=g&&(!h||k+l.height()<=h),e=!1;m&&!d?(d=f("<div>").attr("class",b.attr("class")).removeClass("fixedbar").addClass("fixed-placeholder").height(b.height()).insertBefore(b),a&&null!=c.bottomOffset&&k<b.offset().top&&!r&&b.removeData("fixed-fading-out").stop().hide().fadeIn({duration:a})):!m&&d&&(d.remove(),d=null,b.stop(),a&&null!=c.bottomOffset&&k<g?(e=!0,b.data("fixed-fading-out",!0).fadeOut({duration:a,complete:function(){b.removeClass("fixedbar-enabled").removeData("fixed-fading-out").show()}})):
b.fadeIn({duration:0}));e||b.data("fixed-fading-out")&&!m||b.toggleClass("fixedbar-enabled",m);r=null!=c.bottomOffset&&k+l.height()>h-(parseFloat(c.bottomOffset)||0)})})})})(jQuery);
