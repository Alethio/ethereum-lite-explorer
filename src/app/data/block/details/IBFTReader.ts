import * as rlp from "rlp";
import { buf2hex } from "app/util/buf2hex";
import { IIBFTDetails, IIBFTVote } from "app/data/block/details/IIBFTDetails";

export class IBFTReader {
    read(data: string) {
        let decodedArray: Buffer | Buffer[] | rlp.Decoded = rlp.decode(data) as Buffer[];
        let defaultExtraData = buf2hex(decodedArray[0] as Uint8Array);
        let validatorsArray: string[] = [];
        let validatorsRawArray = decodedArray[1] as any as Uint8Array[];
        validatorsRawArray.forEach((item) => {
            validatorsArray.push(buf2hex(item));
        });
        let votesArray = decodedArray[2] as any as Uint8Array[];
        let agregatedVotes = [];
        if (votesArray.length !== 0) {
            for (let i = 0; i < votesArray.length; i++) {
                if (i === 0 || i % 2 === 0) {
                    let voteItem: IIBFTVote = {
                        address: buf2hex(votesArray[i]),
                        vote: votesArray[i + 1][0] !== 0 ? true : false // true means new validator added, false-removed
                    };
                    agregatedVotes.push(voteItem);
                }
            }
        }
        let numberOfTries = parseInt(buf2hex(decodedArray[3]), 10);
        let commitSealsRawArray = decodedArray[4] as any as Uint8Array[];
        let commitSealsArray: string[] = [];
        commitSealsRawArray.forEach((item) => {
            commitSealsArray.push(buf2hex(item));
        });

        let decodedExtraData: IIBFTDetails = {
            extraData: defaultExtraData,
            validators: validatorsArray,
            votes: agregatedVotes,
            blockTries: numberOfTries,
            commitSeals: commitSealsArray
        };

        return decodedExtraData;
    }
}
