export default function WhoWeServe() {
  return (
    <section className="relative px-6 py-16 max-w-md mx-auto overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle,var(--color-icy-blue)_0%,transparent_70%)] -z-10 pointer-events-none opacity-80" />

      <div className="flex flex-col gap-2 mb-8 relative z-10">
        <span className="font-sans font-bold text-db-blue uppercase tracking-widest text-xs">
          Who We Serve
        </span>
        <h2 className="font-serif text-3xl text-text-primary leading-tight">
          A better system for everyone.
        </h2>
      </div>

      <div className="flex flex-col gap-4 relative z-10">
        {/* Parents Card */}
        <div className="bg-light-gray rounded-2xl p-6 flex flex-col gap-3">
          <h3 className="font-sans font-bold text-db-blue text-xl">Parents</h3>
          <p className="font-sans text-text-secondary text-base">
            Fund your child's pocket money digitally. Track their spending in real-time and know exactly where the money goes.
          </p>
          <a href="#" className="font-sans font-bold text-db-blue flex items-center gap-1 mt-2 hover:opacity-80 transition-opacity">
            Learn more <span aria-hidden="true">-&gt;</span>
          </a>
        </div>

        {/* Students Card */}
        <div className="bg-light-gray rounded-2xl p-6 flex flex-col gap-3">
          <h3 className="font-sans font-bold text-db-blue text-xl">Students</h3>
          <p className="font-sans text-text-secondary text-base">
            Pay easily at school shops with a secure digital card. No more lost cash or fumbling for change during break time.
          </p>
          <a href="#" className="font-sans font-bold text-db-blue flex items-center gap-1 mt-2 hover:opacity-80 transition-opacity">
            Learn more <span aria-hidden="true">-&gt;</span>
          </a>
        </div>

        {/* Schools Card */}
        <div className="bg-light-gray rounded-2xl p-6 flex flex-col gap-3">
          <h3 className="font-sans font-bold text-db-blue text-xl">Schools</h3>
          <p className="font-sans text-text-secondary text-base">
            Eliminate cash handling on campus. Gain instant visibility into transactions and simplify financial reconciliation.
          </p>
          <a href="#" className="font-sans font-bold text-db-blue flex items-center gap-1 mt-2 hover:opacity-80 transition-opacity">
            Learn more <span aria-hidden="true">-&gt;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
