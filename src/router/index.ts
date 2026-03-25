import { createRouter, createWebHistory } from 'vue-router'
const _path:string = '/sjjn/blfxdx'
const routes = [
    {
        path: _path,
        name: 'blfxdx',
        component: () => import('@/views/sjjn/blfxdx.vue'),
        meta: {
            title: '病例分析',
            keepAlive: true
        }
    },
    {
        path: `${_path}/blfxdxlb`,
        name: 'blfxdxlb',
        component: () => import('@/views/blfxdxlb/blfxdxlb.vue'),
        meta: {
            title: '病例分析列表',
            keepAlive: true
        }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(_to:any, _from:any, savedPosition:any) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    }
})

router.beforeEach((to:any, _from:any, next:any) => {
    document.title = to.meta.title as string || ''
    if (to.path.slice(-1) !== '/') {
        next({ path: to.path + '/', query: to.query })
    } else {
        next()
    }
})

export default router