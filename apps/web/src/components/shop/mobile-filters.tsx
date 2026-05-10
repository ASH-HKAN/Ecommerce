"use client";

import * as React from "react";
import { SlidersHorizontal } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FilterSidebar } from "./filter-sidebar";

export function MobileFilters({ count }: { count: number }) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-md border bg-background px-3 py-2 text-sm font-medium lg:hidden"
      >
        <SlidersHorizontal className="size-4" />
        Filters
      </button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="bottom" className="h-[85vh] p-0">
          <SheetHeader className="border-b px-6 py-4">
            <SheetTitle className="font-display">Filters</SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-[calc(85vh-130px)]">
            <div className="px-6 py-5">
              <FilterSidebar />
            </div>
          </ScrollArea>
          <div className="border-t bg-card px-6 py-4">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-11 w-full items-center justify-center rounded-md bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Apply ({count} results)
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
