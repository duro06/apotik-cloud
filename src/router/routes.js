const routes = [
  {
    path: '/',
    component: () => import('layouts/Main/MainLayout.vue'),
    meta: { requireAuth: true, visitor: false },
    children: [
      { path: '', redirect: '/apem' },
      {
        path: '/apem',
        name: 'apem',
        // component: () => import('pages/IndexPage.vue')
        component: () => import('pages/IndexPage.vue')
      },
      { path: '/dashboard', name: 'dashboard', component: () => import('pages/main/IndexPage.vue') },
      { path: '/report', name: 'report', component: () => import('pages/report/IndexPage.vue') }
    ]
  },

  // login
  {
    path: '/login',
    component: () => import('layouts/Auth/AuthLayout.vue'),
    meta: { requireAuth: false, visitor: true },
    children: [
      {
        path: '',
        component: () => import('pages/auth/AuthPage.vue')
      }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
