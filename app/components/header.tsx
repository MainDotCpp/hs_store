'use client'
import {BsBagFill, BsSearch} from "react-icons/bs";
import Link from "next/link";
import {router} from "next/client";

export function Header() {
    let defaultClass = `flex gap-2 items-center cursor-pointer hover:bg-blue-500/25 hover:text-blue-500 hover:scale-105 transition-all h-full px-2`;
    let activeClass = `flex gap-2 items-center cursor-pointer bg-blue-500/25 text-blue-500 hover:scale-105 transition-all h-full px-2`;
    return <>
        <div className="header w-screen h-14 bg-white fixed top-0 opacity-95">
            <div className="flex items-center h-full px-8 text-xl gap-2 text-black/85">
                <div className="icon"></div>
                <Link href='/'
                      className={router.basePath === '/' ? activeClass : defaultClass}><BsBagFill/><span>首页</span></Link>
                <Link href='/query'
                      className={router.basePath === '/query' ? activeClass : defaultClass}><BsSearch/><span>订单查询</span></Link>
            </div>
        </div>
        <div className="h-14"></div>
    </>;
}