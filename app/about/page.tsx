import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen w-full bg-studio-900 mx-auto max-w-screen-3xl">
      <div className="mx-auto max-w-content px-6 md:px-0">

        {/* Main Grid Section: 1:1 Image + Text Content */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-12 py-16 md:py-24 items-start">

          {/* Left Column: 1:1 Main Image */}
          <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-studio-800">
            <Image
              src="/hero_desktop.png"
              alt="Simulasi Studio Main"
              fill
              className="object-cover opacity-80"
            />
            {/* Visual notation for technical feel */}
            <div className="absolute top-4 left-4 text-[10px] font-mono text-studio-400 uppercase tracking-widest">
              Primary_Asset // 1:1_Aspect
            </div>
          </div>

          {/* Right Column: Text Content with 2-Column subgrid */}
          <div className="flex flex-col gap-y-10">
            <div>
              <h1 className="text-6xl md:text-7xl font-black tracking-tighter text-white uppercase leading-none">
                ABOUT <br />
                <span className="text-studio-400">SIMULASI</span>
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-studio-200/90 leading-relaxed font-medium">
              <p>
                Simulasi Studio operates at the intersection of traditional craftsmanship and digital innovation. We are an artist-run screen printing collective focused on pushing the boundaries of what physical production can achieve in a virtual world.
              </p>
              <p>
                Our workflow is documented meticulously, from initial design separations to final ink viscosity. We believe that the precision of technology should serve the soul of manual production.
              </p>
            </div>

            <div className="border-t border-studio-800 pt-8">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-studio-500 mb-4">Core Principles</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["Manual Precision", "Digital Soul", "Artist Led", "Future Proof"].map((item) => (
                  <div key={item} className="p-4 bg-studio-800/50 rounded-lg border border-studio-700 text-xs font-bold text-center text-white">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Highlight Section: 4-Column Detail Grid */}
        <section className="py-20 border-t border-studio-800">
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Technical Details</h2>
            <p className="text-studio-400 text-sm font-mono mt-2">PROCESS_DOCUMENTATION // ARCHIVE_V1</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="group relative aspect-square overflow-hidden rounded-lg bg-studio-800 border border-studio-700">
                <Image
                  src={`/hero_${i === 1 ? 'mobile' : i === 2 ? 'ipad' : i === 3 ? 'desktop' : 'ultra'}.png`}
                  alt={`Detail ${i}`}
                  fill
                  className="object-cover opacity-60 transition-transform duration-500 group-hover:scale-110 group-hover:opacity-80"
                />
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-studio-950 to-transparent">
                  <div className="text-[10px] font-mono text-studio-300">STEP_0{i}</div>
                  <div className="text-xs font-bold text-white mt-1 uppercase">Process Detail {i}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
