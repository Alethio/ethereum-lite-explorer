import { IStorage } from "./IStorage";

export class LocalStorage implements IStorage {
    constructor(private localStorage: Storage) {}
    getItem(key: string) {
        return this.localStorage.getItem(key);
    }
    setItem(key: string, value: string) {
        this.localStorage.setItem(key, value);
    }
    removeItem(key: string) {
        this.localStorage.removeItem(key);
    }
}
