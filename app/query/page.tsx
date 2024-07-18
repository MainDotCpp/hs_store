'use client'
import {useForm} from "react-hook-form";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useRequest} from "ahooks";
import {queryOrder} from "@/app/actions/commodity";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";

export default function Page() {
    const form = useForm()
    const {run, loading, data} = useRequest(queryOrder, {
        manual: true,
        onSuccess: (data) => {
            console.log(data)
        },
    })

    const handleSubmit = (data: any) => {
        run(data)
    }
    return <main className='p-4 max-w-[1200px] mx-auto'>
        <div className=' bg-white p-4 rounded-2xl '>
            <Form {...form}>
                <form className="space-y-4"
                      onSubmit={form.handleSubmit(handleSubmit)}
                >
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
                    <Button type='submit' className='w-full'>查询</Button>
                </form>
            </Form>

            {/*订单记录*/}
            {data && <>
                <div className=''>
                    <div className='flex flex-col'>

                    </div>
                </div>
                <Accordion type="single" collapsible>
                    {data.data.map((order: any) => (
                        <AccordionItem key={order.id} value={order.id}>
                            <AccordionTrigger>
                                <div className='flex  w-full justify-between pr-4'>
                                    <span>{order.commodityName}(数量: {order.count})</span>
                                    <span className='text-black/50'>{order.createTime}</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                {order.commodityItems.map(item => <div key={item.id}>{item.content}</div>)}
                            </AccordionContent>
                        </AccordionItem>
                    ))}

                </Accordion>

            </>}
        </div>
    </main>
}