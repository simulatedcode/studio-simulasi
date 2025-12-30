import PortfolioGrid, { Project } from './PortfolioGrid';

export const revalidate = 60; // Revalidate every 60 seconds

// Static projects data
const PROJECTS: Project[] = [
  // Placeholder project to verify layout
  // {
  //     _id: '1',
  //     title: 'Example Project',
  //     description: 'This is a static example project to demonstrate the layout without Sanity.',
  //     image: null,
  //     colors: ['#FF0000', '#000000'],
  //     layers: 2,
  //     slug: { current: 'example-project' },
  // }
];

export default function WorkPage() {
  const projects = PROJECTS;

  return (
    <section className="relative w-full bg-studio-900 py-24 md:py-32">
      <div className="mx-auto max-w-content px-4">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-studio-50/10 bg-studio-50/5 px-4 py-1 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-studio-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-studio-50">
              Our Work
            </span>
          </div>
          <h1 className="mb-4 text-4xl font-black tracking-tight text-studio-50 md:text-6xl">
            Selected Projects
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-studio-200">
            A collection of hand-printed works demonstrating our diverse capabilities in screen printing.
          </p>
        </div>

        {/* Portfolio Grid */}
        <PortfolioGrid projects={projects} />

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <button className="group relative inline-flex h-14 items-center justify-center gap-2 overflow-hidden rounded-full border-2 border-studio-50/20 bg-studio-50/5 px-8 font-bold text-studio-50 backdrop-blur-lg transition-all hover:border-studio-400 hover:bg-studio-50/10">
            Get a Quote
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
