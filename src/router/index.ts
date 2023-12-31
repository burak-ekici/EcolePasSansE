// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { useGlobalStore } from '@/store/globalStore';


const routes = [
  {
    path: "/",
    name: "HomePage",
    meta: { layout: "DefaultLayout" },
    component: () =>
      import(/* webpackChunkName: "home" */ "@/views/HomePage.vue"),
  },
  {
    path: "/messagerie",
    name: "Messagerie",
    meta: { layout: "DefaultLayout" },
    component: () =>
      import(/* webpackChunkName: "canlendar" */ "@/views/MessagingPage.vue"),
  },
  {
    path: "/files",
    name: "Files",
    meta: { layout: "DefaultLayout" },
    component: () =>
      import(/* webpackChunkName: "canlendar" */ "@/views/FilesPage.vue"),
  },
  {
    path: "/activites",
    name: "Activites",
    meta: { layout: "DefaultLayout" },
    component: () =>
      import(/* webpackChunkName: "canlendar" */ "@/views/ActivityPage.vue"),
  },
  {
    path: "/calendar",
    name: "CalendarPage",
    meta: { layout: "DefaultLayout" },
    component: () =>
      import(/* webpackChunkName: "canlendar" */ "@/views/CalendarPage.vue"),
  },
  {
    path: "/login",
    name: "Login",
    meta: { layout: "DefaultLayout" },
    component: () =>
      import(/* webpackChunkName: "canlendar" */ "@/views/LoginPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.afterEach((to) => {
  const globalStore = useGlobalStore();
  globalStore.setLayoutName(to.meta.layout)
});

export default router
