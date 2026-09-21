import { SignupForm } from "@/components/auth/signup-form";
import { IconFlame } from "@tabler/icons-react";

export const metadata = {
  title: "Inscription | Dumuni - Cuisine Africaine",
  description: "Créez votre compte Dumuni et rejoignez la communauté de cuisiniers africains.",
};

export default function SignupPage() {
  return (
    <div className="flex min-h-svh relative overflow-hidden">
      {/* Left side - Decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-yellow-500 via-orange-500 to-orange-700 relative flex-col justify-between p-12 text-white">
        {/* Decorative blobs */}
        <div className="absolute top-[-15%] left-[-15%] w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-orange-300/20 rounded-full blur-3xl" />
        <div className="absolute top-[50%] right-[25%] w-48 h-48 bg-yellow-300/15 rounded-full blur-2xl" />

        {/* Logo top */}
        <div className="flex items-center gap-2 relative z-10">
          <IconFlame size={32} className="text-white" />
          <span className="font-extrabold text-2xl">Dumuni.</span>
        </div>

        {/* Central content */}
        <div className="relative z-10 space-y-6">
          <h2 className="text-5xl font-extrabold leading-tight tracking-tight">
            Commencez<br />
            votre <span className="text-yellow-200">aventure.</span>
          </h2>
          <p className="text-lg text-orange-100 max-w-md leading-relaxed">
            Créez votre profil, sauvegardez vos recettes préférées et gagnez des badges
            en partageant vos créations culinaires.
          </p>

          {/* Features list */}
          <div className="space-y-4 mt-8">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-white/15 flex items-center justify-center text-lg">🧑‍🍳</div>
              <div>
                <div className="font-bold text-sm">Mode Mains-Libres</div>
                <div className="text-orange-200 text-xs">Cuisinez sans toucher votre écran</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-white/15 flex items-center justify-center text-lg">🧺</div>
              <div>
                <div className="font-bold text-sm">Vide-Frigo Intelligent</div>
                <div className="text-orange-200 text-xs">Trouvez des recettes avec ce que vous avez</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-white/15 flex items-center justify-center text-lg">🏆</div>
              <div>
                <div className="font-bold text-sm">Badges & Progression</div>
                <div className="text-orange-200 text-xs">Montez en niveau et débloquez des trophées</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10">
          <p className="text-orange-200 text-sm">
            Gratuit • Sans engagement • Rejoignez l&apos;aventure
          </p>
        </div>
      </div>

      {/* Right side - Signup form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-10 bg-zinc-50/50 dark:bg-zinc-950 relative">
        {/* Mobile decorative blobs */}
        <div className="absolute top-[-10%] left-[-5%] w-72 h-72 bg-yellow-200/30 dark:bg-yellow-950/20 rounded-full blur-3xl lg:hidden pointer-events-none" />
        <div className="absolute bottom-[-5%] right-[-5%] w-60 h-60 bg-orange-200/20 dark:bg-orange-950/10 rounded-full blur-3xl lg:hidden pointer-events-none" />

        <div className="w-full max-w-md relative z-10">
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
