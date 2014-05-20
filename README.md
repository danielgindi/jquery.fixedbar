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
* fade: If set - the element will use fade animation to show/hide. Can specify a duration for the fade, or simply "true".
* In extreme cases, we could possible set the "fixedbar-parent-reduce-offset" class on a parent element, to use it as an offset.

Converts a menu to a select HTML. Good for responsive designs.
