import { IStorage } from "./IStorage";

export class NullStorage implements IStorage {
    getItem(key: string) {
        return null;
    }
    setItem(key: string, value: string) {
        // no implementation
    }
    removeItem(key: string) {
        // no implementation
    }
}
