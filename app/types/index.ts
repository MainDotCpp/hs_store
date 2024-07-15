export type CommodityGroup = {
    id: number;
    groupName: string;
    commodities: Commodity[];
}

export type Commodity = {
    id: number;
    name: string;
    description: string;
    cover: string;
    price: number;
    stock: number;
}