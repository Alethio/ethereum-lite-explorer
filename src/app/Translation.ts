export type ITranslations = Record<string, string>;
export type ITranslationParams = Record<string, string | number>;

/**
 * Translation service
 */
export class Translation {
    constructor(private translations: ITranslations) {
    }

    /**
     * Get a translation by key
     * @param key the translation key
     * @param params an object with string replacements
     */
    get(key: keyof ITranslations, params?: ITranslationParams) {
        let raw = this.translations[key];

        if (raw && params) {
            Object.keys(params).forEach(paramName => {
                raw = raw.replace(paramName, "" + params[paramName]);
            });
        }

        return raw || key;
    }
}
