import "./globals.css";
import Link from "next/link";


export default function RootLayout({ children }) {
    return (
        <html lang="en" className="h-full bg-gradient-to-br from-gray-950 via-gray-900 to-black text-gray-100 antialiased">
            <head>
                <title>Movie Catalogue</title>
            </head>
            <body className="min-h-screen flex flex-col relative">
                {/* Background glow effects */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-indigo-600/30 rounded-full blur-3xl" />
                    <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />
                </div>

                {/* Header */}
                <header className="sticky top-0 z-50 backdrop-blur-md bg-gray-900/70 border-b border-gray-800 shadow-xl">
                    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                        <h1 className="flex items-center gap-2 text-2xl font-extrabold drop-shadow">
                            <span className="text-3xl">🎬</span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">
                                Movie Catalogue
                            </span>
                        </h1>

                        <nav className="space-x-6 text-sm font-medium">
                            <Link href="/" className="hover:text-pink-400 transition">
                                Home
                            </Link>
                            <Link href="/movies" className="hover:text-pink-400 transition">
                                Movies
                            </Link>
                            <Link href="/tv" className="hover:text-pink-400 transition">
                                TV Shows
                            </Link>
                        </nav>
                    </div>
                </header>

                {/* Main content */}
                <main className="flex-1 max-w-7xl mx-auto px-6 py-10">
                    <div className="backdrop-blur-xl bg-gray-900/50 rounded-xl shadow-2xl border border-gray-800 p-8">
                        {children}
                    </div>
                </main>

                {/* Footer */}
                <footer className="bg-gray-900/70 backdrop-blur-md border-t border-gray-800 py-4 text-center text-sm text-gray-400">
                    © {new Date().getFullYear()} Movie Catalogue · Built with ❤️
                </footer>
            </body>
        </html>
    );
}
