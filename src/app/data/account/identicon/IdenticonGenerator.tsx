import Identicon from "identicon.js";
import { ICache } from "app/data/cache/ICache";
import { IdenticonProxy } from "./IdenticonProxy";
import { LinkedError } from "app/util/LinkedError";

export class IdenticonGenerator {
    constructor(
        private identiconCache: ICache<string, IdenticonProxy>
    ) {

    }
    private generate(accountHash: string) {
        try {
            return new IdenticonProxy(
                new Identicon(accountHash, {
                    size: 74,
                    margin: 0.1,
                    background: [255, 255, 255, 0],
                    format: "svg"
                })
            );
        } catch (e) {
            // Wrap the original error, because it doesn't have a proper stack
            throw new LinkedError(`Couldn't generate identicon for accountHash="${accountHash}"`, e);
        }
    }
    get(accountHash: string) {
        if (this.identiconCache.has(accountHash)) {
            return this.identiconCache.get(accountHash)!;
        }
        const identicon = this.generate(accountHash);
        this.identiconCache.set(accountHash, identicon);
        return identicon;
    }
}
