import { createRouter, createWebHistory } from 'vue-router'
import Swal from 'sweetalert2'
import HomePage from '@/views/HomePage.vue'

const isAuthenticated = () => {
  return !!localStorage.getItem('user'); 
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue'),
    },
    {
      path: '/manage',
      name: 'manage',
      component: () => import('../views/ManagePost.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/addPost',
      name: 'addPost',
      component: () => import('../views/addPost.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/PostDetail/:postID',
      name: 'PostDetail',
      component: () => import('../views/PostDetail.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/search',
      name: 'Search',
      component: () => import('../views/Search.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/help',
      name: 'help',
      component: () => import('../views/Help.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/setting',
      name: 'setting',
      component: () => import('../views/Setting.vue'),
      meta: { requiresAuth: true },
    }
  ],
})
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    Swal.fire({
      title: 'Bạn phải đăng nhập!',
      text: 'Vui lòng đăng nhập để tiếp tục.',
      icon: 'warning',
      confirmButtonText: 'Đồng ý'
    }).then(() => {
      next({ name: 'login' });
    });
  } else {
    next();
  }
});

export default router;
