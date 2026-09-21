import { LoginForm } from "@/components/auth/login-form";
import { IconFlame } from "@tabler/icons-react";

export const metadata = {
  title: "Connexion | Dumuni - Cuisine Africaine",
  description: "Connectez-vous à votre compte Dumuni pour retrouver vos recettes favorites.",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-svh relative overflow-hidden">
      {/* Left side - Decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange-600 via-orange-500 to-yellow-500 relative flex-col justify-between p-12 text-white">
        {/* Decorative blobs */}
        <div className="absolute top-[-15%] right-[-15%] w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-10%] w-80 h-80 bg-yellow-300/20 rounded-full blur-3xl" />
        <div className="absolute top-[40%] left-[30%] w-48 h-48 bg-orange-300/20 rounded-full blur-2xl" />

        {/* Logo top */}
        <div className="flex items-center gap-2 relative z-10">
          <IconFlame size={32} className="text-white" />
          <span className="font-extrabold text-2xl">Dumuni.</span>
        </div>

        {/* Central content */}
        <div className="relative z-10 space-y-6">
          <h2 className="text-5xl font-extrabold leading-tight tracking-tight">
            Cuisinez avec<br />
            <span className="text-yellow-200">passion.</span>
          </h2>
          <p className="text-lg text-orange-100 max-w-md leading-relaxed">
            Rejoignez des milliers de passionnés de cuisine africaine. Découvrez, cuisinez
            et partagez les saveurs authentiques du continent.
          </p>

          {/* Stats */}
          <div className="flex gap-8 mt-8">
            <div>
              <div className="text-3xl font-extrabold">2K+</div>
              <div className="text-orange-200 text-sm font-medium">Recettes</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold">500+</div>
              <div className="text-orange-200 text-sm font-medium">Cuisiniers</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold">25+</div>
              <div className="text-orange-200 text-sm font-medium">Pays</div>
            </div>
          </div>
        </div>

        {/* Footer quote */}
        <div className="relative z-10">
          <blockquote className="text-orange-100 italic text-sm border-l-2 border-orange-300 pl-4">
            &ldquo;La cuisine est le ciment des familles africaines.&rdquo;
          </blockquote>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-10 bg-zinc-50/50 dark:bg-zinc-950 relative">
        {/* Mobile decorative blobs */}
        <div className="absolute top-[-10%] right-[-5%] w-72 h-72 bg-orange-200/30 dark:bg-orange-950/20 rounded-full blur-3xl lg:hidden pointer-events-none" />
        <div className="absolute bottom-[-5%] left-[-5%] w-60 h-60 bg-yellow-200/20 dark:bg-yellow-950/10 rounded-full blur-3xl lg:hidden pointer-events-none" />

        <div className="w-full max-w-md relative z-10">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
