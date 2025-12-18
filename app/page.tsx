import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5F1EC] font-sans dark:bg-studio-900 mx-auto max-w-screen-3xl">
      <main className="grid min-h-screen w-full max-w-content grid-cols-4 items-center justify-between gap-x-4 px-8 py-24 dark:bg-studio-900 sm:items-start md:grid-cols-8 landscape:py-6 desktop:grid-cols-12 md:landscape:py-24">
        <div className="col-span-4 flex flex-col items-center gap-6 text-center sm:items-start sm:text-left md:col-span-8 desktop:col-span-12">
          <h1 className="max-w-sm pb-24 text-2xl font-extrabold landscape:pb-6 md:landscape:pb-24 sm:text-5xl">SIMULASI Studio</h1>
          <h2 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-studio-950 dark:text-studio-200">
            To get started, edit your *.psd file using channel.
          </h2>
          <p className="max-w-md text-lg leading-8 text-studio-600 dark:text-studio-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-studio-950 dark:text-studio-200"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-studio-950 dark:text-studio-200"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="col-span-4 flex flex-col gap-4 pt-8 text-base font-medium landscape:flex-row landscape:pt-0 sm:flex-row sm:pt-8 md:col-span-8 md:flex-row md:pt-8 desktop:col-span-12">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-studio-900 dark:hover:bg-studio-200 md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-studio-950/[.08] px-5 transition-colors hover:border-transparent hover:bg-studio-950/[.04] dark:border-white/[.145] dark:hover:bg-studio-800 md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
