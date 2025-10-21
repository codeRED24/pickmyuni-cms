"use client";
import {
  Dialog,
  DialogClose,
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
import { cn } from "@/lib/utils";

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
  return $("h2[id^='toc-'], h3[id^='toc-']")
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
    setTimeout(() => {
      setTocItems(extractHeadings(content));
      setLoading(false);
    }, 500);
  }, [content]);

  if (!tocItems.length && !loading) return null;

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
    ? new Array(10)
        .fill("")
        .map((_, index) => (
          <div
            key={index}
            className="my-2 h-4 w-3/4 animate-pulse rounded bg-gray-300"
          />
        ))
    : tocItems.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className="toc-item text-orange-500 underline flex text-base font-medium md:text-base"
          aria-label={`Navigate to ${item.text}`}
          onClick={(e) => {
            e.preventDefault();
            handleScroll(item.id);
          }}
        >
          {item.text}
        </a>
      ));

  return isMobile ? (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTitle>Section Overview</DialogTitle>
      <DialogTrigger asChild>
        <Button
          variant={"secondary"}
          aria-label="Open Section Overview"
          className="fixed inset-x-0 bottom-4 z-[101] mx-auto flex w-1/2 items-center gap-2"
          onClick={() => setIsOpen(true)}
        >
          📋 <span className="text-sm font-medium">Section Overview</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-w-[340px] rounded-2xl px-2 focus:outline-none sm:max-w-[425px]"
        aria-labelledby="toc-dialog-title"
        aria-describedby={undefined}
      >
        <DialogTitle id="toc-dialog-title" className="sr-only">
          Section Overview
        </DialogTitle>
        <div className="max-h-96 overflow-y-auto">
          <DialogClose
            className="space-y-2 text-left"
            role="navigation"
            aria-label="Section Overview Links"
          >
            {tocContent}
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  ) : (
    <div className="bg-orange-50 p-4">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className="border-b-0">
          <AccordionTrigger
            className={cn(
              "border-0 p-0 text-2xl font-bold focus:outline-none text-[#2C5680] cursor-pointer",
              isOpen ? "border-b-2 pb-0" : ""
            )}
            aria-label="Toggle Section Overview"
          >
            Table of Contents
          </AccordionTrigger>
          <AccordionContent
            className="space-y-2 pt-0 focus:outline-none p-4"
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
