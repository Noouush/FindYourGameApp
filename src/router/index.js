import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import LogIn from "../views/LogIn.vue";
import SignUp from "../views/Signup.vue";
import Game from "../views/Game.vue";
import Games from "../views/Games.vue";
import Topics from "../views/Topics.vue";
import Topic from "../views/Topic.vue";
import Admin from "../views/Admin.vue";
import CRUDUsers from "@/components/CRUDUsers.vue";
import Logout from "../views/Logout.vue";
import store from "@/store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "LogIn",
    component: LogIn,
  },
  {
    path: "/subscribe",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/game/:id",
    name: "Game",
    component: Game,
  },
  {
    path: "/games/:sortBy/:category/:platform",
    name: "GamesParams",
    component: Games,
  },
  {
    path: "/games/",
    name: "Games",
    component: Games,
  },
  {
    path: "/topics/",
    name: "Topics",
    component: Topics,
  },
  {
    path: "/topic/:id",
    name: "Topic",
    component: Topic,
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    beforeEnter(to, from, next) {
      let authentification = store._modules.root._children.authentification.state;
      if (authentification.authenticated !== true && authentification.user.isadmin !== 1) {
        next("/login");
      } else {
        next();
      }
    },
  },
  {
    path: "/admin/users",
    name: "CRUDUsers",
    component: CRUDUsers,
    beforeEnter(to, from, next) {
      let authentification = store._modules.root._children.authentification.state;
      if (authentification.authenticated !== true && authentification.user.isadmin !== 1) {
        next("/login");
      } else {
        next();
      }
    },
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout,
  },
  {
    path: "/admin/dashboard/bar",
    name: "Bar",
    component: () => import("../views/DashBoard/Bar.vue"),
    beforeEnter(to, from, next) {
      let authentification = store._modules.root._children.authentification.state;
      if (authentification.authenticated !== true && authentification.user.isadmin !== 1) {
        next("/login");
      } else {
        next();
      }
    },
  },
  {
    path: "/admin/dashboard/line",
    name: "Line",
    component: () => import("../views/DashBoard/Line.vue"),
    beforeEnter(to, from, next) {
      let authentification = store._modules.root._children.authentification.state;
      if (authentification.authenticated !== true && authentification.user.isadmin !== 1) {
        next("/login");
      } else {
        next();
      }
    },
  },
  {
    path: "/admin/dashboard/pie",
    name: "Pie",
    component: () => import("../views/DashBoard/Pie.vue"),
    beforeEnter(to, from, next) {
      let authentification = store._modules.root._children.authentification.state;
      if (authentification.authenticated !== true && authentification.user.isadmin !== 1) {
        next("/login");
      } else {
        next();
      }
    },
  },
  {
    path: "/admin/dashboard/visit",
    name: "Visit",
    component: () => import("../views/DashBoard/Visit.vue"),
    beforeEnter(to, from, next) {
      let authentification = store._modules.root._children.authentification.state;
      if (authentification.authenticated !== true && authentification.user.isadmin !== 1) {
        next("/login");
      } else {
        next();
      }
    },
  },
  {
    path: "/admin/dashboard/sign",
    name: "Sign",
    component: () => import("../views/DashBoard/Sign.vue"),
    beforeEnter(to, from, next) {
      let authentification = store._modules.root._children.authentification.state;
      if (authentification.authenticated !== true && authentification.user.isadmin !== 1) {
        next("/login");
      } else {
        next();
      }
    },
  },
  {
    path: "/admin/dashboard/rate",
    name: "Rate",
    component: () => import("../views/DashBoard/Rate.vue"),
    beforeEnter(to, from, next) {
      let authentification = store._modules.root._children.authentification.state;
      if (authentification.authenticated !== true && authentification.user.isadmin !== 1) {
        next("/login");
      } else {
        next();
      }
    },
  },
  {
    path: "/admin/dashboard",
    name: "DashBoard",
    component: () => import("../views/DashBoard/DashBoard.vue"),
    beforeEnter(to, from, next) {
      let authentification = store._modules.root._children.authentification.state;
      if (authentification.authenticated !== true && authentification.user.isadmin !== 1) {
        next("/login");
      } else {
        next();
      }
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
