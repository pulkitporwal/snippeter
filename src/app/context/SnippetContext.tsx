"use client"

import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { SingleSnippetType } from "@/Types";

export interface SnippetContextProvider {
    snippets: SingleSnippetType[];
    setSnippets: React.Dispatch<React.SetStateAction<SingleSnippetType[]>>;
    addSnippet: (snippet: SingleSnippetType) => void;
    updateSnippet: (updatedSnippet: SingleSnippetType) => void;
    deleteSnippet: (snippetId: string) => void;
}

export const SnippetContext = createContext<SnippetContextProvider | undefined>(undefined);

interface SnippetContextProviderProps {
    children: ReactNode;
}

export const SnippetContextProvider = ({ children }: SnippetContextProviderProps) => {
    const [snippets, setSnippets] = useState<SingleSnippetType[]>([]);

    useEffect(() => {
        fetchSnippets();
    }, []);

    const fetchSnippets = async () => {
        try {
            const response = await fetch('/api/snippets');
            if (!response.ok) {
                throw new Error('Failed to fetch snippets');
            }
            const data = await response.json();
            setSnippets(data.data.snippets);
        } catch (error) {
            console.error('Error fetching snippets:', error);
        }
    };

    const addSnippet = (newSnippet: SingleSnippetType) => {
        setSnippets(prevSnippets => {

            return [...prevSnippets, newSnippet];
        });
    };

    const updateSnippet = (updatedSnippet: SingleSnippetType) => {

        setSnippets(prevSnippets =>
            prevSnippets.map(snippet =>
                snippet._id === updatedSnippet._id ? updatedSnippet : snippet
            )
        );
    };

    const deleteSnippet = (snippetId: string) => {
        setSnippets(prevSnippets =>
            prevSnippets.filter(snippet => snippet._id !== snippetId)
        );
    };

    return (
        <SnippetContext.Provider value={{ snippets, setSnippets, addSnippet, updateSnippet, deleteSnippet }}>
            {children}
        </SnippetContext.Provider>
    );
};

export const useSnippetContext = () => {
    const context = useContext(SnippetContext);
    if (!context) {
        throw new Error("useSnippetContext must be used inside SnippetContextProvider");
    }
    return context;
};
