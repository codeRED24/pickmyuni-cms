import { load } from "cheerio";

interface FAQ {
  question: string;
  answer: string;
  id: number;
}

// Parse the HTML content to extract FAQ pairs and clean HTML
export const processContent = (htmlContent: string, fromFaq = false) => {
  if (!htmlContent) {
    return {
      faqs: [],
      cleanedHTML: "",
      heading: undefined,
    };
  }
  const $ = load(htmlContent);

  let heading: string | undefined;

  const faqItemSelector = ".faq-item, [class_name='faq-item']";
  const subTitleSelector = ".sub-title, [class_name='sub-title']";

  //extract heading - only the one just before first faq-item
  if (fromFaq) {
    const firstFaqItem = $(faqItemSelector).first();
    if (firstFaqItem.length > 0) {
      // Find the subtitle that immediately precedes the first FAQ item
      const headingElement = firstFaqItem.prevAll(subTitleSelector).first();
      heading = headingElement.text().trim();
      headingElement.remove();
    }
  }

  // Find all faq-item divs

  const faqItems = $(faqItemSelector);
  const faqs: FAQ[] = [];
  //@ts-ignore
  faqItems.each((i, element) => {
    const h4Count = $(element).find("h4").length;
    const pCount = $(element).find("p").length;
    if (h4Count === 1 && pCount === 1) {
      const question = $(element).find("h4").text().trim();
      const answer = $(element).find("p").text().trim();
      if (question && answer) {
        faqs.push({
          question,
          answer,
          id: faqs.length, // Use current length for unique ID
        });
      }
    }
  });

  // Remove FAQ items from the document for clean HTML rendering
  faqItems.remove();

  // Get the cleaned HTML without FAQ items
  const cleanedHTML = $("body").html() || "";

  return {
    faqs,
    cleanedHTML,
    heading,
  };
};
