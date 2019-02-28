import { IGenericBlockData } from "app/data/block/IGenericBlockData";

/**
 * Data for total transaction value of a block. Used in the sidebar of the block view.
 */
export interface IBlockValue extends IGenericBlockData {
    /** Block number */
    id: number;
    transactionCount: number;
}
