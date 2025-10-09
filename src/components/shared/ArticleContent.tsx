import { processContent } from "@/utils/faqExtract";
import styles from "../../styles/page.module.css";

import { cn } from "@/lib/utils";
import FAQAccordion from "./FAQAccordion";

interface ArticleContentProps {
  content: string;
  className?: string;
}

export default function ArticleContent({
  content,
  className,
}: ArticleContentProps) {
  const { faqs, cleanedHTML } = processContent(content, false); // Enable FAQ processing

  // Generate FAQ Schema for SEO
  const generateFAQSchema = (faqs: any) => {
    if (!faqs || faqs.length === 0) return null;

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq: any) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    );
  };

  return (
    <div className={cn(styles.fontRoboto, className)}>
      <div
        className={styles.styledContent}
      >
        {faqs && faqs.length > 0 && generateFAQSchema(faqs)}
        {cleanedHTML && (
          <div dangerouslySetInnerHTML={{ __html: cleanedHTML }} />
        )}
      </div>
      {faqs && faqs.length > 0 && <FAQAccordion faqs={faqs} />}
    </div>
  );
}
