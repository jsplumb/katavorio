/**
 * @name DefaultKatavorioHelper
 * @classDesc Default helper for Katavorio. Provides methods to get/set class names,  get/set element positions (using absolute
 * coordinates), attach/detach event listeners, and get element sizes.  Also shims the `indexOf` function if it is
 * missing (IE < 9).
 */

;
(function () {
    var support = {
            cl: 'classList' in document.createElement('a'),
            io: 'indexOf' in []
        },
        trim = function (str) {
            return str == null ? null : (str.replace(/^\s\s*/, '').replace(/\s\s*$/, ''));
        },
        _setClassName = function (el, cn) {
            cn = trim(cn);
            if (typeof el.className.baseVal != "undefined") // SVG
                el.className.baseVal = cn;
            else
                el.className = cn;
        },
        _getClassName = function (el) {
            return (typeof el.className.baseVal == "undefined") ? el.className : el.className.baseVal;
        },
        _findWithFunction = function (a, f) {
            if (a)
                for (var i = 0; i < a.length; i++) if (f(a[i])) return i;
            return -1;
        },
        _indexOf = function (l, v) {
            return support.io ? l.indexOf(v) : _findWithFunction(l, function (_v) {
                return _v == v;
            });
        },
        _classManip = function (el, add, clazz) {
            if (support.cl) {
                el.classList[add ? "add" : "remove"].apply(el.classList, clazz.split(/\s+/));
            }
            else {
                var classesToAddOrRemove = clazz.split(/\s+/),
                    className = _getClassName(el),
                    curClasses = className.split(/\s+/);

                for (var i = 0; i < classesToAddOrRemove.length; i++) {
                    if (add) {
                        if (_indexOf(curClasses, classesToAddOrRemove[i]) == -1)
                            curClasses.push(classesToAddOrRemove[i]);
                    }
                    else {
                        var idx = _indexOf(curClasses, classesToAddOrRemove[i]);
                        if (idx != -1)
                            curClasses.splice(idx, 1);
                    }
                }
                _setClassName(el, curClasses.join(" "));
            }
        },
        _each = function (spec, fn) {
            if (spec == null) return;
            if (typeof spec === "string")
                fn(document.getElementById(spec));
            else if (spec.length != null) {
                for (var i = 0; i < spec.length; i++)
                    fn(typeof spec[i] === "string" ? document.getElementById(spec[i]) : spec[i]);
            }
            else
                fn(spec); // assume it's an element.
        };

    /**
     * @name DefaultKatavorioHelper#constructor
     * @desc Constructor for DefaultKatavorioHelper.  Takes no parameters.
     * @function
     */
    this.DefaultKatavorioHelper = function () {

        this.addEvent = function (obj, type, fn) {
            if (obj.addEventListener)
                obj.addEventListener(type, fn, false);
            else if (obj.attachEvent) {
                obj["e" + type + fn] = fn;
                obj[type + fn] = function () {
                    obj["e" + type + fn](window.event);
                };
                obj.attachEvent("on" + type, obj[type + fn]);
            }
        };

        this.removeEvent = function (obj, type, fn) {
            if (obj.removeEventListener)
                obj.removeEventListener(type, fn, false);
            else if (obj.detachEvent) {
                obj.detachEvent("on" + type, obj[type + fn]);
                obj[type + fn] = null;
                obj["e" + type + fn] = null;
            }
        };

        this.intersects = function (r1, r2) {
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

        this.getPosition = function (el) {
            return [ el.offsetLeft, el.offsetTop ];
        };

        this.setPosition = function (el, p) {
            el.style.left = p[0] + "px";
            el.style.top = p[1] + "px";
        };

        this.getSize = function (el) {
            return [ el.offsetWidth, el.offsetHeight ];
        };

        this.addClass = function (el, c) {
            _each(el, function (e) {
                _classManip(e, true, c);
            });
        };

        this.removeClass = function (el, c) {
            _each(el, function (e) {
                _classManip(e, false, c);
            });
        };

        this.indexOf = _indexOf;
    };

    // thanks MDC
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FGlobal_Objects%2FFunction%2Fbind
    if (!Function.prototype.bind) {
        Function.prototype.bind = function (oThis) {
            if (typeof this !== "function") {
                // closest thing possible to the ECMAScript 5 internal IsCallable function
                throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
            }

            var aArgs = Array.prototype.slice.call(arguments, 1),
                fToBind = this,
                fNOP = function () {
                },
                fBound = function () {
                    return fToBind.apply(this instanceof fNOP && oThis ? this : oThis,
                        aArgs.concat(Array.prototype.slice.call(arguments)));
                };

            fNOP.prototype = this.prototype;
            fBound.prototype = new fNOP();

            return fBound;
        };
    }

}).call(this);