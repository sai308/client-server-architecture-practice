declare namespace EntityFields {
  export type Receipt = {
    id?: string;
    userId: string;
    items: ReceiptItem[];
    totalAmount: number;
    createdAt?: Date;
  };
}

declare namespace Entities {
  export class Receipt {
    public id?: string;
    public userId: string;
    public items: ReceiptItem[];
    public totalAmount: number;
    public createdAt?: Date;

    constructor(fields: EntityFields.Receipt) {
      this.id = fields.id;
      this.userId = fields.userId;
      this.items = fields.items;
      this.createdAt = fields.createdAt;
    }
  }
}
