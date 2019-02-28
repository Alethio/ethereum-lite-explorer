import { ITxDetails } from "app/data/tx/details/ITxDetails";

/**
 * Lightweight transaction data in context of a selected block. This data is used
 * to compute various statistics for the selected block
 */
export interface ITxLite extends ITxDetails {
}
