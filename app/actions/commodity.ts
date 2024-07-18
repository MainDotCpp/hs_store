'use server'

type CreateCommodityOrderDTO = {
    commodityId: number;
    count: number;
    email: string;
    password: string;
}

export async function createCommodityOrder(dto: CreateCommodityOrderDTO) {
    let response = await fetch('https://console.d-l.ink/api/commodityOrder/pay', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dto)
    })
    return response.json()
}

export async function queryOrderStatus(orderNo: string) {
    let response = await fetch('https://console.d-l.ink/api/commodityOrder/queryPayStatus?orderNo=' + orderNo)
    return response.json()
}

export async function queryOrder(data) {

    let response = await fetch('https://console.d-l.ink/api/commodityOrder/queryOrder', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return response.json()
}