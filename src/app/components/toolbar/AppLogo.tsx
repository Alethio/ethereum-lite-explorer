import * as React from "react";
import BlockExplorerLogoImg from "assets/block-explorer-logo.svg";

const LOGO_SIZE = 32;

export interface IToolbarLogoProps {

}

export class AppLogo extends React.Component<IToolbarLogoProps> {
    render() {
        return (
            <img alt="Alethio Block Explorer" src={BlockExplorerLogoImg} width={LOGO_SIZE} height={LOGO_SIZE} />
        );
    }
}
