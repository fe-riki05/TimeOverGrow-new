(window.webpackJsonp = window.webpackJsonp || []).push([
	[2],
	{
		151(t, e, n) {
			'use strict'
			n(25)
			const r = n(47)
			e.a = function (t) {
				const e = t.store
				return new Promise(function (t) {
					Object(r.a)().onAuthStateChanged(function (n) {
						e.commit('setUser', n), t()
					})
				})
			}
		},
		154(t, e, n) {
			'use strict'
			n(69), n(49), n(44), n(54), n(25), n(57), n(68), n(53)
			const r = n(2)
			function o(t, e) {
				let n
				if (typeof Symbol === 'undefined' || t[Symbol.iterator] == null) {
					if (
						Array.isArray(t) ||
						(n = (function (t, e) {
							if (!t) return
							if (typeof t === 'string') return c(t, e)
							let n = Object.prototype.toString.call(t).slice(8, -1)
							n === 'Object' && t.constructor && (n = t.constructor.name)
							if (n === 'Map' || n === 'Set') return Array.from(t)
							if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return c(t, e)
						})(t)) ||
						(e && t && typeof t.length === 'number')
					) {
						n && (t = n)
						let i = 0
						const r = function () {}
						return {
							s: r,
							n() {
								return i >= t.length ? { done: !0 } : { done: !1, value: t[i++] }
							},
							e(t) {
								throw t
							},
							f: r
						}
					}
					throw new TypeError(
						'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
					)
				}
				let o
				let f = !0
				let l = !1
				return {
					s() {
						n = t[Symbol.iterator]()
					},
					n() {
						const t = n.next()
						return (f = t.done), t
					},
					e(t) {
						(l = !0), (o = t)
					},
					f() {
						try {
							f || n.return == null || n.return()
						} finally {
							if (l) throw o
						}
					}
				}
			}
			function c(t, e) {
				(e == null || e > t.length) && (e = t.length)
				for (var i = 0, n = new Array(e); i < e; i++) n[i] = t[i]
				return n
			}
			const f =
				window.requestIdleCallback ||
				function (t) {
					const e = Date.now()
					return setTimeout(function () {
						t({
							didTimeout: !1,
							timeRemaining() {
								return Math.max(0, 50 - (Date.now() - e))
							}
						})
					}, 1)
				}
			const l =
				window.cancelIdleCallback ||
				function (t) {
					clearTimeout(t)
				}
			const h =
				window.IntersectionObserver &&
				new window.IntersectionObserver(function (t) {
					t.forEach(function (t) {
						const e = t.intersectionRatio
						const link = t.target
						e <= 0 || link.__prefetch()
					})
				})
			e.a = {
				name: 'NuxtLink',
				extends: r.default.component('RouterLink'),
				props: { prefetch: { type: Boolean, default: !0 }, noPrefetch: { type: Boolean, default: !1 } },
				mounted() {
					this.prefetch && !this.noPrefetch && (this.handleId = f(this.observe, { timeout: 2e3 }))
				},
				beforeDestroy() {
					l(this.handleId), this.__observed && (h.unobserve(this.$el), delete this.$el.__prefetch)
				},
				methods: {
					observe() {
						h &&
							this.shouldPrefetch() &&
							((this.$el.__prefetch = this.prefetchLink.bind(this)), h.observe(this.$el), (this.__observed = !0))
					},
					shouldPrefetch() {
						return this.getPrefetchComponents().length > 0
					},
					canPrefetch() {
						const t = navigator.connection
						return !(this.$nuxt.isOffline || (t && ((t.effectiveType || '').includes('2g') || t.saveData)))
					},
					getPrefetchComponents() {
						return this.$router
							.resolve(this.to, this.$route, this.append)
							.resolved.matched.map(function (t) {
								return t.components.default
							})
							.filter(function (t) {
								return typeof t === 'function' && !t.options && !t.__prefetched
							})
					},
					prefetchLink() {
						if (this.canPrefetch()) {
							h.unobserve(this.$el)
							let t
							const e = o(this.getPrefetchComponents())
							try {
								for (e.s(); !(t = e.n()).done; ) {
									const n = t.value
									const r = n()
									r instanceof Promise && r.catch(function () {}), (n.__prefetched = !0)
								}
							} catch (t) {
								e.e(t)
							} finally {
								e.f()
							}
						}
					}
				}
			}
		},
		192(t, e, n) {
			'use strict'
			const r = {}
			;(r.authenticated = n(268)), (r.authenticated = r.authenticated.default || r.authenticated), (e.a = r)
		},
		229(t, e, n) {
			let content = n(281)
			typeof content === 'string' && (content = [[t.i, content, '']]), content.locals && (t.exports = content.locals)
			;(0, n(13).default)('8bf0208a', content, !0, { sourceMap: !1 })
		},
		230(t, e, n) {
			let content = n(285)
			typeof content === 'string' && (content = [[t.i, content, '']]), content.locals && (t.exports = content.locals)
			;(0, n(13).default)('7e56e4e3', content, !0, { sourceMap: !1 })
		},
		231(t, e, n) {
			let content = n(287)
			typeof content === 'string' && (content = [[t.i, content, '']]), content.locals && (t.exports = content.locals)
			;(0, n(13).default)('56b15182', content, !0, { sourceMap: !1 })
		},
		236(t, e, n) {
			let content = n(302)
			typeof content === 'string' && (content = [[t.i, content, '']]), content.locals && (t.exports = content.locals)
			;(0, n(13).default)('8ffa3da6', content, !0, { sourceMap: !1 })
		},
		242(t, e, n) {
			'use strict'
			const r = {
				name: 'TimeOverGrow',
				data() {
					return { title: 'TimeOverGrow', drawer: !1, group: null }
				},
				methods: {
					signOut(t) {
						const e = this
						this.$store
							.dispatch('signOut')
							.then(function () {
								e.$router.push({ name: 'login' })
							})
							.catch(function (t) {
								console.error(t.message)
							}),
							console.log(t)
					}
				}
			}
			const o = (n(301), n(67))
			const c = n(83)
			const f = n.n(c)
			const l = n(368)
			const h = n(366)
			const d = n(357)
			const m = n(186)
			const v = n(189)
			const y = n(115)
			const x = n(190)
			const w = n(97)
			const _ = n(91)
			const O = n(367)
			const $ = n(246)
			const component = Object(o.a)(
				r,
				function () {
					const t = this
					const e = t.$createElement
					const n = t._self._c || e
					return n(
						'div',
						{ staticClass: 'header' },
						[
							n(
								'v-card',
								{ staticClass: 'mx-auto overflow-hidden' },
								[
									n(
										'v-app-bar',
										{ attrs: { color: 'primary', dark: '', height: '100' } },
										[
											n('v-app-bar-nav-icon', {
												on: {
													click(e) {
														t.drawer = !0
													}
												}
											}),
											t._v(' '),
											n('v-toolbar-title', [t._v(t._s(t.title))])
										],
										1
									),
									t._v(' '),
									n(
										'v-navigation-drawer',
										{
											attrs: { absolute: '', temporary: '' },
											model: {
												value: t.drawer,
												callback(e) {
													t.drawer = e
												},
												expression: 'drawer'
											}
										},
										[
											n(
												'v-list',
												{ attrs: { nav: '', dense: '' } },
												[
													n(
														'v-list-item-group',
														{
															attrs: { 'active-class': 'deep-grey--text text--accent-4' },
															model: {
																value: t.group,
																callback(e) {
																	t.group = e
																},
																expression: 'group'
															}
														},
														[
															n(
																'v-list-item',
																{ attrs: { color: 'grey darken-3' }, on: { click: t.signOut } },
																[
																	n('v-list-item-icon', [n('v-icon', [t._v('mdi-arrow-left-bold')])], 1),
																	t._v(' '),
																	n('v-list-item-title', [t._v('ログアウト')])
																],
																1
															)
														],
														1
													)
												],
												1
											)
										],
										1
									)
								],
								1
							)
						],
						1
					)
				},
				[],
				!1,
				null,
				'705773b6',
				null
			)
			e.a = component.exports
			f()(component, {
				VAppBar: l.a,
				VAppBarNavIcon: h.a,
				VCard: d.a,
				VIcon: m.a,
				VList: v.a,
				VListItem: y.a,
				VListItemGroup: x.a,
				VListItemIcon: w.a,
				VListItemTitle: _.a,
				VNavigationDrawer: O.a,
				VToolbarTitle: $.a
			})
		},
		247(t, e, n) {
			'use strict'
			n(25), n(53), n(101)
			const r = n(29)
			const o = n(2)
			const c = n(6)
			const f = window.__NUXT__
			function l() {
				if (!this._hydrated) return this.$fetch()
			}
			function h() {
				if ((t = this).$vnode && t.$vnode.elm && t.$vnode.elm.dataset && t.$vnode.elm.dataset.fetchKey) {
					var t
					;(this._hydrated = !0), (this._fetchKey = +this.$vnode.elm.dataset.fetchKey)
					const data = f.fetch[this._fetchKey]
					if (data && data._error) this.$fetchState.error = data._error
					else for (const e in data) o.default.set(this.$data, e, data[e])
				}
			}
			function d() {
				const t = this
				return (
					this._fetchPromise ||
						(this._fetchPromise = m.call(this).then(function () {
							delete t._fetchPromise
						})),
					this._fetchPromise
				)
			}
			function m() {
				return v.apply(this, arguments)
			}
			function v() {
				return (v = Object(r.a)(
					regeneratorRuntime.mark(function t() {
						let e
						let n
						let r
						const o = this
						return regeneratorRuntime.wrap(
							function (t) {
								for (;;)
									switch ((t.prev = t.next)) {
										case 0:
											return (
												this.$nuxt.nbFetching++,
												(this.$fetchState.pending = !0),
												(this.$fetchState.error = null),
												(this._hydrated = !1),
												(e = null),
												(n = Date.now()),
												(t.prev = 6),
												(t.next = 9),
												this.$options.fetch.call(this)
											)
										case 9:
											t.next = 15
											break
										case 11:
											(t.prev = 11), (t.t0 = t.catch(6)), (e = Object(c.p)(t.t0))
										case 15:
											if (!((r = this._fetchDelay - (Date.now() - n)) > 0)) {
												t.next = 19
												break
											}
											return (
												(t.next = 19),
												new Promise(function (t) {
													return setTimeout(t, r)
												})
											)
										case 19:
											(this.$fetchState.error = e),
												(this.$fetchState.pending = !1),
												(this.$fetchState.timestamp = Date.now()),
												this.$nextTick(function () {
													return o.$nuxt.nbFetching--
												})
										case 23:
										case 'end':
											return t.stop()
									}
							},
							t,
							this,
							[[6, 11]]
						)
					})
				)).apply(this, arguments)
			}
			e.a = {
				beforeCreate() {
					Object(c.l)(this) &&
						((this._fetchDelay = typeof this.$options.fetchDelay === 'number' ? this.$options.fetchDelay : 200),
						o.default.util.defineReactive(this, '$fetchState', { pending: !1, error: null, timestamp: Date.now() }),
						(this.$fetch = d.bind(this)),
						Object(c.a)(this, 'created', h),
						Object(c.a)(this, 'beforeMount', l))
				}
			}
		},
		253(t, e, n) {
			n(254), (t.exports = n(255))
		},
		255(t, e, n) {
			'use strict'
			n.r(e),
				function (t) {
					n(24),
						n(69),
						n(49),
						n(44),
						n(54),
						n(102),
						n(45),
						n(56),
						n(25),
						n(30),
						n(57),
						n(76),
						n(113),
						n(68),
						n(85),
						n(53)
					const e = n(18)
					const r = (n(101), n(29))
					const o = (n(176), n(261), n(266), n(267), n(2))
					const c = n(243)
					const f = n(192)
					const l = n(6)
					const h = n(66)
					const d = n(247)
					const m = n(154)
					function v(t, e) {
						let n
						if (typeof Symbol === 'undefined' || t[Symbol.iterator] == null) {
							if (
								Array.isArray(t) ||
								(n = (function (t, e) {
									if (!t) return
									if (typeof t === 'string') return y(t, e)
									let n = Object.prototype.toString.call(t).slice(8, -1)
									n === 'Object' && t.constructor && (n = t.constructor.name)
									if (n === 'Map' || n === 'Set') return Array.from(t)
									if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return y(t, e)
								})(t)) ||
								(e && t && typeof t.length === 'number')
							) {
								n && (t = n)
								let i = 0
								const r = function () {}
								return {
									s: r,
									n() {
										return i >= t.length ? { done: !0 } : { done: !1, value: t[i++] }
									},
									e(t) {
										throw t
									},
									f: r
								}
							}
							throw new TypeError(
								'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
							)
						}
						let o
						let c = !0
						let f = !1
						return {
							s() {
								n = t[Symbol.iterator]()
							},
							n() {
								const t = n.next()
								return (c = t.done), t
							},
							e(t) {
								(f = !0), (o = t)
							},
							f() {
								try {
									c || n.return == null || n.return()
								} finally {
									if (f) throw o
								}
							}
						}
					}
					function y(t, e) {
						(e == null || e > t.length) && (e = t.length)
						for (var i = 0, n = new Array(e); i < e; i++) n[i] = t[i]
						return n
					}
					o.default.__nuxt__fetch__mixin__ || (o.default.mixin(d.a), (o.default.__nuxt__fetch__mixin__ = !0)),
						o.default.component(m.a.name, m.a),
						o.default.component('NLink', m.a),
						t.fetch || (t.fetch = c.a)
					let x
					let w
					let _ = []
					const O = window.__NUXT__ || {}
					Object.assign(o.default.config, { silent: !0, performance: !1 })
					const $ = o.default.config.errorHandler || console.error
					function j(t, e, n) {
						for (
							var r = function (component) {
									const t =
										(function (component, t) {
											if (!component || !component.options || !component.options[t]) return {}
											const option = component.options[t]
											if (typeof option === 'function') {
												for (var e = arguments.length, n = new Array(e > 2 ? e - 2 : 0), r = 2; r < e; r++)
													n[r - 2] = arguments[r]
												return option.apply(void 0, n)
											}
											return option
										})(component, 'transition', e, n) || {}
									return typeof t === 'string' ? { name: t } : t
								},
								o = n ? Object(l.g)(n) : [],
								c = Math.max(t.length, o.length),
								f = [],
								h = function (i) {
									const e = Object.assign({}, r(t[i]))
									const n = Object.assign({}, r(o[i]))
									Object.keys(e)
										.filter(function (t) {
											return void 0 !== e[t] && !t.toLowerCase().includes('leave')
										})
										.forEach(function (t) {
											n[t] = e[t]
										}),
										f.push(n)
								},
								i = 0;
							i < c;
							i++
						)
							h(i)
						return f
					}
					function k(t, e, n) {
						return C.apply(this, arguments)
					}
					function C() {
						return (C = Object(r.a)(
							regeneratorRuntime.mark(function t(e, n, r) {
								let o
								let c
								let f
								let h
								const d = this
								return regeneratorRuntime.wrap(
									function (t) {
										for (;;)
											switch ((t.prev = t.next)) {
												case 0:
													if (
														((this._routeChanged = Boolean(x.nuxt.err) || n.name !== e.name),
														(this._paramChanged = !this._routeChanged && n.path !== e.path),
														(this._queryChanged = !this._paramChanged && n.fullPath !== e.fullPath),
														(this._diffQuery = this._queryChanged ? Object(l.i)(e.query, n.query) : []),
														(this._routeChanged || this._paramChanged) &&
															this.$loading.start &&
															!this.$loading.manual &&
															this.$loading.start(),
														(t.prev = 5),
														!this._queryChanged)
													) {
														t.next = 12
														break
													}
													return (
														(t.next = 9),
														Object(l.r)(e, function (t, e) {
															return { Component: t, instance: e }
														})
													)
												case 9:
													(o = t.sent),
														o.some(function (t) {
															const r = t.Component
															const o = t.instance
															const c = r.options.watchQuery
															return (
																!0 === c ||
																(Array.isArray(c)
																	? c.some(function (t) {
																			return d._diffQuery[t]
																	  })
																	: typeof c === 'function' && c.apply(o, [e.query, n.query]))
															)
														}) &&
															this.$loading.start &&
															!this.$loading.manual &&
															this.$loading.start()
												case 12:
													r(), (t.next = 26)
													break
												case 15:
													if (
														((t.prev = 15),
														(t.t0 = t.catch(5)),
														(c = t.t0 || {}),
														(f = c.statusCode || c.status || (c.response && c.response.status) || 500),
														(h = c.message || ''),
														!/^Loading( CSS)? chunk (\d)+ failed\./.test(h))
													) {
														t.next = 23
														break
													}
													return window.location.reload(!0), t.abrupt('return')
												case 23:
													this.error({ statusCode: f, message: h }), this.$nuxt.$emit('routeChanged', e, n, c), r()
												case 26:
												case 'end':
													return t.stop()
											}
									},
									t,
									this,
									[[5, 15]]
								)
							})
						)).apply(this, arguments)
					}
					function E(t, e) {
						return O.serverRendered && e && Object(l.b)(t, e), (t._Ctor = t), t
					}
					function S(t) {
						const path = Object(l.f)(t.options.base, t.options.mode)
						return Object(l.d)(
							t.match(path),
							(function () {
								const t = Object(r.a)(
									regeneratorRuntime.mark(function t(e, n, r, o, c) {
										let f
										return regeneratorRuntime.wrap(function (t) {
											for (;;)
												switch ((t.prev = t.next)) {
													case 0:
														if (typeof e !== 'function' || e.options) {
															t.next = 4
															break
														}
														return (t.next = 3), e()
													case 3:
														e = t.sent
													case 4:
														return (
															(f = E(Object(l.s)(e), O.data ? O.data[c] : null)),
															(r.components[o] = f),
															t.abrupt('return', f)
														)
													case 7:
													case 'end':
														return t.stop()
												}
										}, t)
									})
								)
								return function (e, n, r, o, c) {
									return t.apply(this, arguments)
								}
							})()
						)
					}
					function R(t, e, n) {
						const r = this
						let o = ['authenticated']
						let c = !1
						if (
							(void 0 !== n &&
								((o = []),
								(n = Object(l.s)(n)).options.middleware && (o = o.concat(n.options.middleware)),
								t.forEach(function (t) {
									t.options.middleware && (o = o.concat(t.options.middleware))
								})),
							(o = o.map(function (t) {
								return typeof t === 'function'
									? t
									: (typeof f.a[t] !== 'function' &&
											((c = !0), r.error({ statusCode: 500, message: 'Unknown middleware ' + t })),
									  f.a[t])
							})),
							!c)
						)
							return Object(l.o)(o, e)
					}
					function A(t, e, n) {
						return P.apply(this, arguments)
					}
					function P() {
						return (P = Object(r.a)(
							regeneratorRuntime.mark(function t(e, n, o) {
								let c
								let f
								let d
								let m
								let y
								let w
								let O
								let $
								let k
								let C
								let E
								let S
								let A
								let P
								let T
								const N = this
								return regeneratorRuntime.wrap(
									function (t) {
										for (;;)
											switch ((t.prev = t.next)) {
												case 0:
													if (!1 !== this._routeChanged || !1 !== this._paramChanged || !1 !== this._queryChanged) {
														t.next = 2
														break
													}
													return t.abrupt('return', o())
												case 2:
													return (
														!1,
														e === n
															? ((_ = []), !0)
															: ((c = []),
															  (_ = Object(l.g)(n, c).map(function (t, i) {
																	return Object(l.c)(n.matched[c[i]].path)(n.params)
															  }))),
														(f = !1),
														(d = function (path) {
															n.path === path.path && N.$loading.finish && N.$loading.finish(),
																n.path !== path.path && N.$loading.pause && N.$loading.pause(),
																f || ((f = !0), o(path))
														}),
														(t.next = 8),
														Object(l.t)(x, { route: e, from: n, next: d.bind(this) })
													)
												case 8:
													if (
														((this._dateLastError = x.nuxt.dateErr),
														(this._hadError = Boolean(x.nuxt.err)),
														(m = []),
														(y = Object(l.g)(e, m)).length)
													) {
														t.next = 27
														break
													}
													return (t.next = 15), R.call(this, y, x.context)
												case 15:
													if (!f) {
														t.next = 17
														break
													}
													return t.abrupt('return')
												case 17:
													return (
														(w = (h.a.options || h.a).layout),
														(t.next = 20),
														this.loadLayout(typeof w === 'function' ? w.call(h.a, x.context) : w)
													)
												case 20:
													return (O = t.sent), (t.next = 23), R.call(this, y, x.context, O)
												case 23:
													if (!f) {
														t.next = 25
														break
													}
													return t.abrupt('return')
												case 25:
													return (
														x.context.error({ statusCode: 404, message: 'This page could not be found' }),
														t.abrupt('return', o())
													)
												case 27:
													return (
														y.forEach(function (t) {
															t._Ctor &&
																t._Ctor.options &&
																((t.options.asyncData = t._Ctor.options.asyncData),
																(t.options.fetch = t._Ctor.options.fetch))
														}),
														this.setTransitions(j(y, e, n)),
														(t.prev = 29),
														(t.next = 32),
														R.call(this, y, x.context)
													)
												case 32:
													if (!f) {
														t.next = 34
														break
													}
													return t.abrupt('return')
												case 34:
													if (!x.context._errored) {
														t.next = 36
														break
													}
													return t.abrupt('return', o())
												case 36:
													return (
														typeof ($ = y[0].options.layout) === 'function' && ($ = $(x.context)),
														(t.next = 40),
														this.loadLayout($)
													)
												case 40:
													return ($ = t.sent), (t.next = 43), R.call(this, y, x.context, $)
												case 43:
													if (!f) {
														t.next = 45
														break
													}
													return t.abrupt('return')
												case 45:
													if (!x.context._errored) {
														t.next = 47
														break
													}
													return t.abrupt('return', o())
												case 47:
													(k = !0), (t.prev = 48), (C = v(y)), (t.prev = 50), C.s()
												case 52:
													if ((E = C.n()).done) {
														t.next = 63
														break
													}
													if (typeof (S = E.value).options.validate === 'function') {
														t.next = 56
														break
													}
													return t.abrupt('continue', 61)
												case 56:
													return (t.next = 58), S.options.validate(x.context)
												case 58:
													if ((k = t.sent)) {
														t.next = 61
														break
													}
													return t.abrupt('break', 63)
												case 61:
													t.next = 52
													break
												case 63:
													t.next = 68
													break
												case 65:
													(t.prev = 65), (t.t0 = t.catch(50)), C.e(t.t0)
												case 68:
													return (t.prev = 68), C.f(), t.finish(68)
												case 71:
													t.next = 77
													break
												case 73:
													return (
														(t.prev = 73),
														(t.t1 = t.catch(48)),
														this.error({ statusCode: t.t1.statusCode || '500', message: t.t1.message }),
														t.abrupt('return', o())
													)
												case 77:
													if (k) {
														t.next = 80
														break
													}
													return (
														this.error({ statusCode: 404, message: 'This page could not be found' }),
														t.abrupt('return', o())
													)
												case 80:
													return (
														(t.next = 82),
														Promise.all(
															y.map(
																(function () {
																	const t = Object(r.a)(
																		regeneratorRuntime.mark(function t(r, i) {
																			let o, c, f, h, d, v, y, w, p
																			return regeneratorRuntime.wrap(function (t) {
																				for (;;)
																					switch ((t.prev = t.next)) {
																						case 0:
																							if (
																								((r._path = Object(l.c)(e.matched[m[i]].path)(e.params)),
																								(r._dataRefresh = !1),
																								(o = r._path !== _[i]),
																								N._routeChanged && o
																									? (r._dataRefresh = !0)
																									: N._paramChanged && o
																									? ((c = r.options.watchParam), (r._dataRefresh = !1 !== c))
																									: N._queryChanged &&
																									  (!0 === (f = r.options.watchQuery)
																											? (r._dataRefresh = !0)
																											: Array.isArray(f)
																											? (r._dataRefresh = f.some(function (t) {
																													return N._diffQuery[t]
																											  }))
																											: typeof f === 'function' &&
																											  (A || (A = Object(l.h)(e)),
																											  (r._dataRefresh = f.apply(A[i], [e.query, n.query])))),
																								N._hadError || !N._isMounted || r._dataRefresh)
																							) {
																								t.next = 6
																								break
																							}
																							return t.abrupt('return')
																						case 6:
																							return (
																								(h = []),
																								(d = r.options.asyncData && typeof r.options.asyncData === 'function'),
																								(v = Boolean(r.options.fetch) && r.options.fetch.length),
																								(y = d && v ? 30 : 45),
																								d &&
																									((w = Object(l.q)(r.options.asyncData, x.context)).then(function (t) {
																										Object(l.b)(r, t), N.$loading.increase && N.$loading.increase(y)
																									}),
																									h.push(w)),
																								(N.$loading.manual = !1 === r.options.loading),
																								v &&
																									(((p = r.options.fetch(x.context)) &&
																										(p instanceof Promise || typeof p.then === 'function')) ||
																										(p = Promise.resolve(p)),
																									p.then(function (t) {
																										N.$loading.increase && N.$loading.increase(y)
																									}),
																									h.push(p)),
																								t.abrupt('return', Promise.all(h))
																							)
																						case 14:
																						case 'end':
																							return t.stop()
																					}
																			}, t)
																		})
																	)
																	return function (e, n) {
																		return t.apply(this, arguments)
																	}
																})()
															)
														)
													)
												case 82:
													f || (this.$loading.finish && !this.$loading.manual && this.$loading.finish(), o()),
														(t.next = 99)
													break
												case 85:
													if (((t.prev = 85), (t.t2 = t.catch(29)), (P = t.t2 || {}).message !== 'ERR_REDIRECT')) {
														t.next = 90
														break
													}
													return t.abrupt('return', this.$nuxt.$emit('routeChanged', e, n, P))
												case 90:
													return (
														(_ = []),
														Object(l.k)(P),
														typeof (T = (h.a.options || h.a).layout) === 'function' && (T = T(x.context)),
														(t.next = 96),
														this.loadLayout(T)
													)
												case 96:
													this.error(P), this.$nuxt.$emit('routeChanged', e, n, P), o()
												case 99:
												case 'end':
													return t.stop()
											}
									},
									t,
									this,
									[
										[29, 85],
										[48, 73],
										[50, 65, 68, 71]
									]
								)
							})
						)).apply(this, arguments)
					}
					function T(t, n) {
						Object(l.d)(t, function (t, n, r, c) {
							return (
								Object(e.a)(t) !== 'object' ||
									t.options ||
									(((t = o.default.extend(t))._Ctor = t), (r.components[c] = t)),
								t
							)
						})
					}
					function N(t) {
						let e = Boolean(this.$options.nuxt.err)
						this._hadError && this._dateLastError === this.$options.nuxt.dateErr && (e = !1)
						let n = e ? (h.a.options || h.a).layout : t.matched[0].components.default.options.layout
						typeof n === 'function' && (n = n(x.context)), this.setLayout(n)
					}
					function I(t) {
						t._hadError && t._dateLastError === t.$options.nuxt.dateErr && t.error()
					}
					function D(t, e) {
						const n = this
						if (!1 !== this._routeChanged || !1 !== this._paramChanged || !1 !== this._queryChanged) {
							const r = Object(l.h)(t)
							const c = Object(l.g)(t)
							let f = !1
							o.default.nextTick(function () {
								r.forEach(function (t, i) {
									if (
										t &&
										!t._isDestroyed &&
										t.constructor._dataRefresh &&
										c[i] === t.constructor &&
										!0 !== t.$vnode.data.keepAlive &&
										typeof t.constructor.options.data === 'function'
									) {
										const e = t.constructor.options.data.call(t)
										for (const n in e) o.default.set(t.$data, n, e[n])
										f = !0
									}
								}),
									f &&
										window.$nuxt.$nextTick(function () {
											window.$nuxt.$emit('triggerScroll')
										}),
									I(n)
							})
						}
					}
					function L(t) {
						window.onNuxtReadyCbs.forEach(function (e) {
							typeof e === 'function' && e(t)
						}),
							typeof window._onNuxtLoaded === 'function' && window._onNuxtLoaded(t),
							w.afterEach(function (e, n) {
								o.default.nextTick(function () {
									return t.$nuxt.$emit('routeChanged', e, n)
								})
							})
					}
					function M() {
						return (M = Object(r.a)(
							regeneratorRuntime.mark(function t(e) {
								let n, r, c, f
								return regeneratorRuntime.wrap(function (t) {
									for (;;)
										switch ((t.prev = t.next)) {
											case 0:
												return (
													(x = e.app),
													(w = e.router),
													e.store,
													(n = new o.default(x)),
													(r = function () {
														n.$mount('#__nuxt'),
															w.afterEach(T),
															w.afterEach(N.bind(n)),
															w.afterEach(D.bind(n)),
															o.default.nextTick(function () {
																L(n)
															})
													}),
													(t.next = 7),
													Promise.all(S(w))
												)
											case 7:
												if (
													((c = t.sent),
													(n.setTransitions = n.$options.nuxt.setTransitions.bind(n)),
													c.length &&
														(n.setTransitions(j(c, w.currentRoute)),
														(_ = w.currentRoute.matched.map(function (t) {
															return Object(l.c)(t.path)(w.currentRoute.params)
														}))),
													(n.$loading = {}),
													O.error && n.error(O.error),
													w.beforeEach(k.bind(n)),
													w.beforeEach(A.bind(n)),
													!O.serverRendered || !Object(l.n)(O.routePath, n.context.route.path))
												) {
													t.next = 16
													break
												}
												return t.abrupt('return', r())
											case 16:
												return (
													(f = function () {
														T(w.currentRoute, w.currentRoute), N.call(n, w.currentRoute), I(n), r()
													}),
													(t.next = 19),
													new Promise(function (t) {
														return setTimeout(t, 0)
													})
												)
											case 19:
												A.call(n, w.currentRoute, w.currentRoute, function (path) {
													if (path) {
														var t = w.afterEach(function (e, n) {
															t(), f()
														})
														w.push(path, void 0, function (t) {
															t && $(t)
														})
													} else f()
												})
											case 20:
											case 'end':
												return t.stop()
										}
								}, t)
							})
						)).apply(this, arguments)
					}
					Object(h.b)(null, O.config)
						.then(function (t) {
							return M.apply(this, arguments)
						})
						.catch($)
				}.call(this, n(46))
		},
		268(t, e, n) {
			'use strict'
			n.r(e)
			n(45)
			e.default = function (t) {
				const e = t.store
				const n = t.route
				const r = t.redirect
				e.getters.isAuthenticated || n.name === 'login' || n.name === 'register' || r('/login'),
					!e.getters.isAuthenticated || (n.name !== 'login' && n.name !== 'register') || r('/')
			}
		},
		280(t, e, n) {
			'use strict'
			n(229)
		},
		281(t, e, n) {
			(e = n(12)(!1)).push([t.i, 'h1[data-v-7a270e18]{font-size:20px}', '']), (t.exports = e)
		},
		284(t, e, n) {
			'use strict'
			n(230)
		},
		285(t, e, n) {
			(e = n(12)(!1)).push([
				t.i,
				'.nuxt-progress{position:fixed;top:0;left:0;right:0;height:2px;width:0;opacity:1;transition:width .1s,opacity .4s;background-color:#000;z-index:999999}.nuxt-progress.nuxt-progress-notransition{transition:none}.nuxt-progress-failed{background-color:red}',
				''
			]),
				(t.exports = e)
		},
		286(t, e, n) {
			'use strict'
			n(231)
		},
		287(t, e, n) {
			(e = n(12)(!1)).push([
				t.i,
				'html{font-family:"Source Sans Pro",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;font-size:16px;word-spacing:1px;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;box-sizing:border-box}*,:after,:before{box-sizing:border-box;margin:0}.button--green{display:inline-block;border-radius:4px;border:1px solid #3b8070;color:#3b8070;text-decoration:none;padding:10px 30px}.button--green:hover{color:#fff;background-color:#3b8070}.button--grey{display:inline-block;border-radius:4px;border:1px solid #35495e;color:#35495e;text-decoration:none;padding:10px 30px;margin-left:15px}.button--grey:hover{color:#fff;background-color:#35495e}',
				''
			]),
				(t.exports = e)
		},
		301(t, e, n) {
			'use strict'
			n(236)
		},
		302(t, e, n) {
			(e = n(12)(!1)).push([t.i, 'h1[data-v-705773b6]{margin:0 auto}.header[data-v-705773b6]{margin-bottom:3vw}', '']),
				(t.exports = e)
		},
		352(t, e, n) {
			'use strict'
			n.r(e),
				n.d(e, 'strict', function () {
					return f
				}),
				n.d(e, 'state', function () {
					return l
				}),
				n.d(e, 'mutations', function () {
					return h
				}),
				n.d(e, 'actions', function () {
					return d
				}),
				n.d(e, 'getters', function () {
					return m
				})
			const r = n(2)
			const o = n(82)
			const c = n(47)
			r.default.use(o.a)
			var f = !1
			var l = function () {
				return { user: null }
			}
			var h = {
				setUser(t, e) {
					t.user = e
				}
			}
			var d = {
				signUp(t, e) {
					t.commit
					const n = e.email
					const r = e.password
					return Object(c.a)().createUserWithEmailAndPassword(n, r)
				},
				signInWithEmail(t, e) {
					t.commit
					const n = e.email
					const r = e.password
					return Object(c.a)().signInWithEmailAndPassword(n, r)
				},
				signInWithGoogle(t) {
					t.commit
					return Object(c.a)().signInWithPopup(new c.a.GoogleAuthProvider())
				},
				signOut() {
					return Object(c.a)().signOut()
				}
			}
			var m = {
				user(t) {
					return t.user
				},
				isAuthenticated(t) {
					return !!t.user
				}
			}
		},
		47(t, e, n) {
			'use strict'
			n.d(e, 'b', function () {
				return o
			}),
				n.d(e, 'a', function () {
					return c
				})
			const r = n(98)
			n(151)
			r.a.apps.length ||
				r.a.initializeApp({
					apiKey: 'AIzaSyAEFHkdyYqCLfQZC_nXAnoNRFbR_kWsvVU',
					authDomain: 'timeovergrow-d76f5.firebaseapp.com',
					projectId: 'timeovergrow-d76f5',
					storageBucket: 'timeovergrow-d76f5.appspot.com',
					messagingSenderId: '868668025407',
					appId: '1:868668025407:web:3790913986172449dce68a',
					measurementId: 'G-9W2YX5YWTX'
				})
			var o = r.a.firestore().collection('messages')
			var c = r.a.auth
			e.c = r.a
		},
		6(t, e, n) {
			'use strict'
			n.d(e, 'k', function () {
				return x
			}),
				n.d(e, 'm', function () {
					return w
				}),
				n.d(e, 'l', function () {
					return _
				}),
				n.d(e, 'e', function () {
					return O
				}),
				n.d(e, 'b', function () {
					return $
				}),
				n.d(e, 's', function () {
					return j
				}),
				n.d(e, 'g', function () {
					return k
				}),
				n.d(e, 'h', function () {
					return C
				}),
				n.d(e, 'd', function () {
					return E
				}),
				n.d(e, 'r', function () {
					return S
				}),
				n.d(e, 'j', function () {
					return R
				}),
				n.d(e, 't', function () {
					return P
				}),
				n.d(e, 'o', function () {
					return N
				}),
				n.d(e, 'q', function () {
					return I
				}),
				n.d(e, 'f', function () {
					return D
				}),
				n.d(e, 'c', function () {
					return L
				}),
				n.d(e, 'i', function () {
					return M
				}),
				n.d(e, 'p', function () {
					return U
				}),
				n.d(e, 'a', function () {
					return X
				}),
				n.d(e, 'n', function () {
					return G
				}),
				n.d(e, 'u', function () {
					return J
				})
			n(24),
				n(69),
				n(44),
				n(123),
				n(81),
				n(54),
				n(124),
				n(84),
				n(45),
				n(270),
				n(56),
				n(25),
				n(271),
				n(30),
				n(77),
				n(57),
				n(76),
				n(138),
				n(55),
				n(225),
				n(58),
				n(59),
				n(85)
			const r = n(18)
			const o = (n(101), n(29))
			const c = n(4)
			const f = n(11)
			const l = n(2)
			const h = n(118)
			function d(object, t) {
				const e = Object.keys(object)
				if (Object.getOwnPropertySymbols) {
					let n = Object.getOwnPropertySymbols(object)
					t &&
						(n = n.filter(function (t) {
							return Object.getOwnPropertyDescriptor(object, t).enumerable
						})),
						e.push.apply(e, n)
				}
				return e
			}
			function m(t) {
				for (let i = 1; i < arguments.length; i++) {
					var source = arguments[i] != null ? arguments[i] : {}
					i % 2
						? d(Object(source), !0).forEach(function (e) {
								Object(c.a)(t, e, source[e])
						  })
						: Object.getOwnPropertyDescriptors
						? Object.defineProperties(t, Object.getOwnPropertyDescriptors(source))
						: d(Object(source)).forEach(function (e) {
								Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(source, e))
						  })
				}
				return t
			}
			function v(t, e) {
				let n
				if (typeof Symbol === 'undefined' || t[Symbol.iterator] == null) {
					if (
						Array.isArray(t) ||
						(n = (function (t, e) {
							if (!t) return
							if (typeof t === 'string') return y(t, e)
							let n = Object.prototype.toString.call(t).slice(8, -1)
							n === 'Object' && t.constructor && (n = t.constructor.name)
							if (n === 'Map' || n === 'Set') return Array.from(t)
							if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return y(t, e)
						})(t)) ||
						(e && t && typeof t.length === 'number')
					) {
						n && (t = n)
						let i = 0
						const r = function () {}
						return {
							s: r,
							n() {
								return i >= t.length ? { done: !0 } : { done: !1, value: t[i++] }
							},
							e(t) {
								throw t
							},
							f: r
						}
					}
					throw new TypeError(
						'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
					)
				}
				let o
				let c = !0
				let f = !1
				return {
					s() {
						n = t[Symbol.iterator]()
					},
					n() {
						const t = n.next()
						return (c = t.done), t
					},
					e(t) {
						(f = !0), (o = t)
					},
					f() {
						try {
							c || n.return == null || n.return()
						} finally {
							if (f) throw o
						}
					}
				}
			}
			function y(t, e) {
				(e == null || e > t.length) && (e = t.length)
				for (var i = 0, n = new Array(e); i < e; i++) n[i] = t[i]
				return n
			}
			function x(t) {
				l.default.config.errorHandler && l.default.config.errorHandler(t)
			}
			function w(t) {
				return t.then(function (t) {
					return t.default || t
				})
			}
			function _(t) {
				return t.$options && typeof t.$options.fetch === 'function' && !t.$options.fetch.length
			}
			function O(t) {
				let e
				const n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : []
				const r = t.$children || []
				const o = v(r)
				try {
					for (o.s(); !(e = o.n()).done; ) {
						const c = e.value
						c.$fetch ? n.push(c) : c.$children && O(c, n)
					}
				} catch (t) {
					o.e(t)
				} finally {
					o.f()
				}
				return n
			}
			function $(t, e) {
				if (e || !t.options.__hasNuxtData) {
					const n =
						t.options._originDataFn ||
						t.options.data ||
						function () {
							return {}
						}
					;(t.options._originDataFn = n),
						(t.options.data = function () {
							const data = n.call(this, this)
							return this.$ssrContext && (e = this.$ssrContext.asyncData[t.cid]), m(m({}, data), e)
						}),
						(t.options.__hasNuxtData = !0),
						t._Ctor && t._Ctor.options && (t._Ctor.options.data = t.options.data)
				}
			}
			function j(t) {
				return (
					(t.options && t._Ctor === t) ||
						(t.options ? ((t._Ctor = t), (t.extendOptions = t.options)) : ((t = l.default.extend(t))._Ctor = t),
						!t.options.name && t.options.__file && (t.options.name = t.options.__file)),
					t
				)
			}
			function k(t) {
				const e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1]
				const n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 'components'
				return Array.prototype.concat.apply(
					[],
					t.matched.map(function (t, r) {
						return Object.keys(t[n]).map(function (o) {
							return e && e.push(r), t[n][o]
						})
					})
				)
			}
			function C(t) {
				const e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1]
				return k(t, e, 'instances')
			}
			function E(t, e) {
				return Array.prototype.concat.apply(
					[],
					t.matched.map(function (t, n) {
						return Object.keys(t.components).reduce(function (r, o) {
							return t.components[o] ? r.push(e(t.components[o], t.instances[o], t, o, n)) : delete t.components[o], r
						}, [])
					})
				)
			}
			function S(t, e) {
				return Promise.all(
					E(
						t,
						(function () {
							const t = Object(o.a)(
								regeneratorRuntime.mark(function t(n, r, o, c) {
									return regeneratorRuntime.wrap(function (t) {
										for (;;)
											switch ((t.prev = t.next)) {
												case 0:
													if (typeof n !== 'function' || n.options) {
														t.next = 4
														break
													}
													return (t.next = 3), n()
												case 3:
													n = t.sent
												case 4:
													return (
														(o.components[c] = n = j(n)),
														t.abrupt('return', typeof e === 'function' ? e(n, r, o, c) : n)
													)
												case 6:
												case 'end':
													return t.stop()
											}
									}, t)
								})
							)
							return function (e, n, r, o) {
								return t.apply(this, arguments)
							}
						})()
					)
				)
			}
			function R(t) {
				return A.apply(this, arguments)
			}
			function A() {
				return (A = Object(o.a)(
					regeneratorRuntime.mark(function t(e) {
						return regeneratorRuntime.wrap(function (t) {
							for (;;)
								switch ((t.prev = t.next)) {
									case 0:
										if (e) {
											t.next = 2
											break
										}
										return t.abrupt('return')
									case 2:
										return (t.next = 4), S(e)
									case 4:
										return t.abrupt(
											'return',
											m(
												m({}, e),
												{},
												{
													meta: k(e).map(function (t, n) {
														return m(m({}, t.options.meta), (e.matched[n] || {}).meta)
													})
												}
											)
										)
									case 5:
									case 'end':
										return t.stop()
								}
						}, t)
					})
				)).apply(this, arguments)
			}
			function P(t, e) {
				return T.apply(this, arguments)
			}
			function T() {
				return (T = Object(o.a)(
					regeneratorRuntime.mark(function t(e, n) {
						let o, c, l, h
						return regeneratorRuntime.wrap(function (t) {
							for (;;)
								switch ((t.prev = t.next)) {
									case 0:
										return (
											e.context ||
												((e.context = {
													isStatic: !0,
													isDev: !1,
													isHMR: !1,
													app: e,
													store: e.store,
													payload: n.payload,
													error: n.error,
													base: '/',
													env: {}
												}),
												n.ssrContext && (e.context.ssrContext = n.ssrContext),
												(e.context.redirect = function (t, path, n) {
													if (t) {
														e.context._redirected = !0
														let o = Object(r.a)(path)
														if (
															(typeof t === 'number' ||
																(o !== 'undefined' && o !== 'object') ||
																((n = path || {}), (path = t), (o = Object(r.a)(path)), (t = 302)),
															o === 'object' && (path = e.router.resolve(path).route.fullPath),
															!/(^[.]{1,2}\/)|(^\/(?!\/))/.test(path))
														)
															throw ((path = W(path, n)), window.location.replace(path), new Error('ERR_REDIRECT'))
														e.context.next({ path, query: n, status: t })
													}
												}),
												(e.context.nuxtState = window.__NUXT__)),
											(t.next = 3),
											Promise.all([R(n.route), R(n.from)])
										)
									case 3:
										(o = t.sent),
											(c = Object(f.a)(o, 2)),
											(l = c[0]),
											(h = c[1]),
											n.route && (e.context.route = l),
											n.from && (e.context.from = h),
											(e.context.next = n.next),
											(e.context._redirected = !1),
											(e.context._errored = !1),
											(e.context.isHMR = !1),
											(e.context.params = e.context.route.params || {}),
											(e.context.query = e.context.route.query || {})
									case 15:
									case 'end':
										return t.stop()
								}
						}, t)
					})
				)).apply(this, arguments)
			}
			function N(t, e) {
				return !t.length || e._redirected || e._errored
					? Promise.resolve()
					: I(t[0], e).then(function () {
							return N(t.slice(1), e)
					  })
			}
			function I(t, e) {
				let n
				return (n =
					t.length === 2
						? new Promise(function (n) {
								t(e, function (t, data) {
									t && e.error(t), n((data = data || {}))
								})
						  })
						: t(e)) &&
					n instanceof Promise &&
					typeof n.then === 'function'
					? n
					: Promise.resolve(n)
			}
			function D(base, t) {
				if (t === 'hash') return window.location.hash.replace(/^#\//, '')
				base = decodeURI(base).slice(0, -1)
				let path = decodeURI(window.location.pathname)
				base && path.startsWith(base) && (path = path.slice(base.length))
				const e = (path || '/') + window.location.search + window.location.hash
				return Object(h.b)(e)
			}
			function L(t, e) {
				return (function (t, e) {
					for (var n = new Array(t.length), i = 0; i < t.length; i++)
						Object(r.a)(t[i]) === 'object' && (n[i] = new RegExp('^(?:' + t[i].pattern + ')$', z(e)))
					return function (e, r) {
						for (
							var path = '', data = e || {}, o = (r || {}).pretty ? V : encodeURIComponent, c = 0;
							c < t.length;
							c++
						) {
							const f = t[c]
							if (typeof f !== 'string') {
								const l = data[f.name || 'pathMatch']
								let h = void 0
								if (l == null) {
									if (f.optional) {
										f.partial && (path += f.prefix)
										continue
									}
									throw new TypeError('Expected "' + f.name + '" to be defined')
								}
								if (Array.isArray(l)) {
									if (!f.repeat)
										throw new TypeError(
											'Expected "' + f.name + '" to not repeat, but received `' + JSON.stringify(l) + '`'
										)
									if (l.length === 0) {
										if (f.optional) continue
										throw new TypeError('Expected "' + f.name + '" to not be empty')
									}
									for (let d = 0; d < l.length; d++) {
										if (((h = o(l[d])), !n[c].test(h)))
											throw new TypeError(
												'Expected all "' +
													f.name +
													'" to match "' +
													f.pattern +
													'", but received `' +
													JSON.stringify(h) +
													'`'
											)
										path += (d === 0 ? f.prefix : f.delimiter) + h
									}
								} else {
									if (((h = f.asterisk ? V(l, !0) : o(l)), !n[c].test(h)))
										throw new TypeError(
											'Expected "' + f.name + '" to match "' + f.pattern + '", but received "' + h + '"'
										)
									path += f.prefix + h
								}
							} else path += f
						}
						return path
					}
				})(
					(function (t, e) {
						let n
						const r = []
						let o = 0
						let c = 0
						let path = ''
						const f = (e && e.delimiter) || '/'
						for (; (n = F.exec(t)) != null; ) {
							const l = n[0]
							const h = n[1]
							const d = n.index
							if (((path += t.slice(c, d)), (c = d + l.length), h)) path += h[1]
							else {
								const m = t[c]
								const v = n[2]
								const y = n[3]
								const x = n[4]
								const w = n[5]
								const _ = n[6]
								const O = n[7]
								path && (r.push(path), (path = ''))
								const $ = v != null && m != null && m !== v
								const j = _ === '+' || _ === '*'
								const k = _ === '?' || _ === '*'
								const C = n[2] || f
								const pattern = x || w
								r.push({
									name: y || o++,
									prefix: v || '',
									delimiter: C,
									optional: k,
									repeat: j,
									partial: $,
									asterisk: Boolean(O),
									pattern: pattern ? K(pattern) : O ? '.*' : '[^' + B(C) + ']+?'
								})
							}
						}
						c < t.length && (path += t.substr(c))
						path && r.push(path)
						return r
					})(t, e),
					e
				)
			}
			function M(t, e) {
				const n = {}
				const r = m(m({}, t), e)
				for (const o in r) String(t[o]) !== String(e[o]) && (n[o] = !0)
				return n
			}
			function U(t) {
				let e
				if (t.message || typeof t === 'string') e = t.message || t
				else
					try {
						e = JSON.stringify(t, null, 2)
					} catch (n) {
						e = '['.concat(t.constructor.name, ']')
					}
				return m(
					m({}, t),
					{},
					{ message: e, statusCode: t.statusCode || t.status || (t.response && t.response.status) || 500 }
				)
			}
			(window.onNuxtReadyCbs = []),
				(window.onNuxtReady = function (t) {
					window.onNuxtReadyCbs.push(t)
				})
			var F = new RegExp(
				[
					'(\\\\.)',
					'([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
				].join('|'),
				'g'
			)
			function V(t, e) {
				const n = e ? /[?#]/g : /[/?#]/g
				return encodeURI(t).replace(n, function (t) {
					return '%' + t.charCodeAt(0).toString(16).toUpperCase()
				})
			}
			function B(t) {
				return t.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1')
			}
			function K(t) {
				return t.replace(/([=!:$/()])/g, '\\$1')
			}
			function z(t) {
				return t && t.sensitive ? '' : 'i'
			}
			function W(t, e) {
				let n
				const r = t.indexOf('://')
				r !== -1 ? ((n = t.substring(0, r)), (t = t.substring(r + 3))) : t.startsWith('//') && (t = t.substring(2))
				let o
				let c = t.split('/')
				let l = (n ? n + '://' : '//') + c.shift()
				let path = c.join('/')
				if ((path === '' && c.length === 1 && (l += '/'), (c = path.split('#')).length === 2)) {
					const h = c
					const d = Object(f.a)(h, 2)
					;(path = d[0]), (o = d[1])
				}
				return (
					(l += path ? '/' + path : ''),
					e &&
						JSON.stringify(e) !== '{}' &&
						(l +=
							(t.split('?').length === 2 ? '&' : '?') +
							(function (t) {
								return Object.keys(t)
									.sort()
									.map(function (e) {
										const n = t[e]
										return n == null
											? ''
											: Array.isArray(n)
											? n
													.slice()
													.map(function (t) {
														return [e, '=', t].join('')
													})
													.join('&')
											: e + '=' + n
									})
									.filter(Boolean)
									.join('&')
							})(e)),
					(l += o ? '#' + o : '')
				)
			}
			function X(t, e, n) {
				t.$options[e] || (t.$options[e] = []), t.$options[e].includes(n) || t.$options[e].push(n)
			}
			function H(path) {
				return path.replace(/\/+$/, '') || '/'
			}
			function G(t, e) {
				return H(t) === H(e)
			}
			function J(t) {
				try {
					window.history.scrollRestoration = t
				} catch (t) {}
			}
		},
		66(t, e, n) {
			'use strict'
			n.d(e, 'b', function () {
				return ft
			}),
				n.d(e, 'a', function () {
					return I
				})
			n(54), n(45), n(25), n(101)
			const r = n(29)
			const o = n(4)
			const c = n(2)
			const f = n(82)
			const l = n(244)
			const h = n(193)
			const d = n.n(h)
			const m = n(99)
			const v = n.n(m)
			const y = n(121)
			const x = n(118)
			const w = n(6)
			n(195), n(102)
			'scrollRestoration' in window.history &&
				(Object(w.u)('manual'),
				window.addEventListener('beforeunload', function () {
					Object(w.u)('auto')
				}),
				window.addEventListener('load', function () {
					Object(w.u)('manual')
				}))
			const _ = function () {}
			const O = y.a.prototype.push
			;(y.a.prototype.push = function (t) {
				const e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : _
				const n = arguments.length > 2 ? arguments[2] : void 0
				return O.call(this, t, e, n)
			}),
				c.default.use(y.a)
			const $ = {
				mode: 'history',
				base: '/',
				linkActiveClass: 'nuxt-link-active',
				linkExactActiveClass: 'nuxt-link-exact-active',
				scrollBehavior(t, e, n) {
					let r = !1
					const o = Object(w.g)(t)
					;(o.some(function (t) {
						return t.options.scrollToTop
					}) ||
						(o.length < 2 &&
							o.every(function (t) {
								return !1 !== t.options.scrollToTop
							}))) &&
						(r = { x: 0, y: 0 }),
						n && (r = n)
					const c = window.$nuxt
					return (
						((t.path === e.path && t.hash !== e.hash) || t === e) &&
							c.$nextTick(function () {
								return c.$emit('triggerScroll')
							}),
						new Promise(function (e) {
							c.$once('triggerScroll', function () {
								if (t.hash) {
									let n = t.hash
									void 0 !== window.CSS && void 0 !== window.CSS.escape && (n = '#' + window.CSS.escape(n.substr(1)))
									try {
										document.querySelector(n) && (r = { selector: n })
									} catch (t) {
										console.warn(
											'Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).'
										)
									}
								}
								e(r)
							})
						})
					)
				},
				routes: [
					{
						path: '/login',
						component() {
							return Object(w.m)(Promise.all([n.e(4), n.e(0), n.e(1), n.e(6)]).then(n.bind(null, 614)))
						},
						name: 'login'
					},
					{
						path: '/register',
						component() {
							return Object(w.m)(Promise.all([n.e(0), n.e(1), n.e(11), n.e(7)]).then(n.bind(null, 616)))
						},
						name: 'register'
					},
					{
						path: '/',
						component() {
							return Object(w.m)(Promise.all([n.e(0), n.e(10), n.e(5)]).then(n.bind(null, 617)))
						},
						name: 'index'
					}
				],
				fallback: !1
			}
			function j() {
				const t = new y.a($)
				const e = t.resolve.bind(t)
				return (
					(t.resolve = function (t, n, r) {
						typeof t === 'string' && (t = Object(x.b)(t))
						const o = e(t, n, r)
						return (
							o &&
								o.resolved &&
								o.resolved.query &&
								(function (t) {
									for (const e in t) typeof t[e] === 'string' && (t[e] = Object(x.a)(t[e]))
								})(o.resolved.query),
							o
						)
					}),
					t
				)
			}
			n(49), n(68)
			const k = {
				name: 'NuxtChild',
				functional: !0,
				props: {
					nuxtChildKey: { type: String, default: '' },
					keepAlive: Boolean,
					keepAliveProps: { type: Object, default: void 0 }
				},
				render(t, e) {
					let n = e.parent
					const data = e.data
					const r = e.props
					const o = n.$createElement
					data.nuxtChild = !0
					for (var c = n, f = n.$nuxt.nuxt.transitions, l = n.$nuxt.nuxt.defaultTransition, h = 0; n; )
						n.$vnode && n.$vnode.data.nuxtChild && h++, (n = n.$parent)
					data.nuxtChildDepth = h
					const d = f[h] || l
					const m = {}
					C.forEach(function (t) {
						void 0 !== d[t] && (m[t] = d[t])
					})
					const v = {}
					E.forEach(function (t) {
						typeof d[t] === 'function' && (v[t] = d[t].bind(c))
					})
					const y = v.beforeEnter
					if (
						((v.beforeEnter = function (t) {
							if (
								(window.$nuxt.$nextTick(function () {
									window.$nuxt.$emit('triggerScroll')
								}),
								y)
							)
								return y.call(c, t)
						}),
						!1 === d.css)
					) {
						const x = v.leave
						;(!x || x.length < 2) &&
							(v.leave = function (t, e) {
								x && x.call(c, t), c.$nextTick(e)
							})
					}
					let w = o('routerView', data)
					return (
						r.keepAlive && (w = o('keep-alive', { props: r.keepAliveProps }, [w])),
						o('transition', { props: m, on: v }, [w])
					)
				}
			}
			var C = [
				'name',
				'mode',
				'appear',
				'css',
				'type',
				'duration',
				'enterClass',
				'leaveClass',
				'appearClass',
				'enterActiveClass',
				'enterActiveClass',
				'leaveActiveClass',
				'appearActiveClass',
				'enterToClass',
				'leaveToClass',
				'appearToClass'
			]
			var E = [
				'beforeEnter',
				'enter',
				'afterEnter',
				'enterCancelled',
				'beforeLeave',
				'leave',
				'afterLeave',
				'leaveCancelled',
				'beforeAppear',
				'appear',
				'afterAppear',
				'appearCancelled'
			]
			const S = {
				layout: 'empty',
				props: { error: { type: Object, default: null } },
				data() {
					return { pageNotFound: '404 Not Found', otherError: 'An error occurred' }
				},
				head() {
					return { title: this.error.statusCode === 404 ? this.pageNotFound : this.otherError }
				}
			}
			const R = (n(280), n(67))
			const A = n(83)
			const P = n.n(A)
			const T = n(363)
			const N = Object(R.a)(
				S,
				function () {
					const t = this
					const e = t.$createElement
					const n = t._self._c || e
					return n(
						'v-app',
						{ attrs: { dark: '' } },
						[
							t.error.statusCode === 404
								? n('h1', [t._v('\n\t\t' + t._s(t.pageNotFound) + '\n\t')])
								: n('h1', [t._v('\n\t\t' + t._s(t.otherError) + '\n\t')]),
							t._v(' '),
							n('NuxtLink', { attrs: { to: '/' } }, [t._v(' トップページへ戻る ')])
						],
						1
					)
				},
				[],
				!1,
				null,
				'7a270e18',
				null
			)
			var I = N.exports
			P()(N, { VApp: T.a })
			n(30), n(77), n(55)
			const D = n(11)
			const L = {
				name: 'Nuxt',
				components: { NuxtChild: k, NuxtError: I },
				props: {
					nuxtChildKey: { type: String, default: void 0 },
					keepAlive: Boolean,
					keepAliveProps: { type: Object, default: void 0 },
					name: { type: String, default: 'default' }
				},
				errorCaptured(t) {
					this.displayingNuxtError && ((this.errorFromNuxtError = t), this.$forceUpdate())
				},
				computed: {
					routerViewKey() {
						if (void 0 !== this.nuxtChildKey || this.$route.matched.length > 1)
							return this.nuxtChildKey || Object(w.c)(this.$route.matched[0].path)(this.$route.params)
						const t = Object(D.a)(this.$route.matched, 1)[0]
						if (!t) return this.$route.path
						const e = t.components.default
						if (e && e.options) {
							const n = e.options
							if (n.key) return typeof n.key === 'function' ? n.key(this.$route) : n.key
						}
						return /\/$/.test(t.path) ? this.$route.path : this.$route.path.replace(/\/$/, '')
					}
				},
				beforeCreate() {
					c.default.util.defineReactive(this, 'nuxt', this.$root.$options.nuxt)
				},
				render(t) {
					const e = this
					return this.nuxt.err
						? this.errorFromNuxtError
							? (this.$nextTick(function () {
									return (e.errorFromNuxtError = !1)
							  }),
							  t('div', {}, [
									t('h2', 'An error occurred while showing the error page'),
									t('p', 'Unfortunately an error occurred and while showing the error page another error occurred'),
									t('p', 'Error details: '.concat(this.errorFromNuxtError.toString())),
									t('nuxt-link', { props: { to: '/' } }, 'Go back to home')
							  ]))
							: ((this.displayingNuxtError = !0),
							  this.$nextTick(function () {
									return (e.displayingNuxtError = !1)
							  }),
							  t(I, { props: { error: this.nuxt.err } }))
						: t('NuxtChild', { key: this.routerViewKey, props: this.$props })
				}
			}
			const M =
				(n(76),
				n(85),
				n(53),
				{
					name: 'NuxtLoading',
					data() {
						return {
							percent: 0,
							show: !1,
							canSucceed: !0,
							reversed: !1,
							skipTimerCount: 0,
							rtl: !1,
							throttle: 200,
							duration: 5e3,
							continuous: !1
						}
					},
					computed: {
						left() {
							return (
								!(!this.continuous && !this.rtl) &&
								(this.rtl ? (this.reversed ? '0px' : 'auto') : this.reversed ? 'auto' : '0px')
							)
						}
					},
					beforeDestroy() {
						this.clear()
					},
					methods: {
						clear() {
							clearInterval(this._timer), clearTimeout(this._throttle), (this._timer = null)
						},
						start() {
							const t = this
							return (
								this.clear(),
								(this.percent = 0),
								(this.reversed = !1),
								(this.skipTimerCount = 0),
								(this.canSucceed = !0),
								this.throttle
									? (this._throttle = setTimeout(function () {
											return t.startTimer()
									  }, this.throttle))
									: this.startTimer(),
								this
							)
						},
						set(t) {
							return (
								(this.show = !0),
								(this.canSucceed = !0),
								(this.percent = Math.min(100, Math.max(0, Math.floor(t)))),
								this
							)
						},
						get() {
							return this.percent
						},
						increase(t) {
							return (this.percent = Math.min(100, Math.floor(this.percent + t))), this
						},
						decrease(t) {
							return (this.percent = Math.max(0, Math.floor(this.percent - t))), this
						},
						pause() {
							return clearInterval(this._timer), this
						},
						resume() {
							return this.startTimer(), this
						},
						finish() {
							return (this.percent = this.reversed ? 0 : 100), this.hide(), this
						},
						hide() {
							const t = this
							return (
								this.clear(),
								setTimeout(function () {
									(t.show = !1),
										t.$nextTick(function () {
											(t.percent = 0), (t.reversed = !1)
										})
								}, 500),
								this
							)
						},
						fail(t) {
							return (this.canSucceed = !1), this
						},
						startTimer() {
							const t = this
							this.show || (this.show = !0),
								void 0 === this._cut && (this._cut = 1e4 / Math.floor(this.duration)),
								(this._timer = setInterval(function () {
									t.skipTimerCount > 0
										? t.skipTimerCount--
										: (t.reversed ? t.decrease(t._cut) : t.increase(t._cut),
										  t.continuous &&
												(t.percent >= 100 || t.percent <= 0) &&
												((t.skipTimerCount = 1), (t.reversed = !t.reversed)))
								}, 100))
						}
					},
					render(t) {
						let e = t(!1)
						return (
							this.show &&
								(e = t('div', {
									staticClass: 'nuxt-progress',
									class: {
										'nuxt-progress-notransition': this.skipTimerCount > 0,
										'nuxt-progress-failed': !this.canSucceed
									},
									style: { width: this.percent + '%', left: this.left }
								})),
							e
						)
					}
				})
			const U = (n(284), Object(R.a)(M, void 0, void 0, !1, null, null, null).exports)
			const F = (n(286), n(369))
			const V = n(364)
			const B = n(365)
			const K = Object(R.a)(
				{},
				function () {
					const t = this.$createElement
					const e = this._self._c || t
					return e(
						'client-only',
						[
							e(
								'v-app',
								[
									e(
										'v-container',
										[
											e(
												'v-row',
												{ attrs: { wrap: '', justify: 'center', align: 'center' } },
												[e('v-main', [e('v-container', [e('Nuxt')], 1)], 1)],
												1
											)
										],
										1
									)
								],
								1
							)
						],
						1
					)
				},
				[],
				!1,
				null,
				null,
				null
			)
			const z = K.exports
			P()(K, { VApp: T.a, VContainer: F.a, VMain: V.a, VRow: B.a })
			const W = n(242)
			function X(t, e) {
				let n
				if (typeof Symbol === 'undefined' || t[Symbol.iterator] == null) {
					if (
						Array.isArray(t) ||
						(n = (function (t, e) {
							if (!t) return
							if (typeof t === 'string') return H(t, e)
							let n = Object.prototype.toString.call(t).slice(8, -1)
							n === 'Object' && t.constructor && (n = t.constructor.name)
							if (n === 'Map' || n === 'Set') return Array.from(t)
							if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return H(t, e)
						})(t)) ||
						(e && t && typeof t.length === 'number')
					) {
						n && (t = n)
						let i = 0
						const r = function () {}
						return {
							s: r,
							n() {
								return i >= t.length ? { done: !0 } : { done: !1, value: t[i++] }
							},
							e(t) {
								throw t
							},
							f: r
						}
					}
					throw new TypeError(
						'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
					)
				}
				let o
				let c = !0
				let f = !1
				return {
					s() {
						n = t[Symbol.iterator]()
					},
					n() {
						const t = n.next()
						return (c = t.done), t
					},
					e(t) {
						(f = !0), (o = t)
					},
					f() {
						try {
							c || n.return == null || n.return()
						} finally {
							if (f) throw o
						}
					}
				}
			}
			function H(t, e) {
				(e == null || e > t.length) && (e = t.length)
				for (var i = 0, n = new Array(e); i < e; i++) n[i] = t[i]
				return n
			}
			const G = { _default: Object(w.s)(z), _Header: Object(w.s)(W.a) }
			const J = {
				render(t, e) {
					const n = t('NuxtLoading', { ref: 'loading' })
					const r = t(this.layout || 'nuxt')
					const o = t('div', { domProps: { id: '__layout' }, key: this.layoutName }, [r])
					const c = t(
						'transition',
						{
							props: { name: 'layout', mode: 'out-in' },
							on: {
								beforeEnter(t) {
									window.$nuxt.$nextTick(function () {
										window.$nuxt.$emit('triggerScroll')
									})
								}
							}
						},
						[o]
					)
					return t('div', { domProps: { id: '__nuxt' } }, [n, c])
				},
				data() {
					return { isOnline: !0, layout: null, layoutName: '', nbFetching: 0 }
				},
				beforeCreate() {
					c.default.util.defineReactive(this, 'nuxt', this.$options.nuxt)
				},
				created() {
					(this.$root.$options.$nuxt = this),
						(window.$nuxt = this),
						this.refreshOnlineStatus(),
						window.addEventListener('online', this.refreshOnlineStatus),
						window.addEventListener('offline', this.refreshOnlineStatus),
						(this.error = this.nuxt.error),
						(this.context = this.$options.context)
				},
				mounted() {
					const t = this
					return Object(r.a)(
						regeneratorRuntime.mark(function e() {
							return regeneratorRuntime.wrap(function (e) {
								for (;;)
									switch ((e.prev = e.next)) {
										case 0:
											t.$loading = t.$refs.loading
										case 1:
										case 'end':
											return e.stop()
									}
							}, e)
						})
					)()
				},
				watch: { 'nuxt.err': 'errorChanged' },
				computed: {
					isOffline() {
						return !this.isOnline
					},
					isFetching() {
						return this.nbFetching > 0
					},
					isPreview() {
						return Boolean(this.$options.previewData)
					}
				},
				methods: {
					refreshOnlineStatus() {
						void 0 === window.navigator.onLine ? (this.isOnline = !0) : (this.isOnline = window.navigator.onLine)
					},
					refresh() {
						const t = this
						return Object(r.a)(
							regeneratorRuntime.mark(function e() {
								let n, r
								return regeneratorRuntime.wrap(
									function (e) {
										for (;;)
											switch ((e.prev = e.next)) {
												case 0:
													if ((n = Object(w.h)(t.$route)).length) {
														e.next = 3
														break
													}
													return e.abrupt('return')
												case 3:
													return (
														t.$loading.start(),
														(r = n.map(function (e) {
															const p = []
															if (
																(e.$options.fetch &&
																	e.$options.fetch.length &&
																	p.push(Object(w.q)(e.$options.fetch, t.context)),
																e.$fetch)
															)
																p.push(e.$fetch())
															else {
																let n
																const r = X(Object(w.e)(e.$vnode.componentInstance))
																try {
																	for (r.s(); !(n = r.n()).done; ) {
																		const component = n.value
																		p.push(component.$fetch())
																	}
																} catch (t) {
																	r.e(t)
																} finally {
																	r.f()
																}
															}
															return (
																e.$options.asyncData &&
																	p.push(
																		Object(w.q)(e.$options.asyncData, t.context).then(function (t) {
																			for (const n in t) c.default.set(e.$data, n, t[n])
																		})
																	),
																Promise.all(p)
															)
														})),
														(e.prev = 5),
														(e.next = 8),
														Promise.all(r)
													)
												case 8:
													e.next = 15
													break
												case 10:
													(e.prev = 10), (e.t0 = e.catch(5)), t.$loading.fail(e.t0), Object(w.k)(e.t0), t.error(e.t0)
												case 15:
													t.$loading.finish()
												case 16:
												case 'end':
													return e.stop()
											}
									},
									e,
									null,
									[[5, 10]]
								)
							})
						)()
					},
					errorChanged() {
						if (this.nuxt.err) {
							this.$loading &&
								(this.$loading.fail && this.$loading.fail(this.nuxt.err),
								this.$loading.finish && this.$loading.finish())
							let t = (I.options || I).layout
							typeof t === 'function' && (t = t(this.context)), this.setLayout(t)
						}
					},
					setLayout(t) {
						return (t && G['_' + t]) || (t = 'default'), (this.layoutName = t), (this.layout = G['_' + t]), this.layout
					},
					loadLayout(t) {
						return (t && G['_' + t]) || (t = 'default'), Promise.resolve(G['_' + t])
					}
				},
				components: { NuxtLoading: U }
			}
			c.default.use(f.a)
			let Q = {}
			;(Q = (function (t, e) {
				if ((t = t.default || t).commit)
					throw new Error('[nuxt] '.concat(e, ' should export a method that returns a Vuex instance.'))
				return (
					typeof t !== 'function' && (t = Object.assign({}, t)),
					(function (t, e) {
						if (t.state && typeof t.state !== 'function') {
							console.warn("'state' should be a method that returns an object in ".concat(e))
							const n = Object.assign({}, t.state)
							t = Object.assign({}, t, {
								state() {
									return n
								}
							})
						}
						return t
					})(t, e)
				)
			})(n(352), 'store/index.js')).modules = Q.modules || {}
			const Y =
				Q instanceof Function
					? Q
					: function () {
							return new f.a.Store(Object.assign({ strict: !1 }, Q))
					  }
			const Z = {}
			for (const tt in Z) c.default.component(tt, Z[tt])
			const et = n(119)
			const nt = {}
			c.default.use(et.a, {})
			const ot = function (t) {
				const e = typeof nt === 'function' ? nt(t) : nt
				;(e.icons = e.icons || {}), (e.icons.iconfont = 'mdi')
				const n = new et.a(e)
				;(t.app.vuetify = n), (t.$vuetify = n.framework)
			}
			const it = n(47)
			const at = n(151)
			function st(object, t) {
				const e = Object.keys(object)
				if (Object.getOwnPropertySymbols) {
					let n = Object.getOwnPropertySymbols(object)
					t &&
						(n = n.filter(function (t) {
							return Object.getOwnPropertyDescriptor(object, t).enumerable
						})),
						e.push.apply(e, n)
				}
				return e
			}
			function ut(t) {
				for (let i = 1; i < arguments.length; i++) {
					var source = arguments[i] != null ? arguments[i] : {}
					i % 2
						? st(Object(source), !0).forEach(function (e) {
								Object(o.a)(t, e, source[e])
						  })
						: Object.getOwnPropertyDescriptors
						? Object.defineProperties(t, Object.getOwnPropertyDescriptors(source))
						: st(Object(source)).forEach(function (e) {
								Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(source, e))
						  })
				}
				return t
			}
			c.default.component(d.a.name, d.a),
				c.default.component(
					v.a.name,
					ut(
						ut({}, v.a),
						{},
						{
							render(t, e) {
								return (
									v.a._warned ||
										((v.a._warned = !0),
										console.warn(
											'<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead'
										)),
									v.a.render(t, e)
								)
							}
						}
					)
				),
				c.default.component(k.name, k),
				c.default.component('NChild', k),
				c.default.component(L.name, L),
				Object.defineProperty(c.default.prototype, '$nuxt', {
					get() {
						return this.$root.$options.$nuxt
					},
					configurable: !0
				}),
				c.default.use(l.a, {
					keyName: 'head',
					attribute: 'data-n-head',
					ssrAttribute: 'data-n-head-ssr',
					tagIDKeyName: 'hid'
				})
			const ct = {
				name: 'page',
				mode: 'out-in',
				appear: !0,
				appearClass: 'appear',
				appearActiveClass: 'appear-active',
				appearToClass: 'appear-to'
			}
			f.a.Store.prototype.registerModule
			function ft(t) {
				return lt.apply(this, arguments)
			}
			function lt() {
				return (lt = Object(r.a)(
					regeneratorRuntime.mark(function t(e) {
						let n
						let r
						let o
						let f
						let l
						let h
						let path
						let d
						const m = arguments
						return regeneratorRuntime.wrap(function (t) {
							for (;;)
								switch ((t.prev = t.next)) {
									case 0:
										return (
											(d = function (t, e) {
												if (!t) throw new Error('inject(key, value) has no key provided')
												if (void 0 === e) throw new Error("inject('".concat(t, "', value) has no value provided"))
												;(f[(t = '$' + t)] = e), f.context[t] || (f.context[t] = e), (o[t] = f[t])
												const n = '__nuxt_' + t + '_installed__'
												c.default[n] ||
													((c.default[n] = !0),
													c.default.use(function () {
														Object.prototype.hasOwnProperty.call(c.default.prototype, t) ||
															Object.defineProperty(c.default.prototype, t, {
																get() {
																	return this.$root.$options[t]
																}
															})
													}))
											}),
											(n = m.length > 1 && void 0 !== m[1] ? m[1] : {}),
											(t.next = 4),
											j()
										)
									case 4:
										return (
											(r = t.sent),
											((o = Y(e)).$router = r),
											(f = ut(
												{
													head: {
														title: 'time-over-grow',
														meta: [
															{ charset: 'utf-8' },
															{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
															{ hid: 'description', name: 'description', content: '' }
														],
														link: [
															{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
															{
																rel: 'stylesheet',
																type: 'text/css',
																href:
																	'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900&display=swap'
															},
															{
																rel: 'stylesheet',
																type: 'text/css',
																href: 'https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css'
															}
														],
														style: [],
														script: []
													},
													store: o,
													router: r,
													nuxt: {
														defaultTransition: ct,
														transitions: [ct],
														setTransitions(t) {
															return (
																Array.isArray(t) || (t = [t]),
																(t = t.map(function (t) {
																	return (t = t
																		? typeof t === 'string'
																			? Object.assign({}, ct, { name: t })
																			: Object.assign({}, ct, t)
																		: ct)
																})),
																(this.$options.nuxt.transitions = t),
																t
															)
														},
														err: null,
														dateErr: null,
														error(t) {
															(t = t || null), (f.context._errored = Boolean(t)), (t = t ? Object(w.p)(t) : null)
															let n = f.nuxt
															return (
																this && (n = this.nuxt || this.$options.nuxt),
																(n.dateErr = Date.now()),
																(n.err = t),
																e && (e.nuxt.error = t),
																t
															)
														}
													}
												},
												J
											)),
											(o.app = f),
											(l = e
												? e.next
												: function (t) {
														return f.router.push(t)
												  }),
											e
												? (h = r.resolve(e.url).route)
												: ((path = Object(w.f)(r.options.base, r.options.mode)), (h = r.resolve(path).route)),
											(t.next = 13),
											Object(w.t)(f, {
												store: o,
												route: h,
												next: l,
												error: f.nuxt.error.bind(f),
												payload: e ? e.payload : void 0,
												req: e ? e.req : void 0,
												res: e ? e.res : void 0,
												beforeRenderFns: e ? e.beforeRenderFns : void 0,
												ssrContext: e
											})
										)
									case 13:
										d('config', n),
											window.__NUXT__ && window.__NUXT__.state && o.replaceState(window.__NUXT__.state),
											(f.context.enablePreview = function () {
												const t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
												;(f.previewData = Object.assign({}, t)), d('preview', t)
											}),
											(t.next = 19)
										break
									case 19:
										return (t.next = 22), ot(f.context)
									case 22:
										if (typeof it.c !== 'function') {
											t.next = 25
											break
										}
										return (t.next = 25), Object(it.c)(f.context, d)
									case 25:
										if (typeof at.a !== 'function') {
											t.next = 28
											break
										}
										return (t.next = 28), Object(at.a)(f.context, d)
									case 28:
										(f.context.enablePreview = function () {
											console.warn('You cannot call enablePreview() outside a plugin.')
										}),
											(t.next = 32)
										break
									case 32:
										return t.abrupt('return', { store: o, app: f, router: r })
									case 33:
									case 'end':
										return t.stop()
								}
						}, t)
					})
				)).apply(this, arguments)
			}
		}
	},
	[[253, 8, 3, 9]]
])
