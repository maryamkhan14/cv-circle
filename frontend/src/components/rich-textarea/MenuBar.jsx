import MenuBarButton from "./MenuBarButton";

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }
  return (
    <div className="flex w-full gap-2 bg-slate-50 rounded-t menu-bar">
      <MenuBarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        activeArgs={["bold"]}
        editor={editor}
      >
        <i className="ri-bold text-s"></i>
      </MenuBarButton>
      <MenuBarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        activeArgs={["italic"]}
        editor={editor}
      >
        <i className="ri-italic text-s"></i>
      </MenuBarButton>
      <MenuBarButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        activeArgs={["strike"]}
        editor={editor}
      >
        <i className="ri-strikethrough text-s"></i>
      </MenuBarButton>
      <MenuBarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        activeArgs={["heading", { level: 1 }]}
        className="hidden md:block"
        editor={editor}
      >
        <i className="ri-h-1 text-s"></i>
      </MenuBarButton>
      <MenuBarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        activeArgs={["heading", { level: 2 }]}
        className="hidden md:block"
        editor={editor}
      >
        <i className="ri-h-2 text-s"></i>
      </MenuBarButton>
      <MenuBarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        activeArgs={["heading", { level: 3 }]}
        className="hidden md:block"
        editor={editor}
      >
        <i className="ri-h-3 text-s"></i>
      </MenuBarButton>
      <MenuBarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        activeArgs={["bulletList"]}
        className="hidden md:block"
        editor={editor}
      >
        <i className="ri-list-unordered text-s"></i>
      </MenuBarButton>
      <MenuBarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        activeArgs={["orderedList"]}
        className="hidden md:block"
        editor={editor}
      >
        <i className="ri-list-ordered text-s"></i>
      </MenuBarButton>
      <MenuBarButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        activeArgs={["blockquote"]}
        className="hidden lg:block"
        editor={editor}
      >
        <i className="ri-quote-text text-s"></i>
      </MenuBarButton>
      <MenuBarButton
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className="hidden lg:block"
        editor={editor}
      >
        <i className="ri-separator text-s"></i>
      </MenuBarButton>
      <MenuBarButton
        onClick={() => editor.chain().focus().setHardBreak().run()}
        className="hidden lg:block"
        editor={editor}
      >
        <i className="ri-text-wrap text-s"></i>{" "}
      </MenuBarButton>
      <MenuBarButton
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className="hidden lg:block"
        editor={editor}
      >
        <i className="ri-arrow-go-back-line text-s"></i>
      </MenuBarButton>
      <MenuBarButton
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        editor={editor}
        className="hidden lg:block disabled:bg-gray-200"
      >
        <i className="ri-arrow-go-forward-line text-s"></i>{" "}
      </MenuBarButton>
      <MenuBarButton
        onClick={() => {
          editor.chain().focus().clearNodes().run();
          editor.chain().focus().unsetAllMarks().run();
        }}
        editor={editor}
      >
        <i className="ri-format-clear text-s"></i>
      </MenuBarButton>
    </div>
  );
};

export default MenuBar;
