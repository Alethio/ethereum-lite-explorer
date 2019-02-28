import { FifoCache } from "app/data/cache/FifoCache";
import { IdenticonGenerator } from "./identicon/IdenticonGenerator";
import { IdenticonProxy } from "./identicon/IdenticonProxy";

/** Number of cached identicons */
const CACHE_SIZE = 50;

export class IdenticonGeneratorFactory {
    create() {
        return new IdenticonGenerator(
            new FifoCache<string, IdenticonProxy>(CACHE_SIZE)
        );
    }
}
