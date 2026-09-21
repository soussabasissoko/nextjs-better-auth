import { auth } from "@/lib/auth";
import { headers } from "next/headers";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import {
  IconChevronRight,
  IconClock,
  IconFlame,
  IconUserCircle,
} from "@tabler/icons-react";
import { PantrySearch } from "@/components/pantry-search";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const MOCK_RECIPES = [
  {
    id: 1,
    title: "Tô au Gombo (Mali)",
    time: "45 min",
    difficulty: "Moyen",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrIDazFv6Sw_p-jEaPRJGTLUOYExSrhLkoia_-absS9A&s=10",
    tags: ["Populaire", "Traditionnel"],
  },
  {
    id: 2,
    title: "Poulet Yassa",
    time: "1h 20",
    difficulty: "Facile",
    image: "https://t3.ftcdn.net/jpg/20/62/45/62/360_F_2062456278_QZViBVrYSngBXjUuJh7XiPYn63GjoMOj.webp",
    tags: ["Rapide", "Épicé"],
  },
  {
    id: 3,
    title: "Tigadèguèna (Mafé)",
    time: "2h",
    difficulty: "Moyen",
    image: "https://t4.ftcdn.net/jpg/18/42/63/77/240_F_1842637716_XcjM8AZggah48Zmyn68tiB8nSRRDVfUY.jpg",
    tags: ["Arachide", "Mali"],
  },
  {
    id: 4,
    title: "Sauce Fakoye",
    time: "1h 30",
    difficulty: "Difficile",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrbclt_RMSrC0a2Ch1Wn4krrhafOJcHDHXGaKfwy78jA&s=10",
    tags: ["Nord du Mali", "Fête"],
  },
  {
    id: 5,
    title: "Widjila",
    time: "2h 15",
    difficulty: "Moyen",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2W-4ht54VOi2HZE_PuJIdqpMk8QtbZ4o8QBIRYiQ_ew&s=10",
    tags: ["Pain vapeur", "Viande"],
  },
  {
    id: 6,
    title: "Djouka (Fonio)",
    time: "1h 00",
    difficulty: "Facile",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTwqWfr374aVxkRJwjN1sSRker6nbSgVwyR5GUwlQXww&s=10",
    tags: ["Léger", "Rapide", "Pâte d'arachide"],
  }
];

export default async function page(props: { searchParams?: Promise<{ ingredients?: string }> | { ingredients?: string } }) {
  const searchParams = props.searchParams ? await props.searchParams : {};
  const queryIngredients = (searchParams?.ingredients || "").split(",").map((i: string) => i.trim().toLowerCase()).filter(Boolean);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Logique simple "Vide Frigo" : S'il y a des ingrédients sélectionnés, 
  // on filtre les recettes qui matchent. Sinon, on montre tout.
  const displayedRecipes = queryIngredients.length > 0 
    ? MOCK_RECIPES.filter(recipe => {
        const recipeText = (recipe.title + " " + recipe.tags.join(" ")).toLowerCase();
        return queryIngredients.some(ing => recipeText.includes(ing));
      })
    : MOCK_RECIPES;

  return (
    <div className="flex min-h-screen flex-col bg-orange-50/30 dark:bg-zinc-950">
      {/* Navigation */}
      <header className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <IconFlame size={28} className="text-orange-600" />
            <span className="font-extrabold text-2xl tracking-tight text-orange-950 dark:text-orange-500">
              Dumuni.
            </span>
          </div>
          <nav className="flex items-center gap-4">
            <ModeToggle />
            {session?.user ? (
              <>
                <Link href="/recipe/create">
                  <Button variant="outline" className="rounded-full border-orange-200 text-orange-700 hover:bg-orange-100 hidden sm:flex">
                    + Ajouter une recette
                  </Button>
                </Link>
                <a href="/dashboard">
                  <Button variant="default" className="bg-orange-600 hover:bg-orange-700 rounded-full">
                    <IconUserCircle className="mr-2" size={20} />
                    Mon Profil
                  </Button>
                </a>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="rounded-full font-medium">
                    Connexion
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white rounded-full font-medium shadow-md">
                    S'inscrire
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Hero section */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Décoratif */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-30 dark:opacity-10 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-orange-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-10%] right-[-5%] w-80 h-80 bg-yellow-400 rounded-full blur-3xl"></div>
        </div>

        <div className="container flex flex-col items-center text-center gap-8 relative z-10">
          <Badge variant="outline" className="px-4 py-1.5 text-sm rounded-full border-orange-200 text-orange-700 bg-orange-100/50 dark:border-orange-900/50 dark:text-orange-300 dark:bg-orange-950/30">
            🥘 Découvrez les vraies saveurs
          </Badge>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl text-foreground">
            L'âme de la cuisine africaine, <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">dans votre poche.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl font-light">
            Découvrez des milliers de recettes, adaptez-les selon ce qu'il vous reste dans votre frigo, et cuisinez sans lever le petit doigt grâce à notre mode mains-libres.
          </p>

          {/* Composant de recherche vide-frigo */}
          <PantrySearch />
        </div>
      </section>

      {/* Popular Recipes Section */}
      <section id="recettes" className="py-20 bg-white dark:bg-zinc-900 border-t">
        <div className="container">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">
                {queryIngredients.length > 0 ? "Résultats Vide-Frigo 🧺" : "Recettes Populaires 🔥"}
              </h2>
              <p className="text-muted-foreground">
                {queryIngredients.length > 0 
                  ? `Recettes possibles avec : ${queryIngredients.join(", ")}` 
                  : "Les classiques que tout le monde adore cette semaine."}
              </p>
            </div>
            <Button variant="ghost" className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 dark:hover:bg-orange-950">
              Voir tout <IconChevronRight size={18} className="ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayedRecipes.length === 0 ? (
              <div className="col-span-3 text-center py-16 bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl border border-dashed">
                <span className="text-4xl block mb-4">😢</span>
                <h3 className="text-xl font-bold mb-2">Aucune recette trouvée</h3>
                <p className="text-muted-foreground">Essayez d'autres ingrédients pour votre Vide-Frigo !</p>
              </div>
            ) : displayedRecipes.map((recipe) => (
              <Link href={`/recipe/${recipe.id}`} key={recipe.id} className="block group">
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full rounded-2xl cursor-pointer">
                  <div className="h-56 overflow-hidden relative">
                    <div className="absolute top-3 left-3 flex gap-2 z-10">
                      {recipe.tags.map(tag => (
                        <Badge key={tag} className="bg-white/90 text-black hover:bg-white border-0 shadow-sm">{tag}</Badge>
                      ))}
                    </div>
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  <CardHeader className="pt-4 pb-2">
                    <h3 className="text-xl font-bold line-clamp-1 group-hover:text-orange-600 transition-colors">{recipe.title}</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground font-medium">
                      <span className="flex items-center gap-1.5"><IconClock size={16} className="text-orange-500" /> {recipe.time}</span>
                      <span className="flex items-center gap-1.5"><IconFlame size={16} className="text-orange-500" /> {recipe.difficulty}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 mt-auto bg-zinc-950 text-zinc-400">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <IconFlame size={24} className="text-orange-600" />
            <span className="font-bold text-xl text-white">Dumuni.</span>
          </div>
          <div className="text-sm">
            Made with ❤️ by Achour - Adapted for Dumuni
          </div>
        </div>
      </footer>
    </div>
  );
}
