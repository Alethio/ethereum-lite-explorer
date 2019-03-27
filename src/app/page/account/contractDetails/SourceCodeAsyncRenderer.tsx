import * as React from "react";
import { SourceCode } from "app/components/content/SourceCode";
import FontFaceObserver from "fontfaceobserver";

export class SourceCodeAsyncRenderer {
    private codeFontFamily: string | undefined;
    private monaco: typeof import("monaco-editor/esm/vs/editor/editor.api") | undefined;

    constructor(private height: number) {

    }

    async load() {
        this.codeFontFamily = "Roboto Mono";

        let [monaco] = await Promise.all([
            import("monaco-editor/esm/vs/editor/editor.api"),
            (new FontFaceObserver(this.codeFontFamily)).load().catch(e => this.codeFontFamily = void 0)
        ]);
        this.monaco = monaco;
    }

    render(
        value: string,
        language: string,
        options?: import("monaco-editor/esm/vs/editor/editor.api").editor.IEditorConstructionOptions
    ) {
        if (!this.monaco) {
            throw new Error(`Monaco editor API needs to be loaded first`);
        }

        return <SourceCode
            monaco={this.monaco}
            height={this.height}
            options={{
                value,
                language,
                // Font needs to be loaded before the editor!
                fontFamily: this.codeFontFamily,
                fontWeight: "400",
                minimap: {
                    enabled: false
                },
                overviewRulerLanes: 0,
                hideCursorInOverviewRuler: true,
                renderLineHighlight: "none",
                readOnly: true,
                emptySelectionClipboard: false,
                ...options
            }}
        />;
    }
}
