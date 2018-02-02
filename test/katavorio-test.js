QUnit.reorder = false;

var divs = [],
    _add = function (id, parent, xy, size) {
        var d = document.createElement("div");
        d.setAttribute("id", id);
        d.style.position = "absolute";
        if (xy) {
            d.style.left = xy[0] + "px";
            d.style.top = xy[1] + "px";
        }
        if (size) {
            d.style.width = size[0] + "px";
            d.style.height = size[1] + "px";
        }
        divs.push(d);
        (parent || document.body).appendChild(d);
        return d;
    },
    _clear = function () {
        for (var i = 0; i < divs.length; i++) {
            divs[i].parentNode.removeChild(divs[i]);
        }
        divs.length = 0;
        k = null;
    },
    k,
    seh = new DefaultKatavorioHelper(),
    _loc = function(el) {
        return [
            parseInt(el.style.left, 10),
            parseInt(el.style.top, 10)
        ];
    };

var testSuite = function () {

    module("Katavorio", {
        teardown: _clear,
        setup: function () {
            k = new Katavorio({
                getPosition: seh.getPosition,
                setPosition: seh.setPosition,
                getSize: seh.getSize,
                addClass: seh.addClass,
                removeClass: seh.removeClass,
                bind: seh.addEvent,
                unbind: seh.removeEvent,
                fireEvent: function () {
                    console.log(arguments);
                },
                intersects: seh.intersects,
                indexOf: seh.indexOf,
                getId: seh.getId
            });
        }
    });

// --------------------------- SCOPE -----------------------------------------------

    test("change scope of draggable, via katavorio instance, on element", function () {
        var d1 = _add("d1");
        var d = k.draggable(d1, {
            scope: "scope1 scope2"
        });
        equal(d[0].scopes.length, 2, "2 scopes");
        equal(d[0].scopes[0], "scope1");
        equal(d[0].scopes[1], "scope2");

        equal(k.getDragsForScope("scope1").length, 1, "1 drag for scope1");
        equal(k.getDragsForScope("scope2").length, 1, "1 drag for scope2");

        k.setScope(d1, "scope3 scope4");
        equal(d[0].scopes.length, 2, "2 scopes");
        equal(d[0].scopes[0], "scope3");
        equal(d[0].scopes[1], "scope4");
        equal(k.getDragsForScope("scope1").length, 0, "0 drags for scope1");
        equal(k.getDragsForScope("scope2").length, 0, "0 drags for scope2");
        equal(k.getDragsForScope("scope3").length, 1, "1 drag for scope3");
        equal(k.getDragsForScope("scope4").length, 1, "1 drag for scope4");

        k.setDragScope(d1, "scope5");
        equal(k.getDragsForScope("scope3").length, 0, "0 drags for scope3");
        equal(k.getDragsForScope("scope4").length, 0, "0 drags for scope4");
        equal(k.getDragsForScope("scope5").length, 1, "1 drag for scope5");

        k.addDragScope(d1, "scope6");
        equal(k.getDragsForScope("scope5").length, 1, "1 drag for scope5");
        equal(k.getDragsForScope("scope6").length, 1, "1 drag for scope6");

        // test multiples, and ensure scope8 is not added twice.
        k.addDragScope(d1, "scope7 scope8 scope8");
        equal(k.getDragsForScope("scope7").length, 1, "1 drag for scope7");
        equal(k.getDragsForScope("scope8").length, 1, "1 drag for scope8");

        k.removeDragScope(d1, "scope7");
        equal(k.getDragsForScope("scope7").length, 0, "0 drags for scope7");

        k.removeDragScope(d1, "scope6 scope8");
        equal(k.getDragsForScope("scope6").length, 0, "0 drags for scope6");
        equal(k.getDragsForScope("scope8").length, 0, "0 drags for scope8");

        k.toggleDragScope(d1, "scope8");
        equal(k.getDragsForScope("scope8").length, 1, "1 drag for scope8");

        k.toggleDragScope(d1, "scope8 scope9");
        equal(k.getDragsForScope("scope8").length, 0, "0 drags for scope8");
        equal(k.getDragsForScope("scope9").length, 1, "1 drag for scope9");
    });

    test("change scope of droppable, via katavorio instance, on element", function () {
        var d1 = _add("d1");
        var d = k.droppable(d1, {
            scope: "scope1 scope2"
        });
        equal(d[0].scopes.length, 2, "2 scopes");
        equal(d[0].scopes[0], "scope1");
        equal(d[0].scopes[1], "scope2");

        equal(k.getDropsForScope("scope1").length, 1, "1 dopr for scope1");
        equal(k.getDropsForScope("scope2").length, 1, "1 drop for scope2");

        k.setScope(d1, "scope3 scope4");
        equal(d[0].scopes.length, 2, "2 scopes");
        equal(d[0].scopes[0], "scope3");
        equal(d[0].scopes[1], "scope4");
        equal(k.getDropsForScope("scope1").length, 0, "0 drops for scope1");
        equal(k.getDropsForScope("scope2").length, 0, "0 drops for scope2");
        equal(k.getDropsForScope("scope3").length, 1, "1 drop for scope3");
        equal(k.getDropsForScope("scope4").length, 1, "1 drop for scope4");

        k.setDropScope(d1, "scope5");
        equal(k.getDropsForScope("scope3").length, 0, "0 drops for scope3");
        equal(k.getDropsForScope("scope4").length, 0, "0 drops for scope4");
        equal(k.getDropsForScope("scope5").length, 1, "1 drop for scope5");

        k.addDropScope(d1, "scope6");
        equal(k.getDropsForScope("scope5").length, 1, "1 Drop for scope5");
        equal(k.getDropsForScope("scope6").length, 1, "1 Drop for scope6");

        // test multiples, and ensure scope8 is not added twice.
        k.addDropScope(d1, "scope7 scope8 scope8");
        equal(k.getDropsForScope("scope7").length, 1, "1 Drop for scope7");
        equal(k.getDropsForScope("scope8").length, 1, "1 Drop for scope8");

        k.removeDropScope(d1, "scope7");
        equal(k.getDropsForScope("scope7").length, 0, "0 Drops for scope7");

        k.removeDropScope(d1, "scope6 scope8");
        equal(k.getDropsForScope("scope6").length, 0, "0 Drops for scope6");
        equal(k.getDropsForScope("scope8").length, 0, "0 Drops for scope8");

        k.toggleDropScope(d1, "scope8");
        equal(k.getDropsForScope("scope8").length, 1, "1 Drop for scope8");

        k.toggleDropScope(d1, "scope8 scope9");
        equal(k.getDropsForScope("scope8").length, 0, "0 Drops for scope8");
        equal(k.getDropsForScope("scope9").length, 1, "1 Drop for scope9");
    });

// --------------------------- / SCOPE -----------------------------------------------

// --------------------------- DRAGGABLE/DROPPABLE -----------------------------------------------

    test("make draggable via element", function () {
        var d1 = _add("d1");
        k.draggable(d1);
        ok(d1._katavorioDrag != null, "drag initialized");
    });

    test("make draggable via element id", function () {
        var d1 = _add("d1");
        k.draggable("d1");
        ok(d1._katavorioDrag != null, "drag initialized");
    });

    test("make draggable via element array", function () {
        var d1 = _add("d1"), d2 = _add("d2");
        k.draggable([d1, d2]);
        ok(d1._katavorioDrag != null, "drag initialized");
        ok(d2._katavorioDrag != null, "drag initialized");
    });

    test("make draggable via array of ids", function () {
        var d1 = _add("d1"), d2 = _add("d2");
        k.draggable(["d1", "d2"]);
        ok(d1._katavorioDrag != null, "drag initialized");
        ok(d2._katavorioDrag != null, "drag initialized");
    });

    test("make draggable via Node list", function () {
        var d1 = _add("d1"), d2 = _add("d2");
        d1.className = "foo";
        d2.className = "foo";
        k.draggable(document.querySelectorAll(".foo"));
        ok(d1._katavorioDrag != null, "drag initialized");
        ok(d2._katavorioDrag != null, "drag initialized");
    });

    test("make droppable via element", function () {
        var d1 = _add("d1");
        k.droppable(d1);
        ok(d1._katavorioDrop != null, "drop initialized");
    });

    test("make droppable via element id", function () {
        var d1 = _add("d1");
        k.droppable("d1");
        ok(d1._katavorioDrop != null, "drop initialized");
    });

    test("make droppable via element array", function () {
        var d1 = _add("d1"), d2 = _add("d2");
        k.droppable([d1, d2]);
        ok(d1._katavorioDrop != null, "drop initialized");
        ok(d2._katavorioDrop != null, "drop initialized");
    });

    test("make droppable via array of ids", function () {
        var d1 = _add("d1"), d2 = _add("d2");
        k.droppable(["d1", "d2"]);
        ok(d1._katavorioDrop != null, "drop initialized");
        ok(d2._katavorioDrop != null, "drop initialized");
    });

    test("make droppable via Node list", function () {
        var d1 = _add("d1"), d2 = _add("d2");
        d1.className = "foo";
        d2.className = "foo";
        k.droppable(document.querySelectorAll(".foo"));
        ok(d1._katavorioDrop != null, "drop initialized");
        ok(d2._katavorioDrop != null, "drop initialized");
    });

    test("make draggable, non-existent node", function () {
        var f = 0;
        try {
            k.draggable("foo");
        }
        catch (e) {
            f = 1;
        }
        equal(f, 0, "no exception thrown");
    });

    test("make draggable, null argument", function () {
        var f = 0;
        try {
            k.draggable(null);
        }
        catch (e) {
            f = 1;
        }
        equal(f, 0, "no exception thrown");
    });

    test("make droppable, non-existent node", function () {
        var f = 0;
        try {
            k.droppable("foo");
        }
        catch (e) {
            f = 1;
        }
        equal(f, 0, "no exception thrown");
    });

    test("make droppable, null argument", function () {
        var f = 0;
        try {
            k.droppable(null);
        }
        catch (e) {
            f = 1;
        }
        equal(f, 0, "no exception thrown");
    });

// --------------------------- / DRAGGABLE/DROPPABLE -----------------------------------------------

// --------------------------- DRAG SELECTION -----------------------------------------------

    test("simple drag selection, by element", function () {
        var d1 = _add("d1");
        k.draggable(d1);
        k.select(d1);
        equal(k.getSelection().length, 1, "one element in selection");
    });

    test("simple drag selection, by element id", function () {
        var d1 = _add("d1");
        k.draggable(d1);
        k.select("d1");
        equal(k.getSelection().length, 1, "one element in selection");
    });

    test("simple drag selection, by element id as object String", function () {
        var d1 = _add("d1");
        k.draggable(d1);
        k.select(new String("d1"));
        equal(k.getSelection().length, 1, "one element in selection");
    });

    test("simple drag selection, by element array", function () {
        var d1 = _add("d1"), d2 = _add("d2");
        k.draggable(d1);
        k.draggable(d2);
        k.select([d1, d2]);
        equal(k.getSelection().length, 2, "two elements in selection");
    });

    test("simple drag selection, by id array", function () {
        var d1 = _add("d1"), d2 = _add("d2");
        k.draggable(d1);
        k.draggable(d2);
        k.select(["d1", "d2"]);
        equal(k.getSelection().length, 2, "two elements in selection");
    });

    test("simple drag selection, by Node list", function () {
        var d1 = _add("d1"), d2 = _add("d2");
        k.draggable(d1);
        k.draggable(d2);
        d1.className = "foo";
        d2.className = "foo";
        k.select(document.querySelectorAll(".foo"));
        equal(k.getSelection().length, 2, "two elements in selection");
    });

    //ffsfdsafs

    test("simple drag deselection, by element", function () {
        var d1 = _add("d1");
        k.draggable(d1);
        k.select(d1);
        equal(k.getSelection().length, 1, "one element in selection");
        k.deselect(d1);
        equal(k.getSelection().length, 0, "zero elements in selection");
    });

    test("simple drag deselection, by element id", function () {
        var d1 = _add("d1");
        k.draggable(d1);
        k.select("d1");
        equal(k.getSelection().length, 1, "one element in selection");
        k.deselect("d1");
        equal(k.getSelection().length, 0, "zero elements in selection");
    });

    test("simple drag selection, by element array", function () {
        var d1 = _add("d1"), d2 = _add("d2");
        k.draggable(d1);
        k.draggable(d2);
        k.select([d1, d2]);
        equal(k.getSelection().length, 2, "two elements in selection");
        k.deselect([d1, d2]);
        equal(k.getSelection().length, 0, "zero elements in selection");
    });

    test("simple drag selection, by id array", function () {
        var d1 = _add("d1"), d2 = _add("d2");
        k.draggable(d1);
        k.draggable(d2);
        k.select(["d1", "d2"]);
        equal(k.getSelection().length, 2, "two elements in selection");
        k.deselect(["d1", "d2"]);
        equal(k.getSelection().length, 0, "zero elements in selection");
    });

    test("simple drag selection, by Node list", function () {
        var d1 = _add("d1"), d2 = _add("d2");
        k.draggable(d1);
        k.draggable(d2);
        d1.className = "foo";
        d2.className = "foo";
        k.select(document.querySelectorAll(".foo"));
        equal(k.getSelection().length, 2, "two elements in selection");
        k.deselect(document.querySelectorAll(".foo"));
        equal(k.getSelection().length, 0, "zero elements in selection");
    });

    test("deselectAll", function () {
        var d1 = _add("d1"), d2 = _add("d2");
        k.draggable(d1);
        k.draggable(d2);
        d1.className = "foo";
        d2.className = "foo";
        k.select(document.querySelectorAll(".foo"));
        equal(k.getSelection().length, 2, "two elements in selection");
        k.deselectAll();
        equal(k.getSelection().length, 0, "zero elements in selection");
    });

    test("simple drag selection, by element array, move them around", function () {
        var d1 = _add("d1", null, [0, 0]), d2 = _add("d2", null, [200, 200]);
        equal(parseInt(d1.style.left, 10), 0, "d1 is at left 0");
        equal(parseInt(d1.style.top, 10), 0, "d1 is at top 0");
        equal(parseInt(d2.style.left, 10), 200, "d1 is at left 200");
        equal(parseInt(d2.style.top, 10), 200, "d1 is at top 200");

        k.draggable(d1, {
            stop: function (params) {
                equal(params.selection.length, 2, "two elements in selection on drag stop");
            }
        });
        k.draggable(d2);
        k.select([d1, d2]);
        equal(k.getSelection().length, 2, "two elements in selection");


        var m = new Mottle();
        _t(m, d1, "mousedown", 0, 0);
        _t(m, document, "mousemove", 100, 100);
        equal(parseInt(d1.style.left, 10), 100, "d1 is at left 100");
        equal(parseInt(d1.style.top, 10), 100, "d1 is at top 100");
        equal(parseInt(d2.style.left, 10), 300, "d1 is at left 300");
        equal(parseInt(d2.style.top, 10), 300, "d1 is at top 300");
        m.trigger(document, "mouseup");
    });

    // -- filters ---------------------------------

    test("filter set via params", function () {
        var d = _add("d1");
        k.draggable(d, {
            filter: ".foo"
        });

        ok(d._katavorioDrag.getFilters()[".foo"] != null, "filter set and retrieved");
        ok(d._katavorioDrag.getFilters()[".foo"][1] == true, "filter exclude set to true");
    });

    test("filter set via setter", function () {
        var d = _add("d1");
        k.draggable(d);
        d._katavorioDrag.setFilter(".foo");
        ok(d._katavorioDrag.getFilters()[".foo"] != null, "filter set and retrieved");
        ok(d._katavorioDrag.getFilters()[".foo"][1] == true, "filter exclude set to true");
    });

    test("filter set via setter, set filterExclude to false", function () {
        var d = _add("d1");
        k.draggable(d);
        d._katavorioDrag.setFilter(".foo", false);
        ok(".foo", d._katavorioDrag.getFilters()[".foo"] != null, "filter set and retrieved");
        ok(d._katavorioDrag.getFilters()[".foo"][1] == false, "filter exclude set to false");
    });

    test("filter set via handle param", function () {
        var d = _add("d1");
        k.draggable(d, {
            handle: ".foo"
        });

        ok(".foo", d._katavorioDrag.getFilters()[".foo"] != null, "filter set from handle param");
        ok(d._katavorioDrag.getFilters()[".foo"][1] == false, "filter exclude set to false, from handle param existence");
    });

    test("filter function set via params", function () {
        var d = _add("d1");

        function _foo(ev, el) {
            return ev.target.classList.contains("foo");
        }

        k.draggable(d, {
            filter: _foo
        });

        var filt = d._katavorioDrag.getFilters()[_foo._katavorioId];
        ok(filt != null, "filter set and retrieved");
        ok(filt[1] == true, "filter exclude set to true");
    });

    test("filter function set via setter", function () {
        var d = _add("d1");

        function _foo(ev, el) {
            return ev.target.classList.contains("foo");
        }

        k.draggable(d);
        d._katavorioDrag.setFilter(_foo);
        var filt = d._katavorioDrag.getFilters()[_foo._katavorioId];
        ok(filt != null, "filter set and retrieved");
        ok(filt[1] == true, "filter exclude set to true");
    });

    test("filter function set via setter, set filterExclude to false", function () {
        var d = _add("d1");

        function _foo(ev, el) {
            return ev.target.classList.contains("foo");
        }

        k.draggable(d);
        d._katavorioDrag.setFilter(_foo, false);
        var filt = d._katavorioDrag.getFilters()[_foo._katavorioId];
        ok(filt != null, "filter set and retrieved");
        ok(filt[1] == false, "filter exclude set to false");
    });

    // mouse triggers
    test("filter mouse event, filter provided in draggable call.", function () {
        var d = _add("d1"),
            foo = _add("foo", d),
            m = new Mottle(),
            started = false;

        k.draggable(d, {
            filter: "#foo",
            start: function () {
                started = true;
            }
        });

        m.trigger(foo, "mousedown");
        m.trigger(document, "mousemove");
        ok(started == false, "drag not started");
        started = false;
        m.trigger(d, "mousedown");
        m.trigger(document, "mousemove");
        ok(started == true, "drag started");
    });

    test("filter mouse event, filter exclude, filter provided in draggable call.", function () {
        var d = _add("d1"),
            foo = _add("foo", d),
            m = new Mottle(),
            started = false;

        k.draggable(d, {
            filter: "#foo",
            filterExclude: false,
            start: function () {
                started = true;
            }
        });

        m.trigger(foo, "mousedown");
        m.trigger(document, "mousemove");
        ok(started == true, "drag started");
        started = false;
        m.trigger(d, "mousedown");
        m.trigger(document, "mousemove");
        ok(started == false, "drag not started");
    });

    test("filter mouse event, filter set programmatically.", function () {
        var d = _add("d1"),
            foo = _add("foo", d),
            m = new Mottle(),
            started = false;

        k.draggable(d, {
            start: function () {
                started = true;
            }
        });

        d._katavorioDrag.setFilter("#foo");

        m.trigger(foo, "mousedown");
        m.trigger(document, "mousemove");
        ok(started == false, "drag not started");
        started = false;
        m.trigger(d, "mousedown");
        m.trigger(document, "mousemove");
        ok(started == true, "drag started");
    });

    test("filter mouse event, filterExclude, filter set programmatically.", function () {
        var d = _add("d1"),
            foo = _add("foo", d),
            m = new Mottle(),
            started = false;

        k.draggable(d, {
            start: function () {
                started = true;
            }
        });

        d._katavorioDrag.setFilter("#foo", false);

        m.trigger(foo, "mousedown");
        m.trigger(document, "mousemove");
        ok(started == true, "drag started on element that is the filter");
        started = false;
        m.trigger(d, "mousedown");
        m.trigger(document, "mousemove");
        ok(started == false, "drag not started on filtered elements");
    });

    test("filter mouse event, multiple filters set programmatically.", function () {
        var d = _add("d1"),
            foo = _add("foo", d),
            bar = _add("bar", d),
            m = new Mottle(),
            started = false;

        k.draggable(d, {
            start: function () {
                started = true;
            }
        });

        d._katavorioDrag.setFilter("#foo");

        // foo is filtered
        m.trigger(foo, "mousedown");
        m.trigger(document, "mousemove");
        ok(started == false, "drag not started");
        m.trigger(document, "mouseup");

        // main div not filtered
        started = false;
        m.trigger(d, "mousedown");
        m.trigger(document, "mousemove");
        ok(started == true, "drag started");
        m.trigger(document, "mouseup");

        // bar not filtered
        started = false;
        m.trigger(bar, "mousedown");
        m.trigger(document, "mousemove");
        ok(started == true, "drag started");
        m.trigger(document, "mouseup");

        //now add bar filter - using default exclusion mechanism - and try again
        d._katavorioDrag.addFilter("#bar");
        started = false;
        m.trigger(bar, "mousedown");
        m.trigger(document, "mousemove");
        ok(started == false, "drag not started");
        m.trigger(document, "mouseup");

        // now remove BAR filter, and try again.
        d._katavorioDrag.removeFilter("#bar");
        started = false;
        m.trigger(bar, "mousedown");
        m.trigger(document, "mousemove");
        ok(started == true, "drag started");
        m.trigger(document, "mouseup");

        //now add bar filter but this time say it should be included, not excluded.
        d._katavorioDrag.addFilter("#bar", false);
        started = false;
        m.trigger(bar, "mousedown");
        m.trigger(document, "mousemove");
        ok(started == true, "drag started");
        m.trigger(document, "mouseup");

        // clear all filters and ensure FOO is no longer filtered.
        d._katavorioDrag.clearAllFilters();
        started = false;
        m.trigger(foo, "mousedown");
        m.trigger(document, "mousemove");
        ok(started == true, "drag started");
        m.trigger(document, "mouseup");

    });

    test("drag class added then removed.", function () {
        var d = _add("d1"),
            foo = _add("foo", d),
            bar = _add("bar", d),
            m = new Mottle(),
            started = false;

        k.draggable(d, {
            start: function () {
                started = true;
            }
        });

        m.trigger(foo, "mousedown");
        m.trigger(document, "mousemove");
        ok(d.classList.contains("katavorio-drag"), "drag class set on element");
        m.trigger(document, "mouseup");
        ok(!d.classList.contains("katavorio-drag"), "drag class no longer set on element");
    });

    test("stop event fired", function () {
        var d = _add("d1"),
            foo = _add("foo", d),
            bar = _add("bar", d),
            m = new Mottle(),
            started = false,
            stopped = false;

        k.draggable(d, {
            start: function () {
                started = true;
            },
            stop: function () {
                stopped = true;
            }
        });

        m.trigger(foo, "mousedown");
        m.trigger(document, "mousemove");
        ok(d.classList.contains("katavorio-drag"), "drag class set on element");
        m.trigger(document, "mouseup");
        ok(!d.classList.contains("katavorio-drag"), "drag class no longer set on element");
        ok(stopped, "stop event was fired");
    });

    test("start and stop event fired for multiple element drag", function () {
        var d = _add("d1"), d2 = _add("d2"),
            foo = _add("foo", d),
            bar = _add("bar", d),
            m = new Mottle(),
            started = 0,
            stopped = 0,
            listeners = {
                start: function () {
                    started++;
                },
                stop: function () {
                    stopped++;
                }
            };

        k.draggable(d, listeners);
        k.draggable(d2, listeners);

        k.select(d2);

        m.trigger(foo, "mousedown");
        m.trigger(document, "mousemove");
        m.trigger(document, "mousemove");
        m.trigger(document, "mousemove");
        m.trigger(document, "mouseup");

        equal(started, 2, "start event was fired twice, once for each element");
        equal(stopped, 2, "stop event was fired twice, once for each element");
    });


    test("attach extra listeners to draggable", function () {
        var d = _add("d1"),
            foo = _add("foo", d),
            bar = _add("bar", d),
            m = new Mottle(),
            started = false,
            stopped = false,
            dragged = false;

        k.draggable(d, {
            start: function () {
                started = true;
            },
            stop: function () {
                stopped = true;
            },
            drag: function () {
                dragged = true;
            }
        });

        d._katavorioDrag.visited = true;

        m.trigger(foo, "mousedown");
        m.trigger(document, "mousemove");
        ok(d.classList.contains("katavorio-drag"), "drag class set on element");
        m.trigger(document, "mouseup");
        ok(!d.classList.contains("katavorio-drag"), "drag class no longer set on element");
        ok(stopped, "stop event was fired");
        ok(dragged, "drag event was fired");

        started = false;
        stopped = false;
        dragged = false;
        var started2 = false, dragged2 = false, stopped2 = false;
        k.draggable(d, {
            start: function () {
                started2 = true;
            },
            stop: function () {
                stopped2 = true;
            },
            drag: function () {
                dragged2 = true;
            }
        });

        m.trigger(foo, "mousedown");
        m.trigger(document, "mousemove");
        m.trigger(document, "mouseup");

        ok(stopped, "stop event was fired");
        ok(stopped2, "2nd stop event was fired");
        ok(started, "start event was fired");
        ok(started2, "2nd start event was fired");
        ok(dragged, "drag event was fired");
        ok(dragged2, "2nd drag event was fired");

        ok(d._katavorioDrag.visited, "still using the original drag object");
    });

    var _t = function (m, el, evt, x, y) {
        m.trigger(el, evt, { pageX: x, pageY: y, screenX: x, screenY: y, clientX: x, clientY: y});
    };

    test("elements dragged to correct location", function () {
        var d = _add("d1"),
            foo = _add("foo", d),
            bar = _add("bar", d),
            m = new Mottle(),
            started = false,
            stopped = false;

        k.draggable(d, {
            start: function () {
                started = true;
            },
            stop: function () {
                stopped = true;
            }
        });

        d.style.position = "absolute";
        d.style.left = "50px";
        d.style.top = "50px";


        _t(m, d, "mousedown", 0, 0);
        _t(m, document, "mousemove", 100, 100);
        ok(d.classList.contains("katavorio-drag"), "drag class set on element");
        m.trigger(document, "mouseup");
        ok(!d.classList.contains("katavorio-drag"), "drag class no longer set on element");
        ok(stopped, "stop event was fired");

        equal(parseInt(d.style.left, 10), 150, "left position correct after drag");
        equal(parseInt(d.style.top, 10), 150, "top position correct after drag");
    });

    test("elements cannot be dragged to negative values if allowNegative:false", function () {
        var d = _add("d1"),
            foo = _add("foo", d),
            bar = _add("bar", d),
            m = new Mottle(),
            started = false,
            stopped = false;

        k.draggable(d, {
            start: function () {
                started = true;
            },
            stop: function () {
                stopped = true;
            },
            allowNegative: false
        });

        d.style.position = "absolute";
        d.style.left = "50px";
        d.style.top = "50px";

        _t(m, d, "mousedown", 0, 0);
        _t(m, document, "mousemove", -100, -100);
        ok(d.classList.contains("katavorio-drag"), "drag class set on element");
        m.trigger(document, "mouseup");
        ok(!d.classList.contains("katavorio-drag"), "drag class no longer set on element");
        ok(stopped, "stop event was fired");

        equal(parseInt(d.style.left, 10), 0, "left position correct after drag");
        equal(parseInt(d.style.top, 10), 0, "top position correct after drag");
    });

// ---------------------------------------- POSSE TESTS --------------------------------------------------------

    test("add item to initially non existent posse, by element", function () {
        var d1 = _add("d1");
        k.draggable(d1);
        var posse = k.addToPosse(d1, "posse");
        ok(posse != null);
        equal(posse.name, "posse", "posse name is set");
        equal(posse.members.length, 1, "posse has 1 member");
        equal(posse.members[0], d1._katavorioDrag);
        ok(d1._katavorioDrag.posses.indexOf(posse.name) != -1, "posse is set on the Drag");

        //equal(k.getPossesFor("d1")["posse"].name, "posse");
    });

    test("add item to initially non existent posse, by element", function () {
        var d1 = _add("d1");
        var d2 = _add("d2");
        k.draggable([d1, d2]);
        var posse = k.addToPosse([d1, d2], "posse2");
        ok(posse != null);
        equal(posse.name, "posse2", "posse name is set");
        equal(2, posse.members.length, "posse has 2 members");
        equal(posse.members[0], d1._katavorioDrag);
        ok(d1._katavorioDrag.posses.indexOf(posse.name) != -1, "posse is set on the Drag");
        ok(d2._katavorioDrag.posses.indexOf(posse.name) != -1, "posse is set on the Drag");
    });

    test("elements in posse dragged to correct location", function () {
        var d = _add("d1"),
            d2 = _add("d2"),
            d3 = _add("d3"),
            m = new Mottle(),
            started = false,
            stopped = false,
            stopEvents = {};

        k.draggable([d, d2, d3], {
            start: function () {
                started = true;
            },
            stop: function (params) {
                stopped = true;
                stopEvents[params.el.id] = true;
            }
        });

        d.style.position = "absolute";
        d.style.left = "50px";
        d.style.top = "50px";

        d2.style.position = "absolute";
        d2.style.left = "450px";
        d2.style.top = "450px";

        d3.style.position = "absolute";
        d3.style.left = "850px";
        d3.style.top = "850px";

        k.addToPosse([d, d2, d3], "posse");

        var _t = function (el, evt, x, y) {
            m.trigger(el, evt, { pageX: x, pageY: y, screenX: x, screenY: y, clientX: x, clientY: y});
        };

        _t(d, "mousedown", 0, 0);
        _t(document, "mousemove", 100, 100);
        ok(d.classList.contains("katavorio-drag"), "drag class set on element");
        m.trigger(document, "mouseup");
        ok(!d.classList.contains("katavorio-drag"), "drag class no longer set on element");
        ok(stopped, "stop event was fired");

        equal(parseInt(d.style.left, 10), 150, "left position correct after drag");
        equal(parseInt(d.style.top, 10), 150, "top position correct after drag");

        equal(parseInt(d2.style.left, 10), 550, "left position correct after drag");
        equal(parseInt(d2.style.top, 10), 550, "top position correct after drag");

        equal(parseInt(d3.style.left, 10), 950, "left position correct after drag");
        equal(parseInt(d3.style.top, 10), 950, "top position correct after drag");

        ok(stopEvents.d1, "d1 fired stop event");
        ok(stopEvents.d2, "d2 fired stop event");
        ok(stopEvents.d3, "d3 fired stop event");

        stopEvents = {};

        // now remove d2 and d3 from the posse, move d, and check these did not move.
        k.removeFromPosse([d2, d3], "posse");

        _t(d, "mousedown", 0, 0);
        _t(document, "mousemove", -100, -100);
        ok(d.classList.contains("katavorio-drag"), "drag class set on element");
        m.trigger(document, "mouseup");
        ok(!d.classList.contains("katavorio-drag"), "drag class no longer set on element");
        ok(stopped, "stop event was fired");

        equal(parseInt(d.style.left, 10), 50, "left position correct after drag");
        equal(parseInt(d.style.top, 10), 50, "top position correct after drag");

        equal(parseInt(d2.style.left, 10), 550, "left position correct after drag");
        equal(parseInt(d2.style.top, 10), 550, "top position correct after drag");

        equal(parseInt(d3.style.left, 10), 950, "left position correct after drag");
        equal(parseInt(d3.style.top, 10), 950, "top position correct after drag");

        ok(stopEvents.d1, "d1 fired stop event");
        ok(!stopEvents.d2, "d2 did not fire stop event");
        ok(!stopEvents.d3, "d3 did not fire stop event");
    });

    test("elements in posse dragged to correct location, multiple trigger elements.", function () {
        var d = _add("d1"),
            d2 = _add("d2"),
            d3 = _add("d3"),
            m = new Mottle(),
            started = false,
            stopped = false;

        k.draggable([d, d2, d3], {
            start: function () {
                started = true;
            },
            stop: function () {
                stopped = true;
            }
        });

        d.style.position = "absolute";
        d.style.left = "50px";
        d.style.top = "50px";

        d2.style.position = "absolute";
        d2.style.left = "450px";
        d2.style.top = "450px";

        d3.style.position = "absolute";
        d3.style.left = "850px";
        d3.style.top = "850px";

        k.addToPosse([d, d2, d3], "posse");

        var _t = function (el, evt, x, y) {
            m.trigger(el, evt, { pageX: x, pageY: y, screenX: x, screenY: y, clientX: x, clientY: y});
        };

        _t(d, "mousedown", 0, 0);
        _t(document, "mousemove", 100, 100);
        ok(d.classList.contains("katavorio-drag"), "drag class set on other element in posse");
        m.trigger(document, "mouseup");
        ok(!d.classList.contains("katavorio-drag"), "drag class no longer set on other element in posse");
        ok(stopped, "stop event was fired");

        equal(parseInt(d.style.left, 10), 150, "left position correct after drag");
        equal(parseInt(d.style.top, 10), 150, "top position correct after drag");

        equal(parseInt(d2.style.left, 10), 550, "left position correct after drag");
        equal(parseInt(d2.style.top, 10), 550, "top position correct after drag");

        equal(parseInt(d3.style.left, 10), 950, "left position correct after drag");
        equal(parseInt(d3.style.top, 10), 950, "top position correct after drag");


        _t(d2, "mousedown", 0, 0);
        _t(document, "mousemove", 100, 100);
        ok(d.classList.contains("katavorio-drag"), "drag class set on element");
        m.trigger(document, "mouseup");
        ok(!d.classList.contains("katavorio-drag"), "drag class no longer set on element");
        ok(stopped, "stop event was fired");

        equal(parseInt(d.style.left, 10), 250, "left position correct after drag");
        equal(parseInt(d.style.top, 10), 250, "top position correct after drag");

        equal(parseInt(d2.style.left, 10), 650, "left position correct after drag");
        equal(parseInt(d2.style.top, 10), 650, "top position correct after drag");

        equal(parseInt(d3.style.left, 10), 1050, "left position correct after drag");
        equal(parseInt(d3.style.top, 10), 1050, "top position correct after drag");

    });

    //
    // same test as before but d2 is marked as 'passive' and should not cause the whole posse to drag.
    // element 'd' still should though.
    test("elements in posse dragged to correct location, single trigger element.", function () {
        var d = _add("d1"),
            d2 = _add("d2"),
            d3 = _add("d3"),
            m = new Mottle(),
            started = false,
            stopped = false;

        k.draggable([d, d2, d3], {
            start: function () {
                started = true;
            },
            stop: function () {
                stopped = true;
            }
        });

        d.style.position = "absolute";
        d.style.left = "50px";
        d.style.top = "50px";

        d2.style.position = "absolute";
        d2.style.left = "450px";
        d2.style.top = "450px";

        d3.style.position = "absolute";
        d3.style.left = "850px";
        d3.style.top = "850px";

        k.addToPosse(d, "posse");
        k.addToPosse([d2, d3], {id: "posse", active: false});

        var _t = function (el, evt, x, y) {
            m.trigger(el, evt, { pageX: x, pageY: y, screenX: x, screenY: y, clientX: x, clientY: y});
        };

        // move d. every node should move.
        _t(d, "mousedown", 0, 0);
        _t(document, "mousemove", 100, 100);
        ok(d.classList.contains("katavorio-drag"), "drag class set on element");
        m.trigger(document, "mouseup");
        ok(!d.classList.contains("katavorio-drag"), "drag class no longer set on element");
        ok(stopped, "stop event was fired");

        equal(parseInt(d.style.left, 10), 150, "left position correct after drag");
        equal(parseInt(d.style.top, 10), 150, "top position correct after drag");

        equal(parseInt(d2.style.left, 10), 550, "left position of d2 correct after drag");
        equal(parseInt(d2.style.top, 10), 550, "top position of d2 correct after drag");

        equal(parseInt(d3.style.left, 10), 950, "left position correct after drag");
        equal(parseInt(d3.style.top, 10), 950, "top position correct after drag");


        // move d2. only d2 should move.
        _t(d2, "mousedown", 0, 0);
        _t(document, "mousemove", 100, 100);
        ok(d2.classList.contains("katavorio-drag"), "drag class set on element");
        m.trigger(document, "mouseup");
        ok(!d2.classList.contains("katavorio-drag"), "drag class no longer set on element");
        ok(stopped, "stop event was fired");

        equal(parseInt(d.style.left, 10), 150, "left position correct after drag - d1 has not moved");
        equal(parseInt(d.style.top, 10), 150, "top position correct after drag - d1 has not moved");

        equal(parseInt(d2.style.left, 10), 650, "left position correct after drag - d2 has moved independently");
        equal(parseInt(d2.style.top, 10), 650, "top position correct after drag - d2 has moved independently");

        equal(parseInt(d3.style.left, 10), 950, "left position correct after drag - d3 has not moved");
        equal(parseInt(d3.style.top, 10), 950, "top position correct after drag - d3 has not moved");


        // remove d from all posses and move it, the others should not move
        k.removeFromAllPosses(d);
        _t(d, "mousedown", 0, 0);
        _t(document, "mousemove", 100, 100);
        ok(d.classList.contains("katavorio-drag"), "drag class set on element");
        m.trigger(document, "mouseup");
        ok(!d.classList.contains("katavorio-drag"), "drag class no longer set on element");
        ok(stopped, "stop event was fired");

        equal(parseInt(d.style.left, 10), 250, "left position correct after drag");
        equal(parseInt(d.style.top, 10), 250, "top position correct after drag");

        equal(parseInt(d2.style.left, 10), 650, "left position of d2 correct after drag");
        equal(parseInt(d2.style.top, 10), 650, "top position of d2 correct after drag");

        equal(parseInt(d3.style.left, 10), 950, "left position correct after drag");
        equal(parseInt(d3.style.top, 10), 950, "top position correct after drag");


        // add d back to posse as active member
        k.addToPosse(d, "posse");
        // move d. every node should move.
        _t(d, "mousedown", 0, 0);
        _t(document, "mousemove", 100, 100);
        ok(d.classList.contains("katavorio-drag"), "drag class set on element");
        m.trigger(document, "mouseup");
        ok(!d.classList.contains("katavorio-drag"), "drag class no longer set on element");
        ok(stopped, "stop event was fired");

        equal(parseInt(d.style.left, 10), 350, "left position correct after drag");
        equal(parseInt(d.style.top, 10), 350, "top position correct after drag");

        equal(parseInt(d2.style.left, 10), 750, "left position of d2 correct after drag");
        equal(parseInt(d2.style.top, 10), 750, "top position of d2 correct after drag");

        equal(parseInt(d3.style.left, 10), 1050, "left position correct after drag");
        equal(parseInt(d3.style.top, 10), 1050, "top position correct after drag");


        // now switch off d from being active member
        k.setPosseState(d, "posse", false);
        // move d. only d should move.
        _t(d, "mousedown", 0, 0);
        _t(document, "mousemove", 100, 100);
        ok(d.classList.contains("katavorio-drag"), "drag class set on element");
        m.trigger(document, "mouseup");
        ok(!d.classList.contains("katavorio-drag"), "drag class no longer set on element");
        ok(stopped, "stop event was fired");

        equal(parseInt(d.style.left, 10), 450, "left position correct after drag");
        equal(parseInt(d.style.top, 10), 450, "top position correct after drag");

        equal(parseInt(d2.style.left, 10), 750, "left position of d2 correct after drag");
        equal(parseInt(d2.style.top, 10), 750, "top position of d2 correct after drag");

        equal(parseInt(d3.style.left, 10), 1050, "left position correct after drag");
        equal(parseInt(d3.style.top, 10), 1050, "top position correct after drag");


        // now switch d back on as active member
        k.setPosseState(d, "posse", true);
        // move d. every node should move.
        _t(d, "mousedown", 0, 0);
        _t(document, "mousemove", 100, 100);
        ok(d.classList.contains("katavorio-drag"), "drag class set on element");
        m.trigger(document, "mouseup");
        ok(!d.classList.contains("katavorio-drag"), "drag class no longer set on element");
        ok(stopped, "stop event was fired");

        equal(parseInt(d.style.left, 10), 550, "left position correct after drag");
        equal(parseInt(d.style.top, 10), 550, "top position correct after drag");

        equal(parseInt(d2.style.left, 10), 850, "left position of d2 correct after drag");
        equal(parseInt(d2.style.top, 10), 850, "top position of d2 correct after drag");

        equal(parseInt(d3.style.left, 10), 1150, "left position correct after drag");
        equal(parseInt(d3.style.top, 10), 1150, "top position correct after drag");


        // finally, test the `setPosses` function. This takes the same args as addToPosse, but it will not take
        // action if a given posse is already set on an element, and it will remove any posses from the element
        // that were not passed in.

        // so, first, set the posse state to false for "posse".
        k.setPosseState(d, "posse", false);

        // add a posse that we will take away shortly (to test it does actually get taken away)
        k.addToPosse(d, "TEMPORARY");
        equal(d._katavorioDrag.posseRoles["TEMPORARY"], true, "TEMPORARY posse added as active");

        // then set posses:
        k.setPosse(d, "posse", {id: "posse2", active: false}, {id: "posse3", active: true});

        equal(d._katavorioDrag.posseRoles["posse"], false, "role in 'posse' unchanged");
        equal(d._katavorioDrag.posseRoles["posse2"], false, "posse2 added as passive");
        equal(d._katavorioDrag.posseRoles["posse3"], true, "posse3 added as active");
        ok(d._katavorioDrag.posseRoles["TEMPORARY"] == null, "TEMPORARY posse removed by setPosse");

    });

    var trigger = function (m, el, evt, x, y) {
        m.trigger(el, evt, { pageX: x, pageY: y, screenX: x, screenY: y, clientX: x, clientY: y});
    };


    test("elements in posse dragged to correct location, multiple posses", function () {
        var d = _add("d1"),
            d2 = _add("d2"),
            d3 = _add("d3"),
            m = new Mottle(),
            started = false,
            stopped = false;

        k.draggable([d, d2, d3]);

        d.style.position = "absolute";
        d.style.left = "50px";
        d.style.top = "50px";

        d2.style.position = "absolute";
        d2.style.left = "450px";
        d2.style.top = "450px";

        d3.style.position = "absolute";
        d3.style.left = "850px";
        d3.style.top = "850px";

        // add d to posse and posse2.
        k.addToPosse(d, "posse", "posse2");

        // add d3 to posse only.
        k.addToPosse(d3, "posse");

        // add d2 to posse2 only, and as passive, so dragging it does not cause d to drag
        k.addToPosse(d2, {id: "posse2", active: false});

        var _t = function (el, evt, x, y) {
            m.trigger(el, evt, { pageX: x, pageY: y, screenX: x, screenY: y, clientX: x, clientY: y});
        };

        _t(d, "mousedown", 0, 0);
        _t(document, "mousemove", 100, 100);
        m.trigger(document, "mouseup");

        equal(parseInt(d.style.left, 10), 150, "left position correct after drag");
        equal(parseInt(d.style.top, 10), 150, "top position correct after drag");

        equal(parseInt(d2.style.left, 10), 550, "left position of d2 correct after drag");
        equal(parseInt(d2.style.top, 10), 550, "top position of d2 correct after drag");

        equal(parseInt(d3.style.left, 10), 950, "left position of d3 correct after drag");
        equal(parseInt(d3.style.top, 10), 950, "top position of d3 correct after drag");

        // move d2; d should not move, as d2 is passive. and d3 should certainly not move.
        _t(d2, "mousedown", 0, 0);
        _t(document, "mousemove", 100, 100);
        m.trigger(document, "mouseup");

        equal(parseInt(d.style.left, 10), 150, "left position correct after drag");
        equal(parseInt(d.style.top, 10), 150, "top position correct after drag");

        equal(parseInt(d2.style.left, 10), 650, "left position of d2 correct after drag");
        equal(parseInt(d2.style.top, 10), 650, "top position of d2 correct after drag");

        equal(parseInt(d3.style.left, 10), 950, "left position of d3 correct after drag");
        equal(parseInt(d3.style.top, 10), 950, "top position of d3 correct after drag");

        // remove d from both posses, drag it, d2 and d3 should not move
        k.removeFromPosse(d, "posse", "posse2");

        _t(d, "mousedown", 0, 0);
        _t(document, "mousemove", 100, 100);
        m.trigger(document, "mouseup");

        equal(parseInt(d.style.left, 10), 250, "left position correct after drag");
        equal(parseInt(d.style.top, 10), 250, "top position correct after drag");

        equal(parseInt(d2.style.left, 10), 650, "left position of d2 correct after drag");
        equal(parseInt(d2.style.top, 10), 650, "top position of d2 correct after drag");

        equal(parseInt(d3.style.left, 10), 950, "left position of d3 correct after drag");
        equal(parseInt(d3.style.top, 10), 950, "top position of d3 correct after drag");

    });

    test("cloned node tests", function() {
        //"katavorio-clone-drag"

        var d = _add("d1", null, [0, 0]),
            d2 = _add("d2", d, [10, 10]),
            d3 = _add("d3", null, [500, 500]),
            d4 = _add("d3", d3, [10, 10]),
            m = new Mottle();

        d.style.width = "300px";
        d3.style.width = "300px";
        d.style.height = "300px";
        d3.style.height = "300px";

        k.draggable([d, d2, d3], {
            clone: true
        });

        var dropped = false;
        k.droppable([d, d3], {
            drop: function () {
                dropped = true;
            }
        });

        trigger(m, d2, "mousedown", 0, 0);
        trigger(m, document, "mousemove", 550, 550);
        // should now be a cloned node in play
        ok(document.querySelectorAll(".katavorio-clone-drag").length == 1, "there is a cloned node active");
        trigger(m, document, "mouseup", 550, 550);
        ok(dropped, "drop event occurred");
        ok(document.querySelectorAll(".katavorio-clone-drag").length == 0, "there are no cloned nodes active");
    })


    test("ghost proxy tests", function () {
        var d = _add("d1", null, [0, 0]),
            d2 = _add("d2", d, [10, 10]),
            d3 = _add("d3", null, [500, 500]),
            d4 = _add("d3", d3, [10, 10]),
            m = new Mottle();

        d.style.width = "300px";
        d3.style.width = "300px";
        d.style.height = "300px";
        d3.style.height = "300px";

        k.draggable([d, d2, d3], {
            ghostProxy: true,
            constrain: true
        });

        var dropped = false;
        k.droppable([d, d3], {
            drop: function () {
                dropped = true;
            }
        });

        trigger(m, d2, "mousedown", 0, 0);
        trigger(m, document, "mousemove", 550, 550);
        // should now be a ghost proxy in play
        ok(document.querySelectorAll(".katavorio-ghost-proxy").length == 1, "there is a ghost proxy active");
        trigger(m, document, "mouseup", 550, 550);
        ok(dropped, "drop event occurred");
        ok(document.querySelectorAll(".katavorio-ghost-proxy").length == 0, "there are no ghost proxies active");

    });


    test("ghost proxy set with a function", function () {
        var d = _add("d1", null, [0, 0]),
            d2 = _add("d2", d, [10, 10]),
            d3 = _add("d3", null, [500, 500]),
            d4 = _add("d3", d3, [10, 10]),
            m = new Mottle();

        d.style.width = "300px";
        d3.style.width = "300px";
        d.style.height = "300px";
        d3.style.height = "300px";

        k.draggable([d, d2, d3], {
            constrain: true,
            ghostProxy: function () {
                return true;
            }
        });

        var dropped = false;
        k.droppable([d, d3], {
            drop: function () {
                dropped = true;
            }
        });

        trigger(m, d2, "mousedown", 0, 0);
        trigger(m, document, "mousemove", 550, 550);
        // should now be a ghost proxy in play
        ok(document.querySelectorAll(".katavorio-ghost-proxy").length == 1, "there is a ghost proxy active");
        trigger(m, document, "mouseup", 550, 550);
        ok(dropped, "drop event occurred");
        ok(document.querySelectorAll(".katavorio-ghost-proxy").length == 0, "there are no ghost proxies active");

    });

    test("ghost proxy disabled with a function that returns false", function () {
        var d = _add("d1", null, [0, 0]),
            d2 = _add("d2", d, [10, 10]),
            d3 = _add("d3", null, [500, 500]),
            d4 = _add("d3", d3, [10, 10]),
            m = new Mottle();

        d.style.width = "300px";
        d3.style.width = "300px";
        d.style.height = "300px";
        d3.style.height = "300px";

        k.draggable([d, d2, d3], {
            constrain: true,
            ghostProxy: function () {
                return false;
            }
        });

        var dropped = false;
        k.droppable([d, d3], {
            drop: function () {
                dropped = true;
            }
        });

        trigger(m, d2, "mousedown", 0, 0);
        trigger(m, document, "mousemove", 550, 550);
        // should now be a ghost proxy in play
        ok(document.querySelectorAll(".katavorio-ghost-proxy").length == 0, "there are no ghost proxies active");
        trigger(m, document, "mouseup", 550, 550);
        ok(dropped, "drop event occurred");
        ok(document.querySelectorAll(".katavorio-ghost-proxy").length == 0, "there are no ghost proxies active");

    });

    test("'stop' event", function () {
        var d = _add("d1", null, [0, 0], [300, 300]),
            m = new Mottle();


        k.draggable(d, {
            stop: function (p) {
                equal(p.pos[0], 550, "left position is correct");
                equal(p.pos[1], 550, "top position is correct");
            }
        });

        trigger(m, d, "mousedown", 0, 0);
        trigger(m, document, "mousemove", 550, 550);
        trigger(m, document, "mouseup", 550, 550);
    });

    test("'stop' event, element constrained", function () {
        var d = _add("d1", null, [0, 0], [300, 300]),
            d2 = _add("d2", d, [10, 10], [50, 50]),
            m = new Mottle();


        k.draggable(d2, {
            constrain: true,
            stop: function (p) {
                equal(p.pos[0], 250, "left position is correctly constrained");
                equal(p.pos[1], 250, "top position is correctly constrained");
            }
        });

        trigger(m, d2, "mousedown", 0, 0);
        trigger(m, document, "mousemove", 550, 550);
        trigger(m, document, "mouseup", 550, 550);
    });

    test("'stop' event, element constrained, ghost proxy in use", function () {
        var d = _add("d1", null, [0, 0], [300, 300]),
            d2 = _add("d2", d, [10, 10], [50, 50]),
            m = new Mottle(), pos, finalPos;


        k.draggable(d2, {
            constrain: true,
            ghostProxy:true,
            stop: function (p) {
                pos = p.pos;
                finalPos = p.finalPos;
            }
        });

        trigger(m, d2, "mousedown", 10, 10);
        trigger(m, document, "mousemove", 550, 550);
        trigger(m, document, "mouseup", 550, 550);

        equal(pos[0], 550, "although constrained, left position shows ghost proxy position");
        equal(pos[1], 550, "although constrained, top position shows ghost proxy position");

        equal(finalPos[0], 10, "final pos left is correct; this is where the element will be.");
        equal(finalPos[1], 10, "final pos top is correct; this is where the element will be.");
    });

    //
    // this test was created in response to issue 568 of jsplumb, in which the user was unable to
    // drag a connection to a node in a group; the connection was made to the group. it is due to the
    // drop order, which it itself determined by the order in which objects are made droppable.
    //
    test("order of droppables", function() {
        var parent = _add("d1", null, [50,50], [500,500]);
        var child = _add("d2", parent, [150,150], [50,50]);
        var drag = _add("d3", null, [0,0], [50,50]);
        var m = new Mottle();
        var dropTarget = null;

        k.droppable(parent, {
            drop:function() {
                dropTarget = parent;
                return true;
            },
            rank:1
        });

        k.droppable(child, {
            drop:function() {
                dropTarget = child;
                return true;
            },
            rank:10
        });



        k.draggable(drag);

        // drag and drop 'drag' on an area of the parent that the child is not located at
        trigger(m, drag, "mousedown", 10, 10);
        trigger(m, document, "mousemove", 300, 300);
        trigger(m, document, "mouseup", 300, 300);

        equal(dropTarget, parent, "drop target was parent");

        // now drag and drop 'drag' on an area of the parent that the child IS located at
        trigger(m, drag, "mousedown", 300, 300);
        trigger(m, document, "mousemove", 200, 200);
        trigger(m, document, "mouseup", 200, 200);

        equal(dropTarget, child, "drop target was child");

    });

    test("droppable, cursor over the target", function() {

        // the drag element is at [0,0] and of size [50,50].

        var parent = _add("d1", null, [50,50], [500,500]);
        var drag = _add("d3", null, [0,0], [50,50]);
        var m = new Mottle();
        var dropTarget = null;

        k.droppable(parent, {
            drop:function() {
                dropTarget = parent;
                return true;
            },
            rank:1
        });

        k.draggable(drag);

        // drag and drop 'drag' and put the mouse cursor plumb in the target
        trigger(m, drag, "mousedown", 45, 45);
        trigger(m, document, "mousemove", 300, 300);
        trigger(m, document, "mouseup", 300, 300);

        equal(dropTarget, parent, "drop target was parent");


    });

    test("droppable, cursor not over the target", function() {

        // the drag element is at [0,0] and of size [50,50].

        var parent = _add("d1", null, [50,50], [500,500]);
        var drag = _add("d3", null, [0,0], [50,50]);
        var m = new Mottle();
        var dropTarget = null;

        k.droppable(parent, {
            drop:function() {
                dropTarget = parent;
                return true;
            },
            rank:1
        });

        k.draggable(drag);

        // drop with cursor not over the target, but the drag element _is_ over the drop target.
        trigger(m, drag, "mousedown", 40,40);
        trigger(m, document, "mousemove", 580, 580);
        trigger(m, document, "mouseup", 580, 580);

        equal(drag.offsetLeft, 540, "offsetleft is 540")

        equal(dropTarget, parent, "drop target was parent");


    });

    test("droppable, top left drag corner not over the target", function() {

        // the drag element is at [0,0] and of size [50,50].

        var parent = _add("d1", null, [50,50], [500,500]);
        var drag = _add("d3", null, [0,0], [50,50]);
        var m = new Mottle();
        var dropTarget = null;

        k.droppable(parent, {
            drop:function() {
                dropTarget = parent;
                return true;
            },
            rank:1
        });

        k.draggable(drag);

        // drop with cursor not over the target, but the drag element _is_ over the drop target.
        trigger(m, drag, "mousedown", 10,10);
        trigger(m, document, "mousemove", 20, 20);
        trigger(m, document, "mouseup", 20, 20);

        equal(drag.offsetLeft, 10, "offsetleft is 10");

        equal(dropTarget, parent, "drop target was parent");


    });

    test("droppable, drag element not over the target at all", function() {

        // the drag element is at [0,0] and of size [50,50].

        var parent = _add("d1", null, [50,50], [500,500]);
        var drag = _add("d3", null, [0,0], [50,50]);
        var m = new Mottle();
        var dropTarget = null;

        k.droppable(parent, {
            drop:function() {
                dropTarget = parent;
                return true;
            },
            rank:1
        });

        k.draggable(drag);

        // drop with cursor not over the target, but the drag element _is_ over the drop target.
        trigger(m, drag, "mousedown", 10,10);
        trigger(m, document, "mousemove", 2000, 2000);
        trigger(m, document, "mouseup", 2000, 2000);

        equal(drag.offsetLeft, 1990, "offsetleft is 1990");

        equal(dropTarget, null, "drop target was not set");

    });

    test("constrain drag to grid, default value of [10,10]", function() {
        var d1 = _add("d1", null, [0,0], [100,100]);
        var m = new Mottle();

        k.draggable(d1, {
            grid:[10,10]
        });

        // mousedown
        trigger(m, d1, "mousedown", 0,0);
        trigger(m, document, "mousemove", 25, 45);

        // having moved the element to [25,45] it should in fact be snapped to [20,40] - the closest multiples of 10 in each axis.
        equal(20, _loc(d1)[0], "left clamped to 20px during drag");
        equal(40, _loc(d1)[1], "top clamped to 40px during drag");

        trigger(m, document, "mouseup", 25, 45);
        // mouseup: the element should be dropped at that clamped location we just tested
        equal(20, _loc(d1)[0], "left clamped to 20px after mouse up");
        equal(40, _loc(d1)[1], "top clamped to 40px after mouse up");

        // now test when the clamping increases the value in order to snap
        trigger(m, d1, "mousedown", 20,40);
        trigger(m, document, "mousemove", 236, 456);
        equal(_loc(d1)[0], 240, "left clamped to 240px during drag");
        equal(_loc(d1)[1], 460, "top clamped to 460px during drag");

        trigger(m, document, "mouseup", 236, 456);
        equal(240, _loc(d1)[0], "left clamped to 230px after mouse up");
        equal(460, _loc(d1)[1], "top clamped to 460px after mouse up");

    });

    test("constrain drag to grid, non default value of [50,50]", function() {
        var d1 = _add("d1", null, [0,0], [100,100]);
        var m = new Mottle();

        k.draggable(d1, {
            grid:[50,50]
        });

        // mousedown
        trigger(m, d1, "mousedown", 0,0);
        trigger(m, document, "mousemove", 30, 90);

        // having moved the element to [30, 90] it should in fact be snapped to [50,100] - the closest multiples of 50 in each axis.
        equal(50, _loc(d1)[0], "left clamped to 50px during drag");
        equal(100, _loc(d1)[1], "top clamped to 100px during drag");

        trigger(m, document, "mousemove", 30, 90);
        equal(50, _loc(d1)[0], "left clamped to 50px after mouse up");
        equal(100, _loc(d1)[1], "top clamped to 100px after mouse up");
        //
        // now test when the clamping decreases the value in order to snap
        trigger(m, d1, "mousedown",0,0);
        trigger(m, document, "mousemove", 224, 424);
        equal(200, _loc(d1)[0], "left clamped to 200px during drag");
        equal(400, _loc(d1)[1], "top clamped to 400px during drag");

        trigger(m, document, "mousemove", 224, 424);
        equal(200, _loc(d1)[0], "left clamped to 200px after mouse up");
        equal(400, _loc(d1)[1], "top clamped to 400px after mouse up");

        trigger(m, d1, "mousedown",0,0);
        trigger(m, document, "mousemove", 634, 1424);
        equal(650, _loc(d1)[0], "left clamped to 650px during drag");
        equal(1400, _loc(d1)[1], "top clamped to 1400px during drag");

        trigger(m, document, "mousemove", 634, 1424);
        equal(650, _loc(d1)[0], "left clamped to 650px after mouse up");
        equal(1400, _loc(d1)[1], "top clamped to 1400px after mouse up");

    });
};