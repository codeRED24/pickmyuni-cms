import { processContent } from "@/utils/faqExtract";
import styles from "../../styles/page.module.css";

import { cn } from "@/lib/utils";
import FAQAccordion from "./FAQAccordion";
import TocGenerator from "../admin/TocGenerator";

interface ArticleContentProps {
  content: string;
  className?: string;
}

export default function ArticleContent({
  content,
  className,
}: ArticleContentProps) {
  const { faqs, cleanedHTML } = processContent(content, false);

  return (
    <div className={cn(styles.fontRoboto, className)}>
      <TocGenerator content={cleanedHTML} />
      <div
        className={`styledContent ${styles.styledContent} prose prose-lg max-w-none`}
        dangerouslySetInnerHTML={{ __html: cleanedHTML }}
      />
      {faqs && faqs.length > 0 && <FAQAccordion faqs={faqs} />}
    </div>
  );
}
