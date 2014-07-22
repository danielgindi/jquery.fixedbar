jquery.fixedbar
===============

In order to use this plugin:

* Add the "fixedbar" class to the element to be fixed
* Create a css class "fixedbar-enabled", which sets position:fixed and other styles if required.
* Include the jquery.fixedbar.js (or jquery.fixedbar-min.js)

Options:

Options are set through the class. For examle: <div class="fixedbar { topOffset: 20 }"></div>
* topOffset: Beyond this amount of pixels from the top - the element will become fixed
* bottomOffset: If set - the plugin will also consider the position from the bottom of the page also, and hide the element above the top offset.
* top: If set - the plugin will set the `top` css style on the element according to this value
* maxY: If set, the plugin will add `fixed-at-bottom` class when passed this offset from the bottom of the page. Then you could switch by css to `position: absolute; bottom: 0;` or something similar to stick to bottom.
* fade: If set - the element will use fade animation to show/hide (works with bottomOffset). Can specify a duration for the fade, or simply "true".
* In extreme cases, we could possible set the "fixedbar-parent-reduce-offset" class on a parent element, to use it as an offset.
