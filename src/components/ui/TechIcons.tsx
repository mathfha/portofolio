import React from "react";
import {
  siLinux,
  siDocker,
  siAnsible,
  siNginx,
  siBurpsuite,
  siGo,
  siPython,
  siPhp,
  siLaravel,
  siGnubash,
  siWireshark,
  siC,
  siJavascript,
} from "simple-icons";

interface IconProps {
  className?: string;
}

export function LinuxIcon({ className = "w-8 h-8" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="#FCC624" className={className} aria-label="Linux">
      <path d={siLinux.path} />
    </svg>
  );
}

export function DockerIcon({ className = "w-8 h-8" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="#2496ED" className={className} aria-label="Docker">
      <path d={siDocker.path} />
    </svg>
  );
}

export function AnsibleIcon({ className = "w-8 h-8" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="#EE0000" className={className} aria-label="Ansible">
      <path d={siAnsible.path} />
    </svg>
  );
}

export function BurpSuiteIcon({ className = "w-8 h-8" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="#FF6633" className={className} aria-label="Burp Suite">
      <path d={siBurpsuite.path} />
    </svg>
  );
}

export function NmapIcon({ className = "w-8 h-8" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="#2A52BE" className={className} aria-label="Nmap">
      <circle cx="24" cy="24" r="20" strokeWidth="2.5" />
      <circle cx="24" cy="24" r="13" strokeWidth="1.8" strokeDasharray="3 3" opacity="0.8" />
      <circle cx="24" cy="24" r="6" strokeWidth="1.8" />
      <path d="M24 4v40M4 24h40" strokeWidth="1.8" strokeOpacity="0.5" />
      <path d="M24 24l14-14" strokeWidth="2.5" strokeLinecap="round" stroke="#00E5FF" />
      <circle cx="38" cy="10" r="2.5" fill="#00E5FF" />
    </svg>
  );
}

export function GhidraIcon({ className = "w-8 h-8" }: IconProps) {
  return (
    <img
      src="/ghidra.svg"
      alt="Ghidra"
      draggable={false}
      className={`${className} object-contain transition-transform pointer-events-none select-none`}
    />
  );
}

export function NginxIcon({ className = "w-8 h-8" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="#009639" className={className} aria-label="Nginx">
      <path d={siNginx.path} />
    </svg>
  );
}

export function WiresharkIcon({ className = "w-8 h-8" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="#1679A7" className={className} aria-label="Wireshark">
      <path d={siWireshark.path} />
    </svg>
  );
}

export function CIcon({ className = "w-8 h-8" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="#00599C" className={className} aria-label="C Language">
      <path d={siC.path} />
    </svg>
  );
}

export function JavaScriptIcon({ className = "w-8 h-8" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="#F7DF1E" className={className} aria-label="JavaScript">
      <path d={siJavascript.path} />
    </svg>
  );
}

export function GoIcon({ className = "w-8 h-8" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="#00ADD8" className={className} aria-label="Go">
      <path d={siGo.path} />
    </svg>
  );
}

export function PythonIcon({ className = "w-8 h-8" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="Python">
      <defs>
        <linearGradient id="python-blue-yellow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="35%" stopColor="#3776AB" />
          <stop offset="65%" stopColor="#FFD43B" />
        </linearGradient>
      </defs>
      <path fill="url(#python-blue-yellow)" d={siPython.path} />
    </svg>
  );
}

export function PhpIcon({ className = "w-8 h-8" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="#777BB4" className={className} aria-label="PHP">
      <path d={siPhp.path} />
    </svg>
  );
}

export function LaravelIcon({ className = "w-8 h-8" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="#FF2D20" className={className} aria-label="Laravel">
      <path d={siLaravel.path} />
    </svg>
  );
}

export function BashIcon({ className = "w-8 h-8" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="#4EAA25" className={className} aria-label="GNU Bash">
      <path d={siGnubash.path} />
    </svg>
  );
}
