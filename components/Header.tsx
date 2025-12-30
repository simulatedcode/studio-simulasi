"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const toggleMenu = () => {
    if (isMenuOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsMenuOpen(false);
        setIsClosing(false);
      }, 400); // Match animation duration
    } else {
      setIsMenuOpen(true);
    }
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (isMenuOpen) return;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          if (currentScrollY < 10) {
            setIsVisible(true);
          } else if (currentScrollY > lastScrollY && currentScrollY > 80) {
            // Scrolling down
            setIsVisible(false);
          } else if (currentScrollY < lastScrollY) {
            // Scrolling up
            setIsVisible(true);
          }

          lastScrollY = currentScrollY;
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const swup = (window as any).swup;
    const handlePageChange = () => {
      setIsMenuOpen(false);
      setIsClosing(false);
      setIsVisible(true);
    };

    if (swup && swup.hooks) {
      swup.hooks.on('animation:in:start', handlePageChange);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (swup && swup.hooks) swup.hooks.off('animation:in:start', handlePageChange);
    };
  }, [isMenuOpen]);

  return (
    <div
      className={`w-full max-w-screen-3xl mx-auto items-center bg-studio-50 sticky top-0 z-50 transition-transform duration-300 ${(isMenuOpen || isClosing) ? "translate-y-0" : isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
    >
      <div className="px-10 w-full h-full items-center">
        <div className="flex items-center justify-between h-20 w-full max-w-content mx-auto">
          {/* Logo */}
          <div className="z-50 relative flex items-center h-4">
            <Link href="/" className="text-xl font-black tracking-tighter text-studio-950">
              SIMULASI Studio
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 items-center text-lg font-medium ">
            <Link href="/work" className="hover:text-studio-400 text-studio-900 transition-colors">Work</Link>
            <Link href="/process" className="hover:text-studio-400 text-studio-900 transition-colors">Process</Link>
            <Link href="/design" className="hover:text-studio-400 text-studio-900 transition-colors">Design</Link>
            <Link href="/about" className="hover:text-studio-400 text-studio-900 transition-colors">About</Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className={`md:hidden z-50 p-2 -mr-2 transition-colors duration-300 focus:outline-none ${isMenuOpen ? "text-studio-50" : "text-studio-200 hover:text-studio-400"}`}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Overlay - Moved outside constrained containers */}
      {(isMenuOpen || isClosing) && (
        <div className={`fixed inset-0 bg-studio-600 z-40 h-screen flex flex-col justify-between p-10 md:hidden pt-32 text-studio-50 ${isClosing ? "animate-menu-slide-out" : "animate-menu-slide-right"}`}>
          <nav className="flex flex-col items-start gap-2 text-4xl font-bold">
            <Link href="/#work" onClick={toggleMenu} className="hover:text-studio-400 transition-colors">Work</Link>
            <Link href="/#process" onClick={toggleMenu} className="hover:text-studio-400 transition-colors">Process</Link>
            <Link href="/design" onClick={toggleMenu} className="hover:text-studio-400 transition-colors">Design</Link>
            <Link href="/about" onClick={toggleMenu} className="hover:text-studio-400 transition-colors">About</Link>
          </nav>

          <div className="mt-auto space-y-6">
            <div className="h-px bg-studio-50/10 w-full" />
            <div className="flex flex-col gap-2 text-sm font-medium opacity-80">
              <p>&copy; {new Date().getFullYear()} Simulasi Studio.</p>
              <p>Screen printing studio</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
