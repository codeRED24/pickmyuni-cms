//@ts-nocheck
import { useInput, useGetIdentity } from "ra-core";
import JoditEditor, { Jodit } from "jodit-react";
import { useRef, useMemo } from "react";

const configureFaqPlugin = (jodit: any) => {
  // Add control definition for the FAQ button
  jodit.options.controls.faq = {
    icon: "📝", // Simple icon
    tooltip: "Insert FAQ Item",
    exec: (editor: any) => {
      // HTML to insert at cursor position
      const faqHTML = `<div class="faq-item">
        <h4>What's your question?</h4>
        <p>Your answer goes here.</p>
      </div>
      <br />`;
      editor.s.insertHTML(faqHTML);
    },
  };
};

const configureClearCssPlugin = (jodit: any) => {
  jodit.options.controls.clearCss = {
    icon: "🧹",
    tooltip: "Clear CSS & Styles",
    exec: (editor: any) => {
      const currentHtml = editor.getEditorValue();
      let cleanedHtml = currentHtml
        .replace(/ style="[^"]*"/gi, "")
        .replace(/ class="[^"]*"/gi, "");
      cleanedHtml = cleanedHtml.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "");
      editor.setEditorValue(cleanedHtml);
    },
  };
};

// Register the plugin
if (typeof Jodit !== "undefined") {
  Jodit.plugins.add("faq", configureFaqPlugin);
  Jodit.plugins.add("clearCss", configureClearCssPlugin);
}

const JoditInput = (props: any) => {
  const { field } = useInput(props);
  const { identity, isLoading } = useGetIdentity();
  const editor = useRef(null);

  // Memoize config to prevent unnecessary re-renders
  const config = useMemo(() => {
    // Start from Jodit's default options if available
    const defaultOptions =
      (Jodit && (Jodit.defaultOptions || (Jodit as any).defaults)) || {};

    // Normalize default buttons into an array if possible
    const defaultButtonsRaw =
      defaultOptions.buttons || defaultOptions.toolbar || [];
    const normalizeButtons = (b: any): string[] => {
      if (!b) return [];
      if (Array.isArray(b))
        return b.flatMap((g) => (Array.isArray(g) ? g : [g]));
      if (typeof b === "string") return b.split(" ").filter(Boolean);
      return [];
    };

    const defaultButtons = normalizeButtons(defaultButtonsRaw);

    // Merge default buttons and our custom insertFAQ, avoiding duplicates
    const buttons = Array.from(new Set([...defaultButtons, "faq", "clearCss"]));

    // Preserve any default extraPlugins
    const defaultExtra = defaultOptions.extraPlugins || [];
    const extraPlugins = Array.from(
      new Set([
        ...(Array.isArray(defaultExtra) ? defaultExtra : [defaultExtra]),
        "faq",
        "clearCss",
      ])
    );

    return {
      // spread defaults so we don't lose other settings
      ...defaultOptions,
      readonly: false,
      toolbarAdaptive: true,
      // Jodit supports `buttons` as space-separated string or array; provide array
      buttons,
      extraPlugins,
    };
  }, []);

  // allowed roles who can see/edit the content field
  const allowed = ["admin", "content_writer", "team_lead"];

  // while identity is loading, don't render the editor to avoid flicker
  if (isLoading) return null;

  // hide the editor for roles not in the allowed list
  if (!identity || !allowed.includes(identity?.role)) return null;

  return (
    <JoditEditor
      ref={editor}
      value={field.value}
      config={config}
      onBlur={() => {}}
      onChange={(newContent) => field.onChange(newContent)}
    />
  );
};

export default JoditInput;
