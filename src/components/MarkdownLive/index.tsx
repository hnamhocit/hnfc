import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

export default function MarkdownLive({ value }: { value: string }) {
  if (!value.trim()) return null;

  return (
    <div className="prose prose-sm max-w-none dark:prose-invert">
      <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
        {value}
      </ReactMarkdown>
    </div>
  );
}
