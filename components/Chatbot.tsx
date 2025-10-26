import React, { useState, useRef, useEffect } from 'react';
import { CloseIcon, SendIcon, ChatbotIcon } from './icons';

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  messages: { role: 'user' | 'bot'; content: string }[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  t: any; // translations
  onNavigate: (caseId: string) => void;
  id?: string;
}

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose, messages, onSendMessage, isLoading, t, onNavigate, id }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({
    width: 384, // w-96
    height: Math.min(600, window.innerHeight * 0.6), // h-[60vh] with a max
  });

  const handleMouseDown = (direction: 'top' | 'left') => (e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = dimensions.width;
    const startHeight = dimensions.height;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (direction === 'top') {
        const dy = startY - moveEvent.clientY;
        const newHeight = startHeight + dy;
        const minHeight = 400;
        const maxHeight = window.innerHeight - 120;
        setDimensions(d => ({ ...d, height: Math.min(maxHeight, Math.max(minHeight, newHeight)) }));
      }
      if (direction === 'left') {
        const dx = startX - moveEvent.clientX;
        const newWidth = startWidth + dx;
        const minWidth = 320;
        const maxWidth = window.innerWidth - 50;
        setDimensions(d => ({ ...d, width: Math.min(maxWidth, Math.max(minWidth, newWidth)) }));
      }
    };

    const handleMouseUp = () => {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    document.body.style.cursor = direction === 'top' ? 'ns-resize' : 'ew-resize';
    document.body.style.userSelect = 'none';
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if(isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const renderMessageContent = (content: string) => {
    // Regex to find special markdown-like tags, URLs, and bold text.
    // The URL part is crafted to avoid including common trailing punctuation.
    const regex = /(\[link:.*?\|.*?\]|\[image:.*?\]|\bhttps?:\/\/[^\s,.)\]!]+|\*\*.*?\*\*)/g;
    const elements: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(content)) !== null) {
      // Add any plain text that precedes the current match.
      if (match.index > lastIndex) {
        elements.push(content.substring(lastIndex, match.index));
      }

      const part = match[0];
      const key = `match-${match.index}`;

      // Handle [link:text|caseId] for in-app navigation.
      if (part.startsWith('[link:')) {
        const [, text, caseId] = part.match(/^\[link:(.*?)\|(.*?)\]$/)!;
        elements.push(
          <button
            key={key}
            onClick={() => onNavigate(caseId)}
            className="inline-block bg-blue-100 text-blue-800 font-semibold px-2 py-1 text-sm rounded-md hover:bg-blue-200 transition-colors mx-1"
          >
            {text}
          </button>
        );
      }
      // Handle [image:url] to display images.
      else if (part.startsWith('[image:')) {
        const [, url] = part.match(/^\[image:(.*?)\]$/)!;
        elements.push(
          <div key={key} className="my-2 rounded-lg overflow-hidden border border-slate-200 w-fit max-w-[200px]">
            <img src={url} alt={t.image_alt || "Image"} className="w-full h-auto" />
          </div>
        );
      }
      // Handle **bold text**.
      else if (part.startsWith('**') && part.endsWith('**')) {
        elements.push(<strong key={key}>{part.slice(2, -2)}</strong>);
      }
      // Handle standard http/https URLs.
      else if (part.startsWith('http')) {
        const title = part;
        let displayContent: React.ReactNode;
        try {
          const urlObject = new URL(part);
          const hostname = urlObject.hostname;
          if (hostname.includes('nobelbiocare.com')) {
            const isVideo = part.toLowerCase().includes('video');
            const label = isVideo ? 'Video:' : 'Web:';
            displayContent = <span>{label} <span className="font-semibold">{hostname}</span></span>;
          } else {
            displayContent = hostname;
          }
        } catch (e) {
          displayContent = part;
        }
        elements.push(
          <a href={part} key={key} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline" title={title}>
            {displayContent}
          </a>
        );
      }
      // Fallback for any other matched part (shouldn't happen with current regex).
      else {
        elements.push(part);
      }

      lastIndex = regex.lastIndex;
    }

    // Add any remaining text after the last match.
    if (lastIndex < content.length) {
      elements.push(content.substring(lastIndex));
    }

    return elements.map((el, i) => <React.Fragment key={i}>{el}</React.Fragment>);
};


  if (!isOpen) {
    return null;
  }

  return (
    <div 
      id={id}
      style={{ width: dimensions.width, height: dimensions.height }}
      className="fixed bottom-24 right-6 bg-white rounded-lg shadow-2xl flex flex-col border border-slate-200 z-50 animate-simple-fade-in" 
      role="dialog" 
      aria-labelledby="chatbot-title"
    >
      <div onMouseDown={handleMouseDown('top')} className="absolute -top-1 left-0 w-full h-2 cursor-ns-resize" />
      <div onMouseDown={handleMouseDown('left')} className="absolute top-0 -left-1 w-2 h-full cursor-ew-resize" />
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50 rounded-t-lg flex-shrink-0 cursor-default">
        <div className="flex items-center gap-3">
          <ChatbotIcon className="h-6 w-6 text-[color:var(--accent-primary)]" />
          <h2 id="chatbot-title" className="text-lg font-semibold text-[color:var(--text-primary)]">{t.title}</h2>
        </div>
        <button
          onClick={onClose}
          className="p-1 text-slate-500 rounded-full hover:bg-slate-200 hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[color:var(--accent-primary)]"
          aria-label="Close chat"
        >
          <CloseIcon className="w-5 h-5" />
        </button>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[80%] px-4 py-2 rounded-xl ${
                message.role === 'user'
                  ? 'bg-[color:var(--accent-primary)] text-white'
                  : 'bg-slate-100 text-slate-800'
              }`}
            >
               <div className="text-sm whitespace-pre-wrap">
                {message.role === 'bot' ? renderMessageContent(message.content) : message.content}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="px-4 py-2 rounded-xl bg-slate-100 text-slate-800">
                <div className="flex items-center space-x-2">
                    <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce"></span>
                </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <footer className="p-4 border-t border-slate-200 flex-shrink-0">
        <form onSubmit={handleSend} className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.input_placeholder}
            className="flex-1 h-10 px-3 text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-primary)] disabled:bg-slate-100"
            disabled={isLoading}
            aria-label="Chat input"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-[color:var(--accent-primary)] text-white rounded-md hover:bg-[color:var(--accent-primary-hover)] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[color:var(--accent-primary)] disabled:bg-slate-300 disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            <SendIcon className="h-5 w-5" />
          </button>
        </form>
      </footer>
    </div>
  );
};

export default Chatbot;
