
import { motion } from 'framer-motion';
import { Compass, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[75vh] items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass w-full max-w-xl space-y-6 p-10 text-center"
      >
        <p className="text-7xl font-extrabold text-plum">404</p>

        <h1 className="text-3xl font-bold text-plum">
          Page Not Found
        </h1>

        <p className="leading-relaxed text-mauve">
          Oops! The page you're looking for doesn't exist
          or may have been moved.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl bg-plum px-5 py-3 font-semibold text-white transition hover:bg-mauve"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>

          <Link
            to="/explore"
            className="inline-flex items-center gap-2 rounded-xl border border-dusty px-5 py-3 font-semibold text-plum transition hover:bg-white"
          >
            <Compass className="h-4 w-4" />
            Explore Topics
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
