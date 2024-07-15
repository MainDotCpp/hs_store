import {CommodityGroup} from "@/app/types";
import FbIcon from "@/public/fb.png"
import Image from "next/image";
import {WebSiteIcon} from "@/app/components/WebSiteIcon";

export default async function Home() {
    const resp = await fetch("https://console.d-l.ink/api/commodityGroup/list")
    let data = await resp.json()
    data = data.data as CommodityGroup[]

    return (
        <main
            className="bg-gray-50 text-black/85 bg-[url('https://w.wallhaven.cc/full/we/wallhaven-werowr.png')] bg-fixed bg-cover min-h-screen">
            <div className="header grid w-screen h-12 bg-blue-500 fixed top-0 opacity-25 "></div>
            <div className='h-12'></div>
            <div className="content py-2">
                <div
                    className="notify max-w-[1200px] mx-auto bg-white/80 backdrop-blur-lg rounded-2xl min-h-40 p-2">公告
                </div>
                <div className="commodities flex flex-col gap-4 max-w-[1200px] mx-auto  rounded-2xl mt-4">
                    {data.map((group) => (
                        <div key={group.id}
                             className="commodity-group bg-white/80 backdrop-blur-lg rounded-2xl overflow-hidden">
                            <div className="group-title p-4 rounded-t-2xl text-xl">{group.groupName}</div>
                            <div className="commodities flex flex-col  divide-y ">
                                {group.commodities.map((commodity) => (
                                    <div key={commodity.id}
                                         className="commodity  p-2 grid grid-cols-12 hover:bg-blue-500/10 transition-all justify-items-center gap-2 items-center">
                                        <div
                                            className="name col-span-12 md:col-span-7 justify-self-start flex gap-2 items-center">
                                            <Image className='cover col-span-1 h-full w-auto' src={WebSiteIcon[commodity.cover] || WebSiteIcon.TK} alt='icon' width={32} height={32}/>
                                            {commodity.name}</div>
                                        <div className="price col-span-4 md:col-span-2">价格: <span
                                            className='text-red-400 font-black'>￥{commodity.price}</span></div>
                                        <div className="stock col-span-4 md:col-span-2">库存：<span
                                            className='text-blue-400 font-black'>{commodity.stock}</span></div>
                                        <div className="action col-span-4  md:col-span-1">
                                            <span>购买</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
