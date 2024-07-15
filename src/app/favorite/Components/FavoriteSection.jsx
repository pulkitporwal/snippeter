import { useSnippetContext } from "@/app/context/SnippetContext";
import { useGlobalContext } from "@/app/context/GlobalContext";
import React, { useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import FavoriteCard from "./FavoriteCard";

const FavoriteSection = () => {
    const { snippets } = useSnippetContext();
    const {
        searchObject: { searchTerm },
    } = useGlobalContext();
    const [favoriteCards, setFavoriteCards] = useState([]);

    useEffect(() => {
        if (snippets) {
            let filteredSnippets;
            if (searchTerm.startsWith("lang:")) {
                const language = searchTerm.split(":")[1].toLowerCase();
                filteredSnippets = snippets.filter(
                    (snippet) =>
                        snippet.isFavorite &&
                        snippet.language.toLowerCase() === language
                );
            } else {
                filteredSnippets = snippets.filter(
                    (snippet) =>
                        snippet.isFavorite &&
                        (snippet.title
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) ||
                            snippet.tags.some((tag) =>
                                tag
                                    .toLowerCase()
                                    .includes(searchTerm.toLowerCase())
                            ))
                );
            }
            setFavoriteCards(filteredSnippets);
        }
    }, [snippets, searchTerm]);

    return (
        <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 1000: 2, 1400: 3 }}
        >
            <Masonry>
                {favoriteCards.length === 0 ? (
                    <div className="text-white mt-10">
                        No favorite items found
                    </div>
                ) : (
                    favoriteCards.map((snippet) => (
                        <FavoriteCard key={snippet._id} {...snippet} />
                    ))
                )}
            </Masonry>
        </ResponsiveMasonry>
    );
};

export default FavoriteSection;
