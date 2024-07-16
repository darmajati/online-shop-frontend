export interface Customer {
    customerId: number;
    customerName: string;
    customerCode: string;
    pic: string;
}

export interface CustomerListResponseDto {
    totalData: number;
    customerList: Customer[];
}
