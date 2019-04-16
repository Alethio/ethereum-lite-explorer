import * as React from "react";
import * as ReactDOM from "react-dom";
import { App as AppComponent } from "app/components/App";
import { TranslationLoader } from "./TranslationLoader";
import { Translation } from "./Translation";
import { AppConfig } from "./AppConfig";
import { BlockDetailsStoreFactory } from "app/data/block/details/BlockDetailsStoreFactory";
import { BlockValueStoreFactory } from "app/data/block/value/BlockValueStoreFactory";
import { TxDetailsStoreFactory } from "app/data/tx/details/TxDetailsStoreFactory";
import { BlockStateStore } from "app/data/block/BlockStateStore";
import { when, onReactionError, reaction } from "mobx";
import { IdenticonGeneratorFactory } from "app/data/account/IdenticonGeneratorFactory";
import { AccountDetailsStoreFactory } from "app/data/account/details/AccountDetailsStoreFactory";
import { UncleDetailsStoreFactory } from "app/data/uncle/details/UncleDetailsStoreFactory";
import { Clipboard } from "app/helpers/Clipboard";
import { SearchFactory } from "app/data/search/SearchFactory";
import { Web3Factory } from "app/data/web3/Web3Factory";
import { BlockPageSharedStateFactory } from "app/page/block/BlockPageSharedStateFactory";
import { LoggerFactory } from "app/factory/LoggerFactory";
import { StorageFactory } from "app/factory/StorageFactory";
import { Web3EthApi } from "app/data/web3/Web3EthApi";
import { LastBlockWatcher } from "app/data/watchers/LastBlockWatcher";
import { UserPreferences } from "app/UserPreferences";
import { NodeStore } from "app/data/web3/NodeStore";
import { IdenticonGenerator } from "app/data/account/identicon/IdenticonGenerator";
import { ILogger } from "app/util/log/ILogger";
import { NodeFields } from "app/page/dashboard/nodeDropdown/NodeFields";
import { DashboardLastBlockState } from "app/page/dashboard/DashboardLastBlockState";
import { DashboardStore } from "app/data/dashboard/DashboardStore";
import { HttpRequest } from "@puzzl/browser/lib/network/HttpRequest";
import { NodeStatsWatcher } from "app/data/watchers/NodeStatsWatcher";

export class App {
    private lastBlockWatcher: LastBlockWatcher | undefined;
    private nodeStatsWatcher: NodeStatsWatcher | undefined;
    async init(target: HTMLElement) {
        let storage = new StorageFactory(window.localStorage).create();
        let userPreferences = new UserPreferences(storage);
        userPreferences.load();
        let appConfigData: any;
        try {
            appConfigData = await new HttpRequest().fetchJson("/config.json");
        } catch (e) {
            // No logging support yet
            // tslint:disable-next-line:no-console
            console.error(`Couldn't load application config`, e);
            return;
        }

        let appConfig = new AppConfig(userPreferences);
        appConfig.fromJson(appConfigData);

        let logger = (new LoggerFactory(appConfig)).create();

        let translationJson = await (new TranslationLoader()).load(appConfig.getLocale());
        let translation = new Translation(translationJson);

        let identiconGenerator = new IdenticonGeneratorFactory().create();
        let clipboard = new Clipboard(document);

        onReactionError((e) => {
            logger.error(e);
        });
        // TODO: initializa store
        let nodeStore = new NodeStore();
        let nodeDropdownUrls = new NodeFields(appConfig, userPreferences);
        let preselectedField = nodeDropdownUrls.getSelectedField();
        nodeStore.selectedNode = {
            url: preselectedField.value,
            name: preselectedField.label
        };
        reaction(() => nodeStore.selectedNode.url, async url => {
            await this.initChain(nodeStore.selectedNode.url, appConfig, translation, identiconGenerator, clipboard,
                userPreferences, logger, target, nodeDropdownUrls, nodeStore);
        }, { fireImmediately: true });
    }

    private async  initChain(nodeUrl: string, appConfig: AppConfig, translation: Translation,
        identiconGenerator: IdenticonGenerator, clipboard: Clipboard,
        userPreferences: UserPreferences, logger: ILogger, target: HTMLElement,
        nodeDropdownUrls: NodeFields, nodeStore: NodeStore
    ) {
        let web3Factory = new Web3Factory();
        web3Factory.destroy();
        let web3 = await web3Factory.create(nodeUrl);
        let web3EthApi = new Web3EthApi(web3);

        let blockStateStore = new BlockStateStore();
        let dashboardStore = new DashboardStore();

        let blockDetailsStore = new BlockDetailsStoreFactory(web3EthApi, appConfig).create(blockStateStore);
        let blockValueStore = new BlockValueStoreFactory(web3EthApi).create(blockStateStore);
        let txDetailsStore = new TxDetailsStoreFactory(blockStateStore, web3EthApi).create();
        let uncleDetailsStore = new UncleDetailsStoreFactory(web3EthApi).create();

        let accountDetailsStore = new AccountDetailsStoreFactory(web3EthApi).create();
        let search = new SearchFactory(web3EthApi).create(blockStateStore);

        let blockPageSharedState = new BlockPageSharedStateFactory().create();
        let dashboardLastBlockState = new DashboardLastBlockState(
            blockStateStore, blockDetailsStore, logger
        );

        if (this.lastBlockWatcher) {
            this.lastBlockWatcher.stop();
        }
        let lastBlockWatcher = this.lastBlockWatcher = new LastBlockWatcher(web3EthApi, blockStateStore, logger);
        lastBlockWatcher.watch();

        if (this.nodeStatsWatcher) {
            this.nodeStatsWatcher.stop();
        }
        let nodeStatsWatcher = this.nodeStatsWatcher = new NodeStatsWatcher(web3EthApi, dashboardStore, logger);
        nodeStatsWatcher.watch();

        // TODO: proper connection state handling (availability and fallback)
        when(() => blockStateStore.getLatest() !== void 0 /*&& blockLatestValueStore.getLatestValues() !== void 0*/,
            () => {
                ReactDOM.render(
                    React.createElement(AppComponent, {
                        translation,
                        appConfig,
                        logger,
                        blockStateStore,
                        blockDetailsStore,
                        blockValueStore,
                        txDetailsStore,
                        uncleDetailsStore,
                        identiconGenerator,
                        accountDetailsStore,
                        clipboard,
                        search,
                        blockPageSharedState,
                        web3,
                        userPreferences,
                        nodeDropdownUrls,
                        nodeStore,
                        dashboardLastBlockState
                    }),
                    target
                );
            });

    }
}
