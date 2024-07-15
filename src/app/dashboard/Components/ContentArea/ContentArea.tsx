import React from "react";
import ProfileUser from "../../../../GlobalComponents/TopBar/ProfileUser";
import SearchBar from "../../../../GlobalComponents/TopBar/SearchBar";
import SideBarMenuIcon from "../../../../GlobalComponents/TopBar/SideBarMenuIcon";
import AllCardsSection from "./NotesArea/AllCardsSection";
import ContentEditor from "@/GlobalComponents/ContentEditor/ContentEditor";
import LoadingBar from "./LoadingBar/LoadingBar";

const ContentArea = () => {
  return (
    <div className="w-full overflow-auto h-screen  bg-neutral-900 p-5">
      <TopBar />
      <LoadingBar />
      <AllCardsSection />
      <ContentEditor />
    </div>
  );
};

const TopBar = () => {
  return (
    <div className="rounded-lg flex justify-between mb-2 items-center bg-neutral-800 p-3">
      <ProfileUser />
      <SearchBar />
      <SideBarMenuIcon />
    </div>
  );
};

export default ContentArea;
