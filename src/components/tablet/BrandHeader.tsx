import { motion } from "framer-motion"

interface Props {
  variant?: "light" | "dark"
}

export function BrandHeader({ variant = "light" }: Props) {
  const isLight = variant === "light"

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`absolute top-8 left-12 z-50 flex items-center gap-3 ${isLight ? 'text-slate-900' : 'text-white'}`}
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-md ${isLight ? 'bg-blue-600' : 'bg-white'}`}>
        <span className={`font-black text-2xl ${isLight ? 'text-white' : 'text-blue-600'}`}>R</span>
      </div>
      <span className="font-extrabold text-3xl tracking-tight">Rickpedia</span>
    </motion.div>
  )
}
