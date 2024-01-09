import { For, createEffect, createSignal, onMount } from "solid-js"
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
        <div class="flex flex-col gap-3 min-h-screen p-3">
            <header class={"sticky z-10 flex items-center justify-between px-3 py-2 bg-white rounded-2xl dark:bg-zinc-800 transition-all " + (getIsHeader() ? "top-0" : "-top-16")}>
                {/* logo@大屏 */}
                <a href="/" class="hidden sm:flex items-center gap-1 text-black dark:text-zinc-200">
                    <img src="/favicon.webp" alt="" class="w-12" />
                    <h3>NICKYZJ</h3>
                </a>
                {/* 路由表@小屏 */}
                <div class="relative block sm:hidden">
                    <button class="peer group relative z-10 flex-col justify-center gap-1.5 p-3 aspect-square">
                        <span class="w-4 h-0.5 bg-zinc-600 rounded-full group-focus:rotate-45 group-focus:translate-y-1 transition"></span>
                        <span class="w-4 h-0.5 bg-zinc-600 rounded-full group-focus:-rotate-45 group-focus:-translate-y-1 transition"></span>
                    </button>
                    <nav class="invisible opacity-0 absolute z-0 top-0 flex flex-col gap-2 peer-focus:visible peer-focus:opacity-100 peer-focus:translate-y-12 transition-all">
                        <For each={routes.filter(route => Boolean(route.icon))}>{(route) =>
                            <A href={route.path} end={route.path === "/"} role="button" activeClass="active">
                                <Dynamic component={route.icon} size={20} />
                            </A>}
                        </For>
                    </nav>
                </div>
                <div class="flex items-center gap-4 md:gap-6">
                    {/* 通知 */}
                    <button>
                        <BiRegularBell size={20} />
                    </button>
                    <hr />
                    {/* 用户 */}
                    <div class="flex items-center gap-1.5">
                        <span class="hidden sm:inline text-zinc-800 dark:text-zinc-200 transition">{user.username}</span>
                        <img src={getImage("/Avatars/Guest.webp")} alt="" class="w-10 sm:w-12" />
                    </div>
                </div>
            </header>

            <section class="flex flex-1 gap-3">
                <aside class={"hidden md:flex flex-col justify-between w-16 p-3 bg-white dark:bg-zinc-800 rounded-2xl transition-all " + (getIsAside() ? "lg:w-36 xl:w-52" : "")}>
                    {/* 路由表 */}
                    <nav class={"sticky top-3 flex flex-col gap-5 " + (getIsAside() ? "lg:gap-6" : "")}>
                        <For each={routes.filter(route => Boolean(route.icon))}>{(route) =>
                            <A href={route.path} end={route.path === "/"} role="button" class={"!no-underline transition-all " + (getIsAside() ? "lg:p-3 lg:rounded-xl" : "")} activeClass="active" inactiveClass="opacity-60 hover:opacity-100 bg-transparent dark:bg-transparent">
                                <Dynamic component={route.icon} class={"text-xl " + (getIsAside() ? "lg:text-2xl" : "")} />
                                <span class={"opacity-0 whitespace-nowrap transition-opacity " + (getIsAside() ? "lg:opacity-100 text-base" : "text-sm")}>{route.title}</span>
                            </A>}
                        </For>
                    </nav>
                    {/* 小工具 */}
                    <div class="sticky bottom-3 flex flex-wrap gap-2">
                        <button onClick={() => setIsAside(!getIsAside())}>
                            <BiRegularArrowToLeft size={20} class={"transition-transform " + (getIsAside() ? "" : "rotate-180")} />
                        </button>
                        <button onClick={() => setIsDark(!getIsDark())}>
                            <Dynamic component={getIsDark() ? BiRegularSun : BiRegularMoon} size={20} />
                        </button>
                    </div>
                </aside>
                {/* 路由页面 */}
                <main class="flex-1 p-3 bg-white dark:bg-zinc-800 rounded-2xl transition">{props.children}</main>
            </section>

            <footer class="flex justify-center gap-1 p-3 text-sm text-zinc-400 dark:text-zinc-500 bg-white dark:bg-zinc-800 rounded-2xl transition">
                <span>Powered by</span>
                <a href="https://solidjs.com" target="_blank" class="link">Solid</a>
                <span>+</span>
                <a href="https://tailwindcss.com" target="_blank" class="link">Tailwind CSS</a>
                <span>+</span>
                <a href="https://preline.co" target="_blank" class="link">Preline UI</a>
            </footer>
        </div>
    </>
}

render(() => (
    <Router root={App}>
        <For each={routes}>{(route) =>
            <Route path={route.path} component={route.component} />}
        </For>
    </Router>
), document.body)