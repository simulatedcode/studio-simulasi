// app/design/page.tsx
import Gallery from "@/components/Gallery";

export default function DesignPage() {
  return (
    <main className="relative w-full z-10 min-h-screen mx-auto max-w-screen-3xl">
      <div className="mx-auto max-w-content px-8 sm:px-8">
        <section className="relative w-full grid grid-cols-1 md:grid-cols-2 py-16 md:py-24 gap-y-8 md:gap-y-12 text-inverse items-start gap-x-gutter">
          <div className="font-semibold text-6xl">Design</div>
          <div className="flex flex-col gap-y-4">
            <p className="text-md leading-relaxed opacity-80">
              A typical Simulasi Studio workflow moves from artwork and separations into film output, screen coating, exposure, and then hand-pulled printing across multiple layers. Each step is documented, so mesh choices, squeegee angle, pressure, and drying conditions can be repeated or intentionally changed in future projects.
            </p>
          </div>
        </section>

        <section className="pb-24">
          <h2 className="text-2xl font-bold text-zinc-900 mb-8">Featured Projects</h2>
          <Gallery />
        </section>
      </div>
    </main>
  );
}
