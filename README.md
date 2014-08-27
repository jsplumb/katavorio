Katavorio
=========

Katavorio is a lightweight drag/drop handler, supporting containment, multiple element drag, custom css classes, drop filters, drag filters, drag clones, drag handles, constraining movement to a grid, and zooming.

Currently, Katavorio does not work "out of the box" - it was developed as part of jsPlumb 1.6.0, to support a "no dependency" version (all previous versions of jsPlumb required either jQuery, MooTools or YUI, to provide a bunch of functionality such as CSS manipulation, getting/setting element positions, supporting drag/drop etc). So, rather than re-write simple methods such as addClass, removeClass, getPosition etc, Katavorio expects those methods to be provided in the constructor's options object.

All is not lost, though, as this project also contains DefaultKatavorioHelper - the set of missing methods.

For more information, take a look in [the wiki](https://github.com/jsplumb/katavorio/wiki).
