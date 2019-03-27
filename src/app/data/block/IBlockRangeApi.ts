export interface IBlockRangeApi<TBlockData> {
    fetch(start: number, end: number): Promise<TBlockData[]>;
}
