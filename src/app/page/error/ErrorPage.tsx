import * as React from "react";
import { ErrorBox } from "ethstats-ui/lib/ErrorBox";
import { Content } from "ethstats-ui/lib/layout/Content";
import { Container } from "ethstats-ui/lib/layout/Container";
import { Translation } from "app/Translation";

export interface IErrorPageProps {
    translation: Translation;
}

export class ErrorPage extends React.Component<IErrorPageProps> {
    render() {
        return (
            <Container>
                <Content>
                    <ErrorBox>{this.props.translation.get("general.error.notFound")}</ErrorBox>
                </Content>
            </Container>
        );
    }
}
