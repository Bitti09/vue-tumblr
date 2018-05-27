import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Dashboard from "./views/Dashboard.vue";
import UserFollowing from "./views/UserFollowing.vue";
import BlogPosts from "./views/BlogPosts.vue";
import BlogLikes from "./views/BlogLikes.vue";
import PostDetails from "./views/PostDetails.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/Following/",
      redirect: "/Following/1"
    },
    {
      path: "/Following/:page",
      name: "Following",
      component: UserFollowing,
      props: false
    },
    {
      path: "/Dashboard/:filter/",
      redirect: "/Dashboard/:filter/1"
    },
    {
      path: "/Dashboard/:filter/:page",
      name: "Dashboard",
      component: Dashboard,
      props: false
    },
    {
      path: "/PostDetail/:User/:Postid/",
      redirect: "/PostDetail/:User/:Postid/1"
    },
    {
      path: "/PostDetail/:User/:Postid/:page",
      name: "PostDetail",
      component: PostDetails,
      props: false
    },
    {
      path: "/BlogPosts/:User/",
      redirect: "/BlogPosts/:User/all/0"
    },
    {
      path: "/BlogPosts/:User/:filter/",
      redirect: "/BlogPosts/:User/:filter/1"
    },
    {
      path: "/BlogPosts/:User/:filter/:page",
      name: "BlogPosts",
      component: BlogPosts,
      props: false
    },
    {
      path: "/BlogLikes/:User/",
      redirect: "/BlogLikes/:User/1/"
    },
    {
      path: "/BlogLikes/:User/:page/",
      name: "BlogLikes",
      component: BlogLikes,
      props: true
    },
    {
      path: "/",
      redirect: "/1/"
    },
    {
      path: "/:page/",
      name: "Home",
      component: Home,
      props: false
    },
    {
      path: "*",
      redirect: "/"
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  }
});
