import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

type MarkdownBodyProps = {
  content: string;
  className?: string;
};

export function MarkdownBody({ content, className }: MarkdownBodyProps) {
  return (
    <div
      className={cn(
        "prose prose-stone max-w-none font-serif dark:prose-invert",
        "prose-p:my-5 prose-p:leading-[1.75]",
        "prose-strong:font-semibold prose-strong:text-foreground",
        "prose-headings:font-serif prose-headings:font-semibold",
        "reader-prose",
        className
      )}
    >
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
