import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

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
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
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
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },

  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [

  /** when your routing map is too long, you can split it into small modules **/
  // componentsRouter,
  // chartsRouter,
  // nestedRouter,
  // tableRouter,
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        component: () => import('@/views/home/homePage'),
        name: 'home',
        meta: { title: '主页', icon: 'tab' }
      }
    ]
  },
  {
    path: '/goods',
    component: Layout,
    name: 'goods',
    meta: {
      title: '商品',
      icon: 'el-icon-s-help'
    },
    children: [
      {
        path: 'glist',
        component: () => import('@/views/goods/goodsPage'),
        name: 'listgoods',
        meta: { title: '全部商品', icon: 'list' }
      },
      {
        path: 'gedit', // /:id(\d+)
        hidden: true,
        component: () => import('@/views/goods/editGoods'),
        name: 'editgoods',
        meta: { title: '编辑商品', icon: 'edit' }
      },
      {
        path: 'addgoods', // /:id(\d+)
        component: () => import('@/views/goods/addGoods'),
        name: 'addgoods',
        meta: { title: '添加商品', icon: 'el-icon-plus' }
      }

    ]
  },
  {
    path: '/order',
    component: Layout,
    name: 'order',
    meta: {
      title: '订单',
      icon: 'el-icon-s-help'
    },
    children: [
      {
        path: 'olist',
        component: () => import('@/views/order/orderPage'),
        name: 'listorder',
        meta: { title: '全部订单', icon: 'list' }
      },
      {
        path: 'oedit', // /:id(\d+)
        hidden: true,
        component: () => import('@/views/order/orderEdit'),
        name: 'editorder',
        meta: { title: '处理订单', icon: 'edit' }
      }

    ]
  },
  {
    path: '/user',
    component: Layout,
    name: 'user',
    meta: {
      title: '用户',
      icon: 'el-icon-s-custom'
    },
    children: [
      {
        path: 'ulist',
        component: () => import('@/views/user/userPage'),
        name: 'listuser',
        meta: { title: '用户', icon: 'el-icon-s-custom' }
      },
      {
        path: 'uedit', // /:id(\d+)
        hidden: true,
        component: () => import('@/views/user/editUser'),
        name: 'edituser',
        meta: { title: '修改', icon: 'edit' }
      }

    ]
  },
  {
    path: '/video',
    component: Layout,
    name: 'video',
    meta: {
      title: '视频',
      icon: 'el-icon-video-camera'
    },
    children: [
      {
        path: 'vlist',
        component: () => import('@/views/video/videoPage'),
        name: 'listvideo',
        meta: { title: '全部视频', icon: 'list' }
      },
      {
        path: 'addvideo', // /:id(\d+)
        component: () => import('@/views/video/addVideo'),
        name: 'addvideo',
        meta: { title: '添加视频', icon: 'edit' }
      },
      {
        path: 'editvideo', // /:id(\d+)
        hidden: true,
        component: () => import('@/views/video/editVideo'),
        name: 'editvideo',
        meta: { title: '修改视频', icon: 'edit' }
      }
    ]
  },
  {
    path: '/about',
    component: Layout,
    name: 'about',
    meta: {
      title: '文章',
      icon: 'el-icon-tickets'
    },
    children: [
      {
        path: 'alist',
        component: () => import('@/views/about/aboutPage'),
        name: 'listabout',
        meta: { title: '全部文章', icon: 'list' }
      },
      {
        path: 'addabout', // /:id(\d+)
        component: () => import('@/views/about/addAbout'),
        name: 'addabout',
        meta: { title: '添加文章', icon: 'edit' }
      },
      {
        path: 'editabout', // /:id(\d+)
        hidden: true,
        component: () => import('@/views/about/editAbout'),
        name: 'editabout',
        meta: { title: '修改文章', icon: 'edit' }
      }
    ]
  },

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
