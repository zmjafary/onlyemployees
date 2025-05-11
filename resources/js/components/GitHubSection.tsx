
import { Button } from "@/components/ui/button";
import { Github, Coffee } from 'lucide-react';


export function GitHubSection() {
  return (
    <section className="py-16 bg-primary/5">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-4">
            Open and Community-Powered
          </h2>
          <p className="text-muted-foreground mb-8">
            OnlyEmployees is built in the open. Developers, designers, and contributors are welcome.
            Join us in creating a more transparent workplace culture.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="default"
              asChild
              className="bg-primary hover:bg-primary/90 text-white"
            >
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={18} /> Contribute on GitHub
              </a>
            </Button>
            <Button
              variant="outline"
              className="text-primary border-primary hover:bg-primary/10"
              asChild
            >
              <a
                href="https://buymeacoffee.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Coffee size={18} /> Support on BuyMeACoffee
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
