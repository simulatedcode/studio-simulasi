import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
    return (
        <section className="relative w-full overflow-hidden bg-studio-900">
            {/* SVG Filter Definitions */}
            <svg className="absolute h-0 w-0 overflow-hidden" aria-hidden="true">
                <filter id="studio-dither">
                    {/* Convert to high-contrast grayscale */}
                    <feColorMatrix
                        type="matrix"
                        values="0.33 0.33 0.33 0 0
                                0.33 0.33 0.33 0 0
                                0.33 0.33 0.33 0 0
                                0 0 0 1 0"
                    />
                    {/* Diffusion Dither Style: Posterize and add grain */}
                    <feComponentTransfer>
                        <feFuncR type="discrete" tableValues="0 0.2 0.4 0.6 0.8 1" />
                        <feFuncG type="discrete" tableValues="0 0.2 0.4 0.6 0.8 1" />
                        <feFuncB type="discrete" tableValues="0 0.2 0.4 0.6 0.8 1" />
                    </feComponentTransfer>
                </filter>
            </svg>

            {/* Background Images with Dither Filter Applied */}
            <div className="absolute inset-0 h-full w-full grayscale contrast-[1.4] brightness-[0.8]" style={{ filter: 'url(#studio-dither)' }}>
                <picture className="absolute inset-0 h-full w-full">
                    <source srcSet="/hero_ultra.png" media="(min-width: 1980px)" />
                    <source srcSet="/hero_desktop.png" media="(min-width: 1280px)" />
                    <source srcSet="/hero_ipad.png" media="(min-width: 768px)" />
                    <img
                        src="/hero_mobile.png"
                        alt="Studio Background"
                        className="h-full w-full object-cover"
                    />
                </picture>
            </div>

            {/* Screen Printing Bitmap Overlay (Halftone Pattern) */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.15] mix-blend-overlay"
                style={{
                    backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
                    backgroundSize: '4px 4px'
                }}
            />

            {/* Grit/Noise Overlay */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.05] grayscale brightness-[2] mix-blend-screen"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
            />

            {/* Decorative Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-studio-950 via-studio-950/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-studio-950/80 via-transparent to-transparent hidden md:block" />

            {/* Hero Content Layer */}
            <div className="relative mx-auto flex min-h-[80vh] max-w-content flex-col justify-end px-6 pb-24 md:min-h-screen md:justify-center md:pb-0">
                <div className="max-w-2xl space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">

                    {/* Tagline / Subtitle */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 backdrop-blur-md">
                        <span className="h-2 w-2 rounded-full bg-studio-400" />
                        <span className="text-xs font-bold uppercase tracking-widest text-studio-100">
                            Future of Production
                        </span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-balance text-6xl font-black tracking-tighter text-white sm:text-8xl lg:text-9xl leading-[0.8] mix-blend-plus-lighter">
                        SIMULASI <br className="hidden md:block" />
                        <span className="text-studio-400">STUDIO</span>
                    </h1>

                    {/* Description */}
                    <p className="max-w-lg text-lg leading-relaxed text-studio-200/80 md:text-xl font-medium tracking-tight">
                        Empowering the next generation of digital artists and creative directors with state-of-the-art simulation tools and virtual production workflows.
                    </p>

                    {/* Call to Action Buttons */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                        <Link
                            href="/design"
                            className="group relative flex h-14 items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-8 font-bold text-studio-950 transition-all hover:pr-10"
                        >
                            Start Creating
                            <svg className="absolute right-4 h-5 w-5 opacity-0 transition-all group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </Link>

                        <Link
                            href="/about"
                            className="flex h-14 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 font-bold text-white backdrop-blur-lg transition-colors hover:bg-white/10"
                        >
                            Learn More
                        </Link>
                    </div>
                </div>
            </div>

            {/* Subtle Bottom Glow */}
            <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-studio-400/30 to-transparent" />
        </section>
    );
};

export default Hero;
