import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { CreateRecipeForm } from "@/components/recipe/create-recipe-form";
import { redirect } from "next/navigation";
import Link from "next/link";
import { IconFlame } from "@tabler/icons-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

export default async function CreateRecipePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen flex-col bg-orange-50/30 dark:bg-zinc-950">
      {/* Navigation Minimale */}
      <header className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-40">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <IconFlame size={28} className="text-orange-600" />
            <span className="font-extrabold text-2xl tracking-tight text-orange-950 dark:text-orange-500 hidden sm:inline">Dumuni.</span>
          </Link>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <Link href="/dashboard">
              <Button variant="ghost" className="rounded-full text-foreground hover:bg-orange-100 dark:hover:bg-zinc-800">
                Annuler
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container max-w-4xl py-12">
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground mb-2">
            Partagez votre Plat Signature 🍲
          </h1>
          <p className="text-lg text-muted-foreground">
            Inspirez la communauté en ajoutant votre recette ! Gagnez 50 XP et rapprochez-vous du rang Légende du Tô.
          </p>
        </div>

        <CreateRecipeForm userName={session.user.name} />
      </main>
    </div>
  );
}
