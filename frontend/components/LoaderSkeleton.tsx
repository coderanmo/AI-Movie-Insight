import { GlassCard } from './GlassCard';

export function LoaderSkeleton() {
    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-pulse">
            <div className="h-64 rounded-2xl theme-card border w-full mb-8"></div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-6">
                    <div className="aspect-[2/3] rounded-2xl theme-card border w-full shadow-2xl"></div>
                    <GlassCard>
                        <div className="h-6 bg-black/10 dark:bg-white/10 rounded w-3/4 mb-4"></div>
                        <div className="h-4 bg-black/10 dark:bg-white/10 rounded w-1/2 mb-2"></div>
                        <div className="h-4 bg-black/10 dark:bg-white/10 rounded w-5/6"></div>
                    </GlassCard>
                </div>

                <div className="lg:col-span-2 space-y-8">
                    <GlassCard>
                        <div className="h-8 bg-black/10 dark:bg-white/10 rounded w-1/4 mb-6"></div>
                        <div className="space-y-3">
                            <div className="h-4 bg-black/10 dark:bg-white/10 rounded w-full"></div>
                            <div className="h-4 bg-black/10 dark:bg-white/10 rounded w-full"></div>
                            <div className="h-4 bg-black/10 dark:bg-white/10 rounded w-4/5"></div>
                        </div>
                    </GlassCard>

                    <div className="h-96 rounded-2xl theme-card border w-full"></div>
                </div>
            </div>
        </div>
    );
}
