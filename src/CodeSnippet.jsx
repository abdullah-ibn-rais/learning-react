import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FaCopy, FaCheck } from 'react-icons/fa';

const CodeSnippet = () => {
  const [isCopied, setIsCopied] = useState(false);
  const codeSnippet = `
    import { useState, useEffect } from 'react';

    function UserDataFetcher({ userId }) {
      const [user, setUser] = useState(null);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(\`https://api.example.com/users/\${userId}\`);
            const data = await response.json();
            setUser(data);
          } catch (error) {
            console.error('Fetch error:', error);
          } finally {
            setLoading(false);
          }
        };

        fetchData();
      }, [userId]);

      if (loading) return <div>Loading...</div>;
      if (!user) return <div>User not found</div>;

      return (
        <div className="user-profile">
          <h2>{user.name}</h2>
          <p>Email: {user.email}</p>
          <p>Posts: {user.posts.length}</p>
        </div>
      );
    }
  `;

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(codeSnippet.trim());
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="relative group">
        {/* Enhanced copy button with tooltip */}
        <button
          onClick={handleCopyClick}
          className="absolute top-4 right-4 z-10 p-2 bg-gray-800 hover:bg-gray-700 rounded-md transition-all duration-200 ease-in-out shadow-lg transform hover:scale-105 focus:outline-none"
          aria-label="Copy code"
          data-tooltip-content={isCopied ? "Copied!" : "Copy to clipboard"}
        >
          {isCopied ? (
            <FaCheck className="h-5 w-5 text-green-400" />
          ) : (
            <FaCopy className="h-5 w-5 text-gray-300 hover:text-white" />
          )}
          {/* Tooltip */}
          <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 text-xs font-medium text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            {isCopied ? "Copied!" : "Copy to clipboard"}
          </span>
        </button>
        
        {/* Premium code container */}
        <div className="rounded-lg overflow-hidden shadow-2xl border border-gray-700 bg-gray-900 transition-all duration-300 hover:shadow-3xl">
          {/* Code header bar */}
          <div className="flex items-center px-4 py-3 bg-gray-800 border-b border-gray-700">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="ml-4 text-sm font-mono text-gray-400">
              Example.jsx
            </div>
          </div>
          
          {/* SyntaxHighlighter with custom styling */}
          <SyntaxHighlighter
            language="javascript"
            style={atomDark}
            showLineNumbers
            
            lineProps={{
              style: {
                padding: '0.25rem 1rem',
                fontSize: '0.9rem',
                lineHeight: '1.5',
              }
            }}
            customStyle={{
              margin: 0,
              padding: '1rem 0',
              background: '#1a1a1a',
              borderRadius: '0 0 0.5rem 0.5rem',
              fontSize: '0.9rem',
            }}
            codeTagProps={{
              style: {
                fontFamily: '"Fira Code", "JetBrains Mono", monospace',
                fontWeight: 400,
              }
            }}
          >
            {codeSnippet.trim()}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};

export default CodeSnippet;