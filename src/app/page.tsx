"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Droplet, ArrowRight, ShieldCheck, Building2, User } from "lucide-react";
import { Card, CardContent } from "@/components/Card";

export default function Home() {
  return (
    <div className="flex h-full flex-col bg-slate-50 items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-8"
      >
        <div className="text-center space-y-4">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-900 text-white shadow-2xl mx-auto mb-4">
            <Droplet className="h-10 w-10" fill="currentColor" />
          </div>
          <h1 className="text-display">TankTo</h1>
          <p className="text-body-secondary text-slate-500">
            Fuel Access Membership Platform
          </p>
        </div>

        <div className="space-y-4 mt-12">
          <Link href="/subscriber" className="block">
            <Card className="hover:border-slate-300 transition-colors border-2 cursor-pointer group">
              <CardContent className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">Subscriber</h3>
                    <p className="text-sm text-slate-500">Access fuel immediately</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-slate-900 transition-colors" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/station" className="block">
            <Card className="hover:border-slate-300 transition-colors border-2 cursor-pointer group">
              <CardContent className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">Fuel Station</h3>
                    <p className="text-sm text-slate-500">Process fuel codes</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-slate-900 transition-colors" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin" className="block">
            <Card className="hover:border-slate-300 transition-colors border-2 cursor-pointer group">
              <CardContent className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">Admin</h3>
                    <p className="text-sm text-slate-500">System management</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-slate-900 transition-colors" />
              </CardContent>
            </Card>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
