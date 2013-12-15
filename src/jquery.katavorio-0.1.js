/**
* jquery wrapper around katavorio drag manager.

 EXPERIMENTAL: does not fully work yet.

*/
;(function() {
    var jQueryKatavorioHelper = function() {
        this.addEvent = function( obj, type, fn ) {
            $(obj).on(type, fn);
        };
        
        this.removeEvent = function( obj, type, fn ) {
            $(obj).off(type, fn);
        };
        
        this.intersects = function(r1, r2) {
            var x1 = r1.x, x2 = r1.x + r1.w, y1 = r1.y, y2 = r1.y + r1.h,
                a1 = r2.x, a2 = r2.x + r2.w, b1 = r2.y, b2 = r2.y + r2.h;
        
            return  ( (x1 <= a1 && a1 <= x2) && (y1 <= b1 && b1 <= y2) ) ||
                    ( (x1 <= a2 && a2 <= x2) && (y1 <= b1 && b1 <= y2) ) ||
                    ( (x1 <= a1 && a1 <= x2) && (y1 <= b2 && b2 <= y2) ) ||
                    ( (x1 <= a2 && a1 <= x2) && (y1 <= b2 && b2 <= y2) ) ||        
                    ( (a1 <= x1 && x1 <= a2) && (b1 <= y1 && y1 <= b2) ) ||
                    ( (a1 <= x2 && x2 <= a2) && (b1 <= y1 && y1 <= b2) ) ||
                    ( (a1 <= x1 && x1 <= a2) && (b1 <= y2 && y2 <= b2) ) ||
                    ( (a1 <= x2 && x1 <= a2) && (b1 <= y2 && y2 <= b2) );
        };
        
        this.getPosition = function(el) {
            var o = $(el).offset();
            return [ o.left, o.top ];
        };
        
        this.setPosition = function(el, p) {
            $(el).offset({left:p[0], top:p[1]});
        };
        
        this.getSize = function(el) {
            el = $(el);
            return [ el.outerWidth(), el.outerHeight() ];
        };
        
        this.addClass = function(el, c) { $(el).addClass(c); };
        this.removeClass = function(el, c) { $(el).removeClass(c); };
    };
    
    this.jQueryKatavorio = function(params) {
        var jqkh = new jQueryKatavorioHelper();
        var p = {
            getPosition:jqkh.getPosition,
            getSize:jqkh.getSize,
            setPosition:jqkh.setPosition,
            addClass:jqkh.addClass,
            removeClass:jqkh.removeClass,
            bind:jqkh.addEvent,
            unbind:jqkh.removeEvent,
            intersects:jqkh.intersects,
            fireEvent:function() {
                console.log(arguments);
            }
        };
        $.extend(p, params);
        return new Katavorio(p);        
    };
    
    // plugin stuff would go here.
    
}).call(this);