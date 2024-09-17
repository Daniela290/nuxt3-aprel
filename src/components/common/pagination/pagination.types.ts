export interface ShowerPageItem {
    value: string | number;
}
export interface ShowerPageItemSeparator extends ShowerPageItem {
    value: string | number;
    isSeparatorNext: boolean;
    isSeparatorPrev: boolean;
}