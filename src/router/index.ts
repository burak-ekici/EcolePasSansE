
// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { useGlobalStore } from '@/store/globalStore';
import { useUserStore } from '@/store/userStore';
import { storeToRefs } from 'pinia';


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
    beforeEnter: [preventFromNotConnectedUser],
  },
  {
    path: "/files",
    name: "Files",
    meta: { layout: "DefaultLayout" },
    component: () =>
      import(/* webpackChunkName: "canlendar" */ "@/views/FilesPage.vue"),
    beforeEnter: [preventFromNotConnectedUser],
  },
  {
    path: "/activites",
    name: "Activites",
    meta: { layout: "DefaultLayout" },
    component: () =>
      import(/* webpackChunkName: "canlendar" */ "@/views/ActivityPage.vue"),
    beforeEnter: [preventFromNotConnectedUser],
  },
  {
    path: "/calendar",
    name: "CalendarPage",
    meta: { layout: "DefaultLayout" },
    component: () =>
      import(/* webpackChunkName: "canlendar" */ "@/views/CalendarPage.vue"),
    beforeEnter: [preventFromNotConnectedUser],
  },
  {
    path: "/login",
    name: "Login",
    meta: { layout: "DefaultLayout" },
    component: () =>
      import(/* webpackChunkName: "canlendar" */ "@/views/LoginPage.vue"),
    beforeEnter: [preventConnectedUserToGoOnLoginPage],
  },
  {
    path: "/post/:id",
    name: "Post",
    props: true,
    meta: { layout: "DefaultLayout" },
    component: () =>
      import(/* webpackChunkName: "canlendar" */ "@/views/Post.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    meta: { layout: "DefaultLayout" },
    component: () =>
      import(/* webpackChunkName: "canlendar" */ "@/views/Profile.vue"),
    beforeEnter: [preventFromNotConnectedUser],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    meta: { layout: "DefaultLayout" },
    component: () =>
      import(/* webpackChunkName: "canlendar" */ "@/views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.afterEach((to) => {
  const globalStore = useGlobalStore();
  globalStore.setLayoutName(to.meta.layout)
});



async function preventConnectedUserToGoOnLoginPage( to , from , next) {
  const userStore = useUserStore();
  const { connected } = storeToRefs(userStore);
  if (connected.value) {
    router.back()
  } else {
    next()
  }
}

async function preventFromNotConnectedUser(to, from, next) {
  const userStore = useUserStore();
  const { connected, isConnectionChecked } = storeToRefs(userStore);
  if (!isConnectionChecked.value) {
    const currentUser = await userStore.seeCurrentUser();
    if (currentUser && currentUser.session.user) {
      userStore.switchStoreUserConnectedStateToTrue();
    }
  }
  if (!connected.value) {
    router.push('/login')
  } else {
    next()
  }
}


export default router
