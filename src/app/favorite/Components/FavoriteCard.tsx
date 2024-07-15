import React, { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import SyntaxHighlighter from "react-syntax-highlighter";
import { tomorrowNight as reactSyntaxHightlightStyle } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { SingleSnippetType } from "@/Types";
import { useSnippetContext } from "@/app/context/SnippetContext";
import { useGlobalContext } from "@/app/context/GlobalContext";

interface FavoriteCardProps extends SingleSnippetType {}

const FavoriteCard: React.FC<FavoriteCardProps> = ({
  _id,
  title,
  tags,
  description,
  code,
  language,
  isFavorite,
  isTrashed
}) => {
  const { selectedNoteObject: { setSelectedNote }, openContentEditorObject: { setOpenContentEditor } } = useGlobalContext();
  const { updateSnippet } = useSnippetContext();
  const [showFullContent, setShowFullContent] = useState(false);

  const handleClick = () => {
    setOpenContentEditor(true);
    setSelectedNote({ _id, title, tags, description, code, language, isFavorite, isTrashed });
  };

  const handleUnfavorite = async () => {
    try {
      const response = await fetch('/api/snippets', {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id, title, description, code, language, isFavorite: false })
      });

      const data = await response.json();
      if (data?.data?.snippet) {
        updateSnippet(data.data.snippet);
      }
    } catch (error) {
      console.error("Error updating favorite status: ", error);
    }
  };

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  return (
    <div className="bg-yellow-900 flex flex-col justify-start lg:m-2 mt-2 max-lg:w-full rounded-md py-4 border-2 border-yellow-600">
      <div className="flex justify-between mx-4">
        <span className="font-bold text-lg w-[87%] cursor-pointer text-yellow-200" onClick={handleClick}>
          {title}
        </span>
        <span onClick={handleUnfavorite}>
          <FavoriteIcon className="text-yellow-500 cursor-pointer" />
        </span>
      </div>
      
      <div className="text-yellow-300 text-base mx-4 flex-wrap flex gap-1 mt-4">
        {tags?.map((tag, index) => (
          <span key={index} className="bg-yellow-800 text-yellow-200 p-1 rounded-md px-2">
            {tag}
          </span>
        ))}
      </div>
      
      <div
        className={`text-yellow-100 text-[13px] mt-4 mx-5 cursor-pointer ${showFullContent ? "" : "line-clamp-3"}`}
        onClick={toggleContent}
      >
        {description}
      </div>
      
      <div className="rounded-md overflow-x-auto text-sm px-5 mt-5">
        <SyntaxHighlighter
          language={language}
          style={reactSyntaxHightlightStyle}
        >
          {code}
        </SyntaxHighlighter>
      </div>
      
      <div className="flex justify-between text-[13px] text-yellow-400 mx-4 mt-3">
        <div className="flex gap-1 items-center">{language}</div>
        <span className="cursor-pointer">
          <DeleteRoundedIcon />
        </span>
      </div>
    </div>
  );
};

export default FavoriteCard;