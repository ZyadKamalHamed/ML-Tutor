import { useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-typescript';

interface CodeBlockProps {
  code: string;
  language?: 'python' | 'sql' | 'typescript' | 'javascript';
  className?: string;
}

export function CodeBlock({ code, language = 'python', className = '' }: CodeBlockProps) {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code, language]);

  return (
    <div className={`relative rounded-lg overflow-hidden ${className}`}>
      <pre className="!m-0 !bg-gray-900">
        <code ref={codeRef} className={`language-${language}`}>
          {code}
        </code>
      </pre>
    </div>
  );
}
