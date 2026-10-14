export default function Hero() {
  return (
    <section className="relative px-6 pt-12 pb-24 max-w-md mx-auto overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,var(--color-icy-blue)_0%,transparent_70%)] -z-10 pointer-events-none opacity-80" />

      {/* Content */}
      <div className="flex flex-col text-left gap-6 z-10">
        <h1 className="font-serif text-5xl leading-tight text-text-primary">
          Digitize School<br />Pocket Money
        </h1>
        <p className="font-sans text-lg text-text-secondary leading-relaxed">
          Connect parents, students, and schools through a cashless, accountable, and secure payment system. Give your children financial independence with total visibility.
        </p>

        <div className="flex flex-col gap-4 mt-4">
          <button className="w-full bg-db-blue text-white font-sans font-bold py-4 px-6 rounded-full text-center transition-opacity hover:opacity-90">
            Get started
          </button>
          <button className="w-full bg-transparent text-db-blue font-sans font-bold py-4 px-6 rounded-full text-center border border-db-blue transition-colors hover:bg-db-blue/5">
            Learn more
          </button>
        </div>
      </div>

      {/* Minimalist Wireframe Illustration (Data Flow / Connections) */}
      <div className="mt-16 w-full h-48 relative flex justify-center items-center">
        <svg viewBox="0 0 400 200" className="w-full h-full stroke-db-blue/20 fill-none" preserveAspectRatio="xMidYMid meet">
          <path d="M 50 150 Q 150 50 200 100 T 350 50" strokeWidth="1" strokeDasharray="4 4" />
          <path d="M 50 150 Q 200 200 350 50" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="50" cy="150" r="4" className="fill-db-blue stroke-none" />
          <circle cx="200" cy="100" r="4" className="fill-db-blue stroke-none" />
          <circle cx="350" cy="50" r="4" className="fill-db-blue stroke-none" />
          <circle cx="250" cy="140" r="2" className="fill-db-blue/50 stroke-none" />
          <circle cx="120" cy="80" r="2" className="fill-db-blue/50 stroke-none" />
          <path d="M 200 100 L 250 140" strokeWidth="1" strokeDasharray="2 2" />
        </svg>
      </div>
    </section>
  );
}
