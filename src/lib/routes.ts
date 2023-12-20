import { lazy } from "solid-js"
import { BiRegularBookOpen, BiRegularHome, BiRegularTv, BiRegularUser } from "solid-icons/bi"

const Home = lazy(() => import("../routes/home"))
const Blogs = lazy(() => import("../routes/blogs"))
const Blog = lazy(() => import("../routes/blogs/blog"))
const Animes = lazy(() => import("../routes/animes"))
const Anime = lazy(() => import("../routes/animes/anime"))
const About = lazy(() => import("../routes/about"))
const MyGO = lazy(() => import("../routes/mygo"))

export default [
    { path: "/", component: Home, title: "主页", icon: BiRegularHome },
    { path: "/blogs", component: Blogs, title: "博客", icon: BiRegularBookOpen },
    { path: "/blogs/:id", component: Blog, title: "加载中" },
    { path: "/animes", component: Animes, title: "番剧", icon: BiRegularTv },
    { path: "/animes/:id", component: Anime, title: "加载中" },
    { path: "/about", component: About, title: "关于", icon: BiRegularUser },
    { path: "*", component: MyGO, title: "404" }
]