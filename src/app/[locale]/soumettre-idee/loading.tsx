import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-b border-zinc-300 dark:border-zinc-800">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto text-center"
        >
          <div className="h-12 bg-zinc-300 dark:bg-zinc-800 rounded-lg mb-4 max-w-2xl mx-auto animate-pulse" />
          <div className="h-6 bg-zinc-300 dark:bg-zinc-800 rounded-lg mb-3 max-w-lg mx-auto animate-pulse" />
          <div className="h-5 bg-zinc-300 dark:bg-zinc-800 rounded-lg max-w-xl mx-auto animate-pulse" />
        </motion.div>
      </section>

      {/* Content Section */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Form Skeleton */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-700 rounded-xl p-8">
              <div className="space-y-5">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i}>
                    <div className="h-4 bg-zinc-300 dark:bg-zinc-800 rounded-lg mb-2 w-1/4 animate-pulse" />
                    <div className="h-10 bg-zinc-300 dark:bg-zinc-800 rounded-lg animate-pulse" />
                  </div>
                ))}
                <div className="h-12 bg-zinc-300 dark:bg-zinc-800 rounded-lg animate-pulse mt-6" />
              </div>
            </div>
          </motion.div>

          {/* Right: Wall Skeleton */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div>
              <div className="h-8 bg-zinc-300 dark:bg-zinc-800 rounded-lg mb-6 w-1/3 animate-pulse" />
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl p-6 animate-pulse"
                  >
                    <div className="h-5 bg-zinc-300 dark:bg-zinc-800 rounded-lg mb-3 w-1/3" />
                    <div className="flex gap-2 mb-4">
                      <div className="h-6 bg-zinc-300 dark:bg-zinc-800 rounded-full w-20" />
                      <div className="h-6 bg-zinc-300 dark:bg-zinc-800 rounded-full w-24" />
                    </div>
                    <div className="h-4 bg-zinc-300 dark:bg-zinc-800 rounded-lg mb-4 w-full" />
                    <div className="flex justify-between">
                      <div className="h-5 bg-zinc-300 dark:bg-zinc-800 rounded-lg w-16" />
                      <div className="h-9 bg-zinc-300 dark:bg-zinc-800 rounded-lg w-20" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
