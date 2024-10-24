declare namespace EntityFields {
  export type Product = {
    id?: string;
    name: string;
    description: string;
    price: number;
    releaseDate: Date;
  };
}

declare namespace Entities {
  export class Product {
    public id?: string;
    public name: string;
    public price: number;
    public releaseDate: Date;
    public description: string;

    constructor(fields: EntityFields.Product) {
      this.id = fields.id;
      this.name = fields.name;
      this.price = fields.price;
      this.description = fields.description;
      this.releaseDate = fields.releaseDate;
    }
  }
}
