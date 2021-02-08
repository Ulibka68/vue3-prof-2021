import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
// import About from "@/views/About.vue";
import Home from "@/views/Home.vue";

export type layoutType = { layout: "main" | "auth"; auth: boolean };
type tMyRouteRecord = Omit<RouteRecordRaw, "meta"> & { meta: layoutType };

const routesPaths: Array<tMyRouteRecord> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      layout: "main",
      auth: false,
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
