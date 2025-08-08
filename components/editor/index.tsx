'use client';
import '@mdxeditor/editor/style.css'
import './dark-editor.css'
import {
    headingsPlugin,
    listsPlugin,
    quotePlugin,
    thematicBreakPlugin,
    markdownShortcutPlugin,
    MDXEditor,
    toolbarPlugin,
    ConditionalContents,
    ChangeCodeMirrorLanguage,
    UndoRedo,
    Separator,
    BoldItalicUnderlineToggles,
    ListsToggle,
    CreateLink,
    InsertImage,
    InsertThematicBreak,
    InsertTable,
    InsertCodeBlock,
    linkPlugin,
    linkDialogPlugin,
    tablePlugin,
    imagePlugin,
    codeBlockPlugin,
    codeMirrorPlugin,
    diffSourcePlugin,
} from '@mdxeditor/editor'
import { EditorProps } from '@/types/global';
import { basicDark } from 'cm6-theme-basic-dark';
import { useTheme } from 'next-themes';

const Editor = ({
    editorRef,
    value,
    fieldChange,
    ...props
}: EditorProps) => {
    const { resolvedTheme } = useTheme();
    const theme = resolvedTheme === 'dark' ? [basicDark] : [];

    return (
        <MDXEditor
            {...props}
            ref={editorRef}
            key={resolvedTheme}
            markdown={value}
            className='background-light800_dark200 light-border-2 markdown-editor dark-editor w-full border'
            onChange={fieldChange}
            plugins={[
                headingsPlugin(),
                listsPlugin(),
                linkPlugin(),
                linkDialogPlugin(),
                quotePlugin(),
                thematicBreakPlugin(),
                markdownShortcutPlugin(),
                tablePlugin(),
                imagePlugin(),
                codeBlockPlugin({ defaultCodeBlockLanguage: "" }),
                codeMirrorPlugin({
                    codeBlockLanguages: {
                        css: "css",
                        txt: "txt",
                        sql: "sql",
                        html: "html",
                        saas: "saas",
                        scss: "scss",
                        bash: "bash",
                        json: "json",
                        js: "javascript",
                        ts: "typescript",
                        "": "unspecified",
                        tsx: "TypeScript (React)",
                        jsx: "JavaScript (React)",
                    },
                    autoLoadLanguageSupport: true,
                    codeMirrorExtensions: theme,
                }),
                diffSourcePlugin({ viewMode: "rich-text", diffMarkdown: "" }),
                toolbarPlugin({
                    toolbarContents: () => (
                        <ConditionalContents
                            options={[
                                {
                                    when: (editor) => editor?.editorType === 'codeblock',
                                    contents: () => <ChangeCodeMirrorLanguage />
                                },
                                {
                                    fallback: () => <>
                                        <UndoRedo />
                                        <Separator />

                                        <BoldItalicUnderlineToggles />
                                        <Separator />

                                        <ListsToggle />
                                        <Separator />

                                        <CreateLink />
                                        <InsertImage />
                                        <Separator />

                                        <InsertTable />
                                        <InsertThematicBreak />

                                        <InsertCodeBlock />
                                    </>
                                }
                            ]}
                        />
                    )
                })
            ]}
        />
    )
}

export default Editor