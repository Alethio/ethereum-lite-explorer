import * as React from "react";
import { ValueBox } from "ethstats-ui/lib/layout/content/box/ValueBox";
import { TooltipRegular } from "ethstats-ui/lib/overlay/tooltip/TooltipRegular";
import { Translation } from "app/Translation";
import { SpinnerRegular } from "ethstats-ui/lib/fx/SpinnerRegular";
import emojiTurtle from "assets/emojiTurtle.png";
import styled from "app/styled-components";

const TurtleImg = styled.img`
    vertical-align: text-bottom;
`;

export interface INotAvailableBoxProps {
    translation: Translation;
}

export class NotAvailableBox extends React.Component<INotAvailableBoxProps> {
    render() {
        let { translation: tr } = this.props;

        return (
            <ValueBox>
                <TooltipRegular content={
                    <>
                        {tr.get("blockView.content.dataNotLoaded.text")}
                        <span style={{ marginLeft: 3 }}>
                            <TurtleImg width="20" height="17" src={emojiTurtle} alt="emojiTurtle" />
                        </span>
                    </>
                }>
                    <SpinnerRegular />
                </TooltipRegular>
            </ValueBox>
        );
    }
}
