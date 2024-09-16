interface Dimensions {
    width: number;
    height: number;
    depth: number;
}

interface Review {
    rating: number;
    comment: string;
    date: Date,
    reviewerName: string,
    reviewerEmail: string
}

interface Meta {
    createdAt: Date;
    updatedAt: Date;
    barcode: string;
    qrCode: string;
}

export interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: Array<string>;
    brand: string;
    sku: string;
    weight: number;
    dimensions: Dimensions;
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    reviews: Array<Review>;
    returnPolicy: string;
    minimumOrderQuantity: number;
    meta: Meta;
    images: Array<string>;
    thumbnail: string;
}

export interface SearchProduct {
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    tags: Array<string>;
    brand: string;
    dimensions: Dimensions;
    reviews: Array<Review>;
    meta: Meta;
}

export function convertProductToSearchProduct(nativeProduct: Product) {
    const {
        title,
        description,
        category,
        price,
        discountPercentage,
        tags,
        brand,
        dimensions,
        reviews,
        meta
    } = nativeProduct
    return {
        title,
        description,
        category,
        price,
        discountPercentage,
        tags,
        brand,
        dimensions,
        reviews,
        meta
    } as SearchProduct;
}