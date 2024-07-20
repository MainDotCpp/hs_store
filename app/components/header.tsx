'use client'

import {usePathname} from "next/navigation";
import Link from "next/link";
import {BsBagFill, BsSearch} from "react-icons/bs";
import {useState} from "react";

export function Header() {
    let defaultClass = `flex gap-2 items-center cursor-pointer hover:bg-black/10  hover:scale-105 transition-all h-full px-2 h-full rounded-md text-black/85`;
    let activeClass = `scale-105 bg-black/10`;
    // 获取当前请求路径
    let pathname = usePathname();
    const [menu, setMenu] = useState([
        {icon: BsBagFill, text: '首页', path: '/'},
        {icon: BsSearch, text: '订单查询', path: '/query'},
    ]);

    return <>
        <div className="header w-screen h-14 bg-white fixed top-0 opacity-95">
            <div className="flex items-center h-full px-8 text-xl gap-2 text-black/85">
                <div className="icon"></div>
                <div className="menu flex gap-2 h-full py-1">
                    {menu.map((item, index) => (
                        <Link key={index} href={item.path}>
                            <div className={`${defaultClass} ${pathname === item.path ? activeClass : ''}`}>
                                <item.icon/>
                                <span>{item.text}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
        <div className="h-14"></div>
    </>;
}