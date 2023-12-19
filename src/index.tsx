import { createEffect, createSignal } from "solid-js"
import { render } from "solid-js/web"
import { A, Route, Router, useLocation } from "@solidjs/router"
import { getImage, setTitle } from "./lib/util"
import { user } from "./lib/store"
import routes from "./lib/routes"

function Routes() {
    return (
        <Router root={App}>
            {routes.map(route =>
                <Route path={route.path} component={route.component} />
            )}
        </Router>
    )
}

function App(props: any) {
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
            <header class="flex items-center justify-between px-3 py-2 bg-white rounded-lg">
                {/* logo@大屏 */}
                <a href="/" class="link link-hover hidden sm:flex items-center gap-1">
                    <img src="/favicon.webp" alt="" class="w-12" />
                    <span class="text-xl tracking-wide">NICKYZJ</span>
                </a>
                {/* menu@小屏 */}
                <div class="flex sm:hidden">menu</div>
                <div class="flex items-center">
                    {/* 系统通知 */}
                    <button class="btn btn-ghost btn-circle" /* onClick={() => addToast("系统通知维护中！", "warning")} */>
                        {/* <Icon icon={notification} class="w-6 dark:text-zinc-300" /> */}
                        icon
                    </button>
                    <div class="divider divider-horizontal self-center h-5"></div>
                    {/* 用户中心 */}
                    <button class="link link-hover flex items-center gap-1" /* onClick={() => addToast("用户数据维护中！", "warning")} */>
                        <span class="hidden sm:inline dark:text-zinc-300">{user.username}</span>
                        <img src={getImage("/Avatars/Guest.webp")} alt="" class="w-12" />
                    </button>
                </div>
            </header>

            <div class="flex flex-1 gap-3">
                <aside class={"hidden md:flex flex-col justify-between w-20 p-3 bg-white dark:bg-zinc-800 rounded-lg transition-all " + (getIsAside() ? "lg:w-36 xl:w-52" : "")}>
                    {/* 导航 */}
                    <nav class="button-group sticky top-3 flex flex-col gap-5 overflow-x-hidden">
                        {routes.filter(route => route.isNav).map(route =>
                            <A href={route.path} activeClass="btn-neutral" end={route.path === "/"} class="btn">icon {route.title}</A>
                        )}
                    </nav>
                    {/* 小工具 */}
                    <div class="sticky bottom-3">
                        <button class="btn btn-circle" onClick={() => setIsAside(!getIsAside())}>
                            {/* <Icon icon={align_arrow_left} class={classify("w-5 transition", !isAside && "rotate-180")} /> */}
                            icon
                        </button>
                    </div>
                </aside>
                {/* 路由页面 */}
                <main class="flex-1 p-3 bg-white rounded-lg">{props.children}</main>
            </div>

            <footer class="flex justify-center gap-1 p-3 text-sm text-zinc-400 bg-white rounded-lg dark:text-zinc-500">
                <span>Powered by</span>
                <a href="https://www.solidjs.com/" target="_blank" class="link link-hover">Solid</a>
                <span>+</span>
                <a href="https://tailwindcss.com/" target="_blank" class="link link-hover">Tailwind CSS</a>
                <span>+</span>
                <a href="https://daisyui.com/" target="_blank" class="link link-hover">daisyUI</a>
            </footer>
        </section>
    </>
}

render(() => <Routes />, document.body)