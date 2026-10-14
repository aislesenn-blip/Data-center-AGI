export default function Products() {
  return (
    <section className="px-6 py-16 max-w-md mx-auto">
      <div className="flex flex-col gap-2 mb-8">
        <span className="font-sans font-bold text-db-blue uppercase tracking-widest text-xs">
          Products
        </span>
        <h2 className="font-serif text-3xl text-text-primary leading-tight">
          Tools for total accountability.
        </h2>
        <p className="font-sans text-text-secondary mt-2">
          From digital student cards to school-side transaction visibility and CCTV-supported reconciliation.
        </p>
      </div>

      <div className="bg-light-gray rounded-2xl p-6 mb-6">
        <h3 className="font-sans font-bold text-lg text-text-primary mb-4">
          Cashless Ecosystem
        </h3>
        {/* Wireframe Illustration */}
        <div className="w-full h-32 mb-4 relative flex justify-center items-center">
          <svg viewBox="0 0 200 100" className="w-full h-full stroke-db-blue fill-none" preserveAspectRatio="xMidYMid meet">
            <rect x="20" y="20" width="60" height="40" rx="4" strokeWidth="1" />
            <path d="M 20 35 L 80 35" strokeWidth="1" />

            <circle cx="140" cy="40" r="20" strokeWidth="1" strokeDasharray="2 2" />
            <rect x="135" y="30" width="10" height="15" rx="1" strokeWidth="1" />
            <circle cx="140" cy="50" r="2" strokeWidth="1" />

            <path d="M 90 40 L 110 40" strokeWidth="1" strokeDasharray="2 2" />
            <path d="M 105 35 L 110 40 L 105 45" strokeWidth="1" />
          </svg>
        </div>
        <p className="font-sans text-text-secondary text-sm">
          A closed-loop payment network giving schools complete control and students an easy way to pay.
        </p>
      </div>

      {/* Horizontally scrolling tags/tabs */}
      <div className="flex overflow-x-auto gap-3 pb-4 snap-x hide-scrollbar">
        <div className="snap-start shrink-0 px-4 py-2 rounded-full border border-db-blue text-db-blue font-sans font-bold text-sm flex items-center gap-2">
          <span>01</span>
          <span>Student Cards</span>
        </div>
        <div className="snap-start shrink-0 px-4 py-2 rounded-full border border-db-blue text-db-blue font-sans font-bold text-sm flex items-center gap-2">
          <span>02</span>
          <span>Payment Points</span>
        </div>
        <div className="snap-start shrink-0 px-4 py-2 rounded-full border border-db-blue text-db-blue font-sans font-bold text-sm flex items-center gap-2">
          <span>03</span>
          <span>CCTV Reconciliation</span>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </section>
  );
}
