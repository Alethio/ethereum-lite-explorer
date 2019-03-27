import * as React from "react";
import styled from "app/styled-components";
import { Image } from "app/components/content/Image";
import { IdenticonProxy } from "app/data/account/identicon/IdenticonProxy";
import { AppConfig } from "app/AppConfig";
import { Tooltip } from "ethstats-ui/lib/overlay/tooltip/Tooltip";
import { ThreeBoxTooltipContent } from "app/page/account/identicon/ThreeBoxTooltipContent";
import { Translation } from "app/Translation";
import { IThreeBoxData } from "app/page/account/AccountPage";

const IdenticonContainer = styled.div`
    padding-left: 57px;
    padding-right: 57px;
`;

const IdenticonWrapperRoot = styled.div`
    width: ${({theme}) => theme.spacing.sidebarWidth}px;
    padding-left: 24px;
    padding-right: 24px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding-top: 10px;
    padding-bottom: 10px;
`;

interface IIdenticonWrapperProps {
    appConfig: AppConfig;
    identicon: IdenticonProxy;
    threeBoxData: IThreeBoxData | undefined;
    translation: Translation;
}

const IdenticonImg = styled(Image)`
    border: 1px solid ${({theme}) => theme.colors.identiconBorder};
`;

export class IdenticonWrapper extends React.PureComponent<IIdenticonWrapperProps> {
    render() {
        let { threeBoxData, translation: tr } = this.props;

        let img = <IdenticonImg
            src={this.getProfileImageSrc()}
            height="74px" width="74px"
        />;

        if (threeBoxData && (threeBoxData.profile.name || threeBoxData.profile.website)) {
            let tooltipContent = <ThreeBoxTooltipContent translation={tr} data={threeBoxData} />;
            img = <Tooltip placement="bottom" content={tooltipContent}>{img}</Tooltip>;
        }

        return (
            <IdenticonWrapperRoot>
                <IdenticonContainer>
                    {img}
                </IdenticonContainer>
            </IdenticonWrapperRoot>
        );
    }

    private getProfileImageSrc() {
        let { threeBoxData } = this.props;
        if (threeBoxData && threeBoxData.profile.image && threeBoxData.profile.image.length) {
            let contentUrl = threeBoxData.profile.image[0].contentUrl["/"];
            return (this.props.appConfig.getInfuraIpfsUrlMask() as string).replace("%s", contentUrl);
        }
        return this.props.identicon.getDataImageString();
    }
}
