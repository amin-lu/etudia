import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/atom-one-dark.css'

interface MarkdownProps {
  children: string
}

export function Markdown({ children }: MarkdownProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
      components={{
        h1: ({ node, ...props }) => (
          <h1 className="text-3xl font-bold mb-4 mt-6" {...props} />
        ),
        h2: ({ node, ...props }) => (
          <h2 className="text-2xl font-bold mb-3 mt-5" {...props} />
        ),
        h3: ({ node, ...props }) => (
          <h3 className="text-xl font-bold mb-2 mt-4" {...props} />
        ),
        p: ({ node, ...props }) => (
          <p className="mb-3 leading-relaxed" {...props} />
        ),
        ul: ({ node, ...props }) => (
          <ul className="list-disc list-inside mb-3 space-y-1" {...props} />
        ),
        ol: ({ node, ...props }) => (
          <ol className="list-decimal list-inside mb-3 space-y-1" {...props} />
        ),
        li: ({ node, ...props }) => (
          <li className="ml-2" {...props} />
        ),
        code: ({ node, ...props }: any) =>
          props.inline ? (
            <code className="bg-zinc-800 px-1.5 py-0.5 rounded text-sm" {...props} />
          ) : (
            <code className="block bg-zinc-800 p-3 rounded-lg overflow-x-auto mb-3" {...props} />
          ),
        pre: ({ node, ...props }) => (
          <pre className="bg-zinc-800 p-3 rounded-lg overflow-x-auto mb-3" {...props} />
        ),
        blockquote: ({ node, ...props }) => (
          <blockquote
            className="border-l-4 border-indigo-500 pl-4 italic my-3"
            {...props}
          />
        ),
        a: ({ node, ...props }) => (
          <a className="text-indigo-400 hover:underline" {...props} />
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  )
}
