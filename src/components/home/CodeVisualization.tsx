"use client";

export function CodeVisualization() {
  const codeString = `const developer = {
  name: "Priyank Baldaniya",
  role: "Frontend Developer",
  experience: "1.4+ Years",
  stack: [
    "React.js",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion"
  ],
  location: "Ahmedabad, Gujarat",
  status: "Available for new opportunities",
  execute() {
    return this.buildScalableApps();
  }
};`;

  return (
    <section className="py-20 px-4 border-y border-border/50 bg-surface/30">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-2xl font-heading text-primary mb-8 flex items-center gap-2">
          <span className="text-secondary">#</span> developer.config.ts
        </h2>

        <div className="terminal-panel rounded-md shadow-2xl overflow-hidden border border-border">
          {/* Editor Header */}
          <div className="bg-black border-b border-border p-2 flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <span className="text-secondary text-xs ml-2 font-terminal">developer.ts — PB.OS Editor</span>
            </div>
            <div className="flex gap-4 text-xs font-terminal text-gray-500 mr-2">
              <span>UTF-8</span>
              <span>TypeScript</span>
            </div>
          </div>
          
          {/* Editor Content */}
          <div className="p-4 overflow-x-auto bg-[#050505]">
            <pre className="font-terminal text-sm leading-relaxed">
              <code>
                {codeString.split("\\n").map((line, i) => (
                  <div key={i} className="table-row">
                    <span className="table-cell text-gray-600 select-none pr-4 text-right border-r border-border/50 w-8">{i + 1}</span>
                    <span className="table-cell pl-4 text-gray-300">
                      {/* Very basic syntax highlighting simulation */}
                      {line.includes('const') ? (
                        <><span className="text-blue-400">const</span> {line.replace('const', '')}</>
                      ) : line.includes('name:') ? (
                        <><span className="text-cyan-400">name</span>: <span className="text-green-400">&quot;Priyank Baldaniya&quot;</span>,</>
                      ) : line.includes('role:') ? (
                        <><span className="text-cyan-400">role</span>: <span className="text-green-400">&quot;Frontend Developer&quot;</span>,</>
                      ) : line.includes('experience:') ? (
                        <><span className="text-cyan-400">experience</span>: <span className="text-green-400">&quot;1.4+ Years&quot;</span>,</>
                      ) : line.includes('stack:') ? (
                        <><span className="text-cyan-400">stack</span>: [</>
                      ) : line.includes('location:') ? (
                        <><span className="text-cyan-400">location</span>: <span className="text-green-400">&quot;Ahmedabad, Gujarat&quot;</span>,</>
                      ) : line.includes('status:') ? (
                        <><span className="text-cyan-400">status</span>: <span className="text-green-400">&quot;Available for new opportunities&quot;</span>,</>
                      ) : line.includes('execute()') ? (
                        <><span className="text-yellow-400">execute</span>() {"{"}</>
                      ) : line.includes('return') ? (
                        <><span className="text-blue-400">return</span> <span className="text-red-400">this</span>.buildScalableApps();</>
                      ) : line.includes('"') ? (
                        <><span className="text-green-400">{line.trim().replace(',', '')}</span>{line.includes(',') ? ',' : ''}</>
                      ) : (
                        line
                      )}
                    </span>
                  </div>
                ))}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
