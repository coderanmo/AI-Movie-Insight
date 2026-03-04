'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Sun, Moon, Film } from 'lucide-react';

export function Navbar() {
    const [isDark, setIsDark] = useState(true);

    // Initialize from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('theme');
        const prefersDark = saved ? saved === 'dark' : true;
        setIsDark(prefersDark);
        applyTheme(prefersDark);
    }, []);

    const applyTheme = (dark: boolean) => {
        if (dark) {
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
        } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
        }
    };

    const toggleTheme = () => {
        const newDark = !isDark;
        setIsDark(newDark);
        applyTheme(newDark);
        localStorage.setItem('theme', newDark ? 'dark' : 'light');
    };

    return (
        <nav
            className="theme-nav w-full border-b backdrop-blur-md sticky top-0 z-50"
            style={{ backgroundColor: 'var(--nav-bg)', borderColor: 'var(--nav-border)' }}
        >
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 text-xl font-bold">
                    <Film className="text-purple-400 w-6 h-6" />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                        InsightBuilder
                    </span>
                </Link>

                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full transition-all hover:scale-110"
                    style={{
                        background: 'var(--card-bg)',
                        border: '1px solid var(--card-border)',
                        color: 'var(--text-primary)'
                    }}
                    aria-label="Toggle dark/light mode"
                    title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                    {isDark
                        ? <Sun className="w-5 h-5 text-yellow-300" />
                        : <Moon className="w-5 h-5 text-blue-500" />
                    }
                </button>
            </div>
        </nav>
    );
}
