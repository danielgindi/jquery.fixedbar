/*
    Library by Daniel Cohen Gindi (danielgindi@gmail.com) 054-5655765 
    MIT License!
    Version: 2014-02-18
*/
(function(d){function t(d){return r?document.defaultView.getComputedStyle(d):d.currentStyle}var r=document.defaultView&&document.defaultView.getComputedStyle;d(function(){d(".fixedbar").each(function(){function r(){h=k;l=!1;var e=f||a;null!=b.bottomOffset?l=e.offset().top+e[0].offsetHeight+(parseFloat(b.bottomOffset)||0):h+=e.offset().top-(u.length?u.offset().top:0)}var a=d(this),v=this.className.match(/\bfixedbar\s*(\{[^}]*\})/),u=a.closest(".fixedbar-parent-reduce-offset"),m;try{m=(new Function("return "+
(v?v[1]:"{}"))).call({})}catch(A){m=null}var b=m||{},f,n=d(window),c=b.fade;c&&(c=parseFloat(c),!c||isNaN(c))&&(c=400);var k;k="string"===typeof b.topOffset?d(b.topOffset).offset().top:parseFloat(b.topOffset)||0;var h,l,p=null!=b.top&&!1!==b.top?parseFloat(b.top)||0:!1,w=null!=b.maxY?parseFloat(b.maxY)||0:null,x=!1;n.scroll(function(){r();var e=n.scrollTop(),y=n.height(),m=t(a[0]).height,q=a[0].offsetHeight,g=e>=h&&(!l||e+y<=l),k=!1,q=null!=w&&e+p>document.documentElement.scrollHeight-w-q;g&&!f?(f=
d("<div>").attr("class",a.attr("class")).removeClass("fixedbar").addClass("fixed-placeholder").css("height",m).insertBefore(a),c&&null!=b.bottomOffset&&e<a.offset().top&&!x&&a.removeData("fixed-fading-out").stop().hide().fadeIn({duration:c})):!g&&f&&(f.remove(),f=null,a.stop(),c&&null!=b.bottomOffset&&e<h?(k=!0,a.data("fixed-fading-out",!0).fadeOut({duration:c,complete:function(){a.removeClass("fixedbar-enabled").removeData("fixed-fading-out").show();!1!==p&&a.css("top","")}})):a.fadeIn({duration:0}));
k||a.data("fixed-fading-out")&&!g||(a.toggleClass("fixedbar-enabled",g).toggleClass("fixedbar-at-bottom",g&&q),!1!==p&&a.css("top",g&&!q?p:""));x=null!=b.bottomOffset&&e+y>l-(parseFloat(b.bottomOffset)||0)});var z=d(document).width();n.resize(function(){var b=d(document).width();if(b!==z&&f){var c=a.hasClass("fixedbar-enabled");c&&a.removeClass("fixedbar-enabled");f.css("height",t(a[0]).height);c&&a.addClass("fixedbar-enabled")}z=b})})})})(jQuery);
