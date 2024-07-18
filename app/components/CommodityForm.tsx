'use client'
import {Commodity} from "@/app/types";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useForm} from "react-hook-form";
import {IoLogoAlipay} from "react-icons/io5";
import {createCommodityOrder, queryOrderStatus} from "@/app/actions/commodity";
import {useEffect, useRef, useState} from "react";
import QRCode from "qrcode.react";
import AlipayIcon from "@/public/alipay.png";
import {AiOutlineLoading} from "react-icons/ai";
import {useToast} from "@/components/ui/use-toast";
import {BsCheck2Circle} from "react-icons/bs";
import {useRouter} from "next/navigation";
import {feeToYuan} from "@/lib/utils";

const CommodityForm = (props: {
    commodity: Commodity,
    payAction: typeof createCommodityOrder,
    queryAction: typeof queryOrderStatus
}) => {
    let {toast} = useToast();
    const form = useForm(
        {
            defaultValues: {
                count: 1,
                commodityId: props.commodity.id

            }
        })
    const orderNo = useRef(undefined)
    const [paymentInfo, setPaymentInfo] = useState()
    const [payLoading, setPayLoading] = useState(false)
    let router = useRouter();
    useEffect(() => {
        let timer = setInterval(() => {
            console.log(props.commodity.name)
            if (orderNo.current) {
                // 检测订单状态
                props.queryAction(orderNo.current as string).then(res => {
                    if (res.code === 200 && res.data === true) {
                        clearInterval(timer)
                        toast({
                            title: <div className='text-xl text-blue-500 flex space-x-2 items-center'><BsCheck2Circle
                                size={32}/> <span>支付成功</span></div>,
                            description: '即将跳转到查询界面',
                        })
                        setTimeout(() => {
                            router.push('/query')
                        }, 2000)
                    }
                })
            }
        }, 1000)
        return () => {
            clearInterval(timer)
        }
    }, [])
    return <>
        <div>
            <Form {...form}>
                <form className="space-y-4"
                      onSubmit={form.handleSubmit(async data => {
                          setPayLoading(true)
                          console.log(data)
                          const res = await props.payAction(data)
                          console.log(res)
                          if (res.code !== 200) {
                              alert(res.message)
                              setPayLoading(false)
                          }
                          orderNo.current = res.data.orderNo
                          setPaymentInfo(res.data)
                          setPayLoading(false)

                      })}>
                    <div className='flex justify-around'>
                        <div>商品名称:{props.commodity.name}</div>
                        <div>库存:{props.commodity.stock}</div>
                        <div>单价:{feeToYuan(props.commodity.price)}</div>
                    </div>

                    <FormField
                        name="email"
                        rules={
                            {
                                required: "邮箱不能为空",
                                pattern: {
                                    value: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                                    message: "邮箱格式不正确"
                                }
                            }
                        }
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>邮箱</FormLabel>
                                <FormControl>
                                    <Input  {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="password"
                        rules={{
                            required: "密码不能为空",
                            minLength: {value: 6, message: "密码长度不能小于6位"},
                            pattern: {
                                value: /^[a-zA-Z0-9_-]+$/,
                                message: "密码格式不正确"
                            }
                        }}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>查询密码</FormLabel>
                                <FormControl>
                                    <Input  {...field} />
                                </FormControl>
                                <FormDescription>
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        rules={{
                            required: "数量不能为空",
                            min: {value: 1, message: "数量不能小于1"},
                            max: {value: props.commodity.stock, message: "数量不能大于库存"}
                        }}
                        render={({field}) =>
                            <FormItem>
                                <FormLabel>数量</FormLabel>
                                <FormControl>
                                    <Input  {...field} type="number"/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        } name="count">
                    </FormField>
                    {paymentInfo && <div className='flex flex-col items-center space-y-2'>
                        <div>请打开支付宝扫描以下二维码</div>
                        <div className='text-gray-300'>订单号: {paymentInfo.orderNo}</div>
                        <div
                            className='text-2xl text-red-500'>￥{feeToYuan(paymentInfo.totalAmount)}</div>
                        <QRCode
                            value={paymentInfo.qrCode}// 生成二维码的内容
                            size={200} // 二维码的大小
                            fgColor="#000000" // 二维码的颜色
                        />
                    </div>}
                    <Button type="submit" className='w-full space-x-2 bg-blue-500 hover:bg-blue-400 transition-all'
                            disabled={payLoading}>
                        <IoLogoAlipay/>
                        <span>
                        购买
                        </span>
                        {payLoading &&
                            <AiOutlineLoading className='animate-spin'/>
                        }
                    </Button>
                </form>
            </Form>
        </div>
    </>
}

export default CommodityForm;