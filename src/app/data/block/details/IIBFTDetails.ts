export interface IIBFTVote {
    address: string;
    vote: boolean;
}
export interface IIBFTDetails {
    extraData: string;
    validators: string[];
    votes: IIBFTVote[];
    blockTries: number;
    commitSeals: string[];
}
