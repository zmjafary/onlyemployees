
import { motion } from "framer-motion";
import { CheckCircleIcon, ClipboardIcon, EyeIcon, ShieldCheckIcon } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Paste a LinkedIn company URL",
    description: "Start by sharing the LinkedIn URL of the company you want to review or explore.",
    icon: <ClipboardIcon size={24} className="text-primary" />,
  },
  {
    id: 2,
    title: "Stay 100% anonymous",
    description: "Your identity is never revealed. We only show your role and experience level.",
    icon: <ShieldCheckIcon size={24} className="text-primary" />,
  },
  {
    id: 3,
    title: "Answer a simple Yes/No survey",
    description: "No lengthy reviews. Just answer yes or no to key workplace questions.",
    icon: <CheckCircleIcon size={24} className="text-primary" />,
  },
  {
    id: 4,
    title: "See public results — no login needed",
    description: "Browse insights freely without creating an account or logging in.",
    icon: <EyeIcon size={24} className="text-primary" />,
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform makes it simple to share and access real workplace insights
            without the fluff or corporate filtering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-background rounded-lg p-6 shadow-sm border border-border relative"
            >
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-xl">
                {step.icon}
              </div>
              <h3 className="font-poppins font-semibold text-xl mb-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {step.description}
              </p>
              <div className="absolute -top-2 -left-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                {step.id}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
