#!/usr/bin/env bun
// @bun
var __create = Object.create;
var __getProtoOf = Object.getPrototypeOf;
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
	target = mod != null ? __create(__getProtoOf(mod)) : {};
	const to =
		isNodeMode || !mod || !mod.__esModule
			? __defProp(target, "default", { value: mod, enumerable: true })
			: target;
	for (const key of __getOwnPropNames(mod))
		if (!__hasOwnProp.call(to, key))
			__defProp(to, key, {
				get: () => mod[key],
				enumerable: true,
			});
	return to;
};
var __moduleCache = /* @__PURE__ */ new WeakMap();
var __toCommonJS = (from) => {
	var entry = __moduleCache.get(from),
		desc;
	if (entry) return entry;
	entry = __defProp({}, "__esModule", { value: true });
	if ((from && typeof from === "object") || typeof from === "function")
		__getOwnPropNames(from).map(
			(key) =>
				!__hasOwnProp.call(entry, key) &&
				__defProp(entry, key, {
					get: () => from[key],
					enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
				}),
		);
	__moduleCache.set(from, entry);
	return entry;
};
var __commonJS = (cb, mod) => () => (
	mod || cb((mod = { exports: {} }).exports, mod), mod.exports
);
var __export = (target, all) => {
	for (var name in all)
		__defProp(target, name, {
			get: all[name],
			enumerable: true,
			configurable: true,
			set: (newValue) => (all[name] = () => newValue),
		});
};
var __esm = (fn, res) => () => (fn && (res = fn((fn = 0))), res);
var __require = /* @__PURE__ */ ((x) =>
	typeof require !== "undefined"
		? require
		: typeof Proxy !== "undefined"
			? new Proxy(x, {
					get: (a, b) => (typeof require !== "undefined" ? require : a)[b],
				})
			: x)(function (x) {
	if (typeof require !== "undefined") return require.apply(this, arguments);
	throw Error('Dynamic require of "' + x + '" is not supported');
});

// node_modules/commander/lib/error.js
var require_error = __commonJS((exports) => {
	class CommanderError extends Error {
		constructor(exitCode, code, message) {
			super(message);
			Error.captureStackTrace(this, this.constructor);
			this.name = this.constructor.name;
			this.code = code;
			this.exitCode = exitCode;
			this.nestedError = undefined;
		}
	}

	class InvalidArgumentError extends CommanderError {
		constructor(message) {
			super(1, "commander.invalidArgument", message);
			Error.captureStackTrace(this, this.constructor);
			this.name = this.constructor.name;
		}
	}
	exports.CommanderError = CommanderError;
	exports.InvalidArgumentError = InvalidArgumentError;
});

// node_modules/commander/lib/argument.js
var require_argument = __commonJS((exports) => {
	var { InvalidArgumentError } = require_error();

	class Argument {
		constructor(name, description) {
			this.description = description || "";
			this.variadic = false;
			this.parseArg = undefined;
			this.defaultValue = undefined;
			this.defaultValueDescription = undefined;
			this.argChoices = undefined;
			switch (name[0]) {
				case "<":
					this.required = true;
					this._name = name.slice(1, -1);
					break;
				case "[":
					this.required = false;
					this._name = name.slice(1, -1);
					break;
				default:
					this.required = true;
					this._name = name;
					break;
			}
			if (this._name.length > 3 && this._name.slice(-3) === "...") {
				this.variadic = true;
				this._name = this._name.slice(0, -3);
			}
		}
		name() {
			return this._name;
		}
		_concatValue(value, previous) {
			if (previous === this.defaultValue || !Array.isArray(previous)) {
				return [value];
			}
			return previous.concat(value);
		}
		default(value, description) {
			this.defaultValue = value;
			this.defaultValueDescription = description;
			return this;
		}
		argParser(fn) {
			this.parseArg = fn;
			return this;
		}
		choices(values) {
			this.argChoices = values.slice();
			this.parseArg = (arg, previous) => {
				if (!this.argChoices.includes(arg)) {
					throw new InvalidArgumentError(
						`Allowed choices are ${this.argChoices.join(", ")}.`,
					);
				}
				if (this.variadic) {
					return this._concatValue(arg, previous);
				}
				return arg;
			};
			return this;
		}
		argRequired() {
			this.required = true;
			return this;
		}
		argOptional() {
			this.required = false;
			return this;
		}
	}
	function humanReadableArgName(arg) {
		const nameOutput = arg.name() + (arg.variadic === true ? "..." : "");
		return arg.required ? "<" + nameOutput + ">" : "[" + nameOutput + "]";
	}
	exports.Argument = Argument;
	exports.humanReadableArgName = humanReadableArgName;
});

// ../../../../bun-vfs$$/node_modules/events/index.js
var exports_events = {};
__export(exports_events, {
	prototype: () => P,
	once: () => M,
	default: () => A,
	EventEmitter: () => o,
});
function x(t) {
	console && console.warn && console.warn(t);
}
function o() {
	o.init.call(this);
}
function v(t) {
	if (typeof t != "function")
		throw new TypeError(
			'The "listener" argument must be of type Function. Received type ' +
				typeof t,
		);
}
function m(t) {
	return t._maxListeners === undefined
		? o.defaultMaxListeners
		: t._maxListeners;
}
function y(t, e, n, r) {
	var i, f, s;
	if (
		(v(n),
		(f = t._events),
		f === undefined
			? ((f = t._events = Object.create(null)), (t._eventsCount = 0))
			: (f.newListener !== undefined &&
					(t.emit("newListener", e, n.listener ? n.listener : n),
					(f = t._events)),
				(s = f[e])),
		s === undefined)
	)
		(s = f[e] = n), ++t._eventsCount;
	else if (
		(typeof s == "function"
			? (s = f[e] = r ? [n, s] : [s, n])
			: r
				? s.unshift(n)
				: s.push(n),
		(i = m(t)),
		i > 0 && s.length > i && !s.warned)
	) {
		s.warned = true;
		var u = new Error(
			"Possible EventEmitter memory leak detected. " +
				s.length +
				" " +
				String(e) +
				" listeners added. Use emitter.setMaxListeners() to increase limit",
		);
		(u.name = "MaxListenersExceededWarning"),
			(u.emitter = t),
			(u.type = e),
			(u.count = s.length),
			x(u);
	}
	return t;
}
function C() {
	if (!this.fired)
		return (
			this.target.removeListener(this.type, this.wrapFn),
			(this.fired = true),
			arguments.length === 0
				? this.listener.call(this.target)
				: this.listener.apply(this.target, arguments)
		);
}
function g(t, e, n) {
	var r = { fired: false, wrapFn: undefined, target: t, type: e, listener: n },
		i = C.bind(r);
	return (i.listener = n), (r.wrapFn = i), i;
}
function _(t, e, n) {
	var r = t._events;
	if (r === undefined) return [];
	var i = r[e];
	return i === undefined
		? []
		: typeof i == "function"
			? n
				? [i.listener || i]
				: [i]
			: n
				? R(i)
				: b(i, i.length);
}
function w(t) {
	var e = this._events;
	if (e !== undefined) {
		var n = e[t];
		if (typeof n == "function") return 1;
		if (n !== undefined) return n.length;
	}
	return 0;
}
function b(t, e) {
	for (var n = new Array(e), r = 0; r < e; ++r) n[r] = t[r];
	return n;
}
function j(t, e) {
	for (; e + 1 < t.length; e++) t[e] = t[e + 1];
	t.pop();
}
function R(t) {
	for (var e = new Array(t.length), n = 0; n < e.length; ++n)
		e[n] = t[n].listener || t[n];
	return e;
}
function M(t, e) {
	return new Promise((n, r) => {
		function i(s) {
			t.removeListener(e, f), r(s);
		}
		function f() {
			typeof t.removeListener == "function" && t.removeListener("error", i),
				n([].slice.call(arguments));
		}
		E(t, e, f, { once: true }), e !== "error" && N(t, i, { once: true });
	});
}
function N(t, e, n) {
	typeof t.on == "function" && E(t, "error", e, n);
}
function E(t, e, n, r) {
	if (typeof t.on == "function") r.once ? t.once(e, n) : t.on(e, n);
	else if (typeof t.addEventListener == "function")
		t.addEventListener(e, function i(f) {
			r.once && t.removeEventListener(e, i), n(f);
		});
	else
		throw new TypeError(
			'The "emitter" argument must be of type EventEmitter. Received type ' +
				typeof t,
		);
}
var a,
	d,
	l,
	L,
	h = 10,
	A,
	P;
var init_events = __esm(() => {
	a = typeof Reflect == "object" ? Reflect : null;
	d =
		a && typeof a.apply == "function"
			? a.apply
			: (e, n, r) => Function.prototype.apply.call(e, n, r);
	a && typeof a.ownKeys == "function"
		? (l = a.ownKeys)
		: Object.getOwnPropertySymbols
			? (l = (e) =>
					Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e)))
			: (l = (e) => Object.getOwnPropertyNames(e));
	L = Number.isNaN || ((e) => e !== e);
	o.EventEmitter = o;
	o.prototype._events = undefined;
	o.prototype._eventsCount = 0;
	o.prototype._maxListeners = undefined;
	Object.defineProperty(o, "defaultMaxListeners", {
		enumerable: true,
		get: () => h,
		set: (t) => {
			if (typeof t != "number" || t < 0 || L(t))
				throw new RangeError(
					'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' +
						t +
						".",
				);
			h = t;
		},
	});
	o.init = function () {
		(this._events === undefined ||
			this._events === Object.getPrototypeOf(this)._events) &&
			((this._events = Object.create(null)), (this._eventsCount = 0)),
			(this._maxListeners = this._maxListeners || undefined);
	};
	o.prototype.setMaxListeners = function (e) {
		if (typeof e != "number" || e < 0 || L(e))
			throw new RangeError(
				'The value of "n" is out of range. It must be a non-negative number. Received ' +
					e +
					".",
			);
		return (this._maxListeners = e), this;
	};
	o.prototype.getMaxListeners = function () {
		return m(this);
	};
	o.prototype.emit = function (e) {
		for (var n = [], r = 1; r < arguments.length; r++) n.push(arguments[r]);
		var i = e === "error",
			f = this._events;
		if (f !== undefined) i = i && f.error === undefined;
		else if (!i) return false;
		if (i) {
			var s;
			if ((n.length > 0 && (s = n[0]), s instanceof Error)) throw s;
			var u = new Error("Unhandled error." + (s ? " (" + s.message + ")" : ""));
			throw ((u.context = s), u);
		}
		var c = f[e];
		if (c === undefined) return false;
		if (typeof c == "function") d(c, this, n);
		else
			for (var p = c.length, O = b(c, p), r = 0; r < p; ++r) d(O[r], this, n);
		return true;
	};
	o.prototype.addListener = function (e, n) {
		return y(this, e, n, false);
	};
	o.prototype.on = o.prototype.addListener;
	o.prototype.prependListener = function (e, n) {
		return y(this, e, n, true);
	};
	o.prototype.once = function (e, n) {
		return v(n), this.on(e, g(this, e, n)), this;
	};
	o.prototype.prependOnceListener = function (e, n) {
		return v(n), this.prependListener(e, g(this, e, n)), this;
	};
	o.prototype.removeListener = function (e, n) {
		var r, i, f, s, u;
		if ((v(n), (i = this._events), i === undefined)) return this;
		if (((r = i[e]), r === undefined)) return this;
		if (r === n || r.listener === n)
			--this._eventsCount === 0
				? (this._events = Object.create(null))
				: (delete i[e],
					i.removeListener && this.emit("removeListener", e, r.listener || n));
		else if (typeof r != "function") {
			for (f = -1, s = r.length - 1; s >= 0; s--)
				if (r[s] === n || r[s].listener === n) {
					(u = r[s].listener), (f = s);
					break;
				}
			if (f < 0) return this;
			f === 0 ? r.shift() : j(r, f),
				r.length === 1 && (i[e] = r[0]),
				i.removeListener !== undefined &&
					this.emit("removeListener", e, u || n);
		}
		return this;
	};
	o.prototype.off = o.prototype.removeListener;
	o.prototype.removeAllListeners = function (e) {
		var n, r, i;
		if (((r = this._events), r === undefined)) return this;
		if (r.removeListener === undefined)
			return (
				arguments.length === 0
					? ((this._events = Object.create(null)), (this._eventsCount = 0))
					: r[e] !== undefined &&
						(--this._eventsCount === 0
							? (this._events = Object.create(null))
							: delete r[e]),
				this
			);
		if (arguments.length === 0) {
			var f = Object.keys(r),
				s;
			for (i = 0; i < f.length; ++i)
				(s = f[i]), s !== "removeListener" && this.removeAllListeners(s);
			return (
				this.removeAllListeners("removeListener"),
				(this._events = Object.create(null)),
				(this._eventsCount = 0),
				this
			);
		}
		if (((n = r[e]), typeof n == "function")) this.removeListener(e, n);
		else if (n !== undefined)
			for (i = n.length - 1; i >= 0; i--) this.removeListener(e, n[i]);
		return this;
	};
	o.prototype.listeners = function (e) {
		return _(this, e, true);
	};
	o.prototype.rawListeners = function (e) {
		return _(this, e, false);
	};
	o.listenerCount = (t, e) =>
		typeof t.listenerCount == "function" ? t.listenerCount(e) : w.call(t, e);
	o.prototype.listenerCount = w;
	o.prototype.eventNames = function () {
		return this._eventsCount > 0 ? l(this._events) : [];
	};
	A = o;
	P = o.prototype;
});

// ../../../../bun-vfs$$/node_modules/path/index.js
var exports_path = {};
__export(exports_path, {
	win32: () => y2,
	toNamespacedPath: () => U,
	sep: () => I,
	resolve: () => B,
	relative: () => Q,
	posix: () => g2,
	parse: () => $,
	normalize: () => G,
	join: () => K,
	isAbsolute: () => H,
	format: () => Z,
	extname: () => Y,
	dirname: () => V,
	delimiter: () => O,
	default: () => q,
	basename: () => X,
});
var L2,
	h2,
	D,
	T,
	_2,
	E2,
	R2 = (s, e) => () => (e || s((e = { exports: {} }).exports, e), e.exports),
	N2 = (s, e, r, t) => {
		if ((e && typeof e == "object") || typeof e == "function")
			for (const i of T(e))
				!E2.call(s, i) &&
					i !== r &&
					h2(s, i, {
						get: () => e[i],
						enumerable: !(t = D(e, i)) || t.enumerable,
					});
		return s;
	},
	j2 = (s, e, r) => (
		(r = s != null ? L2(_2(s)) : {}),
		N2(
			e || !s || !s.__esModule
				? h2(r, "default", { value: s, enumerable: true })
				: r,
			s,
		)
	),
	k,
	x2,
	u,
	J,
	P2 = (s) => s,
	S = () => {
		throw new Error("Not implemented");
	},
	g2,
	y2,
	q,
	B,
	G,
	H,
	K,
	Q,
	U,
	V,
	X,
	Y,
	Z,
	$,
	I,
	O;
var init_path = __esm(() => {
	L2 = Object.create;
	h2 = Object.defineProperty;
	D = Object.getOwnPropertyDescriptor;
	T = Object.getOwnPropertyNames;
	_2 = Object.getPrototypeOf;
	E2 = Object.prototype.hasOwnProperty;
	k = R2((W, w2) => {
		function v2(s) {
			if (typeof s != "string")
				throw new TypeError(
					"Path must be a string. Received " + JSON.stringify(s),
				);
		}
		function C2(s, e) {
			for (var r = "", t = 0, i = -1, a2 = 0, n, l2 = 0; l2 <= s.length; ++l2) {
				if (l2 < s.length) n = s.charCodeAt(l2);
				else {
					if (n === 47) break;
					n = 47;
				}
				if (n === 47) {
					if (!(i === l2 - 1 || a2 === 1))
						if (i !== l2 - 1 && a2 === 2) {
							if (
								r.length < 2 ||
								t !== 2 ||
								r.charCodeAt(r.length - 1) !== 46 ||
								r.charCodeAt(r.length - 2) !== 46
							) {
								if (r.length > 2) {
									var f = r.lastIndexOf("/");
									if (f !== r.length - 1) {
										f === -1
											? ((r = ""), (t = 0))
											: ((r = r.slice(0, f)),
												(t = r.length - 1 - r.lastIndexOf("/"))),
											(i = l2),
											(a2 = 0);
										continue;
									}
								} else if (r.length === 2 || r.length === 1) {
									(r = ""), (t = 0), (i = l2), (a2 = 0);
									continue;
								}
							}
							e && (r.length > 0 ? (r += "/..") : (r = ".."), (t = 2));
						} else
							r.length > 0
								? (r += "/" + s.slice(i + 1, l2))
								: (r = s.slice(i + 1, l2)),
								(t = l2 - i - 1);
					(i = l2), (a2 = 0);
				} else n === 46 && a2 !== -1 ? ++a2 : (a2 = -1);
			}
			return r;
		}
		function F(s, e) {
			var r = e.dir || e.root,
				t = e.base || (e.name || "") + (e.ext || "");
			return r ? (r === e.root ? r + t : r + s + t) : t;
		}
		var m2 = {
			resolve: () => {
				for (
					var e = "", r = false, t, i = arguments.length - 1;
					i >= -1 && !r;
					i--
				) {
					var a2;
					i >= 0
						? (a2 = arguments[i])
						: (t === undefined && (t = process.cwd()), (a2 = t)),
						v2(a2),
						a2.length !== 0 &&
							((e = a2 + "/" + e), (r = a2.charCodeAt(0) === 47));
				}
				return (
					(e = C2(e, !r)),
					r ? (e.length > 0 ? "/" + e : "/") : e.length > 0 ? e : "."
				);
			},
			normalize: (e) => {
				if ((v2(e), e.length === 0)) return ".";
				var r = e.charCodeAt(0) === 47,
					t = e.charCodeAt(e.length - 1) === 47;
				return (
					(e = C2(e, !r)),
					e.length === 0 && !r && (e = "."),
					e.length > 0 && t && (e += "/"),
					r ? "/" + e : e
				);
			},
			isAbsolute: (e) => (v2(e), e.length > 0 && e.charCodeAt(0) === 47),
			join: () => {
				if (arguments.length === 0) return ".";
				for (var e, r = 0; r < arguments.length; ++r) {
					var t = arguments[r];
					v2(t), t.length > 0 && (e === undefined ? (e = t) : (e += "/" + t));
				}
				return e === undefined ? "." : m2.normalize(e);
			},
			relative: (e, r) => {
				if (
					(v2(e),
					v2(r),
					e === r || ((e = m2.resolve(e)), (r = m2.resolve(r)), e === r))
				)
					return "";
				for (var t = 1; t < e.length && e.charCodeAt(t) === 47; ++t);
				for (
					var i = e.length, a2 = i - t, n = 1;
					n < r.length && r.charCodeAt(n) === 47;
					++n
				);
				for (
					var l2 = r.length, f = l2 - n, c = a2 < f ? a2 : f, d2 = -1, o2 = 0;
					o2 <= c;
					++o2
				) {
					if (o2 === c) {
						if (f > c) {
							if (r.charCodeAt(n + o2) === 47) return r.slice(n + o2 + 1);
							if (o2 === 0) return r.slice(n + o2);
						} else
							a2 > c &&
								(e.charCodeAt(t + o2) === 47
									? (d2 = o2)
									: o2 === 0 && (d2 = 0));
						break;
					}
					var A2 = e.charCodeAt(t + o2),
						z = r.charCodeAt(n + o2);
					if (A2 !== z) break;
					A2 === 47 && (d2 = o2);
				}
				var b2 = "";
				for (o2 = t + d2 + 1; o2 <= i; ++o2)
					(o2 === i || e.charCodeAt(o2) === 47) &&
						(b2.length === 0 ? (b2 += "..") : (b2 += "/.."));
				return b2.length > 0
					? b2 + r.slice(n + d2)
					: ((n += d2), r.charCodeAt(n) === 47 && ++n, r.slice(n));
			},
			_makeLong: (e) => e,
			dirname: (e) => {
				if ((v2(e), e.length === 0)) return ".";
				for (
					var r = e.charCodeAt(0),
						t = r === 47,
						i = -1,
						a2 = true,
						n = e.length - 1;
					n >= 1;
					--n
				)
					if (((r = e.charCodeAt(n)), r === 47)) {
						if (!a2) {
							i = n;
							break;
						}
					} else a2 = false;
				return i === -1 ? (t ? "/" : ".") : t && i === 1 ? "//" : e.slice(0, i);
			},
			basename: (e, r) => {
				if (r !== undefined && typeof r != "string")
					throw new TypeError('"ext" argument must be a string');
				v2(e);
				var t = 0,
					i = -1,
					a2 = true,
					n;
				if (r !== undefined && r.length > 0 && r.length <= e.length) {
					if (r.length === e.length && r === e) return "";
					var l2 = r.length - 1,
						f = -1;
					for (n = e.length - 1; n >= 0; --n) {
						var c = e.charCodeAt(n);
						if (c === 47) {
							if (!a2) {
								t = n + 1;
								break;
							}
						} else
							f === -1 && ((a2 = false), (f = n + 1)),
								l2 >= 0 &&
									(c === r.charCodeAt(l2)
										? --l2 === -1 && (i = n)
										: ((l2 = -1), (i = f)));
					}
					return t === i ? (i = f) : i === -1 && (i = e.length), e.slice(t, i);
				} else {
					for (n = e.length - 1; n >= 0; --n)
						if (e.charCodeAt(n) === 47) {
							if (!a2) {
								t = n + 1;
								break;
							}
						} else i === -1 && ((a2 = false), (i = n + 1));
					return i === -1 ? "" : e.slice(t, i);
				}
			},
			extname: (e) => {
				v2(e);
				for (
					var r = -1, t = 0, i = -1, a2 = true, n = 0, l2 = e.length - 1;
					l2 >= 0;
					--l2
				) {
					var f = e.charCodeAt(l2);
					if (f === 47) {
						if (!a2) {
							t = l2 + 1;
							break;
						}
						continue;
					}
					i === -1 && ((a2 = false), (i = l2 + 1)),
						f === 46
							? r === -1
								? (r = l2)
								: n !== 1 && (n = 1)
							: r !== -1 && (n = -1);
				}
				return r === -1 ||
					i === -1 ||
					n === 0 ||
					(n === 1 && r === i - 1 && r === t + 1)
					? ""
					: e.slice(r, i);
			},
			format: (e) => {
				if (e === null || typeof e != "object")
					throw new TypeError(
						'The "pathObject" argument must be of type Object. Received type ' +
							typeof e,
					);
				return F("/", e);
			},
			parse: (e) => {
				v2(e);
				var r = { root: "", dir: "", base: "", ext: "", name: "" };
				if (e.length === 0) return r;
				var t = e.charCodeAt(0),
					i = t === 47,
					a2;
				i ? ((r.root = "/"), (a2 = 1)) : (a2 = 0);
				for (
					var n = -1, l2 = 0, f = -1, c = true, d2 = e.length - 1, o2 = 0;
					d2 >= a2;
					--d2
				) {
					if (((t = e.charCodeAt(d2)), t === 47)) {
						if (!c) {
							l2 = d2 + 1;
							break;
						}
						continue;
					}
					f === -1 && ((c = false), (f = d2 + 1)),
						t === 46
							? n === -1
								? (n = d2)
								: o2 !== 1 && (o2 = 1)
							: n !== -1 && (o2 = -1);
				}
				return (
					n === -1 ||
					f === -1 ||
					o2 === 0 ||
					(o2 === 1 && n === f - 1 && n === l2 + 1)
						? f !== -1 &&
							(l2 === 0 && i
								? (r.base = r.name = e.slice(1, f))
								: (r.base = r.name = e.slice(l2, f)))
						: (l2 === 0 && i
								? ((r.name = e.slice(1, n)), (r.base = e.slice(1, f)))
								: ((r.name = e.slice(l2, n)), (r.base = e.slice(l2, f))),
							(r.ext = e.slice(n, f))),
					l2 > 0 ? (r.dir = e.slice(0, l2 - 1)) : i && (r.dir = "/"),
					r
				);
			},
			sep: "/",
			delimiter: ":",
			win32: null,
			posix: null,
		};
		m2.posix = m2;
		w2.exports = m2;
	});
	x2 = j2(k());
	u = x2;
	J = x2;
	u.parse ??= S;
	J.parse ??= S;
	g2 = {
		resolve: u.resolve.bind(u),
		normalize: u.normalize.bind(u),
		isAbsolute: u.isAbsolute.bind(u),
		join: u.join.bind(u),
		relative: u.relative.bind(u),
		toNamespacedPath: P2,
		dirname: u.dirname.bind(u),
		basename: u.basename.bind(u),
		extname: u.extname.bind(u),
		format: u.format.bind(u),
		parse: u.parse.bind(u),
		sep: "/",
		delimiter: ":",
		win32: undefined,
		posix: undefined,
		_makeLong: P2,
	};
	y2 = { sep: "\\", delimiter: ";", win32: undefined, ...g2, posix: g2 };
	g2.win32 = y2.win32 = y2;
	g2.posix = g2;
	q = g2;
	({
		resolve: B,
		normalize: G,
		isAbsolute: H,
		join: K,
		relative: Q,
		toNamespacedPath: U,
		dirname: V,
		basename: X,
		extname: Y,
		format: Z,
		parse: $,
		sep: I,
		delimiter: O,
	} = g2);
});

// ../../../../bun-vfs$$/node_modules/process/index.js
var exports_process = {};
__export(exports_process, {
	default: () => j3,
});
var C2,
	T2,
	q2,
	A2,
	I2,
	Q2,
	S2 = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports),
	N3 = (e, t) => {
		for (var n in t) T2(e, n, { get: t[n], enumerable: true });
	},
	d2 = (e, t, n, w2) => {
		if ((t && typeof t == "object") || typeof t == "function")
			for (const l2 of A2(t))
				!Q2.call(e, l2) &&
					l2 !== n &&
					T2(e, l2, {
						get: () => t[l2],
						enumerable: !(w2 = q2(t, l2)) || w2.enumerable,
					});
		return e;
	},
	h3 = (e, t, n) => (d2(e, t, "default"), n && d2(n, t, "default")),
	y3 = (e, t, n) => (
		(n = e != null ? C2(I2(e)) : {}),
		d2(
			t || !e || !e.__esModule
				? T2(n, "default", { value: e, enumerable: true })
				: n,
			e,
		)
	),
	v2,
	f,
	j3;
var init_process = __esm(() => {
	C2 = Object.create;
	T2 = Object.defineProperty;
	q2 = Object.getOwnPropertyDescriptor;
	A2 = Object.getOwnPropertyNames;
	I2 = Object.getPrototypeOf;
	Q2 = Object.prototype.hasOwnProperty;
	v2 = S2((B2, E3) => {
		var r = (E3.exports = {}),
			i,
			u2;
		function p() {
			throw new Error("setTimeout has not been defined");
		}
		function g3() {
			throw new Error("clearTimeout has not been defined");
		}
		(() => {
			try {
				typeof setTimeout == "function" ? (i = setTimeout) : (i = p);
			} catch {
				i = p;
			}
			try {
				typeof clearTimeout == "function" ? (u2 = clearTimeout) : (u2 = g3);
			} catch {
				u2 = g3;
			}
		})();
		function b2(e) {
			if (i === setTimeout) return setTimeout(e, 0);
			if ((i === p || !i) && setTimeout)
				return (i = setTimeout), setTimeout(e, 0);
			try {
				return i(e, 0);
			} catch {
				try {
					return i.call(null, e, 0);
				} catch {
					return i.call(this, e, 0);
				}
			}
		}
		function O2(e) {
			if (u2 === clearTimeout) return clearTimeout(e);
			if ((u2 === g3 || !u2) && clearTimeout)
				return (u2 = clearTimeout), clearTimeout(e);
			try {
				return u2(e);
			} catch {
				try {
					return u2.call(null, e);
				} catch {
					return u2.call(this, e);
				}
			}
		}
		var o2 = [],
			s = false,
			a2,
			m2 = -1;
		function U2() {
			!s ||
				!a2 ||
				((s = false),
				a2.length ? (o2 = a2.concat(o2)) : (m2 = -1),
				o2.length && x3());
		}
		function x3() {
			if (!s) {
				var e = b2(U2);
				s = true;
				for (var t = o2.length; t; ) {
					for (a2 = o2, o2 = []; ++m2 < t; ) a2 && a2[m2].run();
					(m2 = -1), (t = o2.length);
				}
				(a2 = null), (s = false), O2(e);
			}
		}
		r.nextTick = (e) => {
			var t = new Array(arguments.length - 1);
			if (arguments.length > 1)
				for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
			o2.push(new L3(e, t)), o2.length === 1 && !s && b2(x3);
		};
		function L3(e, t) {
			(this.fun = e), (this.array = t);
		}
		L3.prototype.run = function () {
			this.fun.apply(null, this.array);
		};
		r.title = "browser";
		r.browser = true;
		r.env = {};
		r.argv = [];
		r.version = "";
		r.versions = {};
		function c() {}
		r.on = c;
		r.addListener = c;
		r.once = c;
		r.off = c;
		r.removeListener = c;
		r.removeAllListeners = c;
		r.emit = c;
		r.prependListener = c;
		r.prependOnceListener = c;
		r.listeners = (e) => [];
		r.binding = (e) => {
			throw new Error("process.binding is not supported");
		};
		r.cwd = () => "/";
		r.chdir = (e) => {
			throw new Error("process.chdir is not supported");
		};
		r.umask = () => 0;
	});
	f = {};
	N3(f, { default: () => j3 });
	h3(f, y3(v2()));
	j3 = y3(v2());
});

// node_modules/commander/lib/help.js
var require_help = __commonJS((exports) => {
	var { humanReadableArgName } = require_argument();

	class Help {
		constructor() {
			this.helpWidth = undefined;
			this.minWidthToWrap = 40;
			this.sortSubcommands = false;
			this.sortOptions = false;
			this.showGlobalOptions = false;
		}
		prepareContext(contextOptions) {
			this.helpWidth = this.helpWidth ?? contextOptions.helpWidth ?? 80;
		}
		visibleCommands(cmd) {
			const visibleCommands = cmd.commands.filter((cmd2) => !cmd2._hidden);
			const helpCommand = cmd._getHelpCommand();
			if (helpCommand && !helpCommand._hidden) {
				visibleCommands.push(helpCommand);
			}
			if (this.sortSubcommands) {
				visibleCommands.sort((a2, b2) => {
					return a2.name().localeCompare(b2.name());
				});
			}
			return visibleCommands;
		}
		compareOptions(a2, b2) {
			const getSortKey = (option) => {
				return option.short
					? option.short.replace(/^-/, "")
					: option.long.replace(/^--/, "");
			};
			return getSortKey(a2).localeCompare(getSortKey(b2));
		}
		visibleOptions(cmd) {
			const visibleOptions = cmd.options.filter((option) => !option.hidden);
			const helpOption = cmd._getHelpOption();
			if (helpOption && !helpOption.hidden) {
				const removeShort =
					helpOption.short && cmd._findOption(helpOption.short);
				const removeLong = helpOption.long && cmd._findOption(helpOption.long);
				if (!removeShort && !removeLong) {
					visibleOptions.push(helpOption);
				} else if (helpOption.long && !removeLong) {
					visibleOptions.push(
						cmd.createOption(helpOption.long, helpOption.description),
					);
				} else if (helpOption.short && !removeShort) {
					visibleOptions.push(
						cmd.createOption(helpOption.short, helpOption.description),
					);
				}
			}
			if (this.sortOptions) {
				visibleOptions.sort(this.compareOptions);
			}
			return visibleOptions;
		}
		visibleGlobalOptions(cmd) {
			if (!this.showGlobalOptions) return [];
			const globalOptions = [];
			for (
				let ancestorCmd = cmd.parent;
				ancestorCmd;
				ancestorCmd = ancestorCmd.parent
			) {
				const visibleOptions = ancestorCmd.options.filter(
					(option) => !option.hidden,
				);
				globalOptions.push(...visibleOptions);
			}
			if (this.sortOptions) {
				globalOptions.sort(this.compareOptions);
			}
			return globalOptions;
		}
		visibleArguments(cmd) {
			if (cmd._argsDescription) {
				cmd.registeredArguments.forEach((argument) => {
					argument.description =
						argument.description || cmd._argsDescription[argument.name()] || "";
				});
			}
			if (cmd.registeredArguments.find((argument) => argument.description)) {
				return cmd.registeredArguments;
			}
			return [];
		}
		subcommandTerm(cmd) {
			const args = cmd.registeredArguments
				.map((arg) => humanReadableArgName(arg))
				.join(" ");
			return (
				cmd._name +
				(cmd._aliases[0] ? "|" + cmd._aliases[0] : "") +
				(cmd.options.length ? " [options]" : "") +
				(args ? " " + args : "")
			);
		}
		optionTerm(option) {
			return option.flags;
		}
		argumentTerm(argument) {
			return argument.name();
		}
		longestSubcommandTermLength(cmd, helper) {
			return helper.visibleCommands(cmd).reduce((max, command) => {
				return Math.max(
					max,
					this.displayWidth(
						helper.styleSubcommandTerm(helper.subcommandTerm(command)),
					),
				);
			}, 0);
		}
		longestOptionTermLength(cmd, helper) {
			return helper.visibleOptions(cmd).reduce((max, option) => {
				return Math.max(
					max,
					this.displayWidth(helper.styleOptionTerm(helper.optionTerm(option))),
				);
			}, 0);
		}
		longestGlobalOptionTermLength(cmd, helper) {
			return helper.visibleGlobalOptions(cmd).reduce((max, option) => {
				return Math.max(
					max,
					this.displayWidth(helper.styleOptionTerm(helper.optionTerm(option))),
				);
			}, 0);
		}
		longestArgumentTermLength(cmd, helper) {
			return helper.visibleArguments(cmd).reduce((max, argument) => {
				return Math.max(
					max,
					this.displayWidth(
						helper.styleArgumentTerm(helper.argumentTerm(argument)),
					),
				);
			}, 0);
		}
		commandUsage(cmd) {
			let cmdName = cmd._name;
			if (cmd._aliases[0]) {
				cmdName = cmdName + "|" + cmd._aliases[0];
			}
			let ancestorCmdNames = "";
			for (
				let ancestorCmd = cmd.parent;
				ancestorCmd;
				ancestorCmd = ancestorCmd.parent
			) {
				ancestorCmdNames = ancestorCmd.name() + " " + ancestorCmdNames;
			}
			return ancestorCmdNames + cmdName + " " + cmd.usage();
		}
		commandDescription(cmd) {
			return cmd.description();
		}
		subcommandDescription(cmd) {
			return cmd.summary() || cmd.description();
		}
		optionDescription(option) {
			const extraInfo = [];
			if (option.argChoices) {
				extraInfo.push(
					`choices: ${option.argChoices.map((choice) => JSON.stringify(choice)).join(", ")}`,
				);
			}
			if (option.defaultValue !== undefined) {
				const showDefault =
					option.required ||
					option.optional ||
					(option.isBoolean() && typeof option.defaultValue === "boolean");
				if (showDefault) {
					extraInfo.push(
						`default: ${option.defaultValueDescription || JSON.stringify(option.defaultValue)}`,
					);
				}
			}
			if (option.presetArg !== undefined && option.optional) {
				extraInfo.push(`preset: ${JSON.stringify(option.presetArg)}`);
			}
			if (option.envVar !== undefined) {
				extraInfo.push(`env: ${option.envVar}`);
			}
			if (extraInfo.length > 0) {
				return `${option.description} (${extraInfo.join(", ")})`;
			}
			return option.description;
		}
		argumentDescription(argument) {
			const extraInfo = [];
			if (argument.argChoices) {
				extraInfo.push(
					`choices: ${argument.argChoices.map((choice) => JSON.stringify(choice)).join(", ")}`,
				);
			}
			if (argument.defaultValue !== undefined) {
				extraInfo.push(
					`default: ${argument.defaultValueDescription || JSON.stringify(argument.defaultValue)}`,
				);
			}
			if (extraInfo.length > 0) {
				const extraDescription = `(${extraInfo.join(", ")})`;
				if (argument.description) {
					return `${argument.description} ${extraDescription}`;
				}
				return extraDescription;
			}
			return argument.description;
		}
		formatHelp(cmd, helper) {
			const termWidth = helper.padWidth(cmd, helper);
			const helpWidth = helper.helpWidth ?? 80;
			function callFormatItem(term, description) {
				return helper.formatItem(term, termWidth, description, helper);
			}
			let output = [
				`${helper.styleTitle("Usage:")} ${helper.styleUsage(helper.commandUsage(cmd))}`,
				"",
			];
			const commandDescription = helper.commandDescription(cmd);
			if (commandDescription.length > 0) {
				output = output.concat([
					helper.boxWrap(
						helper.styleCommandDescription(commandDescription),
						helpWidth,
					),
					"",
				]);
			}
			const argumentList = helper.visibleArguments(cmd).map((argument) => {
				return callFormatItem(
					helper.styleArgumentTerm(helper.argumentTerm(argument)),
					helper.styleArgumentDescription(helper.argumentDescription(argument)),
				);
			});
			if (argumentList.length > 0) {
				output = output.concat([
					helper.styleTitle("Arguments:"),
					...argumentList,
					"",
				]);
			}
			const optionList = helper.visibleOptions(cmd).map((option) => {
				return callFormatItem(
					helper.styleOptionTerm(helper.optionTerm(option)),
					helper.styleOptionDescription(helper.optionDescription(option)),
				);
			});
			if (optionList.length > 0) {
				output = output.concat([
					helper.styleTitle("Options:"),
					...optionList,
					"",
				]);
			}
			if (helper.showGlobalOptions) {
				const globalOptionList = helper
					.visibleGlobalOptions(cmd)
					.map((option) => {
						return callFormatItem(
							helper.styleOptionTerm(helper.optionTerm(option)),
							helper.styleOptionDescription(helper.optionDescription(option)),
						);
					});
				if (globalOptionList.length > 0) {
					output = output.concat([
						helper.styleTitle("Global Options:"),
						...globalOptionList,
						"",
					]);
				}
			}
			const commandList = helper.visibleCommands(cmd).map((cmd2) => {
				return callFormatItem(
					helper.styleSubcommandTerm(helper.subcommandTerm(cmd2)),
					helper.styleSubcommandDescription(helper.subcommandDescription(cmd2)),
				);
			});
			if (commandList.length > 0) {
				output = output.concat([
					helper.styleTitle("Commands:"),
					...commandList,
					"",
				]);
			}
			return output.join(`
`);
		}
		displayWidth(str) {
			return stripColor(str).length;
		}
		styleTitle(str) {
			return str;
		}
		styleUsage(str) {
			return str
				.split(" ")
				.map((word) => {
					if (word === "[options]") return this.styleOptionText(word);
					if (word === "[command]") return this.styleSubcommandText(word);
					if (word[0] === "[" || word[0] === "<")
						return this.styleArgumentText(word);
					return this.styleCommandText(word);
				})
				.join(" ");
		}
		styleCommandDescription(str) {
			return this.styleDescriptionText(str);
		}
		styleOptionDescription(str) {
			return this.styleDescriptionText(str);
		}
		styleSubcommandDescription(str) {
			return this.styleDescriptionText(str);
		}
		styleArgumentDescription(str) {
			return this.styleDescriptionText(str);
		}
		styleDescriptionText(str) {
			return str;
		}
		styleOptionTerm(str) {
			return this.styleOptionText(str);
		}
		styleSubcommandTerm(str) {
			return str
				.split(" ")
				.map((word) => {
					if (word === "[options]") return this.styleOptionText(word);
					if (word[0] === "[" || word[0] === "<")
						return this.styleArgumentText(word);
					return this.styleSubcommandText(word);
				})
				.join(" ");
		}
		styleArgumentTerm(str) {
			return this.styleArgumentText(str);
		}
		styleOptionText(str) {
			return str;
		}
		styleArgumentText(str) {
			return str;
		}
		styleSubcommandText(str) {
			return str;
		}
		styleCommandText(str) {
			return str;
		}
		padWidth(cmd, helper) {
			return Math.max(
				helper.longestOptionTermLength(cmd, helper),
				helper.longestGlobalOptionTermLength(cmd, helper),
				helper.longestSubcommandTermLength(cmd, helper),
				helper.longestArgumentTermLength(cmd, helper),
			);
		}
		preformatted(str) {
			return /\n[^\S\r\n]/.test(str);
		}
		formatItem(term, termWidth, description, helper) {
			const itemIndent = 2;
			const itemIndentStr = " ".repeat(itemIndent);
			if (!description) return itemIndentStr + term;
			const paddedTerm = term.padEnd(
				termWidth + term.length - helper.displayWidth(term),
			);
			const spacerWidth = 2;
			const helpWidth = this.helpWidth ?? 80;
			const remainingWidth = helpWidth - termWidth - spacerWidth - itemIndent;
			let formattedDescription;
			if (
				remainingWidth < this.minWidthToWrap ||
				helper.preformatted(description)
			) {
				formattedDescription = description;
			} else {
				const wrappedDescription = helper.boxWrap(description, remainingWidth);
				formattedDescription = wrappedDescription.replace(
					/\n/g,
					`
` + " ".repeat(termWidth + spacerWidth),
				);
			}
			return (
				itemIndentStr +
				paddedTerm +
				" ".repeat(spacerWidth) +
				formattedDescription.replace(
					/\n/g,
					`
${itemIndentStr}`,
				)
			);
		}
		boxWrap(str, width) {
			if (width < this.minWidthToWrap) return str;
			const rawLines = str.split(/\r\n|\n/);
			const chunkPattern = /[\s]*[^\s]+/g;
			const wrappedLines = [];
			rawLines.forEach((line) => {
				const chunks = line.match(chunkPattern);
				if (chunks === null) {
					wrappedLines.push("");
					return;
				}
				let sumChunks = [chunks.shift()];
				let sumWidth = this.displayWidth(sumChunks[0]);
				chunks.forEach((chunk) => {
					const visibleWidth = this.displayWidth(chunk);
					if (sumWidth + visibleWidth <= width) {
						sumChunks.push(chunk);
						sumWidth += visibleWidth;
						return;
					}
					wrappedLines.push(sumChunks.join(""));
					const nextChunk = chunk.trimStart();
					sumChunks = [nextChunk];
					sumWidth = this.displayWidth(nextChunk);
				});
				wrappedLines.push(sumChunks.join(""));
			});
			return wrappedLines.join(`
`);
		}
	}
	function stripColor(str) {
		const sgrPattern = /\x1b\[\d*(;\d*)*m/g;
		return str.replace(sgrPattern, "");
	}
	exports.Help = Help;
	exports.stripColor = stripColor;
});

// node_modules/commander/lib/option.js
var require_option = __commonJS((exports) => {
	var { InvalidArgumentError } = require_error();

	class Option {
		constructor(flags, description) {
			this.flags = flags;
			this.description = description || "";
			this.required = flags.includes("<");
			this.optional = flags.includes("[");
			this.variadic = /\w\.\.\.[>\]]$/.test(flags);
			this.mandatory = false;
			const optionFlags = splitOptionFlags(flags);
			this.short = optionFlags.shortFlag;
			this.long = optionFlags.longFlag;
			this.negate = false;
			if (this.long) {
				this.negate = this.long.startsWith("--no-");
			}
			this.defaultValue = undefined;
			this.defaultValueDescription = undefined;
			this.presetArg = undefined;
			this.envVar = undefined;
			this.parseArg = undefined;
			this.hidden = false;
			this.argChoices = undefined;
			this.conflictsWith = [];
			this.implied = undefined;
		}
		default(value, description) {
			this.defaultValue = value;
			this.defaultValueDescription = description;
			return this;
		}
		preset(arg) {
			this.presetArg = arg;
			return this;
		}
		conflicts(names) {
			this.conflictsWith = this.conflictsWith.concat(names);
			return this;
		}
		implies(impliedOptionValues) {
			let newImplied = impliedOptionValues;
			if (typeof impliedOptionValues === "string") {
				newImplied = { [impliedOptionValues]: true };
			}
			this.implied = Object.assign(this.implied || {}, newImplied);
			return this;
		}
		env(name) {
			this.envVar = name;
			return this;
		}
		argParser(fn) {
			this.parseArg = fn;
			return this;
		}
		makeOptionMandatory(mandatory = true) {
			this.mandatory = !!mandatory;
			return this;
		}
		hideHelp(hide = true) {
			this.hidden = !!hide;
			return this;
		}
		_concatValue(value, previous) {
			if (previous === this.defaultValue || !Array.isArray(previous)) {
				return [value];
			}
			return previous.concat(value);
		}
		choices(values) {
			this.argChoices = values.slice();
			this.parseArg = (arg, previous) => {
				if (!this.argChoices.includes(arg)) {
					throw new InvalidArgumentError(
						`Allowed choices are ${this.argChoices.join(", ")}.`,
					);
				}
				if (this.variadic) {
					return this._concatValue(arg, previous);
				}
				return arg;
			};
			return this;
		}
		name() {
			if (this.long) {
				return this.long.replace(/^--/, "");
			}
			return this.short.replace(/^-/, "");
		}
		attributeName() {
			if (this.negate) {
				return camelcase(this.name().replace(/^no-/, ""));
			}
			return camelcase(this.name());
		}
		is(arg) {
			return this.short === arg || this.long === arg;
		}
		isBoolean() {
			return !this.required && !this.optional && !this.negate;
		}
	}

	class DualOptions {
		constructor(options) {
			this.positiveOptions = new Map();
			this.negativeOptions = new Map();
			this.dualOptions = new Set();
			options.forEach((option) => {
				if (option.negate) {
					this.negativeOptions.set(option.attributeName(), option);
				} else {
					this.positiveOptions.set(option.attributeName(), option);
				}
			});
			this.negativeOptions.forEach((value, key) => {
				if (this.positiveOptions.has(key)) {
					this.dualOptions.add(key);
				}
			});
		}
		valueFromOption(value, option) {
			const optionKey = option.attributeName();
			if (!this.dualOptions.has(optionKey)) return true;
			const preset = this.negativeOptions.get(optionKey).presetArg;
			const negativeValue = preset !== undefined ? preset : false;
			return option.negate === (negativeValue === value);
		}
	}
	function camelcase(str) {
		return str.split("-").reduce((str2, word) => {
			return str2 + word[0].toUpperCase() + word.slice(1);
		});
	}
	function splitOptionFlags(flags) {
		let shortFlag;
		let longFlag;
		const shortFlagExp = /^-[^-]$/;
		const longFlagExp = /^--[^-]/;
		const flagParts = flags.split(/[ |,]+/).concat("guard");
		if (shortFlagExp.test(flagParts[0])) shortFlag = flagParts.shift();
		if (longFlagExp.test(flagParts[0])) longFlag = flagParts.shift();
		if (/^-[^-][^-]/.test(flagParts[0]))
			throw new Error(
				`invalid Option flags, short option is dash and single character: '${flags}'`,
			);
		if (shortFlag && shortFlagExp.test(flagParts[0]))
			throw new Error(
				`invalid Option flags, more than one short flag: '${flags}'`,
			);
		if (longFlag && longFlagExp.test(flagParts[0]))
			throw new Error(
				`invalid Option flags, more than one long flag: '${flags}'`,
			);
		if (!(shortFlag || longFlag) || flagParts[0].startsWith("-"))
			throw new Error(`invalid Option flags: '${flags}'`);
		return { shortFlag, longFlag };
	}
	exports.Option = Option;
	exports.DualOptions = DualOptions;
});

// node_modules/commander/lib/suggestSimilar.js
var require_suggestSimilar = __commonJS((exports) => {
	var maxDistance = 3;
	function editDistance(a2, b2) {
		if (Math.abs(a2.length - b2.length) > maxDistance)
			return Math.max(a2.length, b2.length);
		const d3 = [];
		for (let i = 0; i <= a2.length; i++) {
			d3[i] = [i];
		}
		for (let j4 = 0; j4 <= b2.length; j4++) {
			d3[0][j4] = j4;
		}
		for (let j4 = 1; j4 <= b2.length; j4++) {
			for (let i = 1; i <= a2.length; i++) {
				let cost = 1;
				if (a2[i - 1] === b2[j4 - 1]) {
					cost = 0;
				} else {
					cost = 1;
				}
				d3[i][j4] = Math.min(
					d3[i - 1][j4] + 1,
					d3[i][j4 - 1] + 1,
					d3[i - 1][j4 - 1] + cost,
				);
				if (
					i > 1 &&
					j4 > 1 &&
					a2[i - 1] === b2[j4 - 2] &&
					a2[i - 2] === b2[j4 - 1]
				) {
					d3[i][j4] = Math.min(d3[i][j4], d3[i - 2][j4 - 2] + 1);
				}
			}
		}
		return d3[a2.length][b2.length];
	}
	function suggestSimilar(word, candidates) {
		if (!candidates || candidates.length === 0) return "";
		candidates = Array.from(new Set(candidates));
		const searchingOptions = word.startsWith("--");
		if (searchingOptions) {
			word = word.slice(2);
			candidates = candidates.map((candidate) => candidate.slice(2));
		}
		let similar = [];
		let bestDistance = maxDistance;
		const minSimilarity = 0.4;
		candidates.forEach((candidate) => {
			if (candidate.length <= 1) return;
			const distance = editDistance(word, candidate);
			const length = Math.max(word.length, candidate.length);
			const similarity = (length - distance) / length;
			if (similarity > minSimilarity) {
				if (distance < bestDistance) {
					bestDistance = distance;
					similar = [candidate];
				} else if (distance === bestDistance) {
					similar.push(candidate);
				}
			}
		});
		similar.sort((a2, b2) => a2.localeCompare(b2));
		if (searchingOptions) {
			similar = similar.map((candidate) => `--${candidate}`);
		}
		if (similar.length > 1) {
			return `
(Did you mean one of ${similar.join(", ")}?)`;
		}
		if (similar.length === 1) {
			return `
(Did you mean ${similar[0]}?)`;
		}
		return "";
	}
	exports.suggestSimilar = suggestSimilar;
});

// node_modules/commander/lib/command.js
var require_command = __commonJS((exports) => {
	var EventEmitter = (init_events(), __toCommonJS(exports_events)).EventEmitter;
	var childProcess = () => ({});
	var path = (init_path(), __toCommonJS(exports_path));
	var fs = () => ({});
	var process2 = (init_process(), __toCommonJS(exports_process));
	var { Argument, humanReadableArgName } = require_argument();
	var { CommanderError } = require_error();
	var { Help, stripColor } = require_help();
	var { Option, DualOptions } = require_option();
	var { suggestSimilar } = require_suggestSimilar();

	class Command extends EventEmitter {
		constructor(name) {
			super();
			this.commands = [];
			this.options = [];
			this.parent = null;
			this._allowUnknownOption = false;
			this._allowExcessArguments = false;
			this.registeredArguments = [];
			this._args = this.registeredArguments;
			this.args = [];
			this.rawArgs = [];
			this.processedArgs = [];
			this._scriptPath = null;
			this._name = name || "";
			this._optionValues = {};
			this._optionValueSources = {};
			this._storeOptionsAsProperties = false;
			this._actionHandler = null;
			this._executableHandler = false;
			this._executableFile = null;
			this._executableDir = null;
			this._defaultCommandName = null;
			this._exitCallback = null;
			this._aliases = [];
			this._combineFlagAndOptionalValue = true;
			this._description = "";
			this._summary = "";
			this._argsDescription = undefined;
			this._enablePositionalOptions = false;
			this._passThroughOptions = false;
			this._lifeCycleHooks = {};
			this._showHelpAfterError = false;
			this._showSuggestionAfterError = true;
			this._savedState = null;
			this._outputConfiguration = {
				writeOut: (str) => process2.stdout.write(str),
				writeErr: (str) => process2.stderr.write(str),
				outputError: (str, write) => write(str),
				getOutHelpWidth: () =>
					process2.stdout.isTTY ? process2.stdout.columns : undefined,
				getErrHelpWidth: () =>
					process2.stderr.isTTY ? process2.stderr.columns : undefined,
				getOutHasColors: () =>
					useColor() ??
					(process2.stdout.isTTY && process2.stdout.hasColors?.()),
				getErrHasColors: () =>
					useColor() ??
					(process2.stderr.isTTY && process2.stderr.hasColors?.()),
				stripColor: (str) => stripColor(str),
			};
			this._hidden = false;
			this._helpOption = undefined;
			this._addImplicitHelpCommand = undefined;
			this._helpCommand = undefined;
			this._helpConfiguration = {};
		}
		copyInheritedSettings(sourceCommand) {
			this._outputConfiguration = sourceCommand._outputConfiguration;
			this._helpOption = sourceCommand._helpOption;
			this._helpCommand = sourceCommand._helpCommand;
			this._helpConfiguration = sourceCommand._helpConfiguration;
			this._exitCallback = sourceCommand._exitCallback;
			this._storeOptionsAsProperties = sourceCommand._storeOptionsAsProperties;
			this._combineFlagAndOptionalValue =
				sourceCommand._combineFlagAndOptionalValue;
			this._allowExcessArguments = sourceCommand._allowExcessArguments;
			this._enablePositionalOptions = sourceCommand._enablePositionalOptions;
			this._showHelpAfterError = sourceCommand._showHelpAfterError;
			this._showSuggestionAfterError = sourceCommand._showSuggestionAfterError;
			return this;
		}
		_getCommandAndAncestors() {
			const result = [];
			for (let command = this; command; command = command.parent) {
				result.push(command);
			}
			return result;
		}
		command(nameAndArgs, actionOptsOrExecDesc, execOpts) {
			let desc = actionOptsOrExecDesc;
			let opts = execOpts;
			if (typeof desc === "object" && desc !== null) {
				opts = desc;
				desc = null;
			}
			opts = opts || {};
			const [, name, args] = nameAndArgs.match(/([^ ]+) *(.*)/);
			const cmd = this.createCommand(name);
			if (desc) {
				cmd.description(desc);
				cmd._executableHandler = true;
			}
			if (opts.isDefault) this._defaultCommandName = cmd._name;
			cmd._hidden = !!(opts.noHelp || opts.hidden);
			cmd._executableFile = opts.executableFile || null;
			if (args) cmd.arguments(args);
			this._registerCommand(cmd);
			cmd.parent = this;
			cmd.copyInheritedSettings(this);
			if (desc) return this;
			return cmd;
		}
		createCommand(name) {
			return new Command(name);
		}
		createHelp() {
			return Object.assign(new Help(), this.configureHelp());
		}
		configureHelp(configuration) {
			if (configuration === undefined) return this._helpConfiguration;
			this._helpConfiguration = configuration;
			return this;
		}
		configureOutput(configuration) {
			if (configuration === undefined) return this._outputConfiguration;
			Object.assign(this._outputConfiguration, configuration);
			return this;
		}
		showHelpAfterError(displayHelp = true) {
			if (typeof displayHelp !== "string") displayHelp = !!displayHelp;
			this._showHelpAfterError = displayHelp;
			return this;
		}
		showSuggestionAfterError(displaySuggestion = true) {
			this._showSuggestionAfterError = !!displaySuggestion;
			return this;
		}
		addCommand(cmd, opts) {
			if (!cmd._name) {
				throw new Error(`Command passed to .addCommand() must have a name
- specify the name in Command constructor or using .name()`);
			}
			opts = opts || {};
			if (opts.isDefault) this._defaultCommandName = cmd._name;
			if (opts.noHelp || opts.hidden) cmd._hidden = true;
			this._registerCommand(cmd);
			cmd.parent = this;
			cmd._checkForBrokenPassThrough();
			return this;
		}
		createArgument(name, description) {
			return new Argument(name, description);
		}
		argument(name, description, fn, defaultValue) {
			const argument = this.createArgument(name, description);
			if (typeof fn === "function") {
				argument.default(defaultValue).argParser(fn);
			} else {
				argument.default(fn);
			}
			this.addArgument(argument);
			return this;
		}
		arguments(names) {
			names
				.trim()
				.split(/ +/)
				.forEach((detail) => {
					this.argument(detail);
				});
			return this;
		}
		addArgument(argument) {
			const previousArgument = this.registeredArguments.slice(-1)[0];
			if (previousArgument && previousArgument.variadic) {
				throw new Error(
					`only the last argument can be variadic '${previousArgument.name()}'`,
				);
			}
			if (
				argument.required &&
				argument.defaultValue !== undefined &&
				argument.parseArg === undefined
			) {
				throw new Error(
					`a default value for a required argument is never used: '${argument.name()}'`,
				);
			}
			this.registeredArguments.push(argument);
			return this;
		}
		helpCommand(enableOrNameAndArgs, description) {
			if (typeof enableOrNameAndArgs === "boolean") {
				this._addImplicitHelpCommand = enableOrNameAndArgs;
				return this;
			}
			enableOrNameAndArgs = enableOrNameAndArgs ?? "help [command]";
			const [, helpName, helpArgs] = enableOrNameAndArgs.match(/([^ ]+) *(.*)/);
			const helpDescription = description ?? "display help for command";
			const helpCommand = this.createCommand(helpName);
			helpCommand.helpOption(false);
			if (helpArgs) helpCommand.arguments(helpArgs);
			if (helpDescription) helpCommand.description(helpDescription);
			this._addImplicitHelpCommand = true;
			this._helpCommand = helpCommand;
			return this;
		}
		addHelpCommand(helpCommand, deprecatedDescription) {
			if (typeof helpCommand !== "object") {
				this.helpCommand(helpCommand, deprecatedDescription);
				return this;
			}
			this._addImplicitHelpCommand = true;
			this._helpCommand = helpCommand;
			return this;
		}
		_getHelpCommand() {
			const hasImplicitHelpCommand =
				this._addImplicitHelpCommand ??
				(this.commands.length &&
					!this._actionHandler &&
					!this._findCommand("help"));
			if (hasImplicitHelpCommand) {
				if (this._helpCommand === undefined) {
					this.helpCommand(undefined, undefined);
				}
				return this._helpCommand;
			}
			return null;
		}
		hook(event, listener) {
			const allowedValues = ["preSubcommand", "preAction", "postAction"];
			if (!allowedValues.includes(event)) {
				throw new Error(`Unexpected value for event passed to hook : '${event}'.
Expecting one of '${allowedValues.join("', '")}'`);
			}
			if (this._lifeCycleHooks[event]) {
				this._lifeCycleHooks[event].push(listener);
			} else {
				this._lifeCycleHooks[event] = [listener];
			}
			return this;
		}
		exitOverride(fn) {
			if (fn) {
				this._exitCallback = fn;
			} else {
				this._exitCallback = (err) => {
					if (err.code !== "commander.executeSubCommandAsync") {
						throw err;
					} else {
					}
				};
			}
			return this;
		}
		_exit(exitCode, code, message) {
			if (this._exitCallback) {
				this._exitCallback(new CommanderError(exitCode, code, message));
			}
			process2.exit(exitCode);
		}
		action(fn) {
			const listener = (args) => {
				const expectedArgsCount = this.registeredArguments.length;
				const actionArgs = args.slice(0, expectedArgsCount);
				if (this._storeOptionsAsProperties) {
					actionArgs[expectedArgsCount] = this;
				} else {
					actionArgs[expectedArgsCount] = this.opts();
				}
				actionArgs.push(this);
				return fn.apply(this, actionArgs);
			};
			this._actionHandler = listener;
			return this;
		}
		createOption(flags, description) {
			return new Option(flags, description);
		}
		_callParseArg(target, value, previous, invalidArgumentMessage) {
			try {
				return target.parseArg(value, previous);
			} catch (err) {
				if (err.code === "commander.invalidArgument") {
					const message = `${invalidArgumentMessage} ${err.message}`;
					this.error(message, { exitCode: err.exitCode, code: err.code });
				}
				throw err;
			}
		}
		_registerOption(option) {
			const matchingOption =
				(option.short && this._findOption(option.short)) ||
				(option.long && this._findOption(option.long));
			if (matchingOption) {
				const matchingFlag =
					option.long && this._findOption(option.long)
						? option.long
						: option.short;
				throw new Error(`Cannot add option '${option.flags}'${this._name && ` to command '${this._name}'`} due to conflicting flag '${matchingFlag}'
-  already used by option '${matchingOption.flags}'`);
			}
			this.options.push(option);
		}
		_registerCommand(command) {
			const knownBy = (cmd) => {
				return [cmd.name()].concat(cmd.aliases());
			};
			const alreadyUsed = knownBy(command).find((name) =>
				this._findCommand(name),
			);
			if (alreadyUsed) {
				const existingCmd = knownBy(this._findCommand(alreadyUsed)).join("|");
				const newCmd = knownBy(command).join("|");
				throw new Error(
					`cannot add command '${newCmd}' as already have command '${existingCmd}'`,
				);
			}
			this.commands.push(command);
		}
		addOption(option) {
			this._registerOption(option);
			const oname = option.name();
			const name = option.attributeName();
			if (option.negate) {
				const positiveLongFlag = option.long.replace(/^--no-/, "--");
				if (!this._findOption(positiveLongFlag)) {
					this.setOptionValueWithSource(
						name,
						option.defaultValue === undefined ? true : option.defaultValue,
						"default",
					);
				}
			} else if (option.defaultValue !== undefined) {
				this.setOptionValueWithSource(name, option.defaultValue, "default");
			}
			const handleOptionValue = (val, invalidValueMessage, valueSource) => {
				if (val == null && option.presetArg !== undefined) {
					val = option.presetArg;
				}
				const oldValue = this.getOptionValue(name);
				if (val !== null && option.parseArg) {
					val = this._callParseArg(option, val, oldValue, invalidValueMessage);
				} else if (val !== null && option.variadic) {
					val = option._concatValue(val, oldValue);
				}
				if (val == null) {
					if (option.negate) {
						val = false;
					} else if (option.isBoolean() || option.optional) {
						val = true;
					} else {
						val = "";
					}
				}
				this.setOptionValueWithSource(name, val, valueSource);
			};
			this.on("option:" + oname, (val) => {
				const invalidValueMessage = `error: option '${option.flags}' argument '${val}' is invalid.`;
				handleOptionValue(val, invalidValueMessage, "cli");
			});
			if (option.envVar) {
				this.on("optionEnv:" + oname, (val) => {
					const invalidValueMessage = `error: option '${option.flags}' value '${val}' from env '${option.envVar}' is invalid.`;
					handleOptionValue(val, invalidValueMessage, "env");
				});
			}
			return this;
		}
		_optionEx(config, flags, description, fn, defaultValue) {
			if (typeof flags === "object" && flags instanceof Option) {
				throw new Error(
					"To add an Option object use addOption() instead of option() or requiredOption()",
				);
			}
			const option = this.createOption(flags, description);
			option.makeOptionMandatory(!!config.mandatory);
			if (typeof fn === "function") {
				option.default(defaultValue).argParser(fn);
			} else if (fn instanceof RegExp) {
				const regex = fn;
				fn = (val, def) => {
					const m2 = regex.exec(val);
					return m2 ? m2[0] : def;
				};
				option.default(defaultValue).argParser(fn);
			} else {
				option.default(fn);
			}
			return this.addOption(option);
		}
		option(flags, description, parseArg, defaultValue) {
			return this._optionEx({}, flags, description, parseArg, defaultValue);
		}
		requiredOption(flags, description, parseArg, defaultValue) {
			return this._optionEx(
				{ mandatory: true },
				flags,
				description,
				parseArg,
				defaultValue,
			);
		}
		combineFlagAndOptionalValue(combine = true) {
			this._combineFlagAndOptionalValue = !!combine;
			return this;
		}
		allowUnknownOption(allowUnknown = true) {
			this._allowUnknownOption = !!allowUnknown;
			return this;
		}
		allowExcessArguments(allowExcess = true) {
			this._allowExcessArguments = !!allowExcess;
			return this;
		}
		enablePositionalOptions(positional = true) {
			this._enablePositionalOptions = !!positional;
			return this;
		}
		passThroughOptions(passThrough = true) {
			this._passThroughOptions = !!passThrough;
			this._checkForBrokenPassThrough();
			return this;
		}
		_checkForBrokenPassThrough() {
			if (
				this.parent &&
				this._passThroughOptions &&
				!this.parent._enablePositionalOptions
			) {
				throw new Error(
					`passThroughOptions cannot be used for '${this._name}' without turning on enablePositionalOptions for parent command(s)`,
				);
			}
		}
		storeOptionsAsProperties(storeAsProperties = true) {
			if (this.options.length) {
				throw new Error(
					"call .storeOptionsAsProperties() before adding options",
				);
			}
			if (Object.keys(this._optionValues).length) {
				throw new Error(
					"call .storeOptionsAsProperties() before setting option values",
				);
			}
			this._storeOptionsAsProperties = !!storeAsProperties;
			return this;
		}
		getOptionValue(key) {
			if (this._storeOptionsAsProperties) {
				return this[key];
			}
			return this._optionValues[key];
		}
		setOptionValue(key, value) {
			return this.setOptionValueWithSource(key, value, undefined);
		}
		setOptionValueWithSource(key, value, source) {
			if (this._storeOptionsAsProperties) {
				this[key] = value;
			} else {
				this._optionValues[key] = value;
			}
			this._optionValueSources[key] = source;
			return this;
		}
		getOptionValueSource(key) {
			return this._optionValueSources[key];
		}
		getOptionValueSourceWithGlobals(key) {
			let source;
			this._getCommandAndAncestors().forEach((cmd) => {
				if (cmd.getOptionValueSource(key) !== undefined) {
					source = cmd.getOptionValueSource(key);
				}
			});
			return source;
		}
		_prepareUserArgs(argv, parseOptions) {
			if (argv !== undefined && !Array.isArray(argv)) {
				throw new Error("first parameter to parse must be array or undefined");
			}
			parseOptions = parseOptions || {};
			if (argv === undefined && parseOptions.from === undefined) {
				if (process2.versions?.electron) {
					parseOptions.from = "electron";
				}
				const execArgv = process2.execArgv ?? [];
				if (
					execArgv.includes("-e") ||
					execArgv.includes("--eval") ||
					execArgv.includes("-p") ||
					execArgv.includes("--print")
				) {
					parseOptions.from = "eval";
				}
			}
			if (argv === undefined) {
				argv = process2.argv;
			}
			this.rawArgs = argv.slice();
			let userArgs;
			switch (parseOptions.from) {
				case undefined:
				case "node":
					this._scriptPath = argv[1];
					userArgs = argv.slice(2);
					break;
				case "electron":
					if (process2.defaultApp) {
						this._scriptPath = argv[1];
						userArgs = argv.slice(2);
					} else {
						userArgs = argv.slice(1);
					}
					break;
				case "user":
					userArgs = argv.slice(0);
					break;
				case "eval":
					userArgs = argv.slice(1);
					break;
				default:
					throw new Error(
						`unexpected parse option { from: '${parseOptions.from}' }`,
					);
			}
			if (!this._name && this._scriptPath)
				this.nameFromFilename(this._scriptPath);
			this._name = this._name || "program";
			return userArgs;
		}
		parse(argv, parseOptions) {
			this._prepareForParse();
			const userArgs = this._prepareUserArgs(argv, parseOptions);
			this._parseCommand([], userArgs);
			return this;
		}
		async parseAsync(argv, parseOptions) {
			this._prepareForParse();
			const userArgs = this._prepareUserArgs(argv, parseOptions);
			await this._parseCommand([], userArgs);
			return this;
		}
		_prepareForParse() {
			if (this._savedState === null) {
				this.saveStateBeforeParse();
			} else {
				this.restoreStateBeforeParse();
			}
		}
		saveStateBeforeParse() {
			this._savedState = {
				_name: this._name,
				_optionValues: { ...this._optionValues },
				_optionValueSources: { ...this._optionValueSources },
			};
		}
		restoreStateBeforeParse() {
			if (this._storeOptionsAsProperties)
				throw new Error(`Can not call parse again when storeOptionsAsProperties is true.
- either make a new Command for each call to parse, or stop storing options as properties`);
			this._name = this._savedState._name;
			this._scriptPath = null;
			this.rawArgs = [];
			this._optionValues = { ...this._savedState._optionValues };
			this._optionValueSources = { ...this._savedState._optionValueSources };
			this.args = [];
			this.processedArgs = [];
		}
		_checkForMissingExecutable(executableFile, executableDir, subcommandName) {
			if (fs.existsSync(executableFile)) return;
			const executableDirMessage = executableDir
				? `searched for local subcommand relative to directory '${executableDir}'`
				: "no directory for search for local subcommand, use .executableDir() to supply a custom directory";
			const executableMissing = `'${executableFile}' does not exist
 - if '${subcommandName}' is not meant to be an executable command, remove description parameter from '.command()' and use '.description()' instead
 - if the default executable name is not suitable, use the executableFile option to supply a custom name or path
 - ${executableDirMessage}`;
			throw new Error(executableMissing);
		}
		_executeSubCommand(subcommand, args) {
			args = args.slice();
			let launchWithNode = false;
			const sourceExt = [".js", ".ts", ".tsx", ".mjs", ".cjs"];
			function findFile(baseDir, baseName) {
				const localBin = path.resolve(baseDir, baseName);
				if (fs.existsSync(localBin)) return localBin;
				if (sourceExt.includes(path.extname(baseName))) return;
				const foundExt = sourceExt.find((ext) =>
					fs.existsSync(`${localBin}${ext}`),
				);
				if (foundExt) return `${localBin}${foundExt}`;
				return;
			}
			this._checkForMissingMandatoryOptions();
			this._checkForConflictingOptions();
			let executableFile =
				subcommand._executableFile || `${this._name}-${subcommand._name}`;
			let executableDir = this._executableDir || "";
			if (this._scriptPath) {
				let resolvedScriptPath;
				try {
					resolvedScriptPath = fs.realpathSync(this._scriptPath);
				} catch {
					resolvedScriptPath = this._scriptPath;
				}
				executableDir = path.resolve(
					path.dirname(resolvedScriptPath),
					executableDir,
				);
			}
			if (executableDir) {
				let localFile = findFile(executableDir, executableFile);
				if (!localFile && !subcommand._executableFile && this._scriptPath) {
					const legacyName = path.basename(
						this._scriptPath,
						path.extname(this._scriptPath),
					);
					if (legacyName !== this._name) {
						localFile = findFile(
							executableDir,
							`${legacyName}-${subcommand._name}`,
						);
					}
				}
				executableFile = localFile || executableFile;
			}
			launchWithNode = sourceExt.includes(path.extname(executableFile));
			let proc;
			if (process2.platform !== "win32") {
				if (launchWithNode) {
					args.unshift(executableFile);
					args = incrementNodeInspectorPort(process2.execArgv).concat(args);
					proc = childProcess.spawn(process2.argv[0], args, {
						stdio: "inherit",
					});
				} else {
					proc = childProcess.spawn(executableFile, args, { stdio: "inherit" });
				}
			} else {
				this._checkForMissingExecutable(
					executableFile,
					executableDir,
					subcommand._name,
				);
				args.unshift(executableFile);
				args = incrementNodeInspectorPort(process2.execArgv).concat(args);
				proc = childProcess.spawn(process2.execPath, args, {
					stdio: "inherit",
				});
			}
			if (!proc.killed) {
				const signals = ["SIGUSR1", "SIGUSR2", "SIGTERM", "SIGINT", "SIGHUP"];
				signals.forEach((signal) => {
					process2.on(signal, () => {
						if (proc.killed === false && proc.exitCode === null) {
							proc.kill(signal);
						}
					});
				});
			}
			const exitCallback = this._exitCallback;
			proc.on("close", (code) => {
				code = code ?? 1;
				if (!exitCallback) {
					process2.exit(code);
				} else {
					exitCallback(
						new CommanderError(
							code,
							"commander.executeSubCommandAsync",
							"(close)",
						),
					);
				}
			});
			proc.on("error", (err) => {
				if (err.code === "ENOENT") {
					this._checkForMissingExecutable(
						executableFile,
						executableDir,
						subcommand._name,
					);
				} else if (err.code === "EACCES") {
					throw new Error(`'${executableFile}' not executable`);
				}
				if (!exitCallback) {
					process2.exit(1);
				} else {
					const wrappedError = new CommanderError(
						1,
						"commander.executeSubCommandAsync",
						"(error)",
					);
					wrappedError.nestedError = err;
					exitCallback(wrappedError);
				}
			});
			this.runningCommand = proc;
		}
		_dispatchSubcommand(commandName, operands, unknown) {
			const subCommand = this._findCommand(commandName);
			if (!subCommand) this.help({ error: true });
			subCommand._prepareForParse();
			let promiseChain;
			promiseChain = this._chainOrCallSubCommandHook(
				promiseChain,
				subCommand,
				"preSubcommand",
			);
			promiseChain = this._chainOrCall(promiseChain, () => {
				if (subCommand._executableHandler) {
					this._executeSubCommand(subCommand, operands.concat(unknown));
				} else {
					return subCommand._parseCommand(operands, unknown);
				}
			});
			return promiseChain;
		}
		_dispatchHelpCommand(subcommandName) {
			if (!subcommandName) {
				this.help();
			}
			const subCommand = this._findCommand(subcommandName);
			if (subCommand && !subCommand._executableHandler) {
				subCommand.help();
			}
			return this._dispatchSubcommand(
				subcommandName,
				[],
				[
					this._getHelpOption()?.long ??
						this._getHelpOption()?.short ??
						"--help",
				],
			);
		}
		_checkNumberOfArguments() {
			this.registeredArguments.forEach((arg, i) => {
				if (arg.required && this.args[i] == null) {
					this.missingArgument(arg.name());
				}
			});
			if (
				this.registeredArguments.length > 0 &&
				this.registeredArguments[this.registeredArguments.length - 1].variadic
			) {
				return;
			}
			if (this.args.length > this.registeredArguments.length) {
				this._excessArguments(this.args);
			}
		}
		_processArguments() {
			const myParseArg = (argument, value, previous) => {
				let parsedValue = value;
				if (value !== null && argument.parseArg) {
					const invalidValueMessage = `error: command-argument value '${value}' is invalid for argument '${argument.name()}'.`;
					parsedValue = this._callParseArg(
						argument,
						value,
						previous,
						invalidValueMessage,
					);
				}
				return parsedValue;
			};
			this._checkNumberOfArguments();
			const processedArgs = [];
			this.registeredArguments.forEach((declaredArg, index) => {
				let value = declaredArg.defaultValue;
				if (declaredArg.variadic) {
					if (index < this.args.length) {
						value = this.args.slice(index);
						if (declaredArg.parseArg) {
							value = value.reduce((processed, v3) => {
								return myParseArg(declaredArg, v3, processed);
							}, declaredArg.defaultValue);
						}
					} else if (value === undefined) {
						value = [];
					}
				} else if (index < this.args.length) {
					value = this.args[index];
					if (declaredArg.parseArg) {
						value = myParseArg(declaredArg, value, declaredArg.defaultValue);
					}
				}
				processedArgs[index] = value;
			});
			this.processedArgs = processedArgs;
		}
		_chainOrCall(promise, fn) {
			if (promise && promise.then && typeof promise.then === "function") {
				return promise.then(() => fn());
			}
			return fn();
		}
		_chainOrCallHooks(promise, event) {
			let result = promise;
			const hooks = [];
			this._getCommandAndAncestors()
				.reverse()
				.filter((cmd) => cmd._lifeCycleHooks[event] !== undefined)
				.forEach((hookedCommand) => {
					hookedCommand._lifeCycleHooks[event].forEach((callback) => {
						hooks.push({ hookedCommand, callback });
					});
				});
			if (event === "postAction") {
				hooks.reverse();
			}
			hooks.forEach((hookDetail) => {
				result = this._chainOrCall(result, () => {
					return hookDetail.callback(hookDetail.hookedCommand, this);
				});
			});
			return result;
		}
		_chainOrCallSubCommandHook(promise, subCommand, event) {
			let result = promise;
			if (this._lifeCycleHooks[event] !== undefined) {
				this._lifeCycleHooks[event].forEach((hook) => {
					result = this._chainOrCall(result, () => {
						return hook(this, subCommand);
					});
				});
			}
			return result;
		}
		_parseCommand(operands, unknown) {
			const parsed = this.parseOptions(unknown);
			this._parseOptionsEnv();
			this._parseOptionsImplied();
			operands = operands.concat(parsed.operands);
			unknown = parsed.unknown;
			this.args = operands.concat(unknown);
			if (operands && this._findCommand(operands[0])) {
				return this._dispatchSubcommand(
					operands[0],
					operands.slice(1),
					unknown,
				);
			}
			if (
				this._getHelpCommand() &&
				operands[0] === this._getHelpCommand().name()
			) {
				return this._dispatchHelpCommand(operands[1]);
			}
			if (this._defaultCommandName) {
				this._outputHelpIfRequested(unknown);
				return this._dispatchSubcommand(
					this._defaultCommandName,
					operands,
					unknown,
				);
			}
			if (
				this.commands.length &&
				this.args.length === 0 &&
				!this._actionHandler &&
				!this._defaultCommandName
			) {
				this.help({ error: true });
			}
			this._outputHelpIfRequested(parsed.unknown);
			this._checkForMissingMandatoryOptions();
			this._checkForConflictingOptions();
			const checkForUnknownOptions = () => {
				if (parsed.unknown.length > 0) {
					this.unknownOption(parsed.unknown[0]);
				}
			};
			const commandEvent = `command:${this.name()}`;
			if (this._actionHandler) {
				checkForUnknownOptions();
				this._processArguments();
				let promiseChain;
				promiseChain = this._chainOrCallHooks(promiseChain, "preAction");
				promiseChain = this._chainOrCall(promiseChain, () =>
					this._actionHandler(this.processedArgs),
				);
				if (this.parent) {
					promiseChain = this._chainOrCall(promiseChain, () => {
						this.parent.emit(commandEvent, operands, unknown);
					});
				}
				promiseChain = this._chainOrCallHooks(promiseChain, "postAction");
				return promiseChain;
			}
			if (this.parent && this.parent.listenerCount(commandEvent)) {
				checkForUnknownOptions();
				this._processArguments();
				this.parent.emit(commandEvent, operands, unknown);
			} else if (operands.length) {
				if (this._findCommand("*")) {
					return this._dispatchSubcommand("*", operands, unknown);
				}
				if (this.listenerCount("command:*")) {
					this.emit("command:*", operands, unknown);
				} else if (this.commands.length) {
					this.unknownCommand();
				} else {
					checkForUnknownOptions();
					this._processArguments();
				}
			} else if (this.commands.length) {
				checkForUnknownOptions();
				this.help({ error: true });
			} else {
				checkForUnknownOptions();
				this._processArguments();
			}
		}
		_findCommand(name) {
			if (!name) return;
			return this.commands.find(
				(cmd) => cmd._name === name || cmd._aliases.includes(name),
			);
		}
		_findOption(arg) {
			return this.options.find((option) => option.is(arg));
		}
		_checkForMissingMandatoryOptions() {
			this._getCommandAndAncestors().forEach((cmd) => {
				cmd.options.forEach((anOption) => {
					if (
						anOption.mandatory &&
						cmd.getOptionValue(anOption.attributeName()) === undefined
					) {
						cmd.missingMandatoryOptionValue(anOption);
					}
				});
			});
		}
		_checkForConflictingLocalOptions() {
			const definedNonDefaultOptions = this.options.filter((option) => {
				const optionKey = option.attributeName();
				if (this.getOptionValue(optionKey) === undefined) {
					return false;
				}
				return this.getOptionValueSource(optionKey) !== "default";
			});
			const optionsWithConflicting = definedNonDefaultOptions.filter(
				(option) => option.conflictsWith.length > 0,
			);
			optionsWithConflicting.forEach((option) => {
				const conflictingAndDefined = definedNonDefaultOptions.find((defined) =>
					option.conflictsWith.includes(defined.attributeName()),
				);
				if (conflictingAndDefined) {
					this._conflictingOption(option, conflictingAndDefined);
				}
			});
		}
		_checkForConflictingOptions() {
			this._getCommandAndAncestors().forEach((cmd) => {
				cmd._checkForConflictingLocalOptions();
			});
		}
		parseOptions(argv) {
			const operands = [];
			const unknown = [];
			let dest = operands;
			const args = argv.slice();
			function maybeOption(arg) {
				return arg.length > 1 && arg[0] === "-";
			}
			let activeVariadicOption = null;
			while (args.length) {
				const arg = args.shift();
				if (arg === "--") {
					if (dest === unknown) dest.push(arg);
					dest.push(...args);
					break;
				}
				if (activeVariadicOption && !maybeOption(arg)) {
					this.emit(`option:${activeVariadicOption.name()}`, arg);
					continue;
				}
				activeVariadicOption = null;
				if (maybeOption(arg)) {
					const option = this._findOption(arg);
					if (option) {
						if (option.required) {
							const value = args.shift();
							if (value === undefined) this.optionMissingArgument(option);
							this.emit(`option:${option.name()}`, value);
						} else if (option.optional) {
							let value = null;
							if (args.length > 0 && !maybeOption(args[0])) {
								value = args.shift();
							}
							this.emit(`option:${option.name()}`, value);
						} else {
							this.emit(`option:${option.name()}`);
						}
						activeVariadicOption = option.variadic ? option : null;
						continue;
					}
				}
				if (arg.length > 2 && arg[0] === "-" && arg[1] !== "-") {
					const option = this._findOption(`-${arg[1]}`);
					if (option) {
						if (
							option.required ||
							(option.optional && this._combineFlagAndOptionalValue)
						) {
							this.emit(`option:${option.name()}`, arg.slice(2));
						} else {
							this.emit(`option:${option.name()}`);
							args.unshift(`-${arg.slice(2)}`);
						}
						continue;
					}
				}
				if (/^--[^=]+=/.test(arg)) {
					const index = arg.indexOf("=");
					const option = this._findOption(arg.slice(0, index));
					if (option && (option.required || option.optional)) {
						this.emit(`option:${option.name()}`, arg.slice(index + 1));
						continue;
					}
				}
				if (maybeOption(arg)) {
					dest = unknown;
				}
				if (
					(this._enablePositionalOptions || this._passThroughOptions) &&
					operands.length === 0 &&
					unknown.length === 0
				) {
					if (this._findCommand(arg)) {
						operands.push(arg);
						if (args.length > 0) unknown.push(...args);
						break;
					} else if (
						this._getHelpCommand() &&
						arg === this._getHelpCommand().name()
					) {
						operands.push(arg);
						if (args.length > 0) operands.push(...args);
						break;
					} else if (this._defaultCommandName) {
						unknown.push(arg);
						if (args.length > 0) unknown.push(...args);
						break;
					}
				}
				if (this._passThroughOptions) {
					dest.push(arg);
					if (args.length > 0) dest.push(...args);
					break;
				}
				dest.push(arg);
			}
			return { operands, unknown };
		}
		opts() {
			if (this._storeOptionsAsProperties) {
				const result = {};
				const len = this.options.length;
				for (let i = 0; i < len; i++) {
					const key = this.options[i].attributeName();
					result[key] =
						key === this._versionOptionName ? this._version : this[key];
				}
				return result;
			}
			return this._optionValues;
		}
		optsWithGlobals() {
			return this._getCommandAndAncestors().reduce(
				(combinedOptions, cmd) => Object.assign(combinedOptions, cmd.opts()),
				{},
			);
		}
		error(message, errorOptions) {
			this._outputConfiguration.outputError(
				`${message}
`,
				this._outputConfiguration.writeErr,
			);
			if (typeof this._showHelpAfterError === "string") {
				this._outputConfiguration.writeErr(`${this._showHelpAfterError}
`);
			} else if (this._showHelpAfterError) {
				this._outputConfiguration.writeErr(`
`);
				this.outputHelp({ error: true });
			}
			const config = errorOptions || {};
			const exitCode = config.exitCode || 1;
			const code = config.code || "commander.error";
			this._exit(exitCode, code, message);
		}
		_parseOptionsEnv() {
			this.options.forEach((option) => {
				if (option.envVar && option.envVar in process2.env) {
					const optionKey = option.attributeName();
					if (
						this.getOptionValue(optionKey) === undefined ||
						["default", "config", "env"].includes(
							this.getOptionValueSource(optionKey),
						)
					) {
						if (option.required || option.optional) {
							this.emit(
								`optionEnv:${option.name()}`,
								process2.env[option.envVar],
							);
						} else {
							this.emit(`optionEnv:${option.name()}`);
						}
					}
				}
			});
		}
		_parseOptionsImplied() {
			const dualHelper = new DualOptions(this.options);
			const hasCustomOptionValue = (optionKey) => {
				return (
					this.getOptionValue(optionKey) !== undefined &&
					!["default", "implied"].includes(this.getOptionValueSource(optionKey))
				);
			};
			this.options
				.filter(
					(option) =>
						option.implied !== undefined &&
						hasCustomOptionValue(option.attributeName()) &&
						dualHelper.valueFromOption(
							this.getOptionValue(option.attributeName()),
							option,
						),
				)
				.forEach((option) => {
					Object.keys(option.implied)
						.filter((impliedKey) => !hasCustomOptionValue(impliedKey))
						.forEach((impliedKey) => {
							this.setOptionValueWithSource(
								impliedKey,
								option.implied[impliedKey],
								"implied",
							);
						});
				});
		}
		missingArgument(name) {
			const message = `error: missing required argument '${name}'`;
			this.error(message, { code: "commander.missingArgument" });
		}
		optionMissingArgument(option) {
			const message = `error: option '${option.flags}' argument missing`;
			this.error(message, { code: "commander.optionMissingArgument" });
		}
		missingMandatoryOptionValue(option) {
			const message = `error: required option '${option.flags}' not specified`;
			this.error(message, { code: "commander.missingMandatoryOptionValue" });
		}
		_conflictingOption(option, conflictingOption) {
			const findBestOptionFromValue = (option2) => {
				const optionKey = option2.attributeName();
				const optionValue = this.getOptionValue(optionKey);
				const negativeOption = this.options.find(
					(target) => target.negate && optionKey === target.attributeName(),
				);
				const positiveOption = this.options.find(
					(target) => !target.negate && optionKey === target.attributeName(),
				);
				if (
					negativeOption &&
					((negativeOption.presetArg === undefined && optionValue === false) ||
						(negativeOption.presetArg !== undefined &&
							optionValue === negativeOption.presetArg))
				) {
					return negativeOption;
				}
				return positiveOption || option2;
			};
			const getErrorMessage = (option2) => {
				const bestOption = findBestOptionFromValue(option2);
				const optionKey = bestOption.attributeName();
				const source = this.getOptionValueSource(optionKey);
				if (source === "env") {
					return `environment variable '${bestOption.envVar}'`;
				}
				return `option '${bestOption.flags}'`;
			};
			const message = `error: ${getErrorMessage(option)} cannot be used with ${getErrorMessage(conflictingOption)}`;
			this.error(message, { code: "commander.conflictingOption" });
		}
		unknownOption(flag) {
			if (this._allowUnknownOption) return;
			let suggestion = "";
			if (flag.startsWith("--") && this._showSuggestionAfterError) {
				let candidateFlags = [];
				let command = this;
				do {
					const moreFlags = command
						.createHelp()
						.visibleOptions(command)
						.filter((option) => option.long)
						.map((option) => option.long);
					candidateFlags = candidateFlags.concat(moreFlags);
					command = command.parent;
				} while (command && !command._enablePositionalOptions);
				suggestion = suggestSimilar(flag, candidateFlags);
			}
			const message = `error: unknown option '${flag}'${suggestion}`;
			this.error(message, { code: "commander.unknownOption" });
		}
		_excessArguments(receivedArgs) {
			if (this._allowExcessArguments) return;
			const expected = this.registeredArguments.length;
			const s = expected === 1 ? "" : "s";
			const forSubcommand = this.parent ? ` for '${this.name()}'` : "";
			const message = `error: too many arguments${forSubcommand}. Expected ${expected} argument${s} but got ${receivedArgs.length}.`;
			this.error(message, { code: "commander.excessArguments" });
		}
		unknownCommand() {
			const unknownName = this.args[0];
			let suggestion = "";
			if (this._showSuggestionAfterError) {
				const candidateNames = [];
				this.createHelp()
					.visibleCommands(this)
					.forEach((command) => {
						candidateNames.push(command.name());
						if (command.alias()) candidateNames.push(command.alias());
					});
				suggestion = suggestSimilar(unknownName, candidateNames);
			}
			const message = `error: unknown command '${unknownName}'${suggestion}`;
			this.error(message, { code: "commander.unknownCommand" });
		}
		version(str, flags, description) {
			if (str === undefined) return this._version;
			this._version = str;
			flags = flags || "-V, --version";
			description = description || "output the version number";
			const versionOption = this.createOption(flags, description);
			this._versionOptionName = versionOption.attributeName();
			this._registerOption(versionOption);
			this.on("option:" + versionOption.name(), () => {
				this._outputConfiguration.writeOut(`${str}
`);
				this._exit(0, "commander.version", str);
			});
			return this;
		}
		description(str, argsDescription) {
			if (str === undefined && argsDescription === undefined)
				return this._description;
			this._description = str;
			if (argsDescription) {
				this._argsDescription = argsDescription;
			}
			return this;
		}
		summary(str) {
			if (str === undefined) return this._summary;
			this._summary = str;
			return this;
		}
		alias(alias) {
			if (alias === undefined) return this._aliases[0];
			let command = this;
			if (
				this.commands.length !== 0 &&
				this.commands[this.commands.length - 1]._executableHandler
			) {
				command = this.commands[this.commands.length - 1];
			}
			if (alias === command._name)
				throw new Error("Command alias can't be the same as its name");
			const matchingCommand = this.parent?._findCommand(alias);
			if (matchingCommand) {
				const existingCmd = [matchingCommand.name()]
					.concat(matchingCommand.aliases())
					.join("|");
				throw new Error(
					`cannot add alias '${alias}' to command '${this.name()}' as already have command '${existingCmd}'`,
				);
			}
			command._aliases.push(alias);
			return this;
		}
		aliases(aliases) {
			if (aliases === undefined) return this._aliases;
			aliases.forEach((alias) => this.alias(alias));
			return this;
		}
		usage(str) {
			if (str === undefined) {
				if (this._usage) return this._usage;
				const args = this.registeredArguments.map((arg) => {
					return humanReadableArgName(arg);
				});
				return []
					.concat(
						this.options.length || this._helpOption !== null ? "[options]" : [],
						this.commands.length ? "[command]" : [],
						this.registeredArguments.length ? args : [],
					)
					.join(" ");
			}
			this._usage = str;
			return this;
		}
		name(str) {
			if (str === undefined) return this._name;
			this._name = str;
			return this;
		}
		nameFromFilename(filename) {
			this._name = path.basename(filename, path.extname(filename));
			return this;
		}
		executableDir(path2) {
			if (path2 === undefined) return this._executableDir;
			this._executableDir = path2;
			return this;
		}
		helpInformation(contextOptions) {
			const helper = this.createHelp();
			const context = this._getOutputContext(contextOptions);
			helper.prepareContext({
				error: context.error,
				helpWidth: context.helpWidth,
				outputHasColors: context.hasColors,
			});
			const text = helper.formatHelp(this, helper);
			if (context.hasColors) return text;
			return this._outputConfiguration.stripColor(text);
		}
		_getOutputContext(contextOptions) {
			contextOptions = contextOptions || {};
			const error = !!contextOptions.error;
			let baseWrite;
			let hasColors;
			let helpWidth;
			if (error) {
				baseWrite = (str) => this._outputConfiguration.writeErr(str);
				hasColors = this._outputConfiguration.getErrHasColors();
				helpWidth = this._outputConfiguration.getErrHelpWidth();
			} else {
				baseWrite = (str) => this._outputConfiguration.writeOut(str);
				hasColors = this._outputConfiguration.getOutHasColors();
				helpWidth = this._outputConfiguration.getOutHelpWidth();
			}
			const write = (str) => {
				if (!hasColors) str = this._outputConfiguration.stripColor(str);
				return baseWrite(str);
			};
			return { error, write, hasColors, helpWidth };
		}
		outputHelp(contextOptions) {
			let deprecatedCallback;
			if (typeof contextOptions === "function") {
				deprecatedCallback = contextOptions;
				contextOptions = undefined;
			}
			const outputContext = this._getOutputContext(contextOptions);
			const eventContext = {
				error: outputContext.error,
				write: outputContext.write,
				command: this,
			};
			this._getCommandAndAncestors()
				.reverse()
				.forEach((command) => command.emit("beforeAllHelp", eventContext));
			this.emit("beforeHelp", eventContext);
			let helpInformation = this.helpInformation({
				error: outputContext.error,
			});
			if (deprecatedCallback) {
				helpInformation = deprecatedCallback(helpInformation);
				if (
					typeof helpInformation !== "string" &&
					!Buffer.isBuffer(helpInformation)
				) {
					throw new Error(
						"outputHelp callback must return a string or a Buffer",
					);
				}
			}
			outputContext.write(helpInformation);
			if (this._getHelpOption()?.long) {
				this.emit(this._getHelpOption().long);
			}
			this.emit("afterHelp", eventContext);
			this._getCommandAndAncestors().forEach((command) =>
				command.emit("afterAllHelp", eventContext),
			);
		}
		helpOption(flags, description) {
			if (typeof flags === "boolean") {
				if (flags) {
					this._helpOption = this._helpOption ?? undefined;
				} else {
					this._helpOption = null;
				}
				return this;
			}
			flags = flags ?? "-h, --help";
			description = description ?? "display help for command";
			this._helpOption = this.createOption(flags, description);
			return this;
		}
		_getHelpOption() {
			if (this._helpOption === undefined) {
				this.helpOption(undefined, undefined);
			}
			return this._helpOption;
		}
		addHelpOption(option) {
			this._helpOption = option;
			return this;
		}
		help(contextOptions) {
			this.outputHelp(contextOptions);
			let exitCode = Number(process2.exitCode ?? 0);
			if (
				exitCode === 0 &&
				contextOptions &&
				typeof contextOptions !== "function" &&
				contextOptions.error
			) {
				exitCode = 1;
			}
			this._exit(exitCode, "commander.help", "(outputHelp)");
		}
		addHelpText(position, text) {
			const allowedValues = ["beforeAll", "before", "after", "afterAll"];
			if (!allowedValues.includes(position)) {
				throw new Error(`Unexpected value for position to addHelpText.
Expecting one of '${allowedValues.join("', '")}'`);
			}
			const helpEvent = `${position}Help`;
			this.on(helpEvent, (context) => {
				let helpStr;
				if (typeof text === "function") {
					helpStr = text({ error: context.error, command: context.command });
				} else {
					helpStr = text;
				}
				if (helpStr) {
					context.write(`${helpStr}
`);
				}
			});
			return this;
		}
		_outputHelpIfRequested(args) {
			const helpOption = this._getHelpOption();
			const helpRequested =
				helpOption && args.find((arg) => helpOption.is(arg));
			if (helpRequested) {
				this.outputHelp();
				this._exit(0, "commander.helpDisplayed", "(outputHelp)");
			}
		}
	}
	function incrementNodeInspectorPort(args) {
		return args.map((arg) => {
			if (!arg.startsWith("--inspect")) {
				return arg;
			}
			let debugOption;
			let debugHost = "127.0.0.1";
			let debugPort = "9229";
			let match;
			if ((match = arg.match(/^(--inspect(-brk)?)$/)) !== null) {
				debugOption = match[1];
			} else if (
				(match = arg.match(/^(--inspect(-brk|-port)?)=([^:]+)$/)) !== null
			) {
				debugOption = match[1];
				if (/^\d+$/.test(match[3])) {
					debugPort = match[3];
				} else {
					debugHost = match[3];
				}
			} else if (
				(match = arg.match(/^(--inspect(-brk|-port)?)=([^:]+):(\d+)$/)) !== null
			) {
				debugOption = match[1];
				debugHost = match[3];
				debugPort = match[4];
			}
			if (debugOption && debugPort !== "0") {
				return `${debugOption}=${debugHost}:${Number.parseInt(debugPort) + 1}`;
			}
			return arg;
		});
	}
	function useColor() {
		if (
			process2.env.NO_COLOR ||
			process2.env.FORCE_COLOR === "0" ||
			process2.env.FORCE_COLOR === "false"
		)
			return false;
		if (process2.env.FORCE_COLOR || process2.env.CLICOLOR_FORCE !== undefined)
			return true;
		return;
	}
	exports.Command = Command;
	exports.useColor = useColor;
});

// node_modules/commander/index.js
var require_commander = __commonJS((exports) => {
	var { Argument } = require_argument();
	var { Command } = require_command();
	var { CommanderError, InvalidArgumentError } = require_error();
	var { Help } = require_help();
	var { Option } = require_option();
	exports.program = new Command();
	exports.createCommand = (name) => new Command(name);
	exports.createOption = (flags, description) => new Option(flags, description);
	exports.createArgument = (name, description) =>
		new Argument(name, description);
	exports.Command = Command;
	exports.Option = Option;
	exports.Argument = Argument;
	exports.Help = Help;
	exports.CommanderError = CommanderError;
	exports.InvalidArgumentError = InvalidArgumentError;
	exports.InvalidOptionArgumentError = InvalidArgumentError;
});

// node_modules/commander/esm.mjs
var import__ = __toESM(require_commander(), 1);
var {
	program,
	createCommand,
	createArgument,
	createOption,
	CommanderError,
	InvalidArgumentError,
	InvalidOptionArgumentError,
	Command,
	Argument,
	Option,
	Help,
} = import__.default;
// package.json
var package_default = {
	name: "mama",
	version: "1.0.0",
	description: "My custom CLI tool",
	main: "bin/index.ts",
	bin: {
		mama: "bin/index.ts",
	},
	type: "module",
	scripts: {
		build: "bun build bin/index.ts --outdir bin",
		start: "bun bin/index.ts",
	},
	dependencies: {
		commander: "^13.0.0",
	},
	devDependencies: {
		"@types/bun": "latest",
	},
	peerDependencies: {
		typescript: "^5.0.0",
	},
};

// src/main.ts
function run() {
	const program2 = new Command();
	program2
		.name("wahyu")
		.description("Tool untuk mempercepat development")
		.version(package_default.version);
	program2
		.command("hello")
		.description('Menampilkan pesan "Halo, Dunia!"')
		.action(() => {
			console.log("Halo, Dunia!");
		});
}

// bin/index.ts
run();
