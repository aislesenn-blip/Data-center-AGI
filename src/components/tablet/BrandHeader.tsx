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
      className="absolute top-8 left-12 z-50 flex items-center gap-1"
    >
      <span className="font-extrabold text-3xl tracking-tight">
        <span className="text-blue-600">rik</span>
        <span className={isLight ? 'text-slate-900' : 'text-white'}>pedia</span>
      </span>
    </motion.div>
  )
}
