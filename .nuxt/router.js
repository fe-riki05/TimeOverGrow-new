import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _80a5653c = () => interopDefault(import('../pages/DialogEdit.vue' /* webpackChunkName: "pages/DialogEdit" */))
const _57062649 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _8be4606a = () => interopDefault(import('../pages/MyPage.vue' /* webpackChunkName: "pages/MyPage" */))
const _5a1b3c1a = () => interopDefault(import('../pages/register.vue' /* webpackChunkName: "pages/register" */))
const _0e80b435 = () => interopDefault(import('../pages/top.vue' /* webpackChunkName: "pages/top" */))
const _e542f99c = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    path: "/DialogEdit",
    component: _80a5653c,
    name: "DialogEdit"
  }, {
    path: "/login",
    component: _57062649,
    name: "login"
  }, {
    path: "/MyPage",
    component: _8be4606a,
    name: "MyPage"
  }, {
    path: "/register",
    component: _5a1b3c1a,
    name: "register"
  }, {
    path: "/top",
    component: _0e80b435,
    name: "top"
  }, {
    path: "/",
    component: _e542f99c,
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
