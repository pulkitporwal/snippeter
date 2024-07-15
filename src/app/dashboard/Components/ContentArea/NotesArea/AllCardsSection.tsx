"use client";
import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import SyntaxHighlighter from "react-syntax-highlighter";
import { tomorrowNight as reactSyntaxHightlightStyle } from "react-syntax-highlighter/dist/esm/styles/hljs";
import dynamic from "next/dynamic";
import ContentCopyTwoToneIcon from "@mui/icons-material/ContentCopyTwoTone";
import { SingleSnippetType } from "@/Types";
import { useSnippetContext } from "@/app/context/SnippetContext";
import { useGlobalContext } from "@/app/context/GlobalContext";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

const ResponsiveMasonry = dynamic(
  () => import("react-responsive-masonry").then((mod) => mod.ResponsiveMasonry),
  { ssr: false }
);

const Masonry = dynamic(
  () => import("react-responsive-masonry").then((mod) => mod.default),
  { ssr: false }
);

const AllCardsSection = () => {
  const { snippets } = useSnippetContext();
  const [cardsData, setCardsData] = useState<SingleSnippetType[] | null>(null);
  const { searchObject: { searchTerm } } = useGlobalContext();

  useEffect(() => {
    if (snippets) {
      let filteredSnippets;
      if (searchTerm.startsWith("lang:")) {
        const language = searchTerm.split(":")[1].toLowerCase();
        filteredSnippets = snippets.filter(snippet =>
          snippet.language.toLowerCase() === language
        );
      } else {
        filteredSnippets = snippets.filter(snippet =>
          snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          snippet.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      }
      setCardsData(filteredSnippets);
    }
  }, [snippets, searchTerm]);

  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 1000: 2, 1400: 3 }}>
      <Masonry>
        {!cardsData ? (
          <div className="flex space-x-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="bg-neutral-800 flex flex-col gap-5 justify-start lg:m-2 h-[500px] mt-2 p-4 max-lg:w-full rounded-md py-4">
                <div className="bg-neutral-700 rounded-lg w-[350px] h-[30px]"></div>
                <div className="bg-neutral-700 rounded-lg w-[250px] h-[25px]"></div>
                <div className="bg-neutral-700 rounded-lg w-[350px] h-[25px]"></div>
                <div className="bg-neutral-700 rounded-lg w-[150px] h-[25px]"></div>
                <div className="bg-neutral-700 rounded-lg w-[100px] h-[25px]"></div>
              </div>
            ))}
          </div>
        ) : (
          cardsData.map((snippet) => {
            if (snippet.isTrashed) {
              return null;
            } else {
              return (
                <SingleCard
                  key={snippet._id}
                  id={snippet._id}
                  cardTitle={snippet.title}
                  cardDate={new Date().toLocaleDateString()}
                  cardTags={snippet.tags}
                  cardDescription={snippet.description}
                  cardCode={snippet.code}
                  cardLanguage={snippet.language}
                  isFavorite={snippet.isFavorite}
                  isTrashed={snippet.isTrashed}
                />
              );
            }
          })
        )}
      </Masonry>
    </ResponsiveMasonry>
  );
};
export default AllCardsSection;

interface SingleCardProps extends SingleSnippetType { }

const SingleCard = ({
  id,
  cardTitle,
  cardDate,
  cardTags,
  cardDescription,
  cardCode,
  cardLanguage,
  isFavorite,
  isTrashed
}: any) => {
  if (isTrashed) {
    return ""
  }
  return (
    <div key={id} className="bg-neutral-800 flex flex-col justify-start lg:m-2 mt-2 max-lg:w-full rounded-md py-4">
      <CardHeader
        title={cardTitle}
        cardInfo={{
          _id: id,
          title: cardTitle,
          tags: cardTags,
          description: cardDescription,
          code: cardCode,
          language: cardLanguage,
          isFavorite: isFavorite,
          isTrashed: isTrashed
        }}
      />
      <CardDate date={cardDate} />
      <CardTags tags={cardTags} />
      <CardDescription description={cardDescription} />
      <CodeBlock codeString={cardCode} />
      <NoteFooter language={cardLanguage} fullData={{
        id,
        cardTitle,
        cardDate,
        cardTags,
        cardDescription,
        cardCode,
        cardLanguage,
        isFavorite
      }} />
    </div>
  );
};

interface CardHeaderProps {
  title: string;
  cardInfo: SingleSnippetType;
}

const CardHeader = ({ title, cardInfo }: any) => {
  const { selectedNoteObject: { setSelectedNote }, openContentEditorObject: { setOpenContentEditor } } = useGlobalContext();
  const { updateSnippet } = useSnippetContext();

  const handleClick = () => {
    setOpenContentEditor(true)
    setSelectedNote(cardInfo);
  };

  const handleFavorite = async () => {
    try {
      const response = await fetch('/api/snippets', {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: cardInfo._id,
          title: cardInfo.title,
          description: cardInfo.description,
          code: cardInfo.code,
          language: cardInfo.language,
          isFavorite: !cardInfo.isFavorite
        })
      });

      const data = await response.json();

      if (data?.data?.snippet) {
        updateSnippet(data.data.snippet);
      } else {
        console.error("Failed to update snippet: ", data);
      }

    } catch (error) {
      console.error("Error updating favorite status: ", error);
    }
  };

  return (
    <div className="flex justify-between mx-4">
      <span className="font-bold text-lg w-[87%] cursor-pointer" onClick={handleClick}>
        {title}
      </span>
      <span onClick={handleFavorite}>
        {
          cardInfo.isFavorite ? (<FavoriteOutlinedIcon sx={{ color: "#f5e505" }} className="text-slate-400 cursor-pointer" />) : (<FavoriteBorderIcon className="text-slate-400 cursor-pointer" />)

        }
      </span>
    </div>
  );
};

interface CardDateProps {
  date: string;
}

const CardDate: React.FC<CardDateProps> = ({ date }) => {
  return (
    <div className="gap-1 text-slate-300 mx-4 mt-1 flex text-[11px]">
      {date}
    </div>
  );
};

interface CardTagsProps {
  tags: string[];
}

const CardTags: React.FC<CardTagsProps> = ({ tags }) => {
  return (
    <div className="text-slate-400 text-base mx-4 flex-wrap flex gap-1 mt-4">
      {tags?.map((tag, index) => (
        <span
          key={index}
          className="bg-yellow-50 text-black p-1 rounded-md px-2"
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

interface CardDescriptionProps {
  description: string;
}

const CardDescription: React.FC<CardDescriptionProps> = ({ description }) => {
  const [showFullContent, setShowFullContent] = useState(false);

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  return (
    <div
      className={`text-slate-200 text-[13px] mt-4 mx-5 cursor-pointer ${showFullContent ? "" : "line-clamp-3"
        }`}
      onClick={toggleContent}
    >
      {description}
    </div>
  );
};

interface CodeBlockProps {
  codeString: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ codeString, language = 'javascript' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="relative rounded-md overflow-x-auto text-sm px-5 mt-5">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-8 p-1 rounded bg-gray-700 hover:bg-gray-600 transition-colors"
      >
        {copied ? <CheckOutlinedIcon sx={{ fontSize: 18 }} /> : <ContentCopyTwoToneIcon sx={{ fontSize: 18 }} className="text-gray-300" />}
      </button>
      <SyntaxHighlighter
        language={language}
        style={reactSyntaxHightlightStyle}
        customStyle={{
          padding: '2.5rem 1.25rem 1.25rem 1.25rem',
        }}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
};


interface NoteFooterProps {
  language: string;
  fullData: object,
}

const NoteFooter: React.FC<NoteFooterProps> = ({ language, fullData }) => {

  const { updateSnippet } = useSnippetContext()

  const handleSnippetTrash = async (fullData: any) => {
    try {

     

      const response = await fetch('/api/snippets', {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: fullData.id, title: fullData.cardTitle, description: fullData.cardDescription, code: fullData.cardCode, language: fullData.cardLanguage, isTrashed: true })
      })

      const data = await response.json()

      updateSnippet(data?.data?.snippet);


    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex justify-between text-[13px] text-slate-500 mx-4 mt-3">
      <div className="flex gap-1 items-center">{language}</div>
      <span className="cursor-pointer" onClick={() => { handleSnippetTrash(fullData) }} >
        <DeleteRoundedIcon />
      </span>
    </div>
  );
};