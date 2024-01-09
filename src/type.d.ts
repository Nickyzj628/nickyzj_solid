/** 后端请求返回数据类型 */
type Res<T> = {
    data?: T;
    pages?: number;
    message?: string;
}

type User = {
    id: string;
    username: string;
}

type Shanbay = {
    content: string;
    translation: string;
    author: string;
    image: string;
    href: string;
}

type Blog = {
    id: string;
    title: string;
    updated: number;
}

type Anime = {
    id: string;
    title: string;
    cate: string;
    eps: number;
    updated: number;
}