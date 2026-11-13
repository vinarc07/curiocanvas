
import { motion } from 'framer-motion';
import { UserRound, GraduationCap, Hash, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStudent } from '@/context/StudentContext';

export default function ProfilePage() {
  const { student, logout } = useStudent();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <section className="glass space-y-3 p-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-mauve">
          Student account
        </p>
        <h1 className="text-3xl font-bold text-plum sm:text-4xl">
          My Profile
        </h1>
        <p className="text-mauve">
          View your student registration information.
        </p>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass space-y-6 p-8"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-plum text-white">
            <UserRound className="h-8 w-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-plum">
              {student?.studentName ?? 'Student'}
            </h2>
            <p className="text-sm text-mauve">Registered learner</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4 rounded-2xl bg-white/70 p-4">
            <UserRound className="h-5 w-5 text-mauve" />
            <div>
              <p className="text-xs text-mauve">Student name</p>
              <p className="font-semibold text-plum">
                {student?.studentName ?? 'Not available'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl bg-white/70 p-4">
            <GraduationCap className="h-5 w-5 text-mauve" />
            <div>
              <p className="text-xs text-mauve">School / College</p>
              <p className="font-semibold text-plum">
                {student?.schoolName ?? 'Not available'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl bg-white/70 p-4">
            <Hash className="h-5 w-5 text-mauve" />
            <div>
              <p className="text-xs text-mauve">Registration number</p>
              <p className="font-semibold text-plum">
                {student?.registrationNumber ?? 'Not available'}
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-plum px-5 py-3 font-semibold text-white transition hover:bg-mauve"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </motion.section>
    </div>
  );
}
