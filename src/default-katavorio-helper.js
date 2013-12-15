/*
 default helper for katavorio.
*/

;(function() {
    this.DefaultKatavorioHelper = function() {
        this.addEvent = function( obj, type, fn ) {
            if (obj.addEventListener)
                obj.addEventListener( type, fn, false );
            else if (obj.attachEvent) {
                obj["e"+type+fn] = fn;
                obj[type+fn] = function() { obj["e"+type+fn]( window.event ); }
                obj.attachEvent( "on"+type, obj[type+fn] );
            }
        };
        
        this.removeEvent = function( obj, type, fn ) {
            if (obj.removeEventListener)
                obj.removeEventListener( type, fn, false );
            else if (obj.detachEvent) {
                obj.detachEvent( "on"+type, obj[type+fn] );
                obj[type+fn] = null;
                obj["e"+type+fn] = null;
            }
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
            return [ el.offsetLeft, el.offsetTop ];
        };
        
        this.setPosition = function(el, p) {
            el.style.left = p[0] + "px";
            el.style.top = p[1] + "px";
        };
        
        this.getSize = function(el) {
            return [ el.offsetWidth, el.offsetHeight ];
        };
        
        this.addClass = function(el, c) { el.classList.add(c) };
        this.removeClass = function(el, c) { el.classList.remove(c); };
    };
    
}).call(this);