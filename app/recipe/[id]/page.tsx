import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CookMode } from "@/components/cook-mode";
import { SaveRecipeButton } from "@/components/save-recipe-button";
import { RecipeQA } from "@/components/recipe-qa";
import { IconBrandWhatsapp, IconClock, IconFlame, IconUsers } from "@tabler/icons-react";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { notFound } from "next/navigation";

// Données fictives (Normalement ça viendra de Prisma)
const MOCK_RECIPES_DB: Record<string, any> = {
  "1": {
    title: "Tô au Gombo (Mali)",
    description: "Le plat national malien par excellence. Une pâte onctueuse accompagnée d'une sauce gluante savoureuse au gombo.",
    prepTime: 15, cookTime: 30, servings: 6,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrIDazFv6Sw_p-jEaPRJGTLUOYExSrhLkoia_-absS9A&s=10",
    ingredients: [{ name: "Farine de petit mil", quantity: "500g" }, { name: "Gombo frais", quantity: "250g" }, { name: "Potasse", quantity: "1 c.à.c" }, { name: "Viande", quantity: "300g" }],
    steps: [
      { order: 1, instruction: "Faites bouillir de l'eau et préparez la bouillie de mil pour le Tô." },
      { order: 2, instruction: "Hachez le gombo finement. Dans une marmite, mettez de l'eau, de la potasse et laissez bouillir.", timerMinutes: 10 },
      { order: 3, instruction: "Ajoutez le gombo haché et la viande cuite, laissez mijoter.", timerMinutes: 20 },
    ]
  },
  "2": {
    title: "Poulet Yassa",
    description: "Un plat d'Afrique de l'Ouest, délicieusement citronné et parfumé aux oignons caramélisés.",
    prepTime: 30, cookTime: 50, servings: 4,
    imageUrl: "https://t3.ftcdn.net/jpg/20/62/45/62/360_F_2062456278_QZViBVrYSngBXjUuJh7XiPYn63GjoMOj.webp",
    ingredients: [{ name: "Poulet", quantity: "1 kg" }, { name: "Oignons", quantity: "5 gros" }, { name: "Moutarde", quantity: "3 c.à.s." }],
    steps: [
      { order: 1, instruction: "Mélangez le jus de citron, la moutarde, et l'ail." },
      { order: 2, instruction: "Ajoutez le poulet et les oignons dans la marinade.", timerMinutes: 60 },
      { order: 3, instruction: "Faites dorer le poulet, puis mijotez tout ensemble.", timerMinutes: 30 },
    ]
  },
  "3": {
    title: "Tigadèguèna (Mafé)",
    description: "La fameuse sauce à la pâte d'arachide. Riche, crémeuse et irrésistible avec du riz blanc.",
    prepTime: 20, cookTime: 120, servings: 5,
    imageUrl: "https://t4.ftcdn.net/jpg/18/42/63/77/240_F_1842637716_XcjM8AZggah48Zmyn68tiB8nSRRDVfUY.jpg",
    ingredients: [{ name: "Pâte d'arachide", quantity: "4 c.à.s." }, { name: "Viande de boeuf", quantity: "500g" }, { name: "Concentré de tomate", quantity: "2 c.à.s." }],
    steps: [
      { order: 1, instruction: "Faites revenir la viande en morceaux." },
      { order: 2, instruction: "Ajoutez l'eau, la tomate et laissez bouillir.", timerMinutes: 20 },
      { order: 3, instruction: "Délayez la pâte d'arachide et versez-la. Laissez réduire à feu très doux jusqu'à ce que l'huile remonte.", timerMinutes: 90 },
    ]
  },
  "4": {
    title: "Sauce Fakoye",
    description: "La spécialité de Tombouctou et Gao à base de poudre de feuilles de corête séchées et de viande fondante.",
    prepTime: 30, cookTime: 120, servings: 6,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrbclt_RMSrC0a2Ch1Wn4krrhafOJcHDHXGaKfwy78jA&s=10",
    ingredients: [
      { name: "Poudre de feuilles de corête séchées (fakoye)", quantity: "60 - 80 g" },
      { name: "Viande de bœuf, mouton ou agneau", quantity: "500g - 1 kg" },
      { name: "Huile ou beurre clarifié (sirimé)", quantity: "Au besoin" },
      { name: "Oignon", quantity: "1" },
      { name: "Ail", quantity: "Quelques gousses" },
      { name: "Soumbala (poudre ou pâte)", quantity: "Au goût" },
      { name: "Poisson séché ou fumé", quantity: "Facultatif" },
      { name: "Pâte ou purée de dattes", quantity: "Une touche" },
      { name: "Tomates ou concentré de tomate", quantity: "Au choix" },
      { name: "Épices (cumin, poivre, piment, laurier...)", quantity: "Au goût" },
      { name: "Eau", quantity: "1,5 L" }
    ],
    steps: [
      { order: 1, instruction: "Détendez la poudre de fakoye dans un peu de matière grasse (huile ou sirimé)." },
      { order: 2, instruction: "Faites revenir la viande en morceaux avec l'oignon, l'ail et les épices." },
      { order: 3, instruction: "Ajoutez la tomate, le soumbala, et le poisson séché, puis mélangez bien." },
      { order: 4, instruction: "Versez l'eau (environ 1,5L) et la purée de dattes. Ajoutez le fakoye détendu." },
      { order: 5, instruction: "Laissez mijoter à feu doux pendant de longues heures jusqu'à ce que la viande soit très fondante et l'huile remonte à la surface.", timerMinutes: 120 }
    ]
  },
  "5": {
    title: "Widjila",
    description: "Boules de pain cuites à la vapeur, moelleuses et parfaites pour accompagner vos plats en sauce.",
    prepTime: 135, cookTime: 25, servings: 5,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2W-4ht54VOi2HZE_PuJIdqpMk8QtbZ4o8QBIRYiQ_ew&s=10",
    ingredients: [
      { name: "Farine", quantity: "Au besoin" },
      { name: "Sel", quantity: "1 pincée" },
      { name: "Eau", quantity: "Au besoin" },
      { name: "Levure boulangère", quantity: "1 sachet" }
    ],
    steps: [
      { order: 1, instruction: "Dans un bol, mélangez la farine et le sel." },
      { order: 2, instruction: "Dans un autre bol, diluez la levure boulangère dans l'eau." },
      { order: 3, instruction: "Ajoutez cette préparation à la farine, puis pétrissez énergiquement jusqu'à obtenir une pâte homogène." },
      { order: 4, instruction: "Couvrez et laissez la pâte gonfler 2 heures à température ambiante.", timerMinutes: 120 },
      { order: 5, instruction: "Dégazez la pâte et formez 5 petits pâtons." },
      { order: 6, instruction: "Placez un sopalin (pour l'humidité)." },
      { order: 7, instruction: "Disposez les petits pains et faites-les cuire à la vapeur pendant 25 minutes.", timerMinutes: 25 },
      { order: 8, instruction: "Vérifiez la cuisson en plantant la lame d'un couteau : si elle ressort sèche, c'est prêt !" }
    ]
  },
  "6": {
    title: "Djouka (Fonio)",
    description: "Le fonio préparé avec des brisures d'arachide, un plat léger et nutritif.",
    prepTime: 15, cookTime: 45, servings: 3,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTwqWfr374aVxkRJwjN1sSRker6nbSgVwyR5GUwlQXww&s=10",
    ingredients: [{ name: "Fonio", quantity: "500g" }, { name: "Pâte d'arachide en poudre", quantity: "200g" }],
    steps: [{ order: 1, instruction: "Lavez le fonio et cuisez-le à la vapeur." }, { order: 2, instruction: "Incorporez l'arachide." }]
  }
};

export default async function RecipePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const RECIPE = MOCK_RECIPES_DB[resolvedParams.id];

  if (!RECIPE) {
    return notFound();
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Navigation Minimale */}
      <header className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-40">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <IconFlame size={28} className="text-orange-600" />
            <span className="font-extrabold text-2xl tracking-tight text-orange-950 dark:text-orange-500 hidden sm:inline">Dumuni.</span>
          </Link>
          <div className="flex items-center gap-4">
            <ModeToggle />
            {session?.user ? (
              <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200">Connecté</Badge>
            ) : (
              <Link href="/login"><Button variant="outline" size="sm" className="rounded-full">Connexion</Button></Link>
            )}
          </div>
        </div>
      </header>

      <main className="container max-w-5xl py-8">

        {/* En-tête de la Recette */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12">
          <div className="rounded-3xl overflow-hidden shadow-2xl h-[300px] md:h-[450px]">
            <img src={RECIPE.imageUrl} alt={RECIPE.title} className="w-full h-full object-cover" />
          </div>

          <div className="flex flex-col justify-center">
            <Badge className="w-fit mb-4 bg-orange-100 text-orange-800 hover:bg-orange-200 dark:bg-orange-900/50 dark:text-orange-200">Spécialité Sénégalaise</Badge>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">{RECIPE.title}</h1>
            <p className="text-lg text-muted-foreground mb-8">{RECIPE.description}</p>

            <div className="flex flex-wrap gap-6 mb-8 bg-zinc-50 dark:bg-zinc-900 p-6 rounded-2xl border">
              <div className="flex items-center gap-2">
                <IconClock className="text-orange-500" />
                <div>
                  <div className="text-sm text-muted-foreground font-medium">Prépa</div>
                  <div className="font-bold">{RECIPE.prepTime} min</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <IconFlame className="text-orange-500" />
                <div>
                  <div className="text-sm text-muted-foreground font-medium">Cuisson</div>
                  <div className="font-bold">{RECIPE.cookTime} min</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <IconUsers className="text-orange-500" />
                <div>
                  <div className="text-sm text-muted-foreground font-medium">Portions</div>
                  <div className="font-bold">{RECIPE.servings} pers.</div>
                </div>
              </div>
            </div>

            {/* Boutons d'Action Sociaux */}
            <div className="flex gap-4 mb-8">
              <SaveRecipeButton recipeId={RECIPE.title} />

              {/* BOUTON PARTAGE DIRECT WHATSAPP */}
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`🍲 Découvre la recette : *${RECIPE.title}*\n\nTemps : ${RECIPE.prepTime + RECIPE.cookTime}min | Pour ${RECIPE.servings} pers.\n\nRetrouve la recette complète sur Dumuni !`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button variant="outline" className="w-full h-full rounded-2xl bg-[#25D366] hover:bg-[#128C7E] text-white border-0 shadow-lg shadow-[#25D366]/20 transition-all">
                  <IconBrandWhatsapp className="mr-2 h-5 w-5" /> Partager
                </Button>
              </a>
            </div>

            {/* LE GROS BOUTON MODE CUISINE */}
            <CookMode recipeTitle={RECIPE.title} steps={RECIPE.steps} />

          </div>
        </div>

        {/* Corps de la Recette */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Outils & Ingrédients */}
          <div className="col-span-1 border md:border-y-0 md:border-r md:pr-12 md:pb-0 pb-8 px-6 md:px-0 rounded-3xl md:rounded-none bg-orange-50/50 md:bg-transparent dark:bg-zinc-900/30 md:dark:bg-transparent">
            <h3 className="text-2xl font-bold mb-6 pt-6 md:pt-0">Ingrédients</h3>
            <ul className="space-y-4">
              {RECIPE.ingredients.map((ing, i) => (
                <li key={i} className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-800 pb-2">
                  <span className="font-medium text-zinc-700 dark:text-zinc-300">{ing.name}</span>
                  <Badge variant="outline">{ing.quantity}</Badge>
                </li>
              ))}
            </ul>

            {/* LISTE DE COURSES WHATSAPP */}
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`🛒 *Liste de courses pour : ${RECIPE.title}*\n\n${RECIPE.ingredients.map(i => `⬜ ${i.name} (${i.quantity})`).join('\n')}\n\nEnvoyé depuis l'application *Dumuni* 🔥`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-block mt-8"
            >
              <Button variant="outline" className="w-full rounded-xl border border-[#25D366] text-[#25D366] bg-[#25D366]/10 hover:bg-[#25D366] hover:text-white transition-colors h-14 font-semibold shadow-sm">
                <IconBrandWhatsapp className="mr-2 h-5 w-5" /> Envoyer la liste sur WhatsApp
              </Button>
            </a>
          </div>

          {/* Étapes textuelles (Fallback classique) */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-6">Préparation pas à pas</h3>
            <div className="space-y-8">
              {RECIPE.steps.map((step) => (
                <div key={step.order} className="flex gap-6">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-orange-100 text-orange-600 font-bold dark:bg-orange-950 dark:text-orange-400">
                    {step.order}
                  </div>
                  <div className="pt-1.5">
                    <p className="text-lg text-zinc-700 dark:text-zinc-300">{step.instruction}</p>
                    {step.timerMinutes && (
                      <Badge variant="secondary" className="mt-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                        <IconClock className="mr-1 h-3 w-3 inline" /> {step.timerMinutes} min
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Composant Questions & Entraide (FAQ) */}
        <RecipeQA />

      </main>
    </div>
  );
}
