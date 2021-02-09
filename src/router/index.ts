import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
// import About from "@/views/About.vue";
import Home from "@/views/Home.vue";
import Auth from "@/views/Auth.vue";

export type layoutType = {
  layout: "main-layout" | "auth-layout" | "GoodsListLayout";
  auth: boolean;
};
type tMyRouteRecord = Omit<RouteRecordRaw, "meta"> & { meta: layoutType };

const routesPaths: Array<tMyRouteRecord> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      layout: "main-layout",
      auth: false,
    },
  },
  {
    path: "/auth",
    name: "Auth",
    component: Auth,
    meta: {
      layout: "auth-layout",
      auth: false,
    },
  },
  {
    path: "/help",
    name: "Help",
    component: () => import("../views/Help.vue"),
    meta: {
      layout: "main-layout",
      auth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: (routesPaths as unknown) as RouteRecordRaw[],
  linkActiveClass: "active",
  linkExactActiveClass: "active",
});

/*
router.beforeEach((to, from, next) => {
  const requireAuth: boolean = to.meta.auth;
  if (requireAuth && store.getters["auth/isAuthenticated"]) {
    next();
  } else if (requireAuth && !store.getters["auth/isAuthenticated"]) {
    next("/auth?message=" + to.path);
  } else {
    next();
  }
});

 */

export default router;
