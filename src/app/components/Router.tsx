import * as React from "react";
import { HashRouter, BrowserRouter } from "react-router-dom";

export interface IRouterProps {
    historyMode?: boolean;
}

export class Router extends React.Component<IRouterProps> {
    render() {
        let { historyMode, children, ...other } = this.props;
        if (historyMode) {
            return (
                <BrowserRouter {...other}>{children}</BrowserRouter>
            );
        }
        return (
            <HashRouter {...other}>{children}</HashRouter>
        );
    }
}
