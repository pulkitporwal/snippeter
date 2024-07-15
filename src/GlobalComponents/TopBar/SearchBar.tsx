import { useGlobalContext } from "@/app/context/GlobalContext";
import React from "react";

const SearchBar = () => {
  const { searchObject: { searchTerm, setSearchTerm } } = useGlobalContext()
  return (
    <div className="relative pl-3 w-[65%] h-[38px] bg-neutral-700 rounded-3xl flex items-center gap-2 ">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width={20} height={20}>
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <path
            d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
            stroke="#f5e505"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>{" "}
        </g>
      </svg>
      <input
        type="text"
        placeholder="Search a snippet..."
        value={searchTerm}
        onChange={(e) => { setSearchTerm(e.target.value) }}
        className="w-[70%] outline-none text-sm bg-neutral-700 text-slate-400 "
      />
      <AddSnippetButton />
    </div>
  );
};

const AddSnippetButton = () => {

  const { selectedNoteObject: { setSelectedNote }, openContentEditorObject: { openContentEditor, setOpenContentEditor } } = useGlobalContext()


  return (
    <div className="absolute flex gap-2 px-3 rounded-3xl bg-[#f5e505] p-1 text-[13px] text-black top-[5px] right-[6px] items-center cursor-pointer select-none " onClick={() => {
      setOpenContentEditor(true)
      setSelectedNote({ _id: "", description: "", isFavorite: false, code: "", language: "", title: "", tags: [], isTrashed: false })
    }}>
      <div className="font-bold">+</div>
      <div className="max-md:hidden">Snippet</div>
    </div>
  );
};

export default SearchBar;
