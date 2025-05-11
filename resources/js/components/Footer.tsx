
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from '@inertiajs/react';

export function Footer() {
  return (
    <footer className="bg-muted">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-4">
            <Link href="/" className="flex items-center">
              <img
                src="/uploads/logo.png"
                alt="OnlyEmployees"
                className="h-8 mb-4"
              />
            </Link>
            <p className="text-sm text-muted-foreground mb-6 max-w-md">
              The no-BS way to find out what working somewhere is really like.
              No ratings. No fluff. Just red flags, green lights, and the truth—straight from employees, anonymously.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-base mb-3">Site Map</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/explore" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Explore Companies
                </Link>
              </li>
              <li>
                <Link href="/review" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Submit a Review
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-base mb-3">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/onlyemployees"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  GitHub Repository
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/company/onlyemployees"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-base mb-3">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-use" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-base mb-3">Stay in the loop</h4>
            <p className="text-sm text-muted-foreground mb-4">Be first to hear updates.</p>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input type="email" placeholder="Email" className="h-9" />
              <Button size="sm" type="submit">Get Notified</Button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} OnlyEmployees. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground mt-2 md:mt-0">
              Built with ❤️ by the community
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
