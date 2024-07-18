export interface Item {
    itemId: number;
    itemName: string;
    itemCode: string;
}

export interface ItemListResponseDto {
    totalData: number;
    itemList: Item[];
}

export interface ItemDetailResponse {
    itemId: number;
    itemName: string;
    itemCode: string;
    stock: number;
    price: number;
    lastReStock: Date;
}
