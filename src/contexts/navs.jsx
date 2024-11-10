import BookIcon from "../components/icons/Book";
import HomeIcon from "../components/icons/Home";
import TvIcon from "../components/icons/Tv";
import UserIcon from "../components/icons/User";

/** 顶层路由表，用于渲染导航菜单 */
export default [
  { path: "/", title: "主页", icon: HomeIcon },
  { path: "/blogs", title: "文章", icon: BookIcon },
  { path: "/animes", title: "番剧", icon: TvIcon },
  { path: "/about", title: "关于", icon: UserIcon },
];