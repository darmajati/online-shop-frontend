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

export interface CustomerDetailResponse {
    customerId: number;
    customerName: string;
    customerAddress: string;
    customerCode: string;
    customerPhone: string;
    lastOrderDate: Date | null;
    pic: string;
}

