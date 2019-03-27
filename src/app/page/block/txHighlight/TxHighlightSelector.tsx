import * as React from "react";
import { SelectBox } from "ethstats-ui/lib/control/SelectBox";
import { HighlightSelectBox } from "app/page/block/txHighlight/HighlightSelectBox";
import { Radio } from "ethstats-ui/lib/control/Radio";
import { HighlightFields } from "app/page/block/txHighlight/HighlightFields";
import { observer, Observer } from "mobx-react";
import { ITxLite } from "app/data/tx/ITxLite";
import { Translation } from "app/Translation";

interface ITxHighlightSelectorProps {
    fields: HighlightFields<ITxLite>;
    translation: Translation;
    disabled?: boolean;
}

@observer
export class TxHighlightSelector extends React.Component<ITxHighlightSelectorProps> {
    private requestClose: () => void;

    render() {
        let { translation: tr } = this.props;
        return (
            <SelectBox disabled={this.props.disabled} offset={{left: -20, top: -47}} render={({requestClose}) => {
                this.requestClose = requestClose;
                return (
                    <Observer>
                        {() => this.props.fields.getFields().map((f) => {
                            return (
                                <Radio
                                    id={"highlight_" + f.key}
                                    key={f.key}
                                    value={f.key}
                                    name="highlight"
                                    checked={this.props.fields.getSelectedField().key === f.key}
                                    onChange={this.onCheckboxChange}
                                >{f.getLabel(tr)}</Radio>
                            );
                        })}
                    </Observer>
                );
            }}>
                <HighlightSelectBox disabled={this.props.disabled}>
                    { this.props.fields.getSelectedField().getLabel(tr) }
                </HighlightSelectBox>
            </SelectBox>
        );
    }

    private onCheckboxChange = (
        _e: React.ChangeEvent<HTMLInputElement>,
        checked: boolean,
        _name: string,
        value: string
    ) => {
        if (checked) {
            this.props.fields.setSelectedField(value);
        }
        this.requestClose();
    }
}
