"use client";

import { Reveal } from "@/components/animations/Reveal";
import { useState } from "react";

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      setTimeout(() => {
        setStatus("idle");
        setFormData({ name: "", email: "", message: "" });
      }, 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 px-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] -z-10 opacity-30 mix-blend-screen" />
      
      <div className="container mx-auto max-w-5xl">
        <Reveal>
          <div className="flex items-center gap-2 mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-semibold text-primary tracking-wide">
              <span className="text-secondary">#</span> communication.protocol
            </h2>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-primary/50 to-transparent ml-4"></div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <Reveal direction="right">
            <div className="terminal-panel p-8 md:p-10 h-full">
              <h3 className="text-2xl font-bold font-heading mb-6 flex items-center gap-2">
                <span className="text-primary">{">"}</span> CONTACT_INFO
              </h3>
              <div className="space-y-6 font-terminal">
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded bg-surface border border-border flex items-center justify-center text-primary group-hover:border-primary transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  </div>
                  <div>
                    <p className="text-xs text-secondary">PHN</p>
                    <p className="font-medium text-foreground">+91 99797-00935</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded bg-surface border border-border flex items-center justify-center text-primary group-hover:border-primary transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  </div>
                  <div>
                    <p className="text-xs text-secondary">EML</p>
                    <p className="font-medium text-foreground">priyankahir333@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded bg-surface border border-border flex items-center justify-center text-primary group-hover:border-primary transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <div>
                    <p className="text-xs text-secondary">LOC</p>
                    <p className="font-medium text-foreground">Ahmedabad, Gujarat, India</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 font-terminal">
                <h4 className="text-sm font-bold mb-4 text-primary">EXTERNAL_LINKS</h4>
                <div className="flex gap-4">
                  <a href="https://linkedin.com/in/priyank-baldaniya" target="_blank" rel="noreferrer" className="px-4 py-2 bg-surface border border-border rounded text-secondary hover:text-primary hover:border-primary transition-colors interactive">
                    [ LINKEDIN ]
                  </a>
                  <a href="#" target="_blank" rel="noreferrer" className="px-4 py-2 bg-surface border border-border rounded text-secondary hover:text-primary hover:border-primary transition-colors interactive">
                    [ GITHUB ]
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.2}>
            <div className="terminal-panel p-8 md:p-10 relative overflow-hidden font-terminal">
              <div className="flex items-center gap-2 mb-8 border-b border-border pb-4">
                <span className="text-secondary">$</span> <span className="text-primary font-bold">./init_connection.sh --secure</span>
              </div>
              
              {status === "sent" ? (
                <div className="flex flex-col items-center justify-center h-[300px] text-center">
                  <span className="text-4xl mb-4">✅</span>
                  <p className="text-primary font-bold text-lg">TRANSMISSION_SUCCESSFUL</p>
                  <p className="text-secondary mt-2">I will process your request shortly.</p>
                </div>
              ) : (
                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-xs font-bold text-secondary flex items-center gap-2">
                      <span className="text-primary">{"[?]"}</span> ENTER_ALIAS
                    </label>
                    <input 
                      type="text" 
                      id="name" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="bg-surface border border-border rounded px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:shadow-[0_0_10px_rgba(37,99,235,0.1)] dark:focus:shadow-[0_0_10px_rgba(0,255,65,0.2)] transition-all interactive placeholder:text-secondary/50" 
                      placeholder="John Doe" 
                      disabled={status !== "idle"}
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-xs font-bold text-secondary flex items-center gap-2">
                      <span className="text-primary">{"[?]"}</span> ENTER_SOURCE_IP
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="bg-surface border border-border rounded px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:shadow-[0_0_10px_rgba(37,99,235,0.1)] dark:focus:shadow-[0_0_10px_rgba(0,255,65,0.2)] transition-all interactive placeholder:text-secondary/50" 
                      placeholder="john@example.com" 
                      disabled={status !== "idle"}
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-xs font-bold text-secondary flex items-center gap-2">
                      <span className="text-primary">{"[?]"}</span> ENTER_PAYLOAD_DATA
                    </label>
                    <textarea 
                      id="message" 
                      rows={4} 
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="bg-surface border border-border rounded px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:shadow-[0_0_10px_rgba(37,99,235,0.1)] dark:focus:shadow-[0_0_10px_rgba(0,255,65,0.2)] transition-all interactive resize-none placeholder:text-secondary/50" 
                      placeholder="Hello, I'd like to talk about..."
                      disabled={status !== "idle"}
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={status !== "idle"}
                    className="mt-2 bg-primary/10 text-primary border border-primary/50 font-bold py-3 rounded hover:bg-primary hover:text-black transition-colors interactive terminal-glow-hover flex items-center justify-center gap-2"
                  >
                    {status === "sending" ? "TRANSMITTING..." : "TRANSMIT_DATA"}
                    {status === "idle" && <span className="animate-blink">_</span>}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
