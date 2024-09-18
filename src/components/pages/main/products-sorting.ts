import {searchStore} from "@/store/search";

export function searchByPrimitiveValue(value: any) {
    if (typeof value === 'string' || typeof value === 'number') {
        if (value.toString().toLowerCase()
            .includes(searchStore().search?.toLowerCase())) {
            return true
        }
        return false
    } else if (Array.isArray(value)) {
        for (let arrEl of value) {
            if (searchByPrimitiveValue(arrEl)) return true
        }
    } else if (typeof value === 'object') {
        const valueValues = Object.values(value)
        for (let childValue of valueValues) {
            if (searchByPrimitiveValue(childValue)) return true
        }
    }
}