//@ts-nocheck
"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/radix-accordion";

const FAQAccordion = ({ faqs }) => {
  const [openItem, setOpenItem] = useState(null);

  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <Accordion
        type="single"
        collapsible
        className="w-full"
        value={openItem}
        onValueChange={setOpenItem}
      >
        {faqs.map((faq: any, index: any) => (
          <AccordionItem
            className="faq-item"
            key={index}
            value={`item-${index}`}
          >
            <AccordionTrigger>
              <h4 className={`pr-4 font-semibold`}>{faq.question}</h4>
            </AccordionTrigger>
            <AccordionContent>
              <div>{faq.answer}</div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQAccordion;
