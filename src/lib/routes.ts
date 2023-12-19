import { lazy } from "solid-js"

const Home = lazy(() => import("../routes/home"))
const Blogs = lazy(() => import("../routes/blogs"))
const Blog = lazy(() => import("../routes/blogs/blog"))
const Animes = lazy(() => import("../routes/animes"))
const Anime = lazy(() => import("../routes/animes/anime"))
const About = lazy(() => import("../routes/about"))

export default [
    { path: "/", component: Home, title: "动态", isNav: true },
    { path: "/blogs", component: Blogs, title: "博客", isNav: true },
    { path: "/blogs/:id", component: Blog, title: "加载中", isNav: false },
    { path: "/animes", component: Animes, title: "番剧", isNav: true },
    { path: "/animes/:id", component: Anime, title: "加载中", isNav: false },
    { path: "/about", component: About, title: "关于", isNav: true },
    { path: "*", component: Animes, title: "404", isNav: false }
]