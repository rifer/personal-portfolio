'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  label?: string
  placeholder?: string
  rows?: number
}

export default function MarkdownEditor({
  value,
  onChange,
  label,
  placeholder = 'Write your content in markdown...',
  rows = 6
}: MarkdownEditorProps) {
  const [showPreview, setShowPreview] = useState(false)

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium mb-2">
          {label}
        </label>
      )}

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-2">
        <button
          type="button"
          onClick={() => setShowPreview(false)}
          className={`px-4 py-2 text-sm font-medium ${
            !showPreview
              ? 'border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Write
        </button>
        <button
          type="button"
          onClick={() => setShowPreview(true)}
          className={`px-4 py-2 text-sm font-medium ${
            showPreview
              ? 'border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Preview
        </button>
      </div>

      {/* Markdown Toolbar */}
      {!showPreview && (
        <div className="flex flex-wrap gap-2 mb-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-t border border-b-0 border-gray-300 dark:border-gray-600">
          <ToolbarButton onClick={() => insertMarkdown('**', '**', 'bold text')} title="Bold">
            <strong>B</strong>
          </ToolbarButton>
          <ToolbarButton onClick={() => insertMarkdown('*', '*', 'italic text')} title="Italic">
            <em>I</em>
          </ToolbarButton>
          <ToolbarButton onClick={() => insertMarkdown('[', '](url)', 'link text')} title="Link">
            🔗
          </ToolbarButton>
          <ToolbarButton onClick={() => insertMarkdown('- ', '', 'list item')} title="Bullet List">
            •
          </ToolbarButton>
          <ToolbarButton onClick={() => insertMarkdown('1. ', '', 'list item')} title="Numbered List">
            1.
          </ToolbarButton>
          <ToolbarButton onClick={() => insertMarkdown('`', '`', 'code')} title="Inline Code">
            {'<>'}
          </ToolbarButton>
        </div>
      )}

      {/* Editor or Preview */}
      {showPreview ? (
        <div className="w-full min-h-[150px] px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 prose prose-sm dark:prose-invert max-w-none">
          {value ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
          ) : (
            <p className="text-gray-400 dark:text-gray-500 italic">Nothing to preview</p>
          )}
        </div>
      ) : (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 font-mono text-sm"
        />
      )}

      {/* Help Text */}
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        Supports markdown: **bold**, *italic*, [links](url), lists, code, and more
      </p>
    </div>
  )

  function insertMarkdown(before: string, after: string, placeholder: string) {
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    const replacement = selectedText || placeholder

    const newValue =
      value.substring(0, start) +
      before + replacement + after +
      value.substring(end)

    onChange(newValue)

    // Set cursor position after insertion
    setTimeout(() => {
      textarea.focus()
      const newPosition = start + before.length + replacement.length
      textarea.setSelectionRange(newPosition, newPosition)
    }, 0)
  }
}

function ToolbarButton({ onClick, children, title }: { onClick: () => void, children: React.ReactNode, title: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className="px-2 py-1 text-xs bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
    >
      {children}
    </button>
  )
}
