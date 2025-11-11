"use client";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { memo, useState, useEffect } from "react";
import { load } from "cheerio";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/radix-accordion";
import { Link } from "react-router-dom";

interface TOCItem {
  id: string;
  text: string;
  level: string;
}

interface TOCGeneratorProps {
  content: string;
}

const extractHeadings = (content: string): TOCItem[] => {
  const $ = load(content);
  return $("h2, h3")
    .slice(0, 20)
    .map((_, heading) => ({
      id: $(heading).attr("id") || "",
      text: $(heading).text().trim(),
      level: heading.tagName.toLowerCase(),
    }))
    .get();
};

const TOCGenerator: React.FC<TOCGeneratorProps> = ({ content }) => {
  const isMobile = useIsMobile();
  const [loading, setLoading] = useState(true);
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const headings = extractHeadings(content);
    setTocItems(headings);
    setLoading(false);
  }, [content]);

  // Don't render anything if there are no TOC items (even during loading)
  if (!tocItems.length) return null;

  const handleScroll = (id: string) => {
    const targetElement = document.getElementById(id);
    if (targetElement) {
      const offset = 80;
      const targetPosition =
        targetElement.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
      setIsOpen(false);
    }
  };

  const tocContent = loading
    ? new Array(6)
        .fill("")
        .map((_, index) => (
          <div
            key={index}
            className="my-1.5 h-3.5 w-full animate-pulse rounded bg-slate-200"
          />
        ))
    : tocItems.map((item, index) => {
        const isSub = item.level === "h3";
        return (
          <Link
            key={item.id || `toc-item-${index}`}
            to={`#${item.id}`}
            className={[
              "toc-item group flex items-start gap-2 rounded-md px-2 py-1.5 text-sm font-medium no-underline transition-all",
              "hover:text-brand-primary text-slate-800 hover:bg-orange-100",
              isSub ? "ml-4 text-xs font-normal text-slate-700" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            aria-label={`Navigate to ${item.text}`}
            onClick={(e) => {
              e.preventDefault();
              handleScroll(item.id);
            }}
          >
            <span
              className={[
                "mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-300 transition-all",
                "group-hover:bg-brand-primary",
                isSub ? "mt-1.5 bg-orange-200" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            />
            <span className="leading-snug">{item.text}</span>
          </Link>
        );
      });

  return isMobile ? (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTitle className="sr-only">Section Overview</DialogTitle>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          aria-label="Open Section Overview"
          className="fixed inset-x-0 bottom-4 z-[101] mx-auto flex w-[80%] items-center justify-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-medium text-slate-800 shadow-[0_6px_18px_rgba(0,0,0,0.16)] ring-1 ring-orange-200/80 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(true)}
        >
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-orange-100 text-[13px]">
            📋
          </span>
          <span>Section Overview</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-w-[360px] rounded-2xl border border-orange-100 px-3 pb-4 pt-3 shadow-xl focus:outline-none sm:max-w-[420px]"
        aria-describedby={undefined}
      >
        <div className="mb-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-100 text-sm">
              📋
            </span>
            <div className="flex flex-col leading-tight">
              <span className="text-[11px] uppercase tracking-[0.14em] text-orange-500">
                Quick navigation
              </span>
              <DialogTitle className="text-xs font-semibold text-slate-900">
                Section Overview
              </DialogTitle>
            </div>
          </div>
        </div>
        <div className="max-h-80 space-y-0.5 overflow-y-auto pr-1">
          <div
            role="navigation"
            aria-label="Section Overview Links"
            className="flex flex-col gap-0.5"
          >
            {tocContent}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  ) : (
    <div className="rounded border border-orange-100 bg-orange-50 p-4">
      <Accordion className="" type="single" collapsible>
        <AccordionItem value="item-1" className="border-none">
          <AccordionTrigger
            iconStyle="chevron"
            className="flex items-center gap-2 border-none p-0 text-xl font-semibold text-slate-900 focus:outline-none"
            aria-label="Toggle Section Overview"
          >
            <div className="flex flex-col items-start text-2xl leading-tight">
              <span className="text-sm uppercase tracking-[0.16em] text-orange-500">
                On this page
              </span>
              <span>Table of Contents</span>
            </div>
          </AccordionTrigger>
          <AccordionContent
            className="mt-2 space-y-0.5 rounded-xl p-3 text-sm shadow-sm focus:outline-none"
            role="navigation"
            aria-label="Section Overview Links"
          >
            {tocContent}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default memo(TOCGenerator);
