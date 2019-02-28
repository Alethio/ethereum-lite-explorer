import { evmOpcodes } from "app/page/account/contractDetails/evmOpcodes";

// See https://microsoft.github.io/monaco-editor/monarch.html
export const evmLanguage: import("monaco-editor/esm/vs/editor/editor.api").languages.IMonarchLanguage = {
    keywords: Object.keys(evmOpcodes).map(k => evmOpcodes[k]),
    unknown: [ "UNKNOWN" ],

    // The main tokenizer for our languages
    tokenizer: {
      root: [
        // identifiers and keywords
        [/[A-Z][\w\-\.']*/, { cases: { "@keywords": "keyword", "@unknown": "invalid" } }],

        // whitespace
        { include: "@whitespace" },

        // numbers
        [/0[xX][0-9a-fA-F]+/, "number"]

      ],

      whitespace: [
        [/[ \t\r\n]+/, "white"],
        [/;.*$/,    "comment"]
      ]
    }
  } as import("monaco-editor/esm/vs/editor/editor.api").languages.IMonarchLanguage;
