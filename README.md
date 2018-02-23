## Katavorio


Katavorio is a lightweight drag/drop handler, supporting containment, multiple element drag, custom css classes, 
drop filters, drag filters, drag clones, drag handles, constraining movement to a grid, and zooming.

Katavorio does not work "out of the box" - it was developed as part of jsPlumb 1.6.0, to support a 
"no dependency" version (all previous versions of jsPlumb required either jQuery, MooTools or YUI, to provide a 
bunch of functionality such as CSS manipulation, getting/setting element positions, supporting drag/drop etc). So, 
rather than re-write simple methods such as addClass, removeClass, getPosition etc, Katavorio expects those methods 
to be provided in the constructor's options object.

All is not lost, though, as this project also contains DefaultKatavorioHelper - the set of missing methods.

#### Installation

`npm install katavorio`

#### Dependencies

None

#### Imports

If you have jsPlumb in your page then you already have Katavorio - it is bundled into jsPlumb.  Otherwise you'll need
to import two scripts:

```
node_modules/katavorio/src/default-katavorio-helper.js
node_modules/katavorio/src/katavorio.js
```



For more information, take a look in [the wiki](https://github.com/jsplumb/katavorio/wiki).

### Changelog

#### 0.26.0

- added the ability to remove specific drag/drop handlers (previous we could only completely switch off drag/drop) 
