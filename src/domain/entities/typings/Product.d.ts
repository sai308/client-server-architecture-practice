declare namespace Entities {
  export type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    releaseDate: Date;
    developer: Developer;
    publisher: Publisher;
    categories: Category[];
  };
}
