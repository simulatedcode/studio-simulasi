'use client';

export default function ProcessPage() {
    const steps = [
        {
            id: 'setup',
            label: 'Setup',
            description: 'Prepare the screen printing station by organizing inks, squeegees, and ensuring the workspace is clean and ready for production.'
        },
        {
            id: 'mesh',
            label: 'Mesh Screen',
            description: 'Position the mesh screen over the substrate (paper or fabric). The mesh count determines the level of detail that can be printed.'
        },
        {
            id: 'stencil',
            label: 'Stencil',
            description: 'Apply the stencil to the screen blocks ink in specific areas, creating the negative image that will be printed.'
        },
        {
            id: 'ink',
            label: 'Ink Application',
            description: 'Apply a bead of ink to the top of the screen. We use high-quality, eco-friendly water-based inks for vibrant and durable results.'
        },
        {
            id: 'squeegee',
            label: 'Squeegee Pull',
            description: 'Pull the squeegee across the screen with consistent pressure and angle to force the ink through the mesh and onto the substrate.'
        },
        {
            id: 'complete',
            label: 'Complete',
            description: 'Lift the screen to reveal the finished print. The print is then cured to ensure the ink sets permanently.'
        },
    ];

    return (
        <section className="relative w-full bg-studio-50 py-24 md:py-32">
            <div className="mx-auto max-w-content px-4">
                {/* Section Header */}
                <div className="mb-16 text-center">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-studio-50/10 bg-white px-4 py-1 shadow-sm backdrop-blur-md">
                        <span className="h-2 w-2 rounded-full bg-studio-400" />
                        <span className="text-xs font-bold uppercase tracking-widest text-studio-900">
                            Our Process
                        </span>
                    </div>
                    <h1 className="mb-4 text-4xl font-black tracking-tight text-studio-900 md:text-6xl">
                        How It Works
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-studio-600">
                        A step-by-step breakdown of our manual screen printing technique.
                    </p>
                </div>

                {/* Vertical Process List */}
                <div className="mx-auto max-w-3xl space-y-8">
                    {steps.map((step, index) => (
                        <div
                            key={step.id}
                            className="group relative overflow-hidden rounded-2xl border border-studio-900/10 bg-white p-8 shadow-lg transition-all hover:border-studio-400 hover:shadow-xl"
                        >
                            <div className="flex items-start gap-6">
                                {/* Step Number */}
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-studio-100 text-xl font-black text-studio-600 transition-colors group-hover:bg-studio-500 group-hover:text-white">
                                    {index + 1}
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <h3 className="mb-3 text-2xl font-bold text-studio-900 group-hover:text-studio-600">
                                        {step.label}
                                    </h3>
                                    <p className="text-lg leading-relaxed text-studio-500">
                                        {step.description}
                                    </p>
                                </div>
                            </div>

                            {/* Decorative Background Element */}
                            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-studio-50 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 text-center">
                    <button className="group relative inline-flex h-14 items-center justify-center gap-2 overflow-hidden rounded-full border-2 border-studio-900 bg-studio-900 px-8 font-bold text-white transition-all hover:bg-studio-800 hover:shadow-lg">
                        Start Your Project
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
        </section>
    );
}
