declare module "identicon.js" {
    export default class Identicon {
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
        constructor(hash: string, options?: Identicon.IOptions);
        image(): any; // PNGlib or Svg
        render(): any;
    }

    namespace Identicon {
        interface IOptions {
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
