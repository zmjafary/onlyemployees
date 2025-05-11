<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>OnlyEmployees - Know Before You Go</title>
        <meta name="description"
        content="The No-BS Way to Find Out What Working Somewhere is Really Like. Anonymous workplace insights with red flags and green lights." />
        <meta name="author" content="OnlyEmployees" />

        <meta property="og:title" content="OnlyEmployees - Know Before You Go" />
        <meta property="og:description"
        content="The No-BS Way to Find Out What Working Somewhere is Really Like. Anonymous workplace insights with red flags and green lights." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/uploads/og.png" />

        <link rel="icon" type="image/png" href="/favicons/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicons/favicon.svg" />
        <link rel="shortcut icon" href="/favicons/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="OnlyEmployees" />
        <link rel="manifest" href="/favicons/site.webmanifest" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@OnlyEmployees" />
        <meta name="twitter:image" content="/uploads/og.png" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
