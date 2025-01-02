import React, { useEffect, useRef } from "react";
import * as monaco from "monaco-editor";

interface MonacoEditorProps {
    value: string;
    filename: string;
}

const MonacoEditor: React.FC<MonacoEditorProps> = ({ value, filename }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    // Language mapping based on file extension
    const extensionToLanguageMap: { [key: string]: string } = {
        none: 'plaintext',
        js: 'javascript',
        jsx: 'javascript',
        ts: 'typescript',
        tsx: 'typescript', // Handle TSX files as TypeScript with JSX
        json: 'json',
        html: 'html',
        css: 'css',
        scss: 'scss',
        xml: 'xml',
        md: 'markdown',
        yaml: 'yaml',
        py: 'python',
        java: 'java',
        cpp: 'cpp',
        c: 'c',
        cs: 'csharp',
        php: 'php',
        sql: 'sql',
    };

    const getLanguageFromFilename = (filename: string): string => {
        const extension = filename.split('.').pop() || 'none';
        return extensionToLanguageMap[extension] || 'plaintext';
    };

    useEffect(() => {
        if (containerRef.current) {
            const editor = monaco.editor.create(containerRef.current, {
                
                value: value, // Set initial value
                language: getLanguageFromFilename(filename), // Dynamically set language
                theme: 'vs-dark', // Dark theme
                automaticLayout: true, // Ensure proper layout adjustment
                
                
            });

            // Enable JSX for TSX files
            if (filename.endsWith('.tsx') || filename.endsWith('.jsx')) {
                monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
                    jsx: monaco.languages.typescript.JsxEmit.React,
                    tsx: monaco.languages.typescript.JsxEmit.React,
                    noLib: true,
                });
            }
        }

        return () => {
            if (containerRef.current) {
                monaco.editor.getModels().forEach((model) => model.dispose());
            }
        };
    }, [value, filename]);

    return <div ref={containerRef} style={{ height: "100%" }} />;
};

export default MonacoEditor;
