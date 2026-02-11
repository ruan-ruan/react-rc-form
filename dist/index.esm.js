import Fe, { createContext as Rr, useRef as me, useContext as _r, forwardRef as wr, useEffect as J, useImperativeHandle as Tr, useMemo as ye, useState as be } from "react";
var Ee = { exports: {} }, H = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Le;
function Cr() {
  if (Le)
    return H;
  Le = 1;
  var t = Fe, a = Symbol.for("react.element"), o = Symbol.for("react.fragment"), s = Object.prototype.hasOwnProperty, i = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, u = { key: !0, ref: !0, __self: !0, __source: !0 };
  function w(m, l, y) {
    var v, R = {}, j = null, T = null;
    y !== void 0 && (j = "" + y), l.key !== void 0 && (j = "" + l.key), l.ref !== void 0 && (T = l.ref);
    for (v in l)
      s.call(l, v) && !u.hasOwnProperty(v) && (R[v] = l[v]);
    if (m && m.defaultProps)
      for (v in l = m.defaultProps, l)
        R[v] === void 0 && (R[v] = l[v]);
    return { $$typeof: a, type: m, key: j, ref: T, props: R, _owner: i.current };
  }
  return H.Fragment = o, H.jsx = w, H.jsxs = w, H;
}
var Z = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ue;
function Sr() {
  return Ue || (Ue = 1, process.env.NODE_ENV !== "production" && function() {
    var t = Fe, a = Symbol.for("react.element"), o = Symbol.for("react.portal"), s = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), u = Symbol.for("react.profiler"), w = Symbol.for("react.provider"), m = Symbol.for("react.context"), l = Symbol.for("react.forward_ref"), y = Symbol.for("react.suspense"), v = Symbol.for("react.suspense_list"), R = Symbol.for("react.memo"), j = Symbol.for("react.lazy"), T = Symbol.for("react.offscreen"), O = Symbol.iterator, k = "@@iterator";
    function A(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = O && e[O] || e[k];
      return typeof r == "function" ? r : null;
    }
    var V = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function _(e) {
      {
        for (var r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), f = 1; f < r; f++)
          n[f - 1] = arguments[f];
        g("error", e, n);
      }
    }
    function g(e, r, n) {
      {
        var f = V.ReactDebugCurrentFrame, F = f.getStackAddendum();
        F !== "" && (r += "%s", n = n.concat([F]));
        var C = n.map(function(p) {
          return String(p);
        });
        C.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, C);
      }
    }
    var b = !1, I = !1, M = !1, Q = !1, ee = !1, ie;
    ie = Symbol.for("react.module.reference");
    function c(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === s || e === u || ee || e === i || e === y || e === v || Q || e === T || b || I || M || typeof e == "object" && e !== null && (e.$$typeof === j || e.$$typeof === R || e.$$typeof === w || e.$$typeof === m || e.$$typeof === l || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === ie || e.getModuleId !== void 0));
    }
    function d(e, r, n) {
      var f = e.displayName;
      if (f)
        return f;
      var F = r.displayName || r.name || "";
      return F !== "" ? n + "(" + F + ")" : n;
    }
    function E(e) {
      return e.displayName || "Context";
    }
    function S(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && _("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case s:
          return "Fragment";
        case o:
          return "Portal";
        case u:
          return "Profiler";
        case i:
          return "StrictMode";
        case y:
          return "Suspense";
        case v:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case m:
            var r = e;
            return E(r) + ".Consumer";
          case w:
            var n = e;
            return E(n._context) + ".Provider";
          case l:
            return d(e, e.render, "ForwardRef");
          case R:
            var f = e.displayName || null;
            return f !== null ? f : S(e.type) || "Memo";
          case j: {
            var F = e, C = F._payload, p = F._init;
            try {
              return S(p(C));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var W = Object.assign, L = 0, U, Re, _e, we, Te, Ce, Se;
    function Oe() {
    }
    Oe.__reactDisabledLog = !0;
    function Ge() {
      {
        if (L === 0) {
          U = console.log, Re = console.info, _e = console.warn, we = console.error, Te = console.group, Ce = console.groupCollapsed, Se = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: Oe,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        L++;
      }
    }
    function Xe() {
      {
        if (L--, L === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: W({}, e, {
              value: U
            }),
            info: W({}, e, {
              value: Re
            }),
            warn: W({}, e, {
              value: _e
            }),
            error: W({}, e, {
              value: we
            }),
            group: W({}, e, {
              value: Te
            }),
            groupCollapsed: W({}, e, {
              value: Ce
            }),
            groupEnd: W({}, e, {
              value: Se
            })
          });
        }
        L < 0 && _("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var se = V.ReactCurrentDispatcher, le;
    function re(e, r, n) {
      {
        if (le === void 0)
          try {
            throw Error();
          } catch (F) {
            var f = F.stack.trim().match(/\n( *(at )?)/);
            le = f && f[1] || "";
          }
        return `
` + le + e;
      }
    }
    var ue = !1, te;
    {
      var He = typeof WeakMap == "function" ? WeakMap : Map;
      te = new He();
    }
    function je(e, r) {
      if (!e || ue)
        return "";
      {
        var n = te.get(e);
        if (n !== void 0)
          return n;
      }
      var f;
      ue = !0;
      var F = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var C;
      C = se.current, se.current = null, Ge();
      try {
        if (r) {
          var p = function() {
            throw Error();
          };
          if (Object.defineProperty(p.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(p, []);
            } catch (D) {
              f = D;
            }
            Reflect.construct(e, [], p);
          } else {
            try {
              p.call();
            } catch (D) {
              f = D;
            }
            e.call(p.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (D) {
            f = D;
          }
          e();
        }
      } catch (D) {
        if (D && f && typeof D.stack == "string") {
          for (var h = D.stack.split(`
`), $ = f.stack.split(`
`), P = h.length - 1, x = $.length - 1; P >= 1 && x >= 0 && h[P] !== $[x]; )
            x--;
          for (; P >= 1 && x >= 0; P--, x--)
            if (h[P] !== $[x]) {
              if (P !== 1 || x !== 1)
                do
                  if (P--, x--, x < 0 || h[P] !== $[x]) {
                    var z = `
` + h[P].replace(" at new ", " at ");
                    return e.displayName && z.includes("<anonymous>") && (z = z.replace("<anonymous>", e.displayName)), typeof e == "function" && te.set(e, z), z;
                  }
                while (P >= 1 && x >= 0);
              break;
            }
        }
      } finally {
        ue = !1, se.current = C, Xe(), Error.prepareStackTrace = F;
      }
      var K = e ? e.displayName || e.name : "", B = K ? re(K) : "";
      return typeof e == "function" && te.set(e, B), B;
    }
    function Ze(e, r, n) {
      return je(e, !1);
    }
    function Qe(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function ne(e, r, n) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return je(e, Qe(e));
      if (typeof e == "string")
        return re(e);
      switch (e) {
        case y:
          return re("Suspense");
        case v:
          return re("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case l:
            return Ze(e.render);
          case R:
            return ne(e.type, r, n);
          case j: {
            var f = e, F = f._payload, C = f._init;
            try {
              return ne(C(F), r, n);
            } catch {
            }
          }
        }
      return "";
    }
    var G = Object.prototype.hasOwnProperty, Pe = {}, ke = V.ReactDebugCurrentFrame;
    function ae(e) {
      if (e) {
        var r = e._owner, n = ne(e.type, e._source, r ? r.type : null);
        ke.setExtraStackFrame(n);
      } else
        ke.setExtraStackFrame(null);
    }
    function er(e, r, n, f, F) {
      {
        var C = Function.call.bind(G);
        for (var p in e)
          if (C(e, p)) {
            var h = void 0;
            try {
              if (typeof e[p] != "function") {
                var $ = Error((f || "React class") + ": " + n + " type `" + p + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[p] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw $.name = "Invariant Violation", $;
              }
              h = e[p](r, p, f, n, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (P) {
              h = P;
            }
            h && !(h instanceof Error) && (ae(F), _("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", f || "React class", n, p, typeof h), ae(null)), h instanceof Error && !(h.message in Pe) && (Pe[h.message] = !0, ae(F), _("Failed %s type: %s", n, h.message), ae(null));
          }
      }
    }
    var rr = Array.isArray;
    function ce(e) {
      return rr(e);
    }
    function tr(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, n = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return n;
      }
    }
    function nr(e) {
      try {
        return xe(e), !1;
      } catch {
        return !0;
      }
    }
    function xe(e) {
      return "" + e;
    }
    function Ve(e) {
      if (nr(e))
        return _("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", tr(e)), xe(e);
    }
    var X = V.ReactCurrentOwner, ar = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Ae, $e, fe;
    fe = {};
    function or(e) {
      if (G.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function ir(e) {
      if (G.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function sr(e, r) {
      if (typeof e.ref == "string" && X.current && r && X.current.stateNode !== r) {
        var n = S(X.current.type);
        fe[n] || (_('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', S(X.current.type), e.ref), fe[n] = !0);
      }
    }
    function lr(e, r) {
      {
        var n = function() {
          Ae || (Ae = !0, _("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        n.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: n,
          configurable: !0
        });
      }
    }
    function ur(e, r) {
      {
        var n = function() {
          $e || ($e = !0, _("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        n.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: n,
          configurable: !0
        });
      }
    }
    var cr = function(e, r, n, f, F, C, p) {
      var h = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: a,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: n,
        props: p,
        // Record the component responsible for creating this element.
        _owner: C
      };
      return h._store = {}, Object.defineProperty(h._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(h, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: f
      }), Object.defineProperty(h, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: F
      }), Object.freeze && (Object.freeze(h.props), Object.freeze(h)), h;
    };
    function fr(e, r, n, f, F) {
      {
        var C, p = {}, h = null, $ = null;
        n !== void 0 && (Ve(n), h = "" + n), ir(r) && (Ve(r.key), h = "" + r.key), or(r) && ($ = r.ref, sr(r, F));
        for (C in r)
          G.call(r, C) && !ar.hasOwnProperty(C) && (p[C] = r[C]);
        if (e && e.defaultProps) {
          var P = e.defaultProps;
          for (C in P)
            p[C] === void 0 && (p[C] = P[C]);
        }
        if (h || $) {
          var x = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          h && lr(p, x), $ && ur(p, x);
        }
        return cr(e, h, $, F, f, X.current, p);
      }
    }
    var de = V.ReactCurrentOwner, De = V.ReactDebugCurrentFrame;
    function q(e) {
      if (e) {
        var r = e._owner, n = ne(e.type, e._source, r ? r.type : null);
        De.setExtraStackFrame(n);
      } else
        De.setExtraStackFrame(null);
    }
    var ve;
    ve = !1;
    function he(e) {
      return typeof e == "object" && e !== null && e.$$typeof === a;
    }
    function Ne() {
      {
        if (de.current) {
          var e = S(de.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function dr(e) {
      {
        if (e !== void 0) {
          var r = e.fileName.replace(/^.*[\\\/]/, ""), n = e.lineNumber;
          return `

Check your code at ` + r + ":" + n + ".";
        }
        return "";
      }
    }
    var Ie = {};
    function vr(e) {
      {
        var r = Ne();
        if (!r) {
          var n = typeof e == "string" ? e : e.displayName || e.name;
          n && (r = `

Check the top-level render call using <` + n + ">.");
        }
        return r;
      }
    }
    function We(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var n = vr(r);
        if (Ie[n])
          return;
        Ie[n] = !0;
        var f = "";
        e && e._owner && e._owner !== de.current && (f = " It was passed a child from " + S(e._owner.type) + "."), q(e), _('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', n, f), q(null);
      }
    }
    function ze(e, r) {
      {
        if (typeof e != "object")
          return;
        if (ce(e))
          for (var n = 0; n < e.length; n++) {
            var f = e[n];
            he(f) && We(f, r);
          }
        else if (he(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var F = A(e);
          if (typeof F == "function" && F !== e.entries)
            for (var C = F.call(e), p; !(p = C.next()).done; )
              he(p.value) && We(p.value, r);
        }
      }
    }
    function hr(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var n;
        if (typeof r == "function")
          n = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === l || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === R))
          n = r.propTypes;
        else
          return;
        if (n) {
          var f = S(r);
          er(n, e.props, "prop", f, e);
        } else if (r.PropTypes !== void 0 && !ve) {
          ve = !0;
          var F = S(r);
          _("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", F || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && _("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function pr(e) {
      {
        for (var r = Object.keys(e.props), n = 0; n < r.length; n++) {
          var f = r[n];
          if (f !== "children" && f !== "key") {
            q(e), _("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", f), q(null);
            break;
          }
        }
        e.ref !== null && (q(e), _("Invalid attribute `ref` supplied to `React.Fragment`."), q(null));
      }
    }
    var Ye = {};
    function Me(e, r, n, f, F, C) {
      {
        var p = c(e);
        if (!p) {
          var h = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (h += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var $ = dr(F);
          $ ? h += $ : h += Ne();
          var P;
          e === null ? P = "null" : ce(e) ? P = "array" : e !== void 0 && e.$$typeof === a ? (P = "<" + (S(e.type) || "Unknown") + " />", h = " Did you accidentally export a JSX literal instead of a component?") : P = typeof e, _("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", P, h);
        }
        var x = fr(e, r, n, F, C);
        if (x == null)
          return x;
        if (p) {
          var z = r.children;
          if (z !== void 0)
            if (f)
              if (ce(z)) {
                for (var K = 0; K < z.length; K++)
                  ze(z[K], e);
                Object.freeze && Object.freeze(z);
              } else
                _("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              ze(z, e);
        }
        if (G.call(r, "key")) {
          var B = S(e), D = Object.keys(r).filter(function(Fr) {
            return Fr !== "key";
          }), pe = D.length > 0 ? "{key: someKey, " + D.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Ye[B + pe]) {
            var Er = D.length > 0 ? "{" + D.join(": ..., ") + ": ...}" : "{}";
            _(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, pe, B, Er, B), Ye[B + pe] = !0;
          }
        }
        return e === s ? pr(x) : hr(x), x;
      }
    }
    function gr(e, r, n) {
      return Me(e, r, n, !0);
    }
    function mr(e, r, n) {
      return Me(e, r, n, !1);
    }
    var yr = mr, br = gr;
    Z.Fragment = s, Z.jsx = yr, Z.jsxs = br;
  }()), Z;
}
process.env.NODE_ENV === "production" ? Ee.exports = Cr() : Ee.exports = Sr();
var Y = Ee.exports;
function N(t) {
  return typeof t == "string" ? t.split(".").flatMap((a) => {
    const o = a.match(/^([^\[]+)\[(\d+)\]$/);
    return o ? [o[1], parseInt(o[2], 10)] : [a];
  }) : typeof t == "number" ? [t] : t;
}
function ge(t, a) {
  const o = N(a);
  if (!t || o.length === 0)
    return t ?? void 0;
  let s = t;
  for (let i = 0; i < o.length; i++) {
    const u = o[i];
    if (s == null)
      return;
    s = s[u];
  }
  return s;
}
function oe(t, a, o) {
  const s = N(a);
  if (s.length === 0)
    return o;
  const i = Array.isArray(t) ? [...t] : { ...t };
  let u = i;
  for (let m = 0; m < s.length - 1; m++) {
    const l = s[m];
    if (u[l] == null) {
      const y = s[m + 1];
      u[l] = typeof y == "number" ? [] : {};
    } else
      u[l] = Array.isArray(u[l]) ? [...u[l]] : { ...u[l] };
    u = u[l];
  }
  const w = s[s.length - 1];
  return u[w] = o, i;
}
async function Je(t, a, o) {
  const s = [];
  for (const i of a)
    try {
      await Or(t, i, o);
    } catch (u) {
      u instanceof Error && s.push(u.message);
    }
  return s;
}
async function Or(t, a, o) {
  const { required: s, message: i, pattern: u, validator: w, min: m, max: l, len: y, type: v } = a;
  if (s && (t == null || t === ""))
    throw new Error(i || `${o} is required`);
  if (!(t == null || t === "")) {
    if (u && !u.test(t))
      throw new Error(i || `${o} does not match pattern`);
    if (v) {
      const R = jr(t, v, i || `${o} is not a valid ${v}`);
      if (R)
        throw new Error(R);
    }
    if (m !== void 0) {
      if (typeof t == "string" || Array.isArray(t)) {
        if (t.length < m)
          throw new Error(i || `${o} must be at least ${m} characters`);
      } else if (typeof t == "number" && t < m)
        throw new Error(i || `${o} must be at least ${m}`);
    }
    if (l !== void 0) {
      if (typeof t == "string" || Array.isArray(t)) {
        if (t.length > l)
          throw new Error(i || `${o} must be at most ${l} characters`);
      } else if (typeof t == "number" && t > l)
        throw new Error(i || `${o} must be at most ${l}`);
    }
    if (y !== void 0 && (typeof t == "string" || Array.isArray(t)) && t.length !== y)
      throw new Error(i || `${o} must be exactly ${y} characters`);
    w && await w(a, t);
  }
}
function jr(t, a, o) {
  switch (a) {
    case "string":
      if (typeof t != "string")
        return o;
      break;
    case "number":
      if (typeof t != "number")
        return o;
      break;
    case "boolean":
      if (typeof t != "boolean")
        return o;
      break;
    case "array":
      if (!Array.isArray(t))
        return o;
      break;
    case "object":
      if (typeof t != "object" || Array.isArray(t))
        return o;
      break;
    case "email":
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t))
        return o;
      break;
    case "url":
      try {
        new URL(t);
      } catch {
        return o;
      }
      break;
  }
  return null;
}
const Be = Rr(null), Pr = () => {
  const t = me();
  if (!t.current) {
    const a = kr();
    t.current = a;
  }
  return [t.current];
};
function kr(t) {
  let a = t ? JSON.parse(JSON.stringify(t)) : {}, o = {}, s = {}, i = /* @__PURE__ */ new Map(), u = {};
  const w = (c) => ge(a, c), m = (c) => {
    if (!c || c.length === 0)
      return JSON.parse(JSON.stringify(a));
    const d = {};
    return c.forEach((E) => {
      const S = N(E).join(".");
      d[S] = ge(a, E);
    }), d;
  }, l = (c, d) => {
    const E = N(c).join(".");
    a = oe(a, c, d);
    const S = oe({}, c, d);
    u.onValuesChange && u.onValuesChange(S, a), b(E, { value: d });
  }, y = (c) => {
    Object.keys(c).forEach((d) => {
      a = oe(a, d, c[d]);
    }), u.onValuesChange && u.onValuesChange(c, a);
  }, v = (c) => {
    const d = N(c).join(".");
    return o[d] || [];
  }, R = (c) => !c || c.length === 0 ? Object.keys(o).map((d) => ({
    name: d.split("."),
    errors: o[d]
  })) : c.map((d) => ({
    name: d,
    errors: v(d)
  })), j = (c, d) => {
    const E = N(c).join(".");
    o[E] = Array.isArray(d) ? d : [d], b(E, { error: o[E][0] });
  }, T = (c) => {
    c.forEach(({ name: d, errors: E }) => {
      const S = N(d).join(".");
      o[S] = E, b(S, { error: E[0] });
    });
  }, O = (c) => {
    const d = N(c).join(".");
    return s[d] || !1;
  }, k = (c) => {
    if (!c || c.length === 0)
      return { ...s };
    const d = {};
    return c.forEach((E) => {
      const S = N(E).join(".");
      d[S] = s[S] || !1;
    }), d;
  }, A = (c, d) => {
    const E = N(c).join(".");
    s[E] = d, b(E, { touched: d });
  }, V = (c) => {
    !c || c.length === 0 ? (a = t ? JSON.parse(JSON.stringify(t)) : {}, o = {}, s = {}, i.clear()) : c.forEach((d) => {
      const E = N(d).join("."), S = ge(t, d);
      a = oe(a, d, S), delete o[E], delete s[E], i.delete(E);
    });
  }, _ = async (c) => {
    const d = c || Object.keys(i), E = [];
    for (const S of d) {
      const W = N(S).join("."), L = i.get(W);
      if (L && L.rules)
        try {
          const U = await Je(L.value, L.rules, W);
          U.length > 0 ? (E.push({ name: S, errors: U }), j(S, U)) : (delete o[W], b(W, { error: void 0 }));
        } catch (U) {
          console.error("Validation error:", U);
        }
    }
    if (E.length > 0)
      throw u.onFinishFailed && u.onFinishFailed({
        values: a,
        errorFields: E,
        outOfDate: !1
      }), E;
    return a;
  }, g = () => {
    _().then((c) => {
      u.onFinish && u.onFinish(c);
    }).catch((c) => {
      console.error("Form submission error:", c);
    });
  }, b = (c, d) => {
    const E = i.get(c);
    E && i.set(c, { ...E, ...d });
  };
  return {
    ...{
      getFieldValue: w,
      getFieldsValue: m,
      setFieldValue: l,
      setFieldsValue: y,
      getFieldError: v,
      getFieldsError: R,
      setFieldError: j,
      setFieldsError: T,
      getFieldTouched: O,
      getFieldsTouched: k,
      setFieldTouched: A,
      resetFields: V,
      validateFields: _,
      submit: g
    },
    registerField: (c, d) => {
      i.set(c, d);
    },
    unregisterField: (c) => {
      i.delete(c);
    },
    setCallbacks: (c) => {
      u = { ...u, ...c };
    }
  };
}
const xr = Be.Provider, qe = () => {
  const t = _r(Be);
  if (!t)
    throw new Error("FormInstance is not available. Make sure you are using Field inside Form.");
  return t;
}, Vr = wr((t, a) => {
  const { form: o, initialValues: s, onFinish: i, onFinishFailed: u, onValuesChange: w, children: m } = t, [l] = Pr(), y = o || l;
  J(() => {
    y.setCallbacks({
      onFinish: i,
      onFinishFailed: u,
      onValuesChange: w
    });
  }, [y, i, u, w]), J(() => {
    s && !o && y.setFieldsValue(s);
  }, [y, s, o]), Tr(a, () => y);
  const v = ye(() => y, [y]);
  return /* @__PURE__ */ Y.jsx(xr, { value: v, children: /* @__PURE__ */ Y.jsx(
    "form",
    {
      onSubmit: (R) => {
        R.preventDefault(), y.submit();
      },
      children: m
    }
  ) });
});
Vr.displayName = "Form";
const Ke = (t) => {
  const { name: a, children: o, rules: s, trigger: i = "onChange", validateTrigger: u = i, shouldUpdate: w, dependencies: m } = t, l = qe(), y = ye(() => N(a).join("."), [a]), [v, R] = be({
    value: void 0,
    touched: !1,
    error: void 0,
    validating: !1
  });
  J(() => {
    const g = l.getFieldValue(a);
    R({
      value: g,
      touched: !1,
      error: void 0,
      validating: !1
    });
  }, [l, a]);
  const j = me(!0), T = me(l.getFieldsValue());
  J(() => {
    if (j.current)
      return l.registerField(y, { ...v, rules: s }), () => {
        j.current && l.unregisterField(y);
      };
  }, [y, v, s]), J(() => {
    if (!j.current)
      return;
    const g = l.getFieldValue(a);
    g !== v.value && R((b) => ({ ...b, value: g }));
  }, [l, a]);
  const O = (g) => {
    var I;
    const b = ((I = g == null ? void 0 : g.target) == null ? void 0 : I.value) ?? g;
    R((M) => ({ ...M, value: b, touched: !0 })), l.setFieldValue(a, b), l.setFieldTouched(a, !0), u && (Array.isArray(u) ? u : [u]).includes(i) && k(b);
  }, k = async (g = v.value) => {
    if (!s || s.length === 0) {
      R((b) => ({ ...b, error: void 0, validating: !1 }));
      return;
    }
    R((b) => ({ ...b, validating: !0 }));
    try {
      const b = await Je(g, s, y), I = b.length > 0 ? b[0] : void 0;
      j.current && (R((M) => ({ ...M, error: I, validating: !1 })), l.setFieldError(a, b));
    } catch {
      j.current && R((I) => ({ ...I, validating: !1 }));
    }
  }, A = {
    [i]: O,
    value: v.value
  }, V = {
    value: v.value,
    touched: v.touched,
    error: v.error,
    validating: v.validating
  }, _ = ye(() => {
    if (w === !0)
      return !0;
    if (typeof w == "function") {
      const g = T.current, b = l.getFieldsValue(), I = w(g, b);
      return T.current = b, I;
    }
    if (m && m.length > 0) {
      const g = l.getFieldsValue(), b = T.current, I = m.some((M) => {
        const Q = l.getFieldValue(M), ee = Ar(b, M);
        return Q !== ee;
      });
      return T.current = g, I;
    }
    return !0;
  }, [w, m, l]);
  return J(() => {
    if (!j.current)
      return;
    const g = l.getFieldValue(a);
    g !== v.value && R((b) => ({ ...b, value: g }));
  }, [l, a, v.value]), _ ? typeof o == "function" ? o(A, V) : o : null;
};
function Ar(t, a) {
  const o = N(a);
  if (!t || o.length === 0)
    return t;
  let s = t;
  for (let i = 0; i < o.length; i++) {
    const u = o[i];
    if (s == null)
      return;
    s = s[u];
  }
  return s;
}
Ke.displayName = "Field";
const $r = (t) => {
  const { name: a, label: o, extra: s, help: i, required: u, style: w, className: m, children: l, ...y } = t;
  return /* @__PURE__ */ Y.jsx(Ke, { name: a, ...y, children: (v, R) => {
    const { error: j } = R;
    return /* @__PURE__ */ Y.jsxs("div", { style: w, className: m, children: [
      o && /* @__PURE__ */ Y.jsxs("label", { style: { display: "block", marginBottom: 8 }, children: [
        u && /* @__PURE__ */ Y.jsx("span", { style: { color: "#ff4d4f", marginRight: 4 }, children: "*" }),
        o
      ] }),
      typeof l == "function" ? l(v, R) : Fe.cloneElement(l, v),
      (j || i || s) && /* @__PURE__ */ Y.jsxs("div", { style: { marginTop: 4 }, children: [
        j && /* @__PURE__ */ Y.jsx("div", { style: { color: "#ff4d4f", fontSize: 12 }, children: j }),
        i && /* @__PURE__ */ Y.jsx("div", { style: { fontSize: 12 }, children: i }),
        s && /* @__PURE__ */ Y.jsx("div", { style: { fontSize: 12, color: "#888" }, children: s })
      ] })
    ] });
  } });
};
$r.displayName = "FormItem";
const Dr = (t) => {
  const { name: a, children: o, initialValue: s = [] } = t, i = qe(), [u, w] = be(() => (i.getFieldValue(a) || s).map((O, k) => ({ key: k, name: k }))), [m] = be([]);
  J(() => {
    const T = i.getFieldValue(a);
    (!T || T.length === 0) && i.setFieldValue(a, s);
  }, []), J(() => {
    const O = (i.getFieldValue(a) || s).map((k, A) => ({ key: A, name: A }));
    w(O);
  }, [i, a, s]);
  const R = {
    add: (T = {}, O) => {
      const k = i.getFieldValue(a) || [], A = { key: Date.now(), name: O ?? k.length };
      let V;
      if (O !== void 0) {
        V = [
          ...k.slice(0, O),
          T,
          ...k.slice(O)
        ];
        const _ = [
          ...u.slice(0, O),
          A,
          ...u.slice(O).map((g) => ({ ...g, name: g.name + 1 }))
        ];
        w(_);
      } else
        V = [...k, T], w([...u, A]);
      i.setFieldValue(a, V);
    },
    remove: (T) => {
      const O = Array.isArray(T) ? T : [T], k = i.getFieldValue(a) || [], A = [...O].sort((g, b) => b - g);
      let V = [...k];
      A.forEach((g) => {
        V.splice(g, 1);
      });
      const _ = u.filter((g) => !O.includes(g.name));
      w(_), i.setFieldValue(a, V);
    },
    move: (T, O) => {
      const k = i.getFieldValue(a) || [];
      if (T < 0 || T >= k.length || O < 0 || O >= k.length)
        return;
      const A = [...k], [V] = A.splice(T, 1);
      A.splice(O, 0, V);
      const _ = [...u], [g] = _.splice(T, 1);
      _.splice(O, 0, g), w(_), i.setFieldValue(a, A);
    }
  }, j = {
    errors: m
  };
  return /* @__PURE__ */ Y.jsx(Y.Fragment, { children: o(u, R, j) });
};
Dr.displayName = "FormList";
export {
  Ke as Field,
  Vr as Form,
  $r as FormItem,
  Dr as FormList,
  Pr as useForm,
  qe as useFormContext
};
