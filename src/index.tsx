/* @refresh reload */
import { createSignal } from "solid-js"
import { render } from "solid-js/web"

function App() {
    const [getCount, setCount] = createSignal(1)
    setInterval(() => {
        setCount(count => count < 5 ? count + 1 : 1)
    }, 500)
    return <h1>Hello, world{"!".repeat(getCount())}</h1>
}

render(() => <App />, document.body)