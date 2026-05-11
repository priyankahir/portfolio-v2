"use client";

import { Reveal } from "@/components/animations/Reveal";
import { useState } from "react";
import { developerDetails } from "@/data/developer";
import { GitCompareArrows, Link, Mail, MapPin, MessageSquare, Phone, Copy, Check } from "lucide-react";
import { SiGithub } from "react-icons/si";

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const copyToClipboard = (text: string, type: "email" | "phone") => {
    navigator.clipboard.writeText(text);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    
    // Simulate system verification
    console.log("Verifying communication channel...");
    
    // Construct mailto link
    const subject = `[PB.OS INQUIRY] from ${formData.name}`;
    const body = `--- SYSTEM_ENCRYPTED_MESSAGE ---%0D%0A%0D%0A[SOURCE]: ${formData.name} (${formData.email})%0D%0A[PAYLOAD]:%0D%0A%0D%0A${formData.message}%0D%0A%0D%0A--- END_MESSAGE ---`;
    const mailtoUrl = `mailto:${developerDetails.email}?subject=${encodeURIComponent(subject)}&body=${body}`;
    
    // Attempt to open email client
    try {
      const mailtoWindow = window.open(mailtoUrl, "_blank");
      if (!mailtoWindow || mailtoWindow.closed || typeof mailtoWindow.closed === "undefined") {
        window.location.href = mailtoUrl;
      }
    } catch (e) {
      window.location.href = mailtoUrl;
    }

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <Reveal direction="right">
            <div className="terminal-panel p-6 sm:p-8 md:p-10 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold font-heading mb-8 flex items-center gap-2">
                  <span className="text-primary">{">"}</span> CONTACT_INFO
                </h3>
                <div className="space-y-6 font-terminal">
                  <div className="flex items-center justify-between group">
                    <a href={developerDetails.socials.whatsapp} target="_blank" rel="noreferrer" className="flex items-center gap-4 flex-1">
                      <div className="w-10 h-10 shrink-0 rounded bg-surface border border-border flex items-center justify-center text-primary group-hover:border-primary group-hover:bg-primary/5 transition-all">
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] text-secondary uppercase tracking-tighter">WhatsApp</p>
                        <p className="font-medium text-foreground group-hover:text-primary transition-colors break-all sm:break-normal">{developerDetails.phone}</p>
                      </div>
                    </a>
                    <button 
                      onClick={() => copyToClipboard(developerDetails.phone, "phone")}
                      className="p-2 text-secondary hover:text-primary transition-colors shrink-0"
                      title="Copy phone number"
                    >
                      {copiedPhone ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between group">
                    <a href={`mailto:${developerDetails.email}`} className="flex items-center gap-4 flex-1">
                      <div className="w-10 h-10 shrink-0 rounded bg-surface border border-border flex items-center justify-center text-primary group-hover:border-primary group-hover:bg-primary/5 transition-all">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] text-secondary uppercase tracking-tighter">Email</p>
                        <p className="font-medium text-foreground group-hover:text-primary transition-colors break-all sm:break-normal">{developerDetails.email}</p>
                      </div>
                    </a>
                    <button 
                      onClick={() => copyToClipboard(developerDetails.email, "email")}
                      className="p-2 text-secondary hover:text-primary transition-colors shrink-0"
                      title="Copy email address"
                    >
                      {copiedEmail ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 shrink-0 rounded bg-surface border border-border flex items-center justify-center text-primary group-hover:border-primary transition-all">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-secondary uppercase tracking-tighter">Location</p>
                      <p className="font-medium text-foreground">{developerDetails.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 font-terminal">
                <h4 className="text-[10px] font-bold mb-4 text-primary uppercase tracking-widest">EXTERNAL_LINKS</h4>
                <div className="flex flex-wrap gap-4">
                  <a href={developerDetails.socials.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded text-secondary hover:text-primary hover:border-primary transition-all interactive text-xs">
                    <Link className="w-4 h-4" /> [ LINKEDIN ]
                  </a>
                  <a href={developerDetails.socials.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded text-secondary hover:text-primary hover:border-primary transition-all interactive text-xs">
                    <GitCompareArrows className="w-4 h-4" /> [ GITHUB ]
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
                <div className="flex flex-col items-center justify-center h-[300px] text-center animate-in fade-in zoom-in duration-500">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 border border-primary/20">
                    <span className="text-2xl">✓</span>
                  </div>
                  <p className="text-primary font-bold text-lg">TRANSMISSION_SUCCESSFUL</p>
                  <p className="text-secondary mt-2 text-sm">Opening your email client...</p>
                </div>
              ) : (
                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-[10px] font-bold text-secondary flex items-center gap-2 uppercase tracking-tighter">
                      <span className="text-primary">{"[?]"}</span> ENTER_ALIAS
                    </label>
                    <input 
                      type="text" 
                      id="name" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="bg-surface/50 border border-border rounded px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:shadow-[0_0_10px_rgba(0,255,65,0.1)] transition-all interactive placeholder:text-secondary/30 text-sm" 
                      placeholder="Your Name" 
                      disabled={status !== "idle"}
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-[10px] font-bold text-secondary flex items-center gap-2 uppercase tracking-tighter">
                      <span className="text-primary">{"[?]"}</span> ENTER_SOURCE_EMAIL
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="bg-surface/50 border border-border rounded px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:shadow-[0_0_10px_rgba(0,255,65,0.1)] transition-all interactive placeholder:text-secondary/30 text-sm" 
                      placeholder="your@email.com" 
                      disabled={status !== "idle"}
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-[10px] font-bold text-secondary flex items-center gap-2 uppercase tracking-tighter">
                      <span className="text-primary">{"[?]"}</span> ENTER_PAYLOAD_DATA
                    </label>
                    <textarea 
                      id="message" 
                      rows={4} 
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="bg-surface/50 border border-border rounded px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:shadow-[0_0_10px_rgba(0,255,65,0.1)] transition-all interactive resize-none placeholder:text-secondary/30 text-sm" 
                      placeholder="What's on your mind?"
                      disabled={status !== "idle"}
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={status !== "idle"}
                    className="mt-2 bg-primary/10 text-primary border border-primary/50 font-bold py-4 rounded hover:bg-primary hover:text-black transition-all interactive terminal-glow-hover flex items-center justify-center gap-3 group"
                  >
                    {status === "sending" ? "TRANSMITTING..." : "TRANSMIT_DATA"}
                    {status === "idle" && <span className="animate-blink group-hover:text-black">_</span>}
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
