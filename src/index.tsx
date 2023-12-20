import { createEffect, createSignal } from "solid-js"
import { render } from "solid-js/web"
import { A, Route, RouteSectionProps, Router, useLocation } from "@solidjs/router"
import { getImage, setTitle } from "./lib/util"
import { user } from "./lib/store"
import routes from "./lib/routes"

function App(props: RouteSectionProps) {
    // 修改标题
    const location = useLocation()
    createEffect(() => {
    const paths = location.pathname.match(/\/[^\/]*/)
    if (!paths?.length) return
    const route = routes.find(route => route.path.startsWith(paths[0]))
    if (!route) return
    setTitle(route.title)
    })

    // 自动收起header
    // const [getIsHeader, setIsHeader] = createSignal(true)
    // onMount(() => {
    //     let prevScrollY = 0
    //     addEventListener("scroll", useThrottle(() => {
    //         setIsHeader(scrollY < prevScrollY)
    //         prevScrollY = scrollY
    //     }))
    // })

    // 切换侧边栏
    const [getIsAside, setIsAside] = createSignal(true)

    return <>
        <section class="flex flex-col gap-3 min-h-screen p-3">
            <header class="flex items-center justify-between px-3 py-2 bg-white rounded-2xl">
                {/* logo@大屏 */}
                <a href="/" class="link hidden sm:flex items-center gap-1">
                    <img src="/favicon.webp" alt="" class="w-12" />
                    <span class="text-xl tracking-wide">NICKYZJ</span>
                </a>
                {/* menu@小屏 */}
                <div class="flex sm:hidden">menu</div>
                <div class="flex items-center gap-5">
                    {/* 系统通知 */}
                    <button class="" /* onClick={() => addToast("系统通知维护中！", "warning")} */>
                        {/* <Icon icon={notification} class="w-6 dark:text-gray-300" /> */}
                        icon
                    </button>
                    <div class="divider rounded-full h-5"></div>
                    {/* 用户中心 */}
                    <button class="flex items-center gap-1" /* onClick={() => addToast("用户数据维护中！", "warning")} */>
                        <span class="hidden sm:inline dark:text-gray-300">{user.username}</span>
                        <img src={getImage("/Avatars/Guest.webp")} alt="" class="w-12" />
                    </button>
                </div>
            </header>

            <div class="flex flex-1 gap-3">
                <aside class={"hidden md:flex flex-col justify-between w-20 p-3 bg-white dark:bg-gray-800 rounded-2xl transition-all " + (getIsAside() ? "lg:w-36 xl:w-52" : "")}>
                    {/* 导航 */}
                    <nav class="button-group sticky top-3 flex flex-col gap-5 overflow-x-hidden">
                        {routes.filter(route => route.isNav).map(route =>
                            <A href={route.path} activeClass="" end={route.path === "/"} class="btn">icon {route.title}</A>
                        )}
                    </nav>
                    {/* 小工具 */}
                    <div class="sticky bottom-3">
                        <button class="" onClick={() => setIsAside(!getIsAside())}>
                            {/* <Icon icon={align_arrow_left} class={classify("w-5 transition", !isAside && "rotate-180")} /> */}
                            icon
                        </button>
                    </div>
                </aside>
                {/* 路由页面 */}
                <main class="flex-1 p-3 bg-white rounded-2xl">{props.children}</main>
            </div>

            <footer class="flex justify-center gap-1 p-3 text-sm text-gray-400 bg-white rounded-2xl dark:text-gray-500">
                <span>Powered by</span>
                <a href="https://www.solidjs.com/" target="_blank" class="link">Solid</a>
                <span>+</span>
                <a href="https://tailwindcss.com/" target="_blank" class="link">Tailwind CSS</a>
                <span>+</span>
                <a href="https://preline.co/index.html" target="_blank" class="link">Preline UI</a>
            </footer>
        </section>
    </>
}

render(() => (
    <Router root={App}>
        {routes.map(route =>
            <Route path={route.path} component={route.component} />
        )}
    </Router>
), document.body)