interface Variation {
    color: string;
    colorCode: string;
    colorImage: string;
    image: string;
}

export interface ProductType {
    id: string,
    category: string,
    type: string,
    name: string,
    price: number,
    images: Array<string>,
}