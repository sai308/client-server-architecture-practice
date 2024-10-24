declare namespace EntityFields {
  export type User = {
    id?: string;
    cartRef?: ?string; // <- ? means nullable: it can be null or string
  };
}

declare namespace Entities {
  export class User extends BaseEntity<EntityFields.User> {
    public id?: string;
    public cartRef?: ?string;

    constructor(fields: EntityFields.User) {
      this.id = fields.id;
      this.cartRef = fields.cartRef;
    }
  }
}
