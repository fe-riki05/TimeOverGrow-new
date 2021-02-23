import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _6eea0764 = () => interopDefault(import('../pages/editPost.vue' /* webpackChunkName: "pages/editPost" */))
const _c77d9e82 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _1f30bef8 = () => interopDefault(import('../pages/PostEdit.vue' /* webpackChunkName: "pages/PostEdit" */))
const _4498bbbd = () => interopDefault(import('../pages/register.vue' /* webpackChunkName: "pages/register" */))
const _6e7037aa = () => interopDefault(import('../pages/top.vue' /* webpackChunkName: "pages/top" */))
const _5acce4b0 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/editPost",
    component: _6eea0764,
    name: "editPost"
  }, {
    path: "/login",
    component: _c77d9e82,
    name: "login"
  }, {
    path: "/PostEdit",
    component: _1f30bef8,
    name: "PostEdit"
  }, {
    path: "/register",
    component: _4498bbbd,
    name: "register"
  }, {
    path: "/top",
    component: _6e7037aa,
    name: "top"
  }, {
    path: "/",
    component: _5acce4b0,
    name: "index"
  }],

  fallback: false
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decode(obj[key])
    }
  }
}

export function createRouter () {
  const router = new Router(routerOptions)

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    const r = resolve(to, current, append)
    if (r && r.resolved && r.resolved.query) {
      decodeObj(r.resolved.query)
    }
    return r
  }

  return router
}
