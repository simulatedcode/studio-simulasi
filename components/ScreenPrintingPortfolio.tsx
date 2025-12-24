'use client';

import { useState } from 'react';
import Image from 'next/image';

interface PortfolioItem {
    id: string;
    title: string;
    description: string;
    image: string;
    colors: string[];
    layers: number;
}

const ScreenPrintingPortfolio = () => {
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    const portfolioItems: PortfolioItem[] = [
        {
            id: '1',
            title: 'Studio Branding',
            description: '3-color screen print on cotton tote',
            image: '/portfolio-1.jpg',
            colors: ['#4f4fc5', '#1c1c54', '#ececf9'],
            layers: 3,
        },
        {
            id: '2',
            title: 'Concert Poster',
            description: '4-color halftone print',
            image: '/portfolio-2.jpg',
            colors: ['#e63946', '#ffd60a', '#00b4d8', '#1c1c54'],
            layers: 4,
        },
        {
            id: '3',
            title: 'Artist Series',
            description: '2-color minimalist design',
            image: '/portfolio-3.jpg',
            colors: ['#1c1c54', '#ececf9'],
            layers: 2,
        },
        {
            id: '4',
            title: 'Limited Edition',
            description: '5-color gradient print',
            image: '/portfolio-4.jpg',
            colors: ['#4f4fc5', '#7171d0', '#9494dc', '#b6b6e7', '#dcdcf4'],
            layers: 5,
        },
        {
            id: '5',
            title: 'Typography Study',
            description: 'Single color overprint',
            image: '/portfolio-5.jpg',
            colors: ['#1c1c54'],
            layers: 1,
        },
        {
            id: '6',
            title: 'Abstract Composition',
            description: '3-color layered print',
            image: '/portfolio-6.jpg',
            colors: ['#00b4d8', '#ffd60a', '#e63946'],
            layers: 3,
        },
    ];

    return (
        <section className="relative w-full bg-studio-900 py-24 md:py-32">
            <div className="mx-auto max-w-content px-4">
                {/* Section Header */}
                <div className="mb-16 text-center">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-studio-50/10 bg-studio-50/5 px-4 py-1 backdrop-blur-md">
                        <span className="h-2 w-2 rounded-full bg-studio-400" />
                        <span className="text-xs font-bold uppercase tracking-widest text-studio-50">
                            Portfolio
                        </span>
                    </div>
                    <h2 className="mb-4 text-4xl font-black tracking-tight text-studio-50 md:text-6xl">
                        Screen Printed Works
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-studio-200">
                        Hover over each piece to reveal the individual color layers and printing process.
                        Click to explore the full breakdown.
                    </p>
                </div>

                {/* Portfolio Grid */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {portfolioItems.map((item) => {
                        const isHovered = hoveredItem === item.id;
                        const isSelected = selectedItem === item.id;

                        return (
                            <div
                                key={item.id}
                                className="group relative cursor-pointer"
                                onMouseEnter={() => setHoveredItem(item.id)}
                                onMouseLeave={() => setHoveredItem(null)}
                                onClick={() => setSelectedItem(isSelected ? null : item.id)}
                            >
                                {/* Card Container */}
                                <div className="relative overflow-hidden rounded-2xl border-2 border-studio-50/10 bg-studio-800 shadow-2xl transition-all duration-500 hover:border-studio-400 hover:shadow-studio-500/20">
                                    {/* Image Area */}
                                    <div className="relative aspect-[4/3] overflow-hidden bg-studio-700">
                                        {/* Placeholder for actual image */}
                                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-studio-600 to-studio-800">
                                            <div className="text-center">
                                                <div className="mb-4 text-6xl font-black text-studio-400/30">
                                                    {item.title.charAt(0)}
                                                </div>
                                                <div className="text-sm font-bold uppercase tracking-wider text-studio-300/50">
                                                    {item.title}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Mesh Screen Overlay - appears on hover */}
                                        <div
                                            className={`absolute inset-0 transition-opacity duration-300 ${isHovered || isSelected ? 'opacity-100' : 'opacity-0'
                                                }`}
                                        >
                                            <svg className="h-full w-full">
                                                <defs>
                                                    <pattern
                                                        id={`mesh-${item.id}`}
                                                        x="0"
                                                        y="0"
                                                        width="12"
                                                        height="12"
                                                        patternUnits="userSpaceOnUse"
                                                    >
                                                        <circle cx="6" cy="6" r="0.6" fill="white" opacity="0.2" />
                                                        <line
                                                            x1="0"
                                                            y1="6"
                                                            x2="12"
                                                            y2="6"
                                                            stroke="white"
                                                            strokeWidth="0.3"
                                                            opacity="0.15"
                                                        />
                                                        <line
                                                            x1="6"
                                                            y1="0"
                                                            x2="6"
                                                            y2="12"
                                                            stroke="white"
                                                            strokeWidth="0.3"
                                                            opacity="0.15"
                                                        />
                                                    </pattern>
                                                </defs>
                                                <rect width="100%" height="100%" fill={`url(#mesh-${item.id})`} />
                                            </svg>
                                        </div>

                                        {/* Layer Count Indicator */}
                                        <div className="absolute right-4 top-4 rounded-full bg-studio-900/80 px-3 py-1 text-xs font-bold text-studio-50 backdrop-blur-sm">
                                            {item.layers} {item.layers === 1 ? 'Layer' : 'Layers'}
                                        </div>

                                        {/* Hover Effect - Halftone Pattern */}
                                        <div
                                            className={`absolute inset-0 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'
                                                }`}
                                            style={{
                                                backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                                                backgroundSize: '6px 6px',
                                            }}
                                        />
                                    </div>

                                    {/* Info Section */}
                                    <div className="p-6">
                                        <h3 className="mb-2 text-xl font-bold text-studio-50">{item.title}</h3>
                                        <p className="mb-4 text-sm text-studio-300">{item.description}</p>

                                        {/* Color Layers */}
                                        <div className="space-y-2">
                                            <div className="text-xs font-bold uppercase tracking-wider text-studio-400">
                                                Ink Colors
                                            </div>
                                            <div className="flex gap-2">
                                                {item.colors.map((color, index) => (
                                                    <div
                                                        key={index}
                                                        className={`group/color relative transition-all duration-300 ${isHovered || isSelected
                                                                ? 'h-12 w-12'
                                                                : 'h-8 w-8'
                                                            }`}
                                                        style={{
                                                            transitionDelay: `${index * 50}ms`,
                                                        }}
                                                    >
                                                        <div
                                                            className="h-full w-full rounded-lg border-2 border-studio-50/20 shadow-lg transition-all group-hover/color:scale-110"
                                                            style={{ backgroundColor: color }}
                                                        />
                                                        {/* Layer number */}
                                                        {(isHovered || isSelected) && (
                                                            <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-studio-900 text-[10px] font-bold text-studio-50 shadow-md">
                                                                {index + 1}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Expanded View Indicator */}
                                        {isSelected && (
                                            <div className="mt-4 animate-pulse rounded-lg border border-studio-400/30 bg-studio-400/10 p-3 text-center text-xs font-bold text-studio-300">
                                                Click again to close detailed view
                                            </div>
                                        )}
                                    </div>

                                    {/* Layer Separation Animation - shown when selected */}
                                    {isSelected && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-studio-950/95 backdrop-blur-sm">
                                            <div className="space-y-4 p-6 text-center">
                                                <div className="text-2xl font-black text-studio-50">
                                                    Layer Breakdown
                                                </div>
                                                <div className="space-y-2">
                                                    {item.colors.map((color, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex items-center gap-4 rounded-lg bg-studio-900/50 p-3"
                                                            style={{
                                                                animation: `slideIn 0.3s ease-out ${index * 0.1}s both`,
                                                            }}
                                                        >
                                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-studio-800 text-sm font-bold text-studio-50">
                                                                {index + 1}
                                                            </div>
                                                            <div
                                                                className="h-10 flex-1 rounded-lg border-2 border-studio-50/20"
                                                                style={{ backgroundColor: color }}
                                                            />
                                                            <div className="text-xs font-mono text-studio-300">
                                                                {color}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Hover Glow Effect */}
                                <div
                                    className={`absolute -inset-1 -z-10 rounded-2xl bg-gradient-to-r from-studio-500 to-studio-400 opacity-0 blur-xl transition-opacity duration-500 ${isHovered ? 'opacity-30' : ''
                                        }`}
                                />
                            </div>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 text-center">
                    <button className="group relative inline-flex h-14 items-center justify-center gap-2 overflow-hidden rounded-full border-2 border-studio-50/20 bg-studio-50/5 px-8 font-bold text-studio-50 backdrop-blur-lg transition-all hover:border-studio-400 hover:bg-studio-50/10">
                        View Full Portfolio
                        <svg
                            className="h-5 w-5 transition-transform group-hover:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* CSS Animation Styles */}
            <style jsx>{`
                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateX(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
            `}</style>
        </section>
    );
};

export default ScreenPrintingPortfolio;
