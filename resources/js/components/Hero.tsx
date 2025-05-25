import { Button } from "@/components/ui/button";
import { Link } from '@inertiajs/react';
import { motion } from "framer-motion";
import { AlertTriangle, Flag, Lock, MessageSquare, Search, ShieldCheck } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background/50 to-background py-12 md:py-20 lg:py-28 min-h-screen md:min-h-0">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute right-1/2 top-0 h-[300px] w-[300px] -translate-y-1/3 translate-x-1/2 rounded-full bg-primary/20 blur-3xl md:right-1/2 md:-translate-x-1/2" />
        <div className="absolute left-0 bottom-0 h-[250px] w-[250px] -translate-y-1/4 -translate-x-1/4 rounded-full bg-secondary/20 blur-3xl" />
      </div>

      {/* Floating dots decoration */}
      <div className="absolute inset-0 -z-20 opacity-20">
        <div className="absolute right-20 top-1/4 h-2 w-2 rounded-full bg-primary animate-float" />
        <div className="absolute left-1/4 top-1/2 h-3 w-3 rounded-full bg-secondary animate-float animation-delay-1000" />
        <div className="absolute right-1/3 bottom-1/3 h-2.5 w-2.5 rounded-full bg-foreground/50 animate-float animation-delay-1500" />
      </div>

      <div className="container-custom relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left side content */}
          <div className="text-center md:text-left mt-16 md:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-poppins font-bold text-5xl lg:text-6xl mb-6 leading-tight tracking-tighter">
                <span className="text-gradient-primary bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-primary/70">Know</span>{" "}
                <span className="relative">
                  Before You Go
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary/30 rounded-full"></span>
                </span>
              </h1>

              <p className="text-lg md:text-xl mb-8 md:mb-10 text-foreground/80 max-w-lg mx-auto md:mx-0">
                The <span className="font-semibold text-primary">no-BS</span> way to find out what working somewhere is <em className="font-medium text-foreground">really</em> like.
                <br className="hidden md:block" />
                No ratings. No fluff. Just <span className="text-warning">red flags</span>, <span className="text-success">green lights</span>, and the truth—straight from employees.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                  <Link href="/explore" className="flex items-center gap-2">
                    <Search size={18} /> Explore Companies
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/5 hover:shadow-sm">
                  <Link href="/review" className="flex items-center gap-2">
                    <Flag size={18} /> Submit a Review
                  </Link>
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 text-sm text-foreground/60">
                <div className="flex items-center gap-2">
                  <Lock size={14} className="text-green-500" />
                  <span>100% Anonymous</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-blue-500" />
                  <span>No Corporate Filtering</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right side animations */}
          <div className="relative h-[300px] md:h-[400px] hidden sm:block">
            {/* Animated flags and chat bubbles */}
            <motion.div
              className="absolute top-18 right-32"
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              <div className="glass-morphism bg-warning/10 backdrop-blur-sm rounded-lg p-4 border border-warning/20 shadow-lg">
                <div className="flex items-center mb-2">
                  <span className="bg-warning text-white p-2 rounded-lg mr-3 flex items-center justify-center w-8 h-8 shadow-sm">
                    <Flag size={16} />
                  </span>
                  <h4 className="font-medium">Red Flag</h4>
                </div>
                <p className="text-sm">Toxic team culture</p>
              </div>
            </motion.div>

            <motion.div
              className="absolute top-24 left-4"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2.7, ease: "easeInOut" }}
            >
              <div className="glass-morphism bg-success/10 backdrop-blur-sm rounded-lg p-4 border border-success/20 shadow-lg">
                <div className="flex items-center mb-2">
                  <span className="bg-success text-white p-2 rounded-lg mr-3 flex items-center justify-center w-8 h-8 shadow-sm">
                    <Flag size={16} />
                  </span>
                  <h4 className="font-medium">Green Light</h4>
                </div>
                <p className="text-sm">Great manager support</p>
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-12 left-12"
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 3.3, ease: "easeInOut", delay: 0.5 }}
            >
              <div className="glass-morphism bg-primary/10 backdrop-blur-sm rounded-lg p-4 border border-primary/20 shadow-lg">
                <div className="flex items-center mb-2">
                  <span className="bg-primary text-white p-2 rounded-lg mr-3 flex items-center justify-center w-8 h-8 shadow-sm">
                    <MessageSquare size={16} />
                  </span>
                  <h4 className="font-medium">Employee Says</h4>
                </div>
                <p className="text-sm">"Flexible work hours saved me"</p>
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-32 right-12"
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.7 }}
            >
              <div className="glass-morphism bg-secondary/10 backdrop-blur-sm rounded-lg p-4 border border-secondary/20 shadow-lg">
                <div className="flex items-center mb-2">
                  <span className="bg-secondary text-white p-2 rounded-lg mr-3 flex items-center justify-center w-8 h-8 shadow-sm">
                    <AlertTriangle size={16} />
                  </span>
                  <h4 className="font-medium">Warning</h4>
                </div>
                <p className="text-sm">Bad management practices</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}