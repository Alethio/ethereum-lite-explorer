import { IStorage } from "app/util/storage/IStorage";
import { observable } from "mobx";
import { INodeField } from "app/page/dashboard/nodeDropdown/NodeFields";

let STORAGE_KEY = "blk_prefs";

export class UserPreferences {
    @observable
    private locale: string | undefined;
    private lastNodeUrl: INodeField | undefined;

    constructor(private storage: IStorage) {

    }

    getLastNodeUrl() {
        return this.lastNodeUrl;
    }

    setLastNodeUrl(node: INodeField) {
        this.lastNodeUrl = node;
    }

    getLocale() {
        return this.locale;
    }

    setLocale(locale: string) {
        this.locale = locale;
    }

    load() {
        let raw: string | null = null;
        try {
            raw = this.storage.getItem(STORAGE_KEY);
            if (!raw) {
                return;
            }
            let prefs = JSON.parse(raw);
            if (prefs.locale && typeof prefs.locale === "string") {
                // TODO validate against available locales
                this.locale = prefs.locale;
                this.lastNodeUrl = prefs.lastNode;
            }
        } catch (e) {
            // No logger available at this point
            // tslint:disable-next-line:no-console
            console.warn(`Couldn't load user preferences ${raw !== null ? `(raw="${raw}")` : ""}`, e);
        }
    }

    save() {
        try {
            this.storage.setItem(STORAGE_KEY, JSON.stringify({
                locale: this.locale,
                lastNode: this.lastNodeUrl
            }));
        } catch (e) {
            // No logger available at this point
            // tslint:disable-next-line:no-console
            console.warn(`Couldn't save user preferences`, e);
        }
    }
}
