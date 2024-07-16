import React, { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "@/app/context/GlobalContext";
import { useSnippetContext } from "@/app/context/SnippetContext";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import ContentCopyTwoToneIcon from "@mui/icons-material/ContentCopyTwoTone";
import FormatAlignLeftOutlinedIcon from "@mui/icons-material/FormatAlignLeftOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import { IconButton } from "@mui/material";
import AceEditor from "react-ace";
import { generateCode } from "@/utils/generateCodeWithGemini";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-xml";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/mode-sass";
import "ace-builds/src-noconflict/mode-mysql";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/mode-typescript";

import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

const languages = [
    { name: "JavaScript", mode: "javascript" },
    { name: "Python", mode: "python" },
    { name: "Java", mode: "java" },
    { name: "C++", mode: "c_cpp" },
    { name: "HTML", mode: "html" },
    { name: "CSS", mode: "css" },
    { name: "XML", mode: "xml" },
    { name: "Ruby", mode: "ruby" },
    { name: "SASS", mode: "sass" },
    { name: "MySQL", mode: "mysql" },
    { name: "JSON", mode: "json" },
    { name: "GoLang", mode: "golang" },
    { name: "C#", mode: "csharp" },
    { name: "TypeScript", mode: "typescript" },
];

const ContentEditor = () => {
    const {
        openContentEditorObject: { openContentEditor, setOpenContentEditor },
        selectedNoteObject: { selectedNote, setSelectedNote },
        savingStateObject: { setSavingData, setIsSaving },
    } = useGlobalContext();
    const { addSnippet, updateSnippet } = useSnippetContext();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        code: "",
        tags: [],
        language: "javascript",
    });

    useEffect(() => {
        if (openContentEditor && selectedNote) {
            setFormData({
                ...selectedNote,
                language: selectedNote.language || "javascript",
            });
        }
    }, [openContentEditor, selectedNote]);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleCodeChange = (newCode) => {
        setFormData((prev) => ({ ...prev, code: newCode }));
    };

    const handleAddTag = (newTag) => {
        if (newTag && !formData.tags.includes(newTag)) {
            setFormData((prev) => ({ ...prev, tags: [...prev.tags, newTag] }));
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setFormData((prev) => ({
            ...prev,
            tags: prev.tags.filter((tag) => tag !== tagToRemove),
        }));
    };

    const handleSubmit = async () => {
        try {
            setOpenContentEditor(false);
            setIsSaving(true);
            setSavingData({
                title: formData.title,
                description: formData.description,
            });

            const dataToSend = {
                _id: selectedNote._id,
                ...formData,
                language: formData.language || "javascript",
            };

            const url = "/api/snippets";
            const method = selectedNote && selectedNote._id ? "PUT" : "POST";

            const response = await fetch(url, {
                method: method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataToSend),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to save snippet");
            }

            const { data } = await response.json();

            if (selectedNote && selectedNote._id) {
                updateSnippet(data?.snippet);
                setSelectedNote(data?.snippet);
            } else {
                addSnippet(data?.snippet);
            }

            setSavingData({
                title: "Snippet Saved Successfully",
                description: "Your snippet has been saved.",
            });
        } catch (error) {
            console.error("Error saving snippet:", error);
            setSavingData({
                title: "Error While Saving Snippet",
                description: error.message || "An unknown error occurred",
            });
        } finally {
            setTimeout(() => setIsSaving(false), 3000);
        }
    };

    return (
        <>
            {openContentEditor && (
                <div className="fixed inset-0 bg-black bg-opacity-90 z-40" />
            )}
            {openContentEditor && (
                <svg
                    className="z-[1000] fixed top-[6%] right-[7%] md:top-[7%] md:right-[6%] cursor-pointer"
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#eee"
                    width={25}
                    height={25}
                    onClick={() => setOpenContentEditor(false)}
                >
                    <path
                        fill="#828282"
                        d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"
                    />
                </svg>
            )}

            <div
                className={`
                ${openContentEditor ? "fixed" : "hidden"}
                w-[90%] h-[90%] overflow-auto bg-neutral-800 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-2xl z-50
            `}
                onKeyDown={(e) => {
                    if (e.key === "Escape") {
                        setOpenContentEditor(false);
                    }
                }}
            >
                <div className="w-full flex items-start justify-center gap-5 flex-col p-8 md:p-12">
                    <input
                        placeholder="Add Title"
                        className="bg-transparent text-3xl font-semibold outline-none focus:outline-none w-full text-white"
                        value={formData.title}
                        id="title"
                        onChange={handleChange}
                    />
                    <CardDescription
                        description={formData.description}
                        handleChange={handleChange}
                        setFormData={setFormData}
                    />
                    <TagSection
                        tags={formData.tags}
                        onAddTag={handleAddTag}
                        onRemoveTag={handleRemoveTag}
                    />
                    <CodeBlock
                        code={formData.code}
                        handleCodeChange={handleCodeChange}
                        formData={formData}
                        setFormData={setFormData}
                    />
                    <button
                        className="flex gap-2 text-[14px] px-4 py-2 text-neutral-900 hover:opacity-90 rounded-md self-end mr-3 mt-2 bg-[#f5e505]"
                        onClick={handleSubmit}
                    >
                        Save
                    </button>
                </div>
            </div>
        </>
    );
};

const CardDescription = ({ description, handleChange, setFormData }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const textareaRef = useRef(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${
                textareaRef.current.scrollHeight + 80
            }px`;
        }
    }, [description]);

    const handleCodeGenerationWithAI = async () => {
        setIsGenerating(true);
        try {
            const result = await generateCode(description);
            if (result) {
                setFormData((prev) => ({ ...prev, code: result }));
            }
        } catch (error) {
            console.error("Error generating code:", error);
            // You might want to show an error message to the user here
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="flex gap-2 text-[12px] w-full text-slate-100 mt-8 ">
            <FormatAlignLeftOutlinedIcon
                sx={{ fontSize: 18 }}
                className={`mt-[9px] ${
                    isHovered ? "text-amber-300" : "text-slate-400"
                }`}
            />
            <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="w-full relative"
            >
                <textarea
                    ref={textareaRef}
                    value={description}
                    onChange={handleChange}
                    id="description"
                    placeholder="Add Description"
                    className="bg-neutral-900 text-base leading-relaxed font-normal outline-none focus:outline-none w-full resize-none overflow-hidden p-2 text-white"
                />
            </div>
            <div onClick={handleCodeGenerationWithAI}>
                <AutoFixHighIcon
                    className={`flex items-center justify-center mt-5 sm:text-3xl text-lg cursor-pointer ${
                        isGenerating ? "animate-spin" : ""
                    }`}
                    sx={{ color: "#f5e505" }}
                />
            </div>
        </div>
    );
};

const CodeBlock = ({ code, handleCodeChange, formData, setFormData }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [openLanguageMenu, setOpenLanguageMenu] = useState(false);

    return (
        <div className="flex gap-2 text-[12px] w-full text-slate-400 mt-3 ">
            <CodeOutlinedIcon
                sx={{ fontSize: 18 }}
                className={`mt-[9px] ${
                    isHovered ? "text-amber-300" : "text-slate-400"
                }`}
            />
            <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`${
                    isHovered ? "border-amber-300" : "border-neutral-700"
                } border p-3 pt-16 w-full relative bg-neutral-900`}
            >
                <div className="absolute top-4 right-4 z-50">
                    <IconButton
                        onClick={() => navigator.clipboard.writeText(code)}
                    >
                        <ContentCopyTwoToneIcon
                            sx={{ fontSize: 18, color: "#f2f2f2" }}
                        />
                    </IconButton>
                </div>
                <div
                    className="flex gap-2 justify-between bg-neutral-800 w-[120px] p-[6px] px-3 item-center text-[12px] mt-2 absolute top-1 left-3 cursor-pointer text-white"
                    onClick={() => setOpenLanguageMenu(!openLanguageMenu)}
                >
                    <div className="flex select-none gap-1 items-center">
                        <span>
                            {languages.find(
                                (lang) => lang.mode === formData.language
                            )?.name || "JavaScript"}
                        </span>
                    </div>
                    <ArrowDropDownOutlinedIcon sx={{ fontSize: 18 }} />
                </div>
                {openLanguageMenu && (
                    <div className="absolute top-10 left-03 bg-neutral-700 w-[120px] text-white p-2 rounded shadow-lg z-50 max-h-60 overflow-y-auto">
                        {languages.map((lang, index) => (
                            <div
                                key={index}
                                className="cursor-pointer hover:bg-neutral-600 p-1"
                                onClick={() => {
                                    setFormData((prev) => ({
                                        ...prev,
                                        language: lang.mode,
                                    }));
                                    setOpenLanguageMenu(false);
                                }}
                            >
                                {lang.name}
                            </div>
                        ))}
                    </div>
                )}
                <AceEditor
                    mode={formData.language}
                    theme="monokai"
                    name="codeBlock"
                    onChange={handleCodeChange}
                    value={code}
                    width="100%"
                    height="300px"
                    fontSize={14}
                    showPrintMargin={false}
                    showGutter={true}
                    highlightActiveLine={true}
                    setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: true,
                        showLineNumbers: true,
                        tabSize: 2,
                    }}
                    className="bg-neutral-900 p-10"
                />
            </div>
        </div>
    );
};

const TagSection = ({ tags, onAddTag, onRemoveTag }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [newTag, setNewTag] = useState("");

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && newTag.trim()) {
            onAddTag(newTag.trim());
            setNewTag("");
        }
    };

    const handleTagButton = () => {
        onAddTag(newTag.trim());
        setNewTag("");
    };

    return (
        <div className="flex gap-2 text-[12px] w-full text-slate-400 mt-3 ">
            <LocalOfferOutlinedIcon
                sx={{ fontSize: 18 }}
                className={`mt-[9px] ${
                    isHovered ? "text-amber-300" : "text-slate-400"
                }`}
            />
            <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`${
                    isHovered ? "border-amber-300" : "border-neutral-700"
                } border p-3  w-full relative bg-neutral-900`}
            >
                <div className="flex flex-wrap gap-2 mb-2">
                    {tags.map((tag, index) => (
                        <div
                            key={index}
                            className="bg-neutral-700 text-white px-2 py-1 rounded-full flex items-center"
                        >
                            {tag}
                            <IconButton
                                size="small"
                                onClick={() => onRemoveTag(tag)}
                            >
                                <CloseIcon
                                    sx={{ fontSize: 14, color: "white" }}
                                />
                            </IconButton>
                        </div>
                    ))}
                    <input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Add tags (press Enter to add)"
                        className="bg-neutral-900 text-base leading-relaxed font-normal outline-none focus:outline-none w-full p-2 text-white"
                    />
                    <span
                        onClick={handleTagButton}
                        className="absolute right-5 top-[50%] -translate-y-1/2 text-4xl cursor-pointer"
                    >
                        +
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ContentEditor;
