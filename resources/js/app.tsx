import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './providers/AuthProvider';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob('./pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<ThemeProvider defaultTheme="system" storageKey="onlyemployees-theme">
            <AuthProvider>
                <TooltipProvider>
                    <Toaster />
                    <div className="flex flex-col min-h-screen">
                        <Header />
                        <main className="flex-1">
                            <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                                <App {...props} />
                            </BrowserRouter>
                        </main>
                        <Footer />
                    </div>
                </TooltipProvider>
            </AuthProvider>
        </ThemeProvider>);
    },
    progress: {
        color: "#6D58FF",
    },
});
