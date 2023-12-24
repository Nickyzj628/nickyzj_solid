import { For, Show, createEffect, createSignal, onMount } from "solid-js"
import { Dynamic, render } from "solid-js/web"
import { A, Route, RouteSectionProps, Router, useLocation } from "@solidjs/router"
import { BiRegularArrowToLeft, BiRegularBell, BiRegularMoon, BiRegularSun } from "solid-icons/bi"
import { getImage, setTitle, useThrottle } from "./lib/util"
import { user } from "./lib/store"
import routes from "./lib/routes"

function App(props: RouteSectionProps) {
    // 修改标题 (例/blogs/1234)
    const location = useLocation()
    createEffect(() => {
        // 先从地址栏匹配/blogs和/1234
        const paths = location.pathname.match(/\/[^\/]*/g)
        if (!paths) return
        // 再从路由表里找出路径有2个/且以/blogs开头的路由
        const route = routes.find(route => route.path.match(/\//g)?.length === paths.length && route.path.startsWith(paths[0]))
        setTitle(route?.title ?? "404")
    })

    // 自动隐藏header
    const [getIsHeader, setIsHeader] = createSignal(true)
    onMount(() => {
        let prevScrollY = 0
        addEventListener("scroll", useThrottle(() => {
            setIsHeader(scrollY < prevScrollY)
            prevScrollY = scrollY
        }))
    })

    // 切换menu
    const [getIsMenu, setIsMenu] = createSignal(false)

    // 切换侧边栏
    const [getIsAside, setIsAside] = createSignal(Boolean(localStorage.isAside ?? true))
    createEffect(() => {
        localStorage.isAside = getIsAside() ? "1" : ""
    })

    // 切换深色模式
    const [getIsDark, setIsDark] = createSignal(matchMedia("(prefers-color-scheme:dark)").matches)
    createEffect(() => {
        document.documentElement.classList.toggle("dark", getIsDark())
    })
    onMount(() => {
        matchMedia("(prefers-color-scheme:dark)").onchange = (e) => {
            setIsDark(e.matches)
        }
    })

    return <>
        <section class="flex flex-col gap-3 min-h-screen p-3">
            <header class={"sticky z-10 flex items-center justify-between px-3 py-2 bg-white rounded-2xl dark:bg-neutral-800 transition-all " + (getIsHeader() ? "top-0" : "-top-16")}>
                {/* logo@大屏 */}
                <a href="/" class="hidden sm:flex items-center gap-1.5">
                    <img src="/favicon.webp" alt="" class="w-12" />
                    <h3 class="tracking-wide">NICKYZJ</h3>
                </a>
                {/* menu@小屏 */}
                <div class="relative flex sm:hidden">
                    <button class="group button z-10 flex-col justify-center gap-2 aspect-square p-3" onFocus={() => setIsMenu(!getIsMenu())} onBlur={() => setIsMenu(false)}>
                        <div class="w-[1.125rem] h-0.5 bg-neutral-400 rounded-full group-focus:bg-neutral-500 group-focus:rotate-45 group-focus:translate-y-[5px] dark:bg-neutral-300 dark:group-focus:bg-neutral-200 transition"></div>
                        <div class="w-[1.125rem] h-0.5 bg-neutral-400 rounded-full group-focus:bg-neutral-500 group-focus:-rotate-45 group-focus:-translate-y-[5px] dark:bg-neutral-300 dark:group-focus:bg-neutral-200 transition"></div>
                    </button>
                    <div class={"absolute flex flex-col gap-3 w-full rounded-xl transition-all " + (getIsMenu() ? "top-[52px] opacity-100" : "top-0 opacity-0")}>
                        <For each={routes.filter(route => Boolean(route.icon))}>{(route) =>
                            <A href={route.path} end={route.path === "/"} class="button justify-center w-full aspect-square p-0" inactiveClass="text-neutral-400 dark:text-neutral-500">
                                <Dynamic component={route.icon} size={21} />
                            </A>}
                        </For>
                    </div>
                </div>
                <div class="flex items-center gap-5">
                    {/* 系统通知 */}
                    <button class="button p-2.5 bg-neutral-50 dark:bg-neutral-800">
                        <BiRegularBell size={21} />
                    </button>
                    <div class="divider h-5 rounded-full"></div>
                    {/* 用户中心 */}
                    <button class="flex items-center gap-1.5">
                        <span class="hidden sm:inline dark:text-neutral-300 transition">{user.username}</span>
                        <img src={getImage("/Avatars/Guest.webp")} alt="" class="w-12" />
                    </button>
                </div>
            </header>

            <div class="flex flex-1 gap-3">
                <aside class={"hidden md:flex flex-col justify-between w-20 p-3 bg-white rounded-2xl dark:bg-neutral-800 transition-all " + (getIsAside() ? "lg:w-36 xl:w-52" : "")}>
                    {/* 导航 */}
                    <nav class="sticky top-3 flex flex-col gap-5 overflow-x-hidden">
                        <For each={routes.filter(route => Boolean(route.icon))}>{(route) =>
                            <A href={route.path} end={route.path === "/"} class="button text-base" activeClass="bg-neutral-200" inactiveClass="text-neutral-500 dark:text-neutral-500 bg-white dark:bg-neutral-800">
                                <Dynamic component={route.icon} size={21} />
                                <span class={"opacity-0 lg:opacity-100 whitespace-nowrap transition-opacity " + (getIsAside() ? "" : "opacity-0")}>{route.title}</span>
                            </A>}
                        </For>
                    </nav>
                    {/* 小工具 */}
                    <div class="sticky bottom-3 flex gap-2 overflow-x-auto">
                        <button class="button aspect-square p-2.5" onClick={() => setIsAside(!getIsAside())}>
                            <BiRegularArrowToLeft size={21} class={"transition-transform " + (getIsAside() ? "" : "rotate-180")} />
                        </button>
                        <button class="button aspect-square p-2.5" onClick={() => setIsDark(!getIsDark())}>
                            <Show when={getIsDark()} fallback={<BiRegularMoon size={21} />}>
                                <BiRegularSun size={21} />
                            </Show>
                        </button>
                    </div>
                </aside>
                {/* 路由页面 */}
                <main class="flex-1 p-3 bg-white rounded-2xl dark:bg-neutral-800 transition">{props.children}</main>
            </div>

            <footer class="flex justify-center gap-1 p-3 text-sm text-neutral-400 bg-white rounded-2xl dark:text-neutral-500 dark:bg-neutral-800 transition">
                <span>Powered by</span>
                <a href="https://solidjs.com" target="_blank" class="link">Solid</a>
                <span>+</span>
                <a href="https://tailwindcss.com" target="_blank" class="link">Tailwind CSS</a>
                <span>+</span>
                <a href="https://preline.co" target="_blank" class="link">Preline UI</a>
            </footer>
        </section>
    </>
}

render(() => (
    <Router root={App}>
        <For each={routes}>{(route) =>
            <Route path={route.path} component={route.component} />}
        </For>
    </Router>
), document.body)