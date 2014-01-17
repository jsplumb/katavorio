var divs  =[],
	_add = function(id) {
		var d = document.createElement("div");
		d.setAttribute("id", id);
		divs.push(d);
		document.body.appendChild(d);
		return d;
	},
	_clear = function() {
		for (var i = 0; i < divs.length; i++) {
			divs[i].parentNode.removeChild(divs[i]);
		}
		divs.length = 0;
		k = null;
	},
	k,
	seh = new DefaultKatavorioHelper();

var testSuite = function() {
	
	module("Katavorio", {
		teardown: _clear,
		setup:function() {
            k = new Katavorio({
                getPosition:seh.getPosition,
                setPosition:seh.setPosition,
                getSize:seh.getSize,
                addClass:seh.addClass,
                removeClass:seh.removeClass,
                bind:seh.addEvent,
                unbind:seh.removeEvent,
                fireEvent:function() { 
                    console.log(arguments); 
                },
                intersects:seh.intersects,
				indexOf:seh.indexOf
           });
		}
	});
    
// --------------------------- SCOPE -----------------------------------------------
    
    test("change scope of draggable, via katavorio instance, on element", function() {
        var d1 = _add("d1");
        var d = k.draggable(d1, {
            scope:"scope1 scope2"
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
    });
	
	test("change scope of droppable, via katavorio instance, on element", function() {
        var d1 = _add("d1");
        var d = k.droppable(d1, {
            scope:"scope1 scope2"
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
    });
	
// --------------------------- / SCOPE -----------------------------------------------

// --------------------------- DRAGGABLE/DROPPABLE -----------------------------------------------
	
	test("make draggable via element", function() {
		var d1 = _add("d1");
		k.draggable(d1);
		ok(d1._katavorioDrag != null, "drag initialized");
	});
	
	test("make draggable via element id", function() {
		var d1 = _add("d1");
		k.draggable("d1");
		ok(d1._katavorioDrag != null, "drag initialized");
	});
	
	test("make draggable via element array", function() {
		var d1 = _add("d1"), d2 = _add("d2");
		k.draggable([d1, d2]);
		ok(d1._katavorioDrag != null, "drag initialized");
		ok(d2._katavorioDrag != null, "drag initialized");
	});
	
	test("make draggable via array of ids", function() {
		var d1 = _add("d1"), d2 = _add("d2");
		k.draggable(["d1", "d2"]);
		ok(d1._katavorioDrag != null, "drag initialized");
		ok(d2._katavorioDrag != null, "drag initialized");
	});
	
	test("make draggable via Node list", function() {
		var d1 = _add("d1"), d2 = _add("d2");
		d1.className = "foo";
		d2.className = "foo";
		k.draggable(document.querySelectorAll(".foo"));
		ok(d1._katavorioDrag != null, "drag initialized");
		ok(d2._katavorioDrag != null, "drag initialized");
	});
	
	test("make droppable via element", function() {
		var d1 = _add("d1");
		k.droppable(d1);
		ok(d1._katavorioDrop != null, "drop initialized");
	});
	
	test("make droppable via element id", function() {
		var d1 = _add("d1");
		k.droppable("d1");
		ok(d1._katavorioDrop != null, "drop initialized");
	});
	
	test("make droppable via element array", function() {
		var d1 = _add("d1"), d2 = _add("d2");
		k.droppable([d1, d2]);
		ok(d1._katavorioDrop != null, "drop initialized");
		ok(d2._katavorioDrop != null, "drop initialized");
	});
	
	test("make droppable via array of ids", function() {
		var d1 = _add("d1"), d2 = _add("d2");
		k.droppable(["d1", "d2"]);
		ok(d1._katavorioDrop != null, "drop initialized");
		ok(d2._katavorioDrop != null, "drop initialized");
	});
	
	test("make droppable via Node list", function() {
		var d1 = _add("d1"), d2 = _add("d2");
		d1.className = "foo";
		d2.className = "foo";
		k.droppable(document.querySelectorAll(".foo"));
		ok(d1._katavorioDrop != null, "drop initialized");
		ok(d2._katavorioDrop != null, "drop initialized");
	});
	
	test("make draggable, non-existent node", function() {
		var f = 0;
		try {
			k.draggable("foo");
		}
		catch (e) {
			f = 1;
		}
		equal(f, 0, "no exception thrown");
	});
	
	test("make draggable, null argument", function() {
		var f = 0;
		try {
			k.draggable(null);
		}
		catch (e) {
			f = 1;
		}
		equal(f, 0, "no exception thrown");
	});
	
	test("make droppable, non-existent node", function() {
		var f = 0;
		try {
			k.droppable("foo");
		}
		catch (e) {
			f = 1;
		}
		equal(f, 0, "no exception thrown");
	});
	
	test("make droppable, null argument", function() {
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

	test("simple drag selection, by element", function() {
		var d1 = _add("d1");
		k.draggable(d1);
		k.select(d1);
		equal(k.getSelection().length, 1, "one element in selection");
	});
	
	test("simple drag selection, by element id", function() {
		var d1 = _add("d1");
		k.draggable(d1);
		k.select("d1");
		equal(k.getSelection().length, 1, "one element in selection");
	});
	
	test("simple drag selection, by element array", function() {
		var d1 = _add("d1"), d2 = _add("d2");
		k.draggable(d1);
		k.draggable(d2);
		k.select([d1,d2]);
		equal(k.getSelection().length, 2, "two elements in selection");
	});
	
	test("simple drag selection, by id array", function() {
		var d1 = _add("d1"), d2 = _add("d2");
		k.draggable(d1);
		k.draggable(d2);
		k.select(["d1","d2"]);
		equal(k.getSelection().length, 2, "two elements in selection");
	});
	
	test("simple drag selection, by Node list", function() {
		var d1 = _add("d1"), d2 = _add("d2");
		k.draggable(d1);
		k.draggable(d2);
		d1.className = "foo";
		d2.className = "foo";
		k.select(document.querySelectorAll(".foo"));
		equal(k.getSelection().length, 2, "two elements in selection");
	});
	
	//ffsfdsafs
	
	test("simple drag deselection, by element", function() {
		var d1 = _add("d1");
		k.draggable(d1);
		k.select(d1);
		equal(k.getSelection().length, 1, "one element in selection");
		k.deselect(d1);
		equal(k.getSelection().length, 0, "zero elements in selection");
	});
	
	test("simple drag deselection, by element id", function() {
		var d1 = _add("d1");
		k.draggable(d1);
		k.select("d1");
		equal(k.getSelection().length, 1, "one element in selection");
		k.deselect("d1");
		equal(k.getSelection().length, 0, "zero elements in selection");
	});
	
	test("simple drag selection, by element array", function() {
		var d1 = _add("d1"), d2 = _add("d2");
		k.draggable(d1);
		k.draggable(d2);
		k.select([d1,d2]);
		equal(k.getSelection().length, 2, "two elements in selection");
		k.deselect([d1,d2]);
		equal(k.getSelection().length, 0, "zero elements in selection");
	});
	
	test("simple drag selection, by id array", function() {
		var d1 = _add("d1"), d2 = _add("d2");
		k.draggable(d1);
		k.draggable(d2);
		k.select(["d1","d2"]);
		equal(k.getSelection().length, 2, "two elements in selection");
		k.deselect(["d1","d2"]);
		equal(k.getSelection().length, 0, "zero elements in selection");
	});
	
	test("simple drag selection, by Node list", function() {
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
	
	test("deselectAll", function() {
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
	
};