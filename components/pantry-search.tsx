"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IconSearch, IconLoader2 } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

const COMMON_INGREDIENTS = [
  "Riz",
  "Gombo (Okra)",
  "Pâte d'arachide",
  "Tomate",
  "Oignon",
  "Poulet",
  "Viande de boeuf",
  "Mouton",
  "Poissons séchés",
  "Huile de palme",
  "Banane plantain",
  "Igname",
  "Manioc",
];

export function PantrySearch() {
  const [selected, setSelected] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const toggleIngredient = (ingredient: string) => {
    setSelected((prev) =>
      prev.includes(ingredient)
        ? prev.filter((i) => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  const handleSearch = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.push("/?ingredients=" + encodeURIComponent(selected.join(",")) + "#recettes");
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="w-full max-w-2xl bg-card rounded-xl p-6 shadow-sm border mt-8">
      <h2 className="text-2xl font-bold mb-2">Dans mon placard 🧺</h2>
      <p className="text-muted-foreground mb-4">
        Coche les ingrédients que tu as sous la main, on s'occupe de trouver le repas !
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {COMMON_INGREDIENTS.map((ingredient) => {
          const isSelected = selected.includes(ingredient);
          return (
            <Badge
              key={ingredient}
              variant={isSelected ? "default" : "outline"}
              className={`cursor-pointer px-3 py-1.5 text-sm transition-colors ${
                isSelected ? "bg-orange-500 hover:bg-orange-600 border-transparent text-white" : "hover:bg-orange-100 dark:hover:bg-orange-950"
              }`}
              onClick={() => toggleIngredient(ingredient)}
            >
              {ingredient}
            </Badge>
          );
        })}
      </div>

      <div className="flex justify-end">
        <Button 
          onClick={handleSearch} 
          disabled={selected.length === 0 || isLoading}
          className="bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-full group"
        >
          {isLoading ? (
            <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <IconSearch className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
          )}
          Chercher des idées ({selected.length})
        </Button>
      </div>
    </div>
  );
}
