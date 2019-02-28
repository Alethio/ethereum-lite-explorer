declare module "identicon.js" {
    export default class Identicon {
        constructor(hash: string, options?: Identicon.Options);
        background: number[];
        defaults: {
            background: number[];
            brightness: number;
            format: string;
            margin: number;
            saturation: number;
            size: number;
        };
        foreground: number[];
        format: "png" | "svg";
        hash: string;
        margin: number;
        options: {
            background: number[];
            brightness: number;
            format: string;
            margin: number;
            saturation: number;
            size: number;
        };
        size: number;
        image(): any; // PNGlib or Svg
        render(): any;
    }

    namespace Identicon {
        interface Options {
            size?: number;
            margin?: number;
            foreground?: number[];
            background?: number[];
            saturation?: number;
            brightness?: number;
            format?: string;
        }
    }
}

/**
 * Example of identicon object printed with console log:
 *
Identicon {
    background: Array(4) [0: 240, 1: 240 2: 240 3: 255] length: 4
    defaults: {
        background: Array(4) [0: 240, 1: 240, 2: 240, 3: 255] length: 4
        brightness: 0.5
        format: "png"
        margin: 0.08
        saturation: 0.7
        size: 64
    }
    foreground: Array(3) [0: 38.25000000000001, 1: 216.75, 2: 86.5753085029323] length: 3
    format: "png"
    hash: "ce677205b98d5ea33b4add287c9ef7ba960e26d5"
    margin: 0.08
    options: {
        background: Array(4) [0: 240, 1: 240, 2: 240, 3: 255] length: 4
        brightness: 0.5
        format: "png"
        margin: 0.08
        saturation: 0.7
        size: 64
    }
    size: 64
}
*/
