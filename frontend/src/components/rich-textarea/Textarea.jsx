import { useEffect } from "react";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import MenuBar from "./MenuBar";

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    editorProps: {
      style: {
        width: "100%",
      },
    },
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
];
const constructEditorProps = (overrides) => {
  return {
    attributes: {
      class: `tiptap prose prose-li:marker:text-slate-900 prose-stone focus:outline-none h-[10em] bg-[#fff] max-w-none rounded-b p-2 break-all overflow-y-scroll ${overrides}`,
    },
  };
};
const handleUpdate = (editor, onChange) => {
  let hasContent = !!editor.getText().trim();
  onChange(hasContent ? editor.getHTML() : null);
};
const Textarea = ({ onChange, initialContent, className, ...props }) => {
  const editor = useEditor({
    extensions,
    editorProps: constructEditorProps(className || ``),
    onUpdate: ({ editor }) => handleUpdate(editor, onChange),
    ...props,
  });
  useEffect(() => {
    if (editor) {
      editor.commands.setContent(initialContent);
    }
  }, [editor, initialContent]);
  return (
    <>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
};
export default Textarea;
