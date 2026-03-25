import { createRouter, createWebHashHistory } from 'vue-router'
//const _path:string = '/sjjn/blfxdx'
const routes = [
    {
        path: '/',
        name: 'blfxdx',
        component: () => import('@/views/sjjn/blfxdx.vue'),
        meta: {
            title: '病例分析',
            keepAlive: true
        }
    },
    {
        path: `/blfxdxlb`,
        name: 'blfxdxlb',
        component: () => import('@/views/blfxdxlb/blfxdxlb.vue'),
        meta: {
            title: '病例分析列表',
            keepAlive: true
        }
    },
]

const router = createRouter({
    history: createWebHashHistory('/sjjn/blfxdx/'),
    routes,
    scrollBehavior(_to:any, _from:any, savedPosition:any) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    }
})

router.beforeEach((to: any, _from: any, next: any) => {
    document.title = to.meta.title as string || ''
    if (to.path.slice(-1) !== '/') {
        next({ path: to.path + '/', query: to.query })
        return
    }

    const hasUrlParams = window.location.search && window.location.search.length > 1
    const hasRouteQuery = Object.keys(to.query).length > 0

    if (hasUrlParams && !hasRouteQuery) {
        const urlParams = new URLSearchParams(window.location.search)
        const query: any = {}
        urlParams.forEach((value, key) => {
            query[key] = value
        })

        next({
            path: to.path,
            query: { ...to.query, ...query },
            replace: true
        })
        return
    }

    next()
})

export default router