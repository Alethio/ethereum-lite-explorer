import * as React from "react";
import styled from "app/styled-components";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { SpinnerRegular } from "ethstats-ui/lib/fx/SpinnerRegular";
import { ILogger } from "app/util/log/ILogger";

const QrCodeLayerRoot = styled.div`
    width: 148px;
    height: 148px;
    position: relative;
`;

const SpinnerWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export interface IQrCodeLayerProps {
    value: string;
    logger: ILogger;
}

@observer
export class QrCodeLayer extends React.Component<IQrCodeLayerProps> {
    @observable
    private QrCodeComponent: typeof import("./QrCode").QrCode;

    async componentDidMount() {
        if (!this.QrCodeComponent) {
            import("./QrCode").then(({ QrCode }) => {
                this.QrCodeComponent = QrCode;
            }).catch(e => {
                this.props.logger.error("Couldn't load QrCode component", e);
            });
        }
    }

    render() {
        let QrCodeComponent = this.QrCodeComponent;

        return (
            <QrCodeLayerRoot>
                { QrCodeComponent ?
                <QrCodeComponent value={this.props.value} logger={this.props.logger} />
                :
                <SpinnerWrapper>
                    <SpinnerRegular />
                </SpinnerWrapper>
                }
            </QrCodeLayerRoot>
        );
    }
}
