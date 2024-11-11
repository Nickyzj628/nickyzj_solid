import AlignArrowLeftIcon from "@/components/icons/AlignArrowLeft";
import MoonIcon from "@/components/icons/Moon";
import SunIcon from "@/components/icons/Sun";
import navs from "@/contexts/navs";
import { clsx } from "@/services/dom";
import { useLocation } from "@solidjs/router";
import { createEffect, createSignal, For, onMount } from "solid-js";
import { Dynamic } from "solid-js/web";

const Aside = () => {
  // 高亮当前顶层路由
  const location = useLocation();
  const getCurrentPath = () => location.pathname.match(/\/[^\/]*/)[0];

  // 伸缩侧边栏
  const [getIsAsideFold, setIsAsideFold] = createSignal(Boolean(localStorage.isAsideFold));
  createEffect(() => {
    localStorage.isAsideFold = getIsAsideFold() ? "1" : "";
  });

  // 手动切换深色模式
  const [getIsDark, setIsDark] = createSignal(window.matchMedia("(prefers-color-scheme: dark)").matches);
  createEffect(() => {
    document.documentElement.className = getIsDark() ? "dark" : "";
  });
  // 自动
  onMount(() => {
    window.matchMedia("(prefers-color-scheme: dark)").onchange = (e) => {
      setIsDark(e.matches);
    };
  });

  return (
    <aside className={clsx("bento hidden sm:flex flex-col justify-between w-16 rounded-xl transition-all", !getIsAsideFold() && "lg:w-36 xl:w-44")}>
      {/* nav */}
      <nav className={clsx("sticky top-3 flex flex-col gap-3", !getIsAsideFold() && "lg:gap-4")}>
        <For each={navs}>
          {(nav) => (
            <a href={nav.path} className={clsx("button gap-1.5 whitespace-nowrap hover:no-underline", !getIsAsideFold() && "lg:rounded-xl", nav.path === getCurrentPath() ? "active" : "bg-transparent opacity-50 hover:opacity-100 dark:bg-transparent")}>
              <Dynamic component={nav.icon} className={clsx("size-5", !getIsAsideFold() && "lg:size-6")} />
              <span className={clsx("hidden", !getIsAsideFold() && "lg:inline")}>{nav.title}</span>
            </a>
          )}
        </For>
      </nav>
      {/* gadgets */}
      <div className="sticky bottom-3 flex flex-wrap gap-3">
        <button className={clsx("hidden lg:inline-flex", getIsAsideFold() && "rotate-180")} onClick={() => setIsAsideFold(!getIsAsideFold())}>
          <AlignArrowLeftIcon className="size-5" />
        </button>
        <button onClick={() => setIsDark(!getIsDark())}>
          <Dynamic component={getIsDark() ? SunIcon : MoonIcon} className="size-5" />
        </button>
      </div>
    </aside>
  );
};

export default Aside;