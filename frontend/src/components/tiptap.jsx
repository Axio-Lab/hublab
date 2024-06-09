"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading1 from "@tiptap/extension-heading";
import Heading2 from "@tiptap/extension-heading";
import Heading3 from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";

import Toolbar from "./toolbar";

const Tiptap = ({ onChange, setFieldValue }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({}),
      Heading1.configure({
        HTMLAttributes: {
          class: "text-2xl font-bold", // Styling for H1
          levels: [1],
        },
      }),
      //   Heading2.configure({
      //     HTMLAttributes: {
      //       class: "text-xl font-semibold", // Styling for H2
      //       levels: [2],
      //     },
      //   }),
      //   Heading3.configure({
      //     HTMLAttributes: {
      //       class: "text-lg font-medium", // Styling for H3
      //       levels: [3],
      //     },
      //   }),
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc list-outside px-8 ", // Styling for H2
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal list-outside px-8 ", // Styling for H2
        },
      }),
    ],
    // content: "<p>Hello World! 🌎️</p>",
    content: "",
    editorProps: {
      attributes: {
        class:
          "w-full h-full min-h-[200px] max-h-[150px bg-transparent px-5 py-1 outline-none border border-primary",
      },
    },
    onUpdate({ editor }) {
      onChange(() => setFieldValue("description", editor.getHTML()));
    },
  });

  return (
    <div>
      {/* <Heading1 /> */}
      <Toolbar editor={editor} />
      <div className="h-[200px] border overflow-scroll">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default Tiptap;