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

NOTE: Katavorio does not follow strict semantic versioning.  It is not at all recommended that you use wildcards when specifying a dependency on Katavorio. 

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

#### 1.5.1

17 Sep 2020

- added a test in `elementRemoved` to check if an element is in fact draggable/droppable before running the code to de-register it.

#### 1.5.0

- Changed package name to @jsplumb/katavorio

#### 1.4.11

- support constrain functions in a drag selector

#### 1.4.10

- support ghost proxy handling by selectors in a drag.

#### 1.4.9

- return grid position from snap method on draggable.

#### 1.4.8

- support filter and filterExclude in delegated drag handlers

#### 1.4.7

- pass current drag element in callback to "should proxy" function. Required when a delegate drag is occurring.

#### 1.4.6

- pass the return value of a delegate to the code that tests if a drag can begin.

#### 1.4.5

- fixed an issue with drag stop event for single node drags.

#### 1.4.4

- support revert function being passed in to constructor.

#### 1.4.3

- added support for "combinator rooted" queries for delegated drags.

#### 1.4.2

- added support for provision of `ghostProxyParent` when using a ghost proxy to drag.

#### 1.4.1

- add test to ensure event's default not prevented when responding to initial mouse down

#### 1.4.0

- Add support for multiple selector definitions on a single Drag object, via the new `addSelector` method. You can make some element draggable and then
attach more listeners to that object, rather than having to create a whole new draggable:

```
let d = katavorioInstance.draggable(someElement, {
  selector:".childSelector",
  start:function(p) { ... },
  etc
});

d.addSelector({
  selector:".someOtherChildSelector",
  start:function(p) { ... },
  etc
});
```



#### 1.3.0

- for delegated draggables (ie when you provide a `selector` in the params), we use the class `katavorio-delegated-draggable` now, instead of
where we previously used the default draggable class of `katavorio-draggable`. This can also be overridden in the constructor by setting the
value of `delegatedDraggable`.

#### 0.28.0

- add the ability for a user to specify the parent to use when cloning a node for dragging.

#### 0.26.0

- added the ability to remove specific drag/drop handlers (previous we could only completely switch off drag/drop) 
