import * as React from "react";
import { HashLink as ReactRouterLink, HashLinkProps as ReactRouterLinkProps } from "react-router-hash-link";
import { UrlBuilder } from "app/helpers/UrlBuilder";
import { ExternalLink } from "app/components/ExternalLink";

export interface ILinkProps extends Pick<ReactRouterLinkProps, Exclude<keyof ReactRouterLinkProps, "to">> {
    to: string | ((urlBuilder: UrlBuilder) => string);
    className?: string;
}

export class Link extends React.Component<ILinkProps> {
    render() {
        let to = typeof this.props.to === "string" ? this.props.to : this.props.to(new UrlBuilder());
        if (/^(http|https):\/\/.*$/.test(to)) {
            return <ExternalLink href={to} rel="noopener noreferrer">{ this.props.children }</ExternalLink>;
        }
        return <ReactRouterLink style={{ textDecoration: "none", outline: "none"}} {...this.props} to={to} />;
    }
}
