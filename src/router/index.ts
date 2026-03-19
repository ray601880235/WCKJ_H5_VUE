import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/sjjn/blfxdx',
        name: 'blfxdx',
        component: () => import('@/views/sjjn/blfxdx.vue'),
        meta: {
            title: '首页',
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
    if (to.meta.requiresAuth) {
        const token = localStorage.getItem('token')
        if (token) {
            next()
        } else {
            next('/login')
        }
    } else {
        next()
    }
})

export default router