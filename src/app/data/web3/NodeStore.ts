import { observable } from "mobx";
import { INodeInfo } from "app/data/web3/INodeInfo";

export class NodeStore {
    @observable selectedNode: INodeInfo;
}
