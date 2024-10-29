declare namespace EntityFields {
  export type User = {
    id?: string;
    username: string;
    passwordHash?: string;
    isPrivileged?: boolean;

    cartRef?: ?string; // <- ? means nullable: it can be null or string
    createdAt?: Date;
    updatedAt?: Date;
  };

  export type UserWithoutPassword = User & {
    passwordHash?: never;
  };
}

declare namespace Entities {
  export class User extends BaseEntity<EntityFields.User> {
    public id?: string;
    public username: string;
    public isPrivileged: boolean;
    public passwordHash?: string;
    public cartRef: ?string;

    public createdAt: Date;
    public updatedAt: ?Date;

    constructor(fields: EntityFields.User) {
      this.id = fields.id;
      this.cartRef = fields.cartRef;
      this.username = fields.username;
      this.passwordHash = fields.passwordHash;

      this.createdAt = fields.createdAt || new Date();
      this.updatedAt = fields.updatedAt || null;
    }
  }
}
