"use client";

import Image from "next/image";

interface GalleryItem {
    id: number;
    title: string;
    category: string;
    image: string;
}

const galleryItems: GalleryItem[] = [
    {
        id: 1,
        title: "Mobile Optimization",
        category: "Technical",
        image: "/hero_mobile.png",
    },
    {
        id: 2,
        title: "iPad Interface",
        category: "Experience",
        image: "/hero_ipad.png",
    },
    {
        id: 3,
        title: "Desktop Workflow",
        category: "Production",
        image: "/hero_desktop.png",
    },
    {
        id: 4,
        title: "Ultra-wide Render",
        category: "Display",
        image: "/hero_ultra.png",
    },
    {
        id: 5,
        title: "New Project",
        category: "Draft",
        image: "/wireframe-placeholder.svg",
    },
];

const Gallery = () => {
    return (
        <section className="w-full py-12">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {galleryItems.map((item) => (
                    <div
                        key={item.id}
                        className="group relative overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-studio-800 dark:bg-studio-900"
                    >
                        {/* Aspect Ratio Container for consistency */}
                        <div className="relative aspect-square overflow-hidden">
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-studio-950/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        </div>

                        <div className="p-4">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-studio-500 dark:text-studio-400">
                                {item.category}
                            </span>
                            <h3 className="mt-1 text-base font-semibold text-zinc-900 dark:text-white">
                                {item.title}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Gallery;
