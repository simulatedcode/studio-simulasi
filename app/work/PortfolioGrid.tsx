'use client';

import { useState } from 'react';
import Image from 'next/image';

// Local Project type definition
export interface Project {
    _id: string;
    title: string;
    description: string;
    image: string | null;
    colors: string[];
    layers: number;
    slug: { current: string };
}

export default function PortfolioGrid({ projects }: { projects: Project[] }) {
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    return (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {projects.map((item) => {
                const isHovered = hoveredItem === item._id;
                const isSelected = selectedItem === item._id;

                return (
                    <div
                        key={item._id}
                        className="group relative cursor-pointer"
                        onMouseEnter={() => setHoveredItem(item._id)}
                        onMouseLeave={() => setHoveredItem(null)}
                        onClick={() => setSelectedItem(isSelected ? null : item._id)}
                    >
                        {/* Card Container */}
                        <div className="relative overflow-hidden rounded-2xl border-2 border-studio-50/10 bg-studio-800 shadow-2xl transition-all duration-500 hover:border-studio-400 hover:shadow-studio-500/20">
                            {/* Image Area */}
                            <div className="relative aspect-[4/3] overflow-hidden bg-studio-700">
                                {item.image ? (
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-studio-600 to-studio-800">
                                        <div className="text-center">
                                            <div className="mb-4 text-6xl font-black text-studio-400/30">
                                                {item.title.charAt(0)}
                                            </div>
                                        </div>
                                    </div>
                                )}


                                {/* Mesh Screen Overlay - appears on hover */}
                                <div
                                    className={`absolute inset-0 transition-opacity duration-300 ${isHovered || isSelected ? 'opacity-100' : 'opacity-0'
                                        }`}
                                >
                                    <svg className="h-full w-full">
                                        <defs>
                                            <pattern
                                                id={`mesh-${item._id}`}
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
                                        <rect width="100%" height="100%" fill={`url(#mesh-${item._id})`} />
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
                                {item.colors && (
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
                                )}


                                {/* Expanded View Indicator */}
                                {isSelected && (
                                    <div className="mt-4 animate-pulse rounded-lg border border-studio-400/30 bg-studio-400/10 p-3 text-center text-xs font-bold text-studio-300">
                                        Click again to close detailed view
                                    </div>
                                )}
                            </div>

                            {/* Layer Separation Animation - shown when selected */}
                            {isSelected && item.colors && (
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
        </div>
    );
}
