export class TranslationLoader {
    async load(locale: string) {
        return await import("./translation/" + locale + ".json");
    }
}
