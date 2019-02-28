import * as React from "react";
import * as QRCode from "qrcode";
import { ILogger } from "app/util/log/ILogger";

export interface IQrCodeProps {
    value: string;
    logger: ILogger;
}

export class QrCode extends React.PureComponent<IQrCodeProps> {
    private canvasEl: HTMLCanvasElement;
    private timeoutId: number | undefined;

    componentDidMount() {
        this.renderToCanvasDeferred();
    }

    componentDidUpdate(prevProps: IQrCodeProps) {
        if (prevProps.value !== this.props.value) {
            this.renderToCanvasDeferred();
        }
    }

    componentWillUnmount() {
        this.cancelDeferredRender();
    }

    private renderToCanvasDeferred() {
        this.cancelDeferredRender();
        this.timeoutId = setTimeout(() => {
            QRCode.toCanvas(this.canvasEl, this.props.value).catch(e => {
                this.props.logger.error("Couldn't render QRCode", e, { value: this.props.value });
            });
        });
    }

    private cancelDeferredRender() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = void 0;
        }
    }

    render() {
        return (
            <canvas ref={ref => this.canvasEl = ref!}>
            </canvas>
        );
    }
}
