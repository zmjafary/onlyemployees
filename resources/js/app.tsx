import '../css/app.css';
import './bootstrap';

import GoogleTagManager from "@/components/analytics/GoogleTagManager";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from '@/providers/AuthProvider';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
const GTM_ID = import.meta.env.VITE_GTM_ID || "";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob('./pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(  <QueryClientProvider client={queryClient}>
            <ThemeProvider defaultTheme="system" storageKey="onlyemployees-theme">
                <AuthProvider>
                    <TooltipProvider>
                        <Toaster />
                        <GoogleTagManager id={GTM_ID} />
                        <div className="flex flex-col min-h-screen">
                            <Header />
                            <main className="flex-1">
                                <App {...props} />
                            </main>
                            <Footer />
                        </div>
                    </TooltipProvider>
                </AuthProvider>
            </ThemeProvider>
        </QueryClientProvider>);
    },
    progress: {
        color: "#6D58FF",
    },
});
