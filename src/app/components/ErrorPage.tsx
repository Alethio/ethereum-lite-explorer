import * as React from "react";
import { ErrorBox } from "@alethio/ui/lib/ErrorBox";
import { Content } from "@alethio/ui/lib/layout/Content";
import { Container } from "@alethio/ui/lib/layout/Container";
import { Translation } from "@alethio/cms";

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
