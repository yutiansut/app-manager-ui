import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'Home',
      component: () => import('@/views/home/index'),
      meta: { title: 'Home', icon: 'home' }
    }]
  },

  {
    path: '/applications',
    component: Layout,
    children: [{
      path: 'index',
      name: 'Applications',
      component: () => import('@/views/applications/index'),
      meta: { title: 'Applications', icon: 'application' }
    }]
  },
  {
    path: '/shell',
    component: Layout,
    children: [{
      path: 'index',
      name: 'Remote Shell',
      component: () => import('@/views/shell/index'),
      meta: { title: 'Remote Shell', icon: 'shell' }
    }]
  },
  {
    path: '/monitor',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Monitor',
        component: () => import('@/views/monitor/index'),
        meta: { title: 'Monitor', icon: 'monitor' }
      }
    ]
  },

  {
    path: '/files',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'File Management',
        component: () => import('@/views/files/index'),
        meta: { title: 'File Management', icon: 'files' }
      }
    ]
  },
  {
    path: '/labels',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Labels',
        component: () => import('@/views/labels/index'),
        meta: { title: 'Labels', icon: 'label' }
      }
    ]
  },
  {
    path: '/config',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Config',
        component: () => import('@/views/config/index'),
        meta: { title: 'Configuration', icon: 'config' }
      }
    ]
  },
  {
    path: '/security',
    component: Layout,
    redirect: '/security/changePwd',
    name: 'Security',
    meta: {
      title: 'Security',
      icon: 'security'
    },
    children: [
      {
        path: 'changePwd',
        name: 'ChangePwd',
        component: () => import('@/views/security/changePwd'),
        meta: { title: 'Change Password', icon: 'password' }
      },
      {
        path: 'users',
        name: 'Users',
        component: () => import('@/views/security/users'),
        meta: { title: 'Users', icon: 'user' }
      },
      {
        path: 'roles',
        name: 'Roles',
        component: () => import('@/views/security/roles'),
        meta: { title: 'Roles', icon: 'role' }
      }
    ]
  },


  { path: '/refresh', component: () => import('@/views/refresh'), hidden: true },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
