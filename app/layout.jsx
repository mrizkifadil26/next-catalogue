"use client";

import "./globals.css";
import Link from "next/link";
import { useState } from "react";
import { Inter, Roboto_Condensed, JetBrains_Mono } from "next/font/google";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const robotoCondensed = Roboto_Condensed({ subsets: ["latin"], variable: "--font-alt" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export default function RootLayout({ children }) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <html
            lang="en"
            className={`
                h-full
                bg-gradient-to-br from-gray-950 via-gray-900 to-black 
                text-gray-100 antialiased 
                ${inter.variable} ${robotoCondensed.variable} ${jetbrainsMono.variable}
            `}
        >
            <head>
                <title>Movie Catalogue</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </head>
            <body className="min-h-screen flex flex-col relative">
                {/* Background glow */}
                <div className="absolute inset-0 -z-10">
                    {/* Top-left glow */}
                    <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-72 sm:h-72 sm:left-1/3 bg-indigo-600/30 rounded-full blur-3xl" />

                    {/* Bottom-right glow */}
                    <div className="absolute bottom-1/3 right-1/6 w-64 h-64 sm:w-96 sm:h-96 sm:right-1/4 bg-pink-500/20 rounded-full blur-3xl" />
                </div>

                {/* Header */}
                <header className="backdrop-blur-lg bg-gray-900/90 sm:bg-gray-900/70 sm:backdrop-blur-md shadow-lg">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
                        {/* Logo / Title */}
                        <h1 className="flex items-center gap-2 font-extrabold drop-shadow">
                            <span className="text-3xl">🎬</span>
                            <span className="hidden sm:inline text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400 text-2xl">
                                Movie Catalogue
                            </span>
                        </h1>

                        {/* Desktop Nav */}
                        <nav className="hidden sm:flex space-x-6 text-sm font-medium">
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

                        {/* Mobile Hamburger */}
                        <button
                            className="sm:hidden p-2 rounded-md hover:bg-gray-800 transition"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            {menuOpen ? (
                                <XMarkIcon className="w-6 h-6" />
                            ) : (
                                <Bars3Icon className="w-6 h-6" />
                            )}
                        </button>
                    </div>

                    {/* Mobile Nav Dropdown with animation */}
                    <div
                        className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                            }`}
                    >
                        <nav className="flex flex-col px-6 py-5 space-y-4 text-base font-medium bg-gray-900/95 backdrop-blur-md border-t border-gray-800 rounded-b-lg shadow-lg">
                            <Link
                                href="/"
                                className="hover:text-pink-400 transition"
                                onClick={() => setMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                href="/movies"
                                className="hover:text-pink-400 transition"
                                onClick={() => setMenuOpen(false)}
                            >
                                Movies
                            </Link>
                            <Link
                                href="/tv"
                                className="hover:text-pink-400 transition"
                                onClick={() => setMenuOpen(false)}
                            >
                                TV Shows
                            </Link>
                        </nav>
                    </div>
                </header>

                {/* Main content */}
                <main className="flex-1 w-full sm:max-w-7xl mx-auto p-2 sm:p-6">
                    <div className="backdrop-blur-xl bg-gray-900/50 rounded-xl shadow-2xl border border-gray-800 p-4 sm:p-8">
                        {children}
                    </div>
                </main>

                {/* Footer */}
                <footer className="flex-none bg-gray-900/70 backdrop-blur-md border-t border-gray-800 py-4 text-center text-xs sm:text-sm text-gray-400">
                    © {new Date().getFullYear()} Movie Catalogue · Built with ❤️
                </footer>
            </body>
        </html>
    );
}
