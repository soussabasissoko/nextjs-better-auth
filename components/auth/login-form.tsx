"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { IconLoader, IconFlame, IconEye, IconEyeOff } from "@tabler/icons-react";
import Link from "next/link";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    await authClient.signIn.email(
      {
        email,
        password,
        callbackURL: "/dashboard",
        rememberMe: true,
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          window.location.href = "/dashboard";
        },
        onError: (ctx) => {
          setError(ctx.error.message);
          setLoading(false);
        },
      }
    );
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {/* Logo Dumuni */}
      <div className="flex items-center justify-center gap-2 mb-2">
        <IconFlame size={36} className="text-orange-600" />
        <span className="font-extrabold text-3xl tracking-tight text-orange-950 dark:text-orange-500">
          Dumuni.
        </span>
      </div>

      <Card className="border-0 shadow-2xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-3xl overflow-hidden relative">
        {/* Decorative gradient top bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-orange-400 via-orange-500 to-yellow-400" />

        <CardHeader className="text-center pb-2 pt-8">
          <CardTitle className="text-2xl font-extrabold tracking-tight">
            Content de vous revoir ! 👋
          </CardTitle>
          <CardDescription className="text-base">
            Connectez-vous pour retrouver vos recettes favorites
          </CardDescription>
        </CardHeader>

        <CardContent className="px-8 pb-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-2xl flex items-start gap-3">
              <span className="text-red-500 text-lg shrink-0">⚠️</span>
              <p className="text-sm text-red-700 dark:text-red-300 font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-5">
              {/* Email */}
              <div className="grid gap-2">
                <Label htmlFor="login-email" className="font-semibold text-sm">
                  Adresse email
                </Label>
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  id="login-email"
                  type="email"
                  placeholder="votre@email.com"
                  required
                  className="h-12 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 focus-visible:ring-orange-500 text-base placeholder:text-zinc-400"
                />
              </div>

              {/* Password */}
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="login-password" className="font-semibold text-sm">
                    Mot de passe
                  </Label>
                  <Link
                    href="#"
                    className="ml-auto text-sm text-orange-600 hover:text-orange-700 font-medium hover:underline underline-offset-4"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    className="h-12 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 focus-visible:ring-orange-500 text-base pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
                  </button>
                </div>
              </div>

              {/* Submit button */}
              <Button
                disabled={loading}
                type="submit"
                className="w-full h-12 text-base font-bold rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg shadow-orange-500/25 transition-all hover:shadow-xl hover:shadow-orange-500/30 hover:-translate-y-0.5 active:translate-y-0"
              >
                {loading ? (
                  <IconLoader className="animate-spin mr-2" stroke={2} size={20} />
                ) : null}
                {loading ? "Connexion en cours..." : "Se connecter"}
              </Button>

              {/* Divider */}
              <div className="relative my-1">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-zinc-200 dark:border-zinc-700" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white dark:bg-zinc-900 px-3 text-muted-foreground font-medium">
                    ou continuer avec
                  </span>
                </div>
              </div>

              {/* Google button */}
              <Button
                type="button"
                variant="outline"
                className="w-full h-12 rounded-xl font-semibold border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
              >
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continuer avec Google
              </Button>
            </div>

            {/* Sign up link */}
            <div className="mt-8 text-center text-sm">
              <span className="text-muted-foreground">Pas encore de compte ?</span>{" "}
              <Link
                href="/signup"
                className="text-orange-600 hover:text-orange-700 font-bold underline-offset-4 hover:underline"
              >
                Créer un compte
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
