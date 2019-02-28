declare module "3box" {
    const ThreeBox: ThreeBox.IThreeBox;

    namespace ThreeBox {
        export interface IThreeBox {
            getProfile(accountHash: string): Promise<IThreeBoxProfile>;
            getVerifiedAccounts(profile: IThreeBoxProfile): Promise<IThreeBoxAccounts>;
        }
        export interface IThreeBoxProfile {
            image?: IProfileImage[];
            name?: string;
            website?: string;
        }
        export interface IThreeBoxAccounts {
            github?: {
                username: string;
            };
            twitter?: {
                username: string;
            };
        }
        export interface IProfileImage {
            contentUrl: {
                "/": string
            };
        }
    }

    export = ThreeBox;
}
