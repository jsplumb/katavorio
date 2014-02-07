katavorio
=========

Lightweight drag/drop handler, supporting containment, multiple element drag, custom css classes, drop filters, drag filters.

Originally at https://github.com/sporritt/katavorio; that version is now not under active development, and is only updated from here at random intervals.

Currently, Katavorio does not work "out of the box" - it was developed as part of jsPlumb 1.6.0, to support a "no dependency" version (all previous versions of jsPlumb required either jQuery, 
MooTools or YUI, to provide a bunch of functionality such as CSS manipulation, getting/setting element positions, supporting drag/drop etc). So, rather
than re-write simple methods such as `addClass`, `removeClass`, `getPosition` etc, Katavorio expects those methods to be provided in the
constructor's options object.

All is not lost, though, as this project also contains `DefaultKatavorioHelper` - the set of missing methods.


#### Usage

First you need to instantiate an instance of Katavorio:

var kat = new Katavorio({  options });


##### CSS

Katavorio attaches various CSS classes to elements, both at initialisation time, and on a few events during the drag/drop
lifecycle:

<table>
  <tr><th>class</th><th>default></th><th>description</th></tr>
  <tr><td>draggable</td><td>katavorio-draggable"</td><td>Draggable elements</td></tr>
  <tr><td>droppable</td><td>katavorio-droppable"</td><td>droppable elements</td></tr>
  <tr><td>drag</td><td>katavorio-drag"</td><td>elements currently being dragged</td></tr>
  <tr><td>selected</td><td>katavorio-drag-selected"</td><td>elements in current drag selection</td></tr>
  <tr><td>active</td><td>katavorio-drag-active"</td><td>droppables that are targets of a currently dragged element</td></tr>
  <tr><td>hover</td><td>katavorio-drag-hover"</td><td>droppables over which a matching drag element is hovering</td></tr>
  <tr><td>noSelect</td><td>katavorio-drag-no-select"</td><td>added to the body to provide a hook to suppress text selection</td></tr>
</table>

You can override any or all of these events by providing a JS object with the key `css` to the Katavorio constructor:

```
var k = new Katavorio({
    ...,
    css:{
        drag:"CurrentlyBeingDraggedClass",
        hover:"SomeoneIsHoveringOnMeClass"
    },
    ...
});
```

###### Overidding Drag CSS on a per-element basis

You can also override the class that is set on an element currently being dragged when you make the call to `draggable`:

```
var k = new Katavorio( ...options... );
k.draggable(someElement, {
    dragClass:"CustomDragClass"
});
```

###### Overidding Drop CSS on a per-element basis

Similiarly, you can override the hover/active classes that are set on a droppable element:

```
var k = new Katavorio( ...options... );
k.droppable(someElement, {
    activeClass:"CustomActiveClass",
    hoverClass:"CustomHoverClass AndAnotherClass Etc"
});
```

Note that in all cases, Katavorio supports multiple CSS classes, via a whitespace-separated string.


#### Drag and Drop Scope

Katavorio supports multiple scopes for each Drag and Drop.  By default, a Katavorio instance will set a single scope 
on each Drag and Drop.  The default value for this is **katavorio-drag-scope**. You can override it on a per-instance level by
providing a scope in the constructor params:

```
var k = new Katavorio({
  ...
  scope:"MyScope",
  ...
});
```


##### Parent Constrain

To constrain the movement of some draggable element to its parent, set `constrain:true` in the `draggable` call:

```
var k = new Katavorio({...options...});
k.draggable(someElement, {
    constrain:true
});
```

##### Grid Movement

To constrain the allowed placements of a draggable to a grid, provide a `grid` in the `draggable` call:

```
var k = new Katavorio({...options...});
k.draggable(someElement, {
   grid:[50, 50]
});
```



