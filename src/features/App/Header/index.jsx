import Avatar from "@/components/Avatar";
import NotificationIcon from "@/components/icons/Notification";
import Toggle from "@/components/Toggle";
import navs from "@/contexts/navs";
import { useUserContext } from "@/contexts/user";
import { clsx } from "@/services/dom";
import { throttle } from "@/services/time";
import { useLocation } from "@solidjs/router";
import { createSignal, For, onMount } from "solid-js";
import { Dynamic } from "solid-js/web";
import { toast } from "../Toaster";

const Header = () => {
  const [getUser] = useUserContext();

  // 伸缩顶栏
  const [getIsHeader, setIsHeader] = createSignal(true);
  onMount(() => {
    let prevScrollY = 0;
    window.onscroll = throttle(() => {
      setIsHeader(window.scrollY < prevScrollY);
      prevScrollY = window.scrollY;
    }, 150);
  });

  // 开关手机导航菜单
  const [getIsNav, setIsNav] = createSignal(false);

  // 高亮当前顶层路由
  const location = useLocation();
  const getCurrentPath = () => location.pathname.match(/\/[^\/]*/)[0];

  return (
    <header className={clsx("bento sticky z-10 flex items-center justify-between py-2 transition-all", getIsHeader() ? "top-0" : "-top-20")}>
      {/* logo */}
      <a href="/" className="hidden sm:flex items-center gap-1.5 hover:no-underline">
        <img src="/favicon.ico" alt="" className="size-12" />
        <span className="text-xl tracking-wide transition dark:text-zinc-200">NICKYZJ</span>
      </a>
      {/* nav@phone */}
      <div className="relative block sm:hidden">
        <Toggle className="relative z-10" value={getIsNav()} onChange={(value) => setIsNav(value)} />
        <div className={clsx("fixed left-0 top-0 h-full w-full bg-black/30 transition-all", !getIsNav() && "invisible opacity-0")}></div>
        <div className={clsx("absolute left-0 flex w-10 flex-col gap-3 transition-all", getIsNav() ? "top-14" : "invisible top-0 opacity-0")}>
          <For each={navs}>
            {(nav) => (
              <a href={nav.path} className={clsx("button", nav.path === getCurrentPath() && "opacity-50")} onClick={() => setIsNav(false)}>
                <Dynamic component={nav.icon} />
              </a>
            )}
          </For>
        </div>
      </div>
      {/* user */}
      <div className="flex items-center gap-6">
        <button onClick={() => toast("消息数据表维护中！")}>
          <NotificationIcon className="size-5" />
        </button>
        <div className="divider"></div>
        <button className="gap-1.5 !bg-transparent p-0" onClick={() => toast("用户数据表维护中！")}>
          <span className="hidden sm:inline">{getUser().name}</span>
          <Avatar />
        </button>
      </div>
    </header>
  );
};

export default Header;