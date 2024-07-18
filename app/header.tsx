import {BsBagFill, BsSearch} from "react-icons/bs";
import Link from "next/link";

export function Header() {
    return <>
        <div className="header w-screen h-14 bg-white fixed top-0 opacity-95">
            <div className="flex items-center h-full px-8 text-xl gap-2 text-black/85">
                <div className="icon"></div>
                <Link href='/'
                      className='flex gap-2 items-center cursor-pointer hover:bg-blue-500/25 hover:text-blue-500 hover:scale-105 transition-all h-full px-2'><BsBagFill/><span>商品购买</span></Link>
                <Link href='/query'
                      className='flex gap-2 items-center cursor-pointer hover:bg-blue-500/25 hover:text-blue-500 hover:scale-105 transition-all h-full px-2'><BsSearch/><span>订单查询</span></Link>
            </div>
        </div>
        <div className="h-14"></div>
    </>;
}