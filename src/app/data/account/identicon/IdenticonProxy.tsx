import Identicon from "identicon.js";

export class IdenticonProxy {
    constructor(
        private identicon: Identicon
    ) {}
    getIdenticon() {
        return this.identicon;
    }
    getDataImageString() {
        return "data:image/svg+xml;base64," + this.identicon.toString();
    }
}
