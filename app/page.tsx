import {CommodityGroup} from "@/app/types";
import FbIcon from "@/public/fb.png"
import Image from "next/image";
import {WebSiteIcon} from "@/app/components/WebSiteIcon";
import {BsCartPlusFill, BsMegaphoneFill, BsXDiamondFill} from "react-icons/bs";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import CommodityForm from "@/app/components/CommodityForm";
import {createCommodityOrder, queryOrderStatus} from "@/app/actions/commodity";
import {feeToYuan} from "@/lib/utils";

export default async function Home() {
    const resp = await fetch("https://console.d-l.ink/api/commodityGroup/list")
    let data = await resp.json()
    data = data.data as CommodityGroup[]

    // @ts-ignore
    return (
        <main className="content py-2">
            <div
                className="notify max-w-[1200px] mx-auto bg-white/95 backdrop-blur-lg rounded-2xl min-h-40 ">
                <div className="group-title p-4 rounded-t-2xl text-xl flex gap-2 items-center"><BsMegaphoneFill
                    className='text-blue-500'/> <span>公告</span></div>
            </div>
            <div className="commodities flex flex-col gap-4 max-w-[1200px] mx-auto  rounded-2xl mt-4">
                {data.map((group: CommodityGroup) => (
                    <div key={group.id}
                         className="commodity-group bg-white/95 backdrop-blur-lg rounded-2xl overflow-hidden">
                        <div className="group-title p-4 rounded-t-2xl text-xl flex gap-2 items-center">
                            <BsXDiamondFill className='text-blue-500'/> <span>{group.groupName}</span></div>
                        <div className="commodities flex flex-col  divide-y ">
                            {group.commodities.map((commodity) => (
                                <div key={commodity.id}
                                     className="commodity  p-2 grid grid-cols-12 hover:bg-blue-500/10 transition-all justify-items-center gap-2 items-center">
                                    <div
                                        className="name col-span-12 md:col-span-7 justify-self-start flex gap-2 items-center">
                                        <Image className='cover col-span-1 h-full w-auto'
                                               src={WebSiteIcon[commodity.cover] || WebSiteIcon.TK} alt='icon'
                                               width={32} height={32}/>
                                        {commodity.name}</div>
                                    <div className="price col-span-4 md:col-span-2">价格: <span
                                        className='text-red-400 font-black'>￥{feeToYuan(commodity.price)}</span>
                                    </div>
                                    <div className="stock col-span-4 md:col-span-2">库存：<span
                                        className='text-blue-400 font-black'>{commodity.stock}</span></div>
                                    <Dialog>
                                        <DialogTrigger>
                                            <div
                                                className="action col-span-4  md:col-span-1 flex gap-2 items-center bg-blue-500 hover:bg-blue-700 cursor-pointer px-2 rounded-2xl text-white transition-all hover:shadow-2xl">
                                                <BsCartPlusFill/>
                                                <span>购买</span>
                                            </div>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader><DialogTitle>购买商品</DialogTitle></DialogHeader>
                                            <DialogDescription>
                                                <CommodityForm commodity={commodity}
                                                               payAction={createCommodityOrder}
                                                               queryAction={queryOrderStatus}
                                                />
                                            </DialogDescription>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
