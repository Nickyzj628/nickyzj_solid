import { createStore } from "solid-js/store"

export const [user, setUser] = createStore<User>({
    id: Date.now().toString(),
    username: `无名客${Math.floor(1000 + Math.random() * 9000)}`
})