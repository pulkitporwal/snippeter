"use client";

import UserDataSaver from "@/GlobalComponents/UserDataSaver";
import { UserButton } from "@clerk/nextjs";
import React from "react";
import Sidebar from "../../GlobalComponents/Sidebar";
import ContentArea from "./Components/ContentArea/ContentArea";

const page = () => {
  return (
    <div className=" flex ">
      <UserDataSaver />
      <Sidebar />
      <ContentArea />
    </div>
  );
};

export default page;
