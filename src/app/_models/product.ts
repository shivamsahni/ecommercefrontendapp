export interface Product {
    id:string;
    name:string;
    description:string;
    price:number;
    category:string;
    isFeatured: boolean;
    isDiscounted: boolean;
    imageURL:string;
}