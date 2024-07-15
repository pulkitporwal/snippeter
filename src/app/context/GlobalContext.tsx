"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { SavingData, SideBarMenu, SingleSnippetType } from "../../Types";

interface GlobalContextProvider {
    sideBarMenuObject: {
        sideBarMenu: SideBarMenu[];
        setSideBarMenu: React.Dispatch<React.SetStateAction<SideBarMenu[]>>;
    };
    openSideBarObject: {
        openSideBar: boolean;
        setOpenSideBar: React.Dispatch<React.SetStateAction<boolean>>;
    };
    openContentEditorObject: {
        openContentEditor: boolean;
        setOpenContentEditor: React.Dispatch<React.SetStateAction<boolean>>;
    };
    selectedNoteObject: {
        selectedNote: SingleSnippetType | null;
        setSelectedNote: React.Dispatch<React.SetStateAction<SingleSnippetType | null>>;
    };
    savingStateObject: {
        isSaving: boolean;
        savingData: SavingData;
        setIsSaving: React.Dispatch<React.SetStateAction<boolean>>;
        setSavingData: React.Dispatch<React.SetStateAction<SavingData>>
    }
    searchObject: {
        searchTerm: string,
        setSearchTerm: React.Dispatch<React.SetStateAction<string>>
    }
}



const ContextProvider = createContext<GlobalContextProvider>({
    sideBarMenuObject: {
        sideBarMenu: [],
        setSideBarMenu: () => { },
    },
    openSideBarObject: {
        openSideBar: false,
        setOpenSideBar: () => { },
    },
    openContentEditorObject: {
        openContentEditor: false,
        setOpenContentEditor: () => { },
    },
    selectedNoteObject: {
        selectedNote: null,
        setSelectedNote: () => { }
    },
    savingStateObject: {
        isSaving: false,
        setIsSaving: () => { },
        savingData: { title: "", description: "" },
        setSavingData: () => { }
    },
    searchObject: {
        searchTerm: "",
        setSearchTerm: () => { }
    }
});

export default function GlobalContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [searchTerm, setSearchTerm] = useState("")
    const [isSaving, setIsSaving] = useState(false)
    const [savingData, setSavingData] = useState({ title: "", description: "" })
    const [selectedNote, setSelectedNote] = useState<SingleSnippetType | null>(null)
    const [openContentEditor, setOpenContentEditor] = useState(false);
    const [openSideBar, setOpenSideBar] = useState(false);
    const [sideBarMenu, setSideBarMenu] = useState<SideBarMenu[]>([
        {
            id: 1,
            name: "All Snippets",
            isSelected: true,
            icons: `<svg fill="#575757" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" enable-background="new 0 0 52 52" xml:space="preserve" stroke="#575757"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14.5,6h-11C2.7,6,2,6.7,2,7.5v13C2,21.3,2.7,22,3.5,22h11c0.8,0,1.5-0.7,1.5-1.5v-13C16,6.7,15.3,6,14.5,6z "></path> <path d="M48.5,6h-27C20.7,6,20,6.7,20,7.5v3c0,0.8,0.7,1.5,1.5,1.5h27c0.8,0,1.5-0.7,1.5-1.5v-3 C50,6.7,49.3,6,48.5,6z"></path> <path d="M21.5,22h17c0.8,0,1.5-0.7,1.5-1.5v-3c0-0.8-0.7-1.5-1.5-1.5h-17c-0.8,0-1.5,0.7-1.5,1.5v3 C20,21.3,20.7,22,21.5,22z"></path> <path d="M14.5,30h-11C2.7,30,2,30.7,2,31.5v13C2,45.3,2.7,46,3.5,46h11c0.8,0,1.5-0.7,1.5-1.5v-13 C16,30.7,15.3,30,14.5,30z"></path> <path d="M48.5,30h-27c-0.8,0-1.5,0.7-1.5,1.5v3c0,0.8,0.7,1.5,1.5,1.5h27c0.8,0,1.5-0.7,1.5-1.5v-3 C50,30.7,49.3,30,48.5,30z"></path> <path d="M38.5,40h-17c-0.8,0-1.5,0.7-1.5,1.5v3c0,0.8,0.7,1.5,1.5,1.5h17c0.8,0,1.5-0.7,1.5-1.5v-3 C40,40.7,39.3,40,38.5,40z"></path> </g></svg>`,
            url: "/dashboard"
        },
        {
            id: 2,
            name: "Favorites",
            isSelected: false,
            icons: `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 40 40">
<path fill="#f78f8f" d="M20 31.441L8.5 37.191 8.5 2.5 31.5 2.5 31.5 37.191z"></path><path fill="#c74343" d="M31,3v33.382l-10.553-5.276L20,30.882l-0.447,0.224L9,36.382V3H31 M32,2H8v36l12-6l12,6V2L32,2z"></path>
</svg>`,
            url: "/favorite"
        },
        {
            id: 3,
            name: "Trash",
            isSelected: false,
            icons: `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 48 48">
<path fill="#9575CD" d="M34,12l-6-6h-8l-6,6h-3v28c0,2.2,1.8,4,4,4h18c2.2,0,4-1.8,4-4V12H34z"></path><path fill="#7454B3" d="M24.5 39h-1c-.8 0-1.5-.7-1.5-1.5v-19c0-.8.7-1.5 1.5-1.5h1c.8 0 1.5.7 1.5 1.5v19C26 38.3 25.3 39 24.5 39zM31.5 39L31.5 39c-.8 0-1.5-.7-1.5-1.5v-19c0-.8.7-1.5 1.5-1.5l0 0c.8 0 1.5.7 1.5 1.5v19C33 38.3 32.3 39 31.5 39zM16.5 39L16.5 39c-.8 0-1.5-.7-1.5-1.5v-19c0-.8.7-1.5 1.5-1.5l0 0c.8 0 1.5.7 1.5 1.5v19C18 38.3 17.3 39 16.5 39z"></path><path fill="#B39DDB" d="M11,8h26c1.1,0,2,0.9,2,2v2H9v-2C9,8.9,9.9,8,11,8z"></path>
</svg>`,
            url: "/trash"
        },
        {
            id: 4,
            name: "Logout",
            isSelected: false,
            icons: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 12H20M20 12L17 9M20 12L17 15" stroke="#a1a1a1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M4 12C4 7.58172 7.58172 4 12 4M12 20C9.47362 20 7.22075 18.8289 5.75463 17" stroke="#a1a1a1" strokeWidth="1.5" strokeLinecap="round"></path> </g></svg>`,
            url: "/logout"
        },
    ]);

    return (
        <ContextProvider.Provider
            value={{
                sideBarMenuObject: { sideBarMenu, setSideBarMenu },
                openSideBarObject: { openSideBar, setOpenSideBar },
                openContentEditorObject: {
                    openContentEditor,
                    setOpenContentEditor,
                },
                selectedNoteObject: {
                    selectedNote,
                    setSelectedNote
                },
                savingStateObject: { isSaving, setIsSaving, savingData, setSavingData },
                searchObject: { searchTerm, setSearchTerm }
            }}
        >
            {children}
        </ContextProvider.Provider>
    );
}

export const useGlobalContext = () => {
    const context = useContext(ContextProvider);
    if (!context) {
        throw new Error(
            "useGlobalContext must be used inside Global Context Provider"
        );
    }
    return context;
};
