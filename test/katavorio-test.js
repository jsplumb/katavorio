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
    
    test("change scope of draggable, via katavorio instance, on element", function() {
        var d1 = _add("d1");
        var d = k.draggable(d1, {
            scope:"scope1 scope2"
        });
        equal(d.scopes.length, 2, "2 scopes");
		equal(d.scopes[0], "scope1");
		equal(d.scopes[1], "scope2");
		
		equal(k.getDragsForScope("scope1").length, 1, "1 drag for scope1");
		equal(k.getDragsForScope("scope2").length, 1, "1 drag for scope2");
		
		k.setScope(d1, "scope3 scope4");
		equal(d.scopes.length, 2, "2 scopes");
		equal(d.scopes[0], "scope3");
		equal(d.scopes[1], "scope4");
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
        equal(d.scopes.length, 2, "2 scopes");
		equal(d.scopes[0], "scope1");
		equal(d.scopes[1], "scope2");
		
		equal(k.getDropsForScope("scope1").length, 1, "1 dopr for scope1");
		equal(k.getDropsForScope("scope2").length, 1, "1 drop for scope2");
		
		k.setScope(d1, "scope3 scope4");
		equal(d.scopes.length, 2, "2 scopes");
		equal(d.scopes[0], "scope3");
		equal(d.scopes[1], "scope4");
		equal(k.getDropsForScope("scope1").length, 0, "0 drops for scope1");
		equal(k.getDropsForScope("scope2").length, 0, "0 drops for scope2");
		equal(k.getDropsForScope("scope3").length, 1, "1 drop for scope3");
		equal(k.getDropsForScope("scope4").length, 1, "1 drop for scope4");
		
		k.setDropScope(d1, "scope5");
		equal(k.getDropsForScope("scope3").length, 0, "0 drops for scope3");
		equal(k.getDropsForScope("scope4").length, 0, "0 drops for scope4");
		equal(k.getDropsForScope("scope5").length, 1, "1 drop for scope5");
    });
	
	
	
};