
import { Button } from "@/components/ui/button";
import { Link } from '@inertiajs/react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
      <h1 className="font-poppins font-bold text-6xl md:text-8xl mb-6 text-primary">404</h1>
      <h2 className="font-poppins font-semibold text-2xl md:text-3xl mb-4">Page Not Found</h2>
      <p className="text-muted-foreground mb-8 text-center max-w-md">
        Sorry, we couldn't find the page you were looking for. It might have been moved or deleted.
      </p>
      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
