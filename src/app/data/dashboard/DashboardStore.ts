import { observable } from "mobx";

export class DashboardStore {
    @observable
    private peerCount: number | undefined;

    setPeerCount(peers: number) {
        this.peerCount = peers;
    }

    getPeerCount() {
        return this.peerCount;
    }
}
