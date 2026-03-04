import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '../components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'AI Movie Insight Builder',
    description: 'AI-powered movie insights and sentiment analysis.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark">
            <body className={`${inter.className} min-h-screen selection:bg-purple-500/30`}>
                {/* Animated background blobs — use CSS vars so they change with theme */}
                <div className="fixed inset-0 z-[-1] overflow-hidden">
                    <div className="bg-blob-purple absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px]" />
                    <div className="bg-blob-blue absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px]" />
                </div>

                <Navbar />

                <main className="min-h-[calc(100vh-4rem)] p-4 md:p-8 max-w-7xl mx-auto">
                    {children}
                </main>
            </body>
        </html>
    );
}
