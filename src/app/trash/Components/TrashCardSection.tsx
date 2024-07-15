"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { SingleSnippetType } from "@/Types";
import { useSnippetContext } from "@/app/context/SnippetContext";
import { useGlobalContext } from "@/app/context/GlobalContext";
import TrashCard from "./TrashCard";

const ResponsiveMasonry = dynamic(
  () => import("react-responsive-masonry").then((mod) => mod.ResponsiveMasonry),
  { ssr: false }
);

const Masonry = dynamic(
  () => import("react-responsive-masonry").then((mod) => mod.default),
  { ssr: false }
);

const TrashCardsSection = () => {
  const { snippets } = useSnippetContext();
  const { searchObject: { searchTerm } } = useGlobalContext();
  const [trashedCards, setTrashedCards] = useState<SingleSnippetType[]>([]);

  useEffect(() => {
    if (snippets) {
      let filteredSnippets;
      if (searchTerm.startsWith("lang:")) {
        const language = searchTerm.split(":")[1].toLowerCase();
        filteredSnippets = snippets.filter(snippet =>
          snippet.isTrashed && snippet.language.toLowerCase() === language
        );
      } else {
        filteredSnippets = snippets.filter(snippet =>
          snippet.isTrashed &&
          (snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            snippet.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
        );
      }
      setTrashedCards(filteredSnippets);
    }
  }, [snippets, searchTerm]);

  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 1000: 2, 1400: 3 }}>
      <Masonry>
        {trashedCards.length === 0 ? (
          <div className="text-white mt-10">No items in trash</div>
        ) : (
          trashedCards.map((snippet) => (
            <TrashCard
              key={snippet._id}
              {...snippet}
            />
          ))
        )}
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default TrashCardsSection;
