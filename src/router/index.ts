
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
    beforeEnter: [checkIfUserIsConnected],
  },
  {
    path: "/files",
    name: "Files",
    meta: { layout: "DefaultLayout" },
    component: () =>
      import(/* webpackChunkName: "canlendar" */ "@/views/FilesPage.vue"),
    beforeEnter: [checkIfUserIsConnected],
  },
  {
    path: "/activites",
    name: "Activites",
    meta: { layout: "DefaultLayout" },
    component: () =>
      import(/* webpackChunkName: "canlendar" */ "@/views/ActivityPage.vue"),
    beforeEnter: [checkIfUserIsConnected],
  },
  {
    path: "/calendar",
    name: "CalendarPage",
    meta: { layout: "DefaultLayout" },
    component: () =>
      import(/* webpackChunkName: "canlendar" */ "@/views/CalendarPage.vue"),
    beforeEnter: [checkIfUserIsConnected],
  },
  {
    path: "/login",
    name: "Login",
    meta: { layout: "DefaultLayout" },
    component: () =>
      import(/* webpackChunkName: "canlendar" */ "@/views/LoginPage.vue"),
    beforeEnter: [checkIfUserIsConnected],
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
    beforeEnter: [checkIfUserIsConnected],
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



function checkIfUserIsConnected(to , from , next) {
  const userStore: any = useUserStore();
  const { isUserConnected } = storeToRefs(userStore);
  if (isUserConnected.value) {
    if (to.path === '/login') { 
      // Envoie une notification en cas d'essaie d'accession à la page login alors qu'on est déjà connecté 
      router.back()
      alert('Vous êtes déjà connecté')
    } else {
      next()
    }
    
  } else {
    // J'ai fait un if else car j'avais une  erreur de potentiel boucle puisque lorsque j'appuyer sur 
    // se connecter ( qui me dirige sur la page login ), le guard me  redirigait encore sur la page login
    // puisque j'ai une protection guard generale qui redirige sur la page login lorsque l'utilisateur accede  
    // a des pages qu'il ne devrait pas 
    if (to.path !== '/login') {
      next({path: '/login'})
      return
    } else {
      next()
    }
  } 
}


export default router
