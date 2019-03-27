import { observable, computed } from "mobx";

/**
 * HACK: This hack is needed to know whether there is a sidebar mounted in page.
 * If there is, on mobile top bar the sidebar icon is displayed
 */
export class SidebarMobileStore {
    @observable
    instancesCount = 0;

    @observable
    sidebarVisible = false;

    @computed
    public get isSidebarVisible() {
        return this.sidebarVisible && this.instancesCount > 0;
    }
}
