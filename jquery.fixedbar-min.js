/*
    Library by Daniel Cohen Gindi (danielgindi@gmail.com) 054-5655765 
    MIT License!
    Version: 2014-09-15
*/
(function(d){function w(d){return r?document.defaultView.getComputedStyle(d):d.currentStyle}var r=document.defaultView&&document.defaultView.getComputedStyle;d(function(){d(".fixedbar").each(function(){function r(){k=n;l=!1;var c=e||a;null!=b.bottomOffset?l=c.offset().top+c[0].offsetHeight+(parseFloat(b.bottomOffset)||0):k+=c.offset().top-(m.length?m.offset().top:0)}var a=d(this),t=this.className.match(/\bfixedbar\s*(\{[^}]*\})/),m=a.closest(".fixedbar-parent-reduce-offset"),g;try{g=(new Function("return "+
(t?t[1]:"{}"))).call({})}catch(x){g=null}var b=g||{},e,s=d(window),c=b.fade;c&&(c=parseFloat(c),!c||isNaN(c))&&(c=400);var n;n="string"===typeof b.topOffset?d(b.topOffset).offset().top:parseFloat(b.topOffset)||0;var k,l,p=null!=b.top&&!1!==b.top?parseFloat(b.top)||0:!1,u=null!=b.maxY?parseFloat(b.maxY)||0:null,v=!1;s.scroll(function(){r();var f=s.scrollTop(),g=s.height(),n=w(a[0]).height,q=a[0].offsetHeight,h=f>=k&&(!l||f+g<=l),m=!1,q=null!=u&&f+p>document.documentElement.scrollHeight-u-q;h&&!e?(e=
d("<div>").attr("class",a.attr("class")).removeClass("fixedbar").addClass("fixed-placeholder").css("height",n).insertBefore(a),c&&null!=b.bottomOffset&&f<a.offset().top&&!v&&a.removeData("fixed-fading-out").stop().hide().fadeIn({duration:c})):!h&&e&&(e.remove(),e=null,a.stop(),c&&null!=b.bottomOffset&&f<k?(m=!0,a.data("fixed-fading-out",!0).fadeOut({duration:c,complete:function(){a.removeClass("fixedbar-enabled").removeData("fixed-fading-out").show();!1!==p&&a.css("top","")}})):a.fadeIn({duration:0}));
m||a.data("fixed-fading-out")&&!h||(a.toggleClass("fixedbar-enabled",h).toggleClass("fixedbar-at-bottom",h&&q),!1!==p&&a.css("top",h&&!q?p:""));v=null!=b.bottomOffset&&f+g>l-(parseFloat(b.bottomOffset)||0)})})})})(jQuery);
