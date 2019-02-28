import * as React from "react";
import { SelectBox } from "ethstats-ui/lib/control/SelectBox";
import { HighlightSelectBox } from "app/page/block/txHighlight/HighlightSelectBox";
import { Radio } from "ethstats-ui/lib/control/Radio";
import { observer, Observer } from "mobx-react";
import { Translation } from "app/Translation";
import { NodeFields } from "app/page/dashboard/nodeDropdown/NodeFields";
import { NodeStore } from "app/data/web3/NodeStore";
import { AppConfig } from "app/AppConfig";
import { UserPreferences } from "app/UserPreferences";

interface INodeSelectorProps {
    fields: NodeFields;
    translation: Translation;
    disabled?: boolean;
    nodeStore: NodeStore;
    appConfig: AppConfig;
    userPreferences: UserPreferences;
}

@observer
export class NodeSelector extends React.Component<INodeSelectorProps> {
    private requestClose: () => void;

    render() {
        return (
            <SelectBox disabled={this.props.disabled} offset={{ left: -20, top: -47 }} render={({ requestClose }) => {
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
                                >{f.label}</Radio>
                            );
                        })}
                    </Observer>
                );
            }}>
                <HighlightSelectBox disabled={this.props.disabled}>
                    {this.props.fields.getSelectedField().label}
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
            this.props.fields.setSelectedField(value, this.props.userPreferences);
            let newSelectedNode = this.props.fields.getSelectedField();
            this.props.nodeStore.selectedNode = {
                name: newSelectedNode.label,
                url: newSelectedNode.value
            };
        }
        this.requestClose();
    }
}
