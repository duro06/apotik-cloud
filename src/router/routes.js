const routes = [
  {
    path: '/',
    component: () => import('layouts/Main/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/main/IndexPage.vue') }
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
