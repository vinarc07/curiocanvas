
import { AnimatePresence, motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useMemo, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { TOPICS } from '@/content/topics';
import { validateTopicQuery } from '@/lib/validation';

interface SearchBarProps {
  placeholder?: string;
  initialQuery?: string;
}

export function SearchBar({
  placeholder = 'Search any topic, subject or question...',
  initialQuery = '',
}: SearchBarProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState(initialQuery);
  const [error, setError] = useState<string | null>(null);
  const [focused, setFocused] = useState(false);

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) return TOPICS.slice(0, 5);

    return TOPICS.filter(
      (topic) =>
        topic.title.toLowerCase().includes(q) ||
        topic.aliases.some((alias) => alias.toLowerCase().includes(q)),
    ).slice(0, 5);
  }, [query]);

  const submit = (value: string) => {
    const validation = validateTopicQuery(value);
    setError(validation);

    if (validation) return;

    setFocused(false);
    navigate(`/search?q=${encodeURIComponent(value.trim())}`);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submit(query);
  };

  return (
    <div className="relative w-full">
      <form
        onSubmit={handleSubmit}
        role="search"
        className="flex w-full flex-col gap-4 sm:flex-row sm:items-stretch"
      >
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute left-6 top-1/2 h-6 w-6 -translate-y-1/2 text-dusty" />

          <input
            type="search"
            value={query}
            placeholder={placeholder}
            aria-label="Search for an educational topic"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? 'search-error' : undefined}
            onChange={(event) => {
              setQuery(event.target.value);
              setError(null);
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 150)}
            className={`field h-16 w-full rounded-2xl pl-16 pr-5 text-lg shadow-soft transition-all duration-200 focus:ring-2 focus:ring-mauve/30 ${
              error ? 'field-error' : ''
            }`}
          />

          <AnimatePresence>
            {focused && suggestions.length > 0 && (
              <motion.ul
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
                className="absolute left-0 right-0 top-full z-30 mt-2 max-h-80 overflow-y-auto rounded-2xl border border-white/70 bg-white/95 p-2 shadow-glass backdrop-blur-xl"
              >
                <li className="px-3 pb-2 pt-2 text-xs font-semibold uppercase tracking-wider text-mauve">
                  {query.trim() ? 'Suggested topics' : 'Popular topics'}
                </li>

                {suggestions.map((topic) => (
                  <li key={topic.slug}>
                    <button
                      type="button"
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => {
                        setQuery(topic.title);
                        submit(topic.title);
                      }}
                      className="flex w-full items-center justify-between gap-3 rounded-xl px-4 py-3 text-left text-base text-plum transition-colors hover:bg-blush/50"
                    >
                      <span className="font-medium">{topic.title}</span>
                      <span className="shrink-0 text-xs text-mauve">
                        {topic.category}
                      </span>
                    </button>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        <Button
          type="submit"
          className="h-16 w-full shrink-0 rounded-2xl px-10 text-lg sm:w-auto"
          icon={<Search className="h-6 w-6" />}
        >
          Search
        </Button>
      </form>

      {error && (
        <p id="search-error" role="alert" className="mt-3 text-sm font-medium text-danger">
          {error}
        </p>
      )}

      <p className="mt-3 text-sm text-mauve">
        Explore science, technology, space, biology and more.
      </p>
    </div>
  );
}
