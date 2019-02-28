import { Translation } from "app/Translation";

export function getRelativeTimeTranslations(translation: Translation) {
    return {
        future: translation.get("general.relativeTime.future"),
        past: translation.get("general.relativeTime.past"),
        s: translation.get("general.relativeTime.s"),
        ss: translation.get("general.relativeTime.ss"),
        m: translation.get("general.relativeTime.m"),
        mm: translation.get("general.relativeTime.mm"),
        h: translation.get("general.relativeTime.h"),
        hh: translation.get("general.relativeTime.hh"),
        d: translation.get("general.relativeTime.d"),
        dd: translation.get("general.relativeTime.dd"),
        M: translation.get("general.relativeTime.M"),
        MM: translation.get("general.relativeTime.MM"),
        y: translation.get("general.relativeTime.y"),
        yy: translation.get("general.relativeTime.yy")
    };
}
