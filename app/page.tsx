import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-studio-900 font-sans mx-auto max-w-screen-3xl">
      <main className="w-full">
        <Hero />

        {/* Additional sections can be added here */}
      </main>
    </div>
  );
}
