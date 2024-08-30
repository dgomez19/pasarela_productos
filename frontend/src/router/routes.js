const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ]
  },
  {
    path: '/payment',
    redirect: { name: 'payment' },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: ':paymentWompiId/verify',
        name: 'verify',
        component: () => import('pages/verifyPayment.vue')
      }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
