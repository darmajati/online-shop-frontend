export interface Order {
    orderId: number;
    orderCode: string;
    orderDate: Date;
    totalPrice: number;
}

export interface OrderListResponseDto {
    totalData: number;
    orderList: Order[];
}

export interface OrderDetailResponse {
    orderId: number;
    orderCode: string;
    orderDate: Date;
    totalPrice: number;
    customerId: number;
    itemId: number;
    quantity: number;
}
