
// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { useGlobalStore } from '@/store/globalStore';
import { useUserStore } from '@/store/userStore';
import useNotifications from "@/composables/useNotifications";
import { supabase } from '@/supabaseConfig/supabaseClient';

const { addNotification } = useNotifications();


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
    beforeEnter: [preventFromConnectedUser],
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
    path: "/user/profile",
    name: "Profile",
    meta: { layout: "DefaultLayout" },
    component: () =>
      import(/* webpackChunkName: "canlendar" */ "@/views/Profile.vue"),
    beforeEnter: [preventFromNotConnectedUser],
  },
  {
    path: "/user/edit_profile",
    name: "editProfile",
    meta: { layout: "DefaultLayout" },
    component: () =>
      import(/* webpackChunkName: "canlendar" */ "@/views/EditProfile.vue"),
    beforeEnter: [preventFromNotConnectedUser],
  },
  {
    path: "/user/reset_password",
    name: "resetPassword",
    meta: { layout: "DefaultLayout" },
    component: () =>
      import(/* webpackChunkName: "canlendar" */ "@/views/ResetPassword.vue"),
    beforeEnter: [preventFromConnectedUser],
  },
  {
    path: "/user/edit_password",
    name: "editPassword",
    meta: { layout: "DefaultLayout" },
    component: () =>
      import(/* webpackChunkName: "canlendar" */ "@/views/EditPassword.vue")
  },
  {
    path: "/admin/posts",
    name: "postAdmin",
    meta: { layout: "DefaultLayout" },
    component: () =>
      import(/* webpackChunkName: "canlendar" */ "@/views/postsAdmin.vue"),
    beforeEnter: [preventFromNotConnectedUser,isAdmin]
  },
  {
    path: "/admin/new_post",
    name: "newPost",
    meta: { layout: "DefaultLayout" },
    component: () =>
      import(/* webpackChunkName: "canlendar" */ "@/views/addPost.vue"),
    beforeEnter: [preventFromNotConnectedUser,isAdmin]
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



async function preventFromConnectedUser(to, from, next) {
  // userStore doit être dans la fonction car probleme de chargement sinon
  const userStore = useUserStore();
  const user = await userStore.seeCurrentUser();
  if (user) {
    addNotification({message :'Vous ne pouvez pas acceder à cette page en étant connecté', timeout : 6000 , type : 'error'})
    router.push('/')
  } else {
    next()
  }
}

async function preventFromNotConnectedUser(to, from, next) {
  const userStore = useUserStore();
  const user = await userStore.seeCurrentUser();
  if (user) {
    next()
  } else {
    addNotification({ message: "Vous devez être connecté pour acceder à cette page", timeout: 6000, type: "error" });
    router.push('/login')
  }
}

async function isAdmin(to, from, next) {
  const userStore = useUserStore();
  const user = await userStore.seeCurrentUser();
  if (user) {
    const userInfo = await userStore.getUserInfo(user.session.user.id);
    if (userInfo) {
      const profile = await userStore.getUserProfileNameById(userInfo.profile_id);
      if (profile && profile.name === "Admin") {
        next()
      } else {
        addNotification({
          message: "Vous n'avez pas accés à cette page",
          timeout: 6000,
          type: "error",
        });
      }
    }
    
  }
}

export default router
