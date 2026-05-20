"use client";

import dynamic from "next/dynamic";

const CursorComp = dynamic(() => import("./Cursor"), {
  ssr: false,
});

export default function CursorClient() {
  return <CursorComp />;
}
