"use client";

import * as React from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { ANNOUNCEMENT } from "@/data/mocks";

const STORAGE_KEY = "auto-tools.announcement.dismissed";

export function AnnouncementBar() {
  const [hidden, setHidden] = React.useState(true);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    setHidden(window.sessionStorage.getItem(STORAGE_KEY) === "1");
  }, []);

  if (hidden) return null;

  return (
    <div className="bg-brand-steel-950 text-white">
      <div className="container flex h-10 items-center justify-between gap-4 text-xs">
        <Link
          href={ANNOUNCEMENT.href}
          className="flex-1 truncate text-center font-medium tracking-wide hover:underline"
        >
          {ANNOUNCEMENT.text}
        </Link>
        <button
          type="button"
          aria-label="Dismiss announcement"
          onClick={() => {
            window.sessionStorage.setItem(STORAGE_KEY, "1");
            setHidden(true);
          }}
          className="grid size-6 place-items-center rounded-md text-white/60 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
