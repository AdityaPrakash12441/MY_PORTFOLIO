"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import MenuBar from "@/components/MenuBar";
import Dock from "@/components/Dock";
import DesktopIcon from "@/components/DesktopIcon";
import TerminalWindow from "@/components/TerminalWindow";
import styles from "./page.module.css";
import BubbleText from "@/components/BubbleText";
import ContactCard from "@/components/Contactcard";
import Gallery from '@/components/Gallery';
import SafariWindow from '@/components/SafariWindow';
import ChatWindow from '@/components/ChatWindow';
import { Lacquer, Aubrey } from "next/font/google";
import Portfolio from "@/components/Portfolio";
import { useRouter } from "next/navigation";
import Draggable from 'react-draggable';

const lacquer = Lacquer({
  subsets: ["latin"],
  weight: "400",
});

const aubrey = Aubrey({
  subsets: ["latin"],
  weight: "400",
});

export default function Home() {
  const router = useRouter();
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isSafariOpen, setIsSafariOpen] = useState(false);
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <main className={styles.main}>
      <style>{`
        @keyframes windowFadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .window-animate {
          animation: windowFadeIn 0.25s cubic-bezier(0.34, 1.3, 0.64, 1) forwards;
        }
      `}</style>

      <Image
        src="/images/fuji_wallpaper.jpg"
        alt="Mount Fuji Wallpaper"
        fill
        className={`${styles.wallpaper} hidden md:block`}
        priority
        unoptimized
        onClick={() => setIsPortfolioOpen(true)}
      />
      <div className="hidden md:block">
        <MenuBar
          onOpenPortfolio={() => setIsPortfolioOpen(true)}
          onOpenContact={() => setIsContactOpen(true)}
        />
      </div>

      <div className={`${styles.desktopArea} hidden md:flex`}>
        <div className={styles.iconGrid}>
          <DraggableIcon>
            <DesktopIcon label="DPI Engine" onClick={() => { window.open("https://github.com/AdityaPrakash12441/Packet_analyzer", "_blank") }} />
          </DraggableIcon>
          <DraggableIcon>
            <DesktopIcon label="RECALL DSA" onClick={() => { window.open("https://github.com/AdityaPrakash12441/RAGPLAYLIST", "_blank") }} />
          </DraggableIcon>
        </div>
        <div className={styles.iconGrid}>
          <DraggableIcon>
            <DesktopIcon label="Resume.pdf" iconPath="/images/pdf.png" onClick={() => { window.open("/files/resume.pdf", "_blank") }} />
          </DraggableIcon>
        </div>

        <div className={styles.windowArea} style={{ position: 'relative' }}>
          {/* Welcome Text in background - slightly dims when a window is focused/open */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 0,
            opacity: (isTerminalOpen || isGalleryOpen || isContactOpen || isSafariOpen || isPortfolioOpen || isChatOpen) ? 0.25 : 1,
            transform: (isTerminalOpen || isGalleryOpen || isContactOpen || isSafariOpen || isPortfolioOpen || isChatOpen) ? 'scale(0.95)' : 'scale(1)',
            transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
          }}>
            <BubbleText className={`${aubrey.className} ${styles.welcomeTextSmall}`}>Hey, I'm Aditya! welcome to my</BubbleText>
            <BubbleText className={`${lacquer.className} ${styles.welcomeTextLarge}`}>portfolio</BubbleText>
          </div>


          {/* Floating Terminal Window */}
          {isTerminalOpen && (
            <DraggableWindow zIndex={50}>
              <TerminalWindow onClose={() => setIsTerminalOpen(false)} />
            </DraggableWindow>
          )}

          {/* Floating Gallery Window */}
          {isGalleryOpen && (
            <DraggableWindow zIndex={40}>
              <Gallery onClose={() => setIsGalleryOpen(false)} />
            </DraggableWindow>
          )}

          {/* Floating Contact Window */}
          {isContactOpen && (
            <DraggableWindow zIndex={45}>
              <ContactCard onClose={() => setIsContactOpen(false)} />
            </DraggableWindow>
          )}

          {/* Floating Safari Window */}
          {isSafariOpen && (
            <DraggableWindow zIndex={35}>
              <SafariWindow onClose={() => setIsSafariOpen(false)} />
            </DraggableWindow>
          )}

          {/* Floating Portfolio Window */}
          {isPortfolioOpen && (
            <DraggableWindow zIndex={60}>
              <Portfolio onClose={() => setIsPortfolioOpen(false)} onOpenChat={() => setIsChatOpen(true)} />
            </DraggableWindow>
          )}

          {/* Floating Chat Window */}
          {isChatOpen && (
            <DraggableWindow zIndex={65}>
              <ChatWindow onClose={() => setIsChatOpen(false)} />
            </DraggableWindow>
          )}
        </div>
      </div>

      <div className="hidden md:block">
        <Dock
          onOpenFinder={() => setIsPortfolioOpen((prev) => !prev)}
          onOpenTerminal={() => setIsTerminalOpen((prev) => !prev)}
          onOpenGallery={() => setIsGalleryOpen((prev) => !prev)}
          onOpenContact={() => setIsContactOpen((prev) => !prev)}
          onOpenSafari={() => setIsSafariOpen((prev) => !prev)}
          onOpenChat={() => setIsChatOpen((prev) => !prev)}
          isFinderOpen={isPortfolioOpen}
          isTerminalOpen={isTerminalOpen}
          isGalleryOpen={isGalleryOpen}
          isContactOpen={isContactOpen}
          isSafariOpen={isSafariOpen}
          isChatOpen={isChatOpen}
        />
      </div>

      {/* Mobile only standalone portfolio view */}
      <div className="md:hidden w-full h-[100dvh] absolute inset-0 z-[10000] bg-[#0a0a0f]">
        <Portfolio onOpenChat={() => setIsChatOpen(true)} />
        {isChatOpen && (
          <div className="absolute inset-0 z-[10001] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <ChatWindow onClose={() => setIsChatOpen(false)} />
          </div>
        )}
      </div>
    </main>
  );
}

const DraggableIcon = ({ children }: { children: React.ReactNode }) => {
  const nodeRef = useRef(null);
  return (
    <Draggable nodeRef={nodeRef}>
      <div ref={nodeRef} style={{ display: 'inline-block' }}>
        {children}
      </div>
    </Draggable>
  );
};

const DraggableWindow = ({ children, zIndex, width }: { children: React.ReactNode, zIndex: number, width?: string }) => {
  const nodeRef = useRef(null);
  return (
    <Draggable nodeRef={nodeRef} handle=".window-handle">
      <div ref={nodeRef} style={{ position: 'absolute', zIndex, width }}>
        <div className="window-animate">
          {children}
        </div>
      </div>
    </Draggable>
  );
};
