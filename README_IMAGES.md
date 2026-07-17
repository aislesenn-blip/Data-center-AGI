# Managing Images on FEEP

To ensure the FEEP website feels authentic and distinct from generic "vibe-coded" AI outputs, it relies on high-quality real-world imagery rather than placeholder shapes.

Here is how you can easily replace the placeholders with your actual images:

## 1. Social Proof Logos
The hero section currently contains placeholder grey boxes for partner logos.

**To add real logos:**
1. Save your partner logos as `.svg` or `.png` (preferably with transparent backgrounds) and place them in the `public/` directory (e.g., `public/logo-school.png`).
2. Open `src/components/sections/HeroSection.tsx`.
3. Locate the "Social Proof" comment.
4. Replace the `<div className="h-8 w-32 bg-zinc-400 rounded-sm"></div>` elements with standard Next.js `<Image />` tags:
   ```tsx
   import Image from 'next/image';

   // ... later in the file ...

   <Image src="/logo-school.png" alt="Partner Name" width={120} height={40} className="opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all" />
   ```

## 2. Founder Portrait
The "Built with conviction" section has a placeholder gradient box for Ernest Michael's portrait.

**To add the real portrait:**
1. Save the portrait image in the `public/` directory (e.g., `public/ernest-michael.jpg`). A high-quality, professional photo works best.
2. Open `src/components/sections/FounderSection.tsx`.
3. Locate the `[Founder Image Placeholder]` text.
4. Replace the placeholder div with the Next.js `<Image />` tag:
   ```tsx
   import Image from 'next/image';

   // ... later in the file ...

   <div className="aspect-square bg-feep-bg rounded-3xl border border-black/5 relative overflow-hidden flex items-center justify-center">
     <Image src="/ernest-michael.jpg" alt="Ernest Michael" fill className="object-cover" />
   </div>
   ```

*Note: The `fill` property combined with `object-cover` ensures the image perfectly fills the rounded square without distorting.*
