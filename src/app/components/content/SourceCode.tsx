import * as React from "react";

export interface ISourceCodeProps {
    monaco: typeof import("monaco-editor/esm/vs/editor/editor.api");
    options: import("monaco-editor/esm/vs/editor/editor.api").editor.IEditorConstructionOptions;
    height?: number | string;
}

/**
 * Source code component similar to react-monaco-editor, but doesn't import the entire monaco-editor
 *
 * NB: Doesn't support dynamic updates to props
 */
export class SourceCode extends React.Component<ISourceCodeProps> {
    private el: HTMLElement;
    private editor: import("monaco-editor/esm/vs/editor/editor.api").editor.IStandaloneCodeEditor;

    componentDidMount() {
        setTimeout(async () => {
            this.editor = this.props.monaco.editor.create(this.el, this.props.options);
        });
    }

    componentWillUnmount() {
        this.editor.dispose();
    }

    render() {
        return (
            <div ref={ref => this.el = ref!} style={{height: this.props.height}}></div>
        );
    }
}
