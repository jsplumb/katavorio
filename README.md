katavorio
=========

Lightweight drag/drop handler, supporting containment, multiple element drag, custom css classes, drop filters, drag filters.

Currently, Katavorio does not work "out of the box" - it was developed as part of jsPlumb 1.6.0, to support a "no dependency" version (all previous versions of jsPlumb required either jQuery, MooTools or YUI, to provide a bunch of functionality such as CSS manipulation, getting/setting element positions, supporting drag/drop etc). So, rather than re-write simple methods such as `addClass`, `removeClass`, `getPosition` etc, Katavorio expects those methods to be provided in the constructor's options object.

All is not lost, though, as this project also contains `DefaultKatavorioHelper` - the set of missing methods.


#### Usage

First you need to instantiate an instance of Katavorio:

```
var k = new Katavorio({  options });
```


##### CSS

Katavorio attaches various CSS classes to elements, both at initialisation time, and on a few events during the drag/drop
lifecycle:

<table>
  <tr><th>class</th><th>default></th><th>description</th></tr>
  <tr><td>draggable</td><td>katavorio-draggable</td><td>Draggable elements</td></tr>
  <tr><td>droppable</td><td>katavorio-droppable</td><td>droppable elements</td></tr>
  <tr><td>drag</td><td>katavorio-drag</td><td>elements currently being dragged</td></tr>
  <tr><td>selected</td><td>katavorio-drag-selected</td><td>elements in current drag selection</td></tr>
  <tr><td>active</td><td>katavorio-drag-active</td><td>droppables that are targets of a currently dragged element</td></tr>
  <tr><td>hover</td><td>katavorio-drag-hover</td><td>droppables over which a matching drag element is hovering</td></tr>
  <tr><td>noSelect</td><td>katavorio-drag-no-select</td><td>added to the body to provide a hook to suppress text selection</td></tr>
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

###### Overridding Drag CSS on a per-element basis

You can also override the class that is set on an element currently being dragged when you make the call to `draggable`:

```
var k = new Katavorio( ...options... );
k.draggable(someElement, {
    dragClass:"CustomDragClass"
});
```

###### Overridding Drop CSS on a per-element basis

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

##### Drag with a clone

If you want to drag a clone of your element, set `clone:true` on the `draggable` call:

```
var k = new Katavorio({...options...});
k.draggable(someElement, {
   clone:true
});
```

#### Filtering by element
You can provide a `filter` parameter to the `draggable` method - a string selector defining an 
element or set of elements from which dragging is not enabled:

```
var k = new Katavorio({ ...options... });
k.draggable(someElement, {
  filter:"button"
});
```

Here we have told Katavorio to make `someElement` draggable, but not to start a drag if the
mouse is on any child elements that are buttons.  

Valid values for the `filter` argument are any valid CSS selectors.

#### Consuming filtered events
If you set a filter, you can also tell Katavorio to consume any events that were filtered (otherwise 
they bubble up through the DOM). 

```
var k = new Katavorio({ ...options... });
k.draggable(someElement, {
  filter:"button",
  consumeFilteredEvents:true
});
```

This causes Katavorio to call `preventDefault()` and `stopPropagation()` on events that were filtered (or to set the event's
`returnValue` to false in IE < 9).

### Zoom
Katavorio takes zoom into account when dragging elements. This is not handled by attempting to infer what, if any, CSS3
transform is affecting some dragged object. Rather you handle this manually be calling the `setZoom` method to tell Katavorio
that there is a scale transform in effect.

`setZoom` takes decimal values where 1.0 means 100%. 

##### Ignoring Zoom
It may be the case that you wish to configure some element to be draggable and have it not be subject to the current zoom
transformation. To do this, you can set `ignoreZoom:true` on the `draggable` call:

```
var k = new Katavorio({ ...options... });
...
...
k.draggable(someElement, {
  filter:"button",
  ignoreZoom:true
});
```

#### Lifecycle Events

##### Draggables

Katavorio publishes events at three times during the drag lifecycle. You bind to them in the `draggable` call:

```
var k = new Katavorio({ options });
k.draggable(someElement, {
  start:function(params) {
    
  },
  drag:function(params) {
    
  },
  stop:function(params) {
    
  }
})
```

The contents of `params` are as follows:

- **drag** The associated Drag instance
- **e** The associated MouseEvent
- **el** The element that is being dragged.
- **pos** [x,y] location of the element. Only supplied by the `drag` event.

