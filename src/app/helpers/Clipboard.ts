import { Clipboard as PuzzlClipboard } from "@puzzl/browser/lib/Clipboard";

export class Clipboard {
    constructor(private document: Document) {

    }

    copy(text: string) {
        new PuzzlClipboard(this.document).copy(text);
    }
}
