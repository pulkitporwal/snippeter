import React from "react";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import { AuthenticationButtons } from "./NavbarClient";

export default function Navbar() {
  return (
    <div className="flex m-5 max-sm:mt-9 mx-8 items-center justify-between max-sm:flex-col">
      <Logo />
      <AuthenticationButtons />
    </div>
  );
}

export function Logo() {
  return (
    <div className="flex gap-2 items-center">
      <div className={`p-[6px] rounded-md flex kode-logo items-center justify-between`}>
        <p className="text-4xl">SNIPP</p>
        <FormatAlignJustifyIcon fontSize="large" />
        <p className="text-4xl">T</p>
        <FormatAlignJustifyIcon fontSize="large" />
        <p className="text-4xl">R</p>
      </div>
    </div>
  );
}
