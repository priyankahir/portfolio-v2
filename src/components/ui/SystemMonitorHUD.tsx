"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Activity, Cpu, Database, Wifi } from "lucide-react";

export function SystemMonitorHUD() {
  const [uptime, setUptime] = useState(0);
  const [cpu, setCpu] = useState(12);
  const [mem, setMem] = useState(42);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const uptimeTimer = setInterval(() => setUptime((prev) => prev + 1), 1000);
    const statsTimer = setInterval(() => {
      setCpu(Math.floor(Math.random() * (25 - 8 + 1) + 8));
      setMem(Math.floor(Math.random() * (45 - 40 + 1) + 40));
    }, 3000);

    return () => {
      clearInterval(uptimeTimer);
      clearInterval(statsTimer);
    };
  }, []);

  const formatUptime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  if (!isMounted) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] px-4 py-2 bg-black/80 backdrop-blur-md border-t border-primary/20 flex items-center justify-between pointer-events-none">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-primary animate-pulse" />
          <span className="text-[10px] font-terminal text-secondary uppercase tracking-widest">
            Uptime: <span className="text-primary">{formatUptime(uptime)}</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-primary/70" />
            <div className="w-16 h-1.5 bg-primary/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-primary" 
                animate={{ width: `${cpu}%` }}
                transition={{ duration: 2 }}
              />
            </div>
            <span className="text-[9px] font-terminal text-secondary">{cpu}%</span>
          </div>

          <div className="flex items-center gap-2">
            <Database className="w-3.5 h-3.5 text-primary/70" />
            <div className="w-16 h-1.5 bg-primary/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-primary" 
                animate={{ width: `${mem}%` }}
                transition={{ duration: 2 }}
              />
            </div>
            <span className="text-[9px] font-terminal text-secondary">{mem}%</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Wifi className="w-3.5 h-3.5 text-primary animate-pulse" />
          <span className="text-[10px] font-terminal text-primary uppercase tracking-widest">
            Protocol: <span className="text-primary font-bold">PB.OS_v2.0_SECURE</span>
          </span>
        </div>
        <div className="h-3 w-[1px] bg-primary/20"></div>
        <span className="text-[10px] font-terminal text-secondary">
          SYNC: <span className="text-green-500">STABLE</span>
        </span>
      </div>
    </div>
  );
}
