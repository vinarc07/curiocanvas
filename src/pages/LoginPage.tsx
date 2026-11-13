import { LoginBrandPanel } from '@/components/auth/LoginBrandPanel';
import { LoginForm } from '@/components/auth/LoginForm';
import { FloatingShapes } from '@/components/ui/FloatingShapes';

export default function LoginPage() {
  return (
    <div className="relative min-h-screen bg-ivory lg:grid lg:grid-cols-[1.1fr_1fr]">
      <LoginBrandPanel />
      <div className="relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-ivory via-blush/50 to-ivory px-5 py-12 sm:px-10 lg:min-h-screen">
        <FloatingShapes />
        <div className="relative z-10 w-full max-w-md">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
