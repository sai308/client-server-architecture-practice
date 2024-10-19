declare namespace Entities {
  export type Receipt = {
    id: string;
    user: User;
    items: ReceiptItem[];
    totalAmount: number;
    createdAt?: Date;
  };
}
