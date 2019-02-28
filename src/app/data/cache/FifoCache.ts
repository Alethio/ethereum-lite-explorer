import { ICache } from "./ICache";

export class FifoCache<K, V> implements ICache<K, V> {
    private store = new Map<K, V>();

    constructor(private maxSize: number) {

    }

    has(key: K) {
        return this.store.has(key);
    }

    get(key: K) {
        return this.store.get(key);
    }

    set(key: K, value: V) {
        if (this.store.size >= this.maxSize) {
            this.store.delete(this.store.keys().next().value);
        }
        this.store.set(key, value);
    }
}
