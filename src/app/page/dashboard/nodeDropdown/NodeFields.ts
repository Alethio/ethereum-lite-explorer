import { observable, action } from "mobx";
import { AppConfig } from "app/AppConfig";
import { UserPreferences } from "app/UserPreferences";

export interface INodeField {
    key: string;
    label: string;
    value: string;
}

export class NodeFields {
    protected fields: INodeField[];

    @observable
    protected selectedField: INodeField;

    constructor(appConfig: AppConfig, userPreferences: UserPreferences) {
        this.fields = appConfig.createFieldsArray();
        let savedData = userPreferences.getLastNodeUrl();
        let match = false;
        if (savedData) {
            for (let node of this.fields) {
                if (node.value === savedData.value) {
                    match = true;
                    this.setSelectedField(node.key, userPreferences);
                }
            }
        }
        if (!match) {
            this.setSelectedField(this.fields[0].key, userPreferences);
        }
    }

    getFields() {
        return this.fields;
    }

    getSelectedField() {
        return this.selectedField;
    }

    @action setSelectedField(key: string, userPreferences: UserPreferences) {
        const field = this.fields.find((f: INodeField) => {
            return key === f.key;
        });
        if (field) {
            this.selectedField = field;
            userPreferences.setLastNodeUrl(field);
            userPreferences.save();
        }
    }
}
