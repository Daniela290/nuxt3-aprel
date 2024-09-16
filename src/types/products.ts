import  type {Product} from "@/types/product";

export interface ApiResponse {
    limit: number,
    products: Array<Product>,
    skip: number,
    total: number
}