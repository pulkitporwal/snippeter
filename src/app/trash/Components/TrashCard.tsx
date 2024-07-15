"use client"

import React from "react";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SyntaxHighlighter from "react-syntax-highlighter";
import { tomorrowNight as reactSyntaxHightlightStyle } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { SingleSnippetType } from "@/Types";
import { useSnippetContext } from "@/app/context/SnippetContext";

interface TrashCardProps extends SingleSnippetType { }

const TrashCard: React.FC<TrashCardProps> = ({
  _id,
  title,
  tags,
  description,
  code,
  language,
}) => {
  const { updateSnippet, deleteSnippet } = useSnippetContext();

  const handleRestore = async () => {
    try {

      

      const response = await fetch('/api/snippets', {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: _id, title: title, description: description, code: code, language: language, isTrashed: false })
      })

      const data = await response.json()

      updateSnippet(data?.data?.snippet);


    } catch (error) {
      console.error(error)
    }
  };

  const handleDeleteForever = async () => {
    try {
      const areYouSure = confirm("Are you sure you want to delete the Snippet!")
      if (areYouSure) {
        const response = await fetch('/api/snippets', {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ _id })
        });

        if (!response.ok) {
          throw new Error('Failed to delete snippet');
        }

        deleteSnippet(_id);
      }
    } catch (error) {
      console.error('Error deleting snippet:', error);
    }
  };

  return (
    <div className="bg-neutral-800 flex flex-col justify-start lg:m-2 mt-2 max-lg:w-full rounded-md py-4">
      <div className="flex justify-between mx-4">
        <span className="font-bold text-lg w-[87%] text-white">{title}</span>
        <div className="flex gap-2">
          <RestoreFromTrashIcon className="text-slate-400 cursor-pointer" onClick={handleRestore} />
          <DeleteForeverIcon className="text-red-500 cursor-pointer" onClick={handleDeleteForever} />
        </div>
      </div>
      <div className="text-slate-400 text-base mx-4 flex-wrap flex gap-1 mt-4">
        {tags?.map((tag, index) => (
          <span key={index} className="bg-yellow-50 text-black p-1 rounded-md px-2">{tag}</span>
        ))}
      </div>
      <div className="text-slate-200 text-[13px] mt-4 mx-5 line-clamp-3">{description}</div>
      <div className="rounded-md overflow-x-auto text-sm px-5 mt-5">
        <SyntaxHighlighter
          language={language}
          style={reactSyntaxHightlightStyle}
        >
          {code}
        </SyntaxHighlighter>
      </div>
      <div className="flex justify-between text-[13px] text-slate-500 mx-4 mt-3">
        <div className="flex gap-1 items-center">{language}</div>
      </div>
    </div>
  );
};

export default TrashCard;