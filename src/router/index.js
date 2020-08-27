import Vue from "vue";
import VueRouter from "vue-router";
import getInfo from "../views/getInfo.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "getInfo",
    component: getInfo
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
