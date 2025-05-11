
import { HowItWorks } from "@/components/HowItWorks";
import { motion } from "framer-motion";

export default function HowItWorksPage() {
  return (
    <div>
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="font-poppins font-bold text-4xl md:text-5xl mb-6">
              How OnlyEmployees Works
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We've created a simple process to help job seekers get the real insights they need,
              while protecting employee anonymity.
            </p>
          </motion.div>
        </div>
      </section>

      <HowItWorks />

      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="bg-muted/30 rounded-lg p-8 md:p-12 border border-border">
            <h2 className="font-poppins font-bold text-2xl md:text-3xl mb-4">
              Frequently Asked Questions
            </h2>

            <div className="space-y-8 mt-8">
              <div>
                <h3 className="font-medium text-xl mb-2">
                  How do you ensure anonymity?
                </h3>
                <p className="text-muted-foreground">
                  We never collect personally identifiable information. Reviews are
                  only tied to general role categories and experience levels.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-xl mb-2">
                  Can companies remove negative reviews?
                </h3>
                <p className="text-muted-foreground">
                  No. We maintain the integrity of all data collected. Companies cannot
                  remove or alter reviews, but they can respond to them.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-xl mb-2">
                  Why only yes/no questions?
                </h3>
                <p className="text-muted-foreground">
                  This format provides clearer insights than arbitrary star ratings. 
                  It forces concrete responses to specific workplace factors.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-xl mb-2">
                  How is this different from Glassdoor?
                </h3>
                <p className="text-muted-foreground">
                  We focus exclusively on binary workplace insights rather than subjective
                  ratings or lengthy reviews. We're also completely open source and community-driven.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
