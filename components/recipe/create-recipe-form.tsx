"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  IconPlus, 
  IconTrash, 
  IconCameraPlus, 
  IconClock, 
  IconFlame, 
  IconUsers,
  IconCheck
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export function CreateRecipeForm({ userName }: { userName: string }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [ingredients, setIngredients] = useState([{ name: "", quantity: "" }]);
  const [steps, setSteps] = useState([{ instruction: "", timerMinutes: "" }]);

  const addIngredient = () => setIngredients([...ingredients, { name: "", quantity: "" }]);
  const removeIngredient = (index: number) => setIngredients(ingredients.filter((_, i) => i !== index));

  const addStep = () => setSteps([...steps, { instruction: "", timerMinutes: "" }]);
  const removeStep = (index: number) => setSteps(steps.filter((_, i) => i !== index));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mock API call simulation
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Simuler une redirection vers le Dashboard ou la recette
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <Card className="border-green-500 shadow-green-500/20 bg-green-50 dark:bg-green-950/20 text-center py-16 animate-in zoom-in duration-500">
        <div className="mx-auto w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-500/30">
          <IconCheck size={40} />
        </div>
        <h2 className="text-3xl font-bold text-green-700 dark:text-green-500 mb-2">Recette Soumise avec Succès !</h2>
        <p className="text-green-600 dark:text-green-400 mb-6 font-medium">Bravo {userName}, vous gagnez +50 XP !</p>
        <p className="text-muted-foreground animate-pulse text-sm">Redirection vers votre tableau de bord...</p>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* 1. Informations Générales */}
      <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm overflow-hidden">
        <div className="bg-orange-100 dark:bg-orange-950/40 p-4 border-b text-orange-800 dark:text-orange-300 font-bold uppercase tracking-wider text-sm flex items-center gap-2">
          <span>1</span> Informations de Base
        </div>
        <CardContent className="p-6 space-y-6">
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Mock Image Upload */}
            <div className="w-full md:w-1/3 aspect-square bg-zinc-100 dark:bg-zinc-900 rounded-2xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 flex flex-col items-center justify-center text-muted-foreground cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors">
              <IconCameraPlus size={40} className="mb-2 text-zinc-400" />
              <span className="text-sm font-semibold">Ajouter une photo</span>
              <span className="text-xs mt-1">Recommandé: 16:9</span>
            </div>

            <div className="w-full md:w-2/3 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-base">Titre de la recette <span className="text-red-500">*</span></Label>
                <Input id="title" placeholder="Ex: Mafé au poulet de ma grand-mère" required className="h-12 text-lg font-medium" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-base">Petite histoire / Description</Label>
                <Textarea id="description" placeholder="Qu'est-ce qui rend ce plat si spécial pour vous ?" className="resize-none h-24" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-1.5"><IconClock size={16} className="text-orange-500" /> Préparation</Label>
              <Input type="number" placeholder="min" min="0" required />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1.5"><IconFlame size={16} className="text-orange-500" /> Cuisson</Label>
              <Input type="number" placeholder="min" min="0" required />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1.5"><IconUsers size={16} className="text-orange-500" /> Portions</Label>
              <Input type="number" placeholder="personnes" min="1" required />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. Ingrédients */}
      <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm overflow-hidden border-l-4 border-l-orange-500">
        <div className="bg-orange-100 dark:bg-orange-950/40 p-4 border-b text-orange-800 dark:text-orange-300 font-bold uppercase tracking-wider text-sm flex items-center justify-between">
          <div className="flex items-center gap-2"><span>2</span> Les Ingrédients</div>
          <Badge variant="outline" className="bg-white dark:bg-black">{ingredients.length} éléments</Badge>
        </div>
        <CardContent className="p-6 space-y-4">
          
          {ingredients.map((ing, index) => (
            <div key={index} className="flex gap-4 items-start animate-in slide-in-from-left-4 duration-300">
              <div className="w-1/2 space-y-1 block">
                 <Label className="text-xs text-muted-foreground ml-1">Ingrédient</Label>
                 <Input 
                   placeholder="Ex: Riz parfumé" 
                   value={ing.name}
                   onChange={(e) => {
                     const newIngs = [...ingredients];
                     newIngs[index].name = e.target.value;
                     setIngredients(newIngs);
                   }}
                   required
                 />
              </div>
              <div className="w-[40%] space-y-1 block">
                 <Label className="text-xs text-muted-foreground ml-1">Quantité (optionnel)</Label>
                 <Input 
                   placeholder="Ex: 500g, 2 pincées..." 
                   value={ing.quantity}
                   onChange={(e) => {
                     const newIngs = [...ingredients];
                     newIngs[index].quantity = e.target.value;
                     setIngredients(newIngs);
                   }}
                 />
              </div>
              <div className="w-[10%] pt-5 flex justify-end">
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30"
                  onClick={() => removeIngredient(index)}
                  disabled={ingredients.length === 1}
                >
                  <IconTrash size={18} />
                </Button>
              </div>
            </div>
          ))}

          <Button type="button" variant="outline" onClick={addIngredient} className="w-full mt-4 border-dashed border-2 hover:border-orange-500 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-950/30 transition-all font-semibold">
            <IconPlus size={18} className="mr-2" /> Ajouter un ingrédient
          </Button>

        </CardContent>
      </Card>

      {/* 3. Préparation pas à pas */}
      <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm overflow-hidden border-l-4 border-l-orange-500">
        <div className="bg-orange-100 dark:bg-orange-950/40 p-4 border-b text-orange-800 dark:text-orange-300 font-bold uppercase tracking-wider text-sm flex items-center justify-between">
          <div className="flex items-center gap-2"><span>3</span> Les Étapes de Préparation</div>
          <Badge variant="outline" className="bg-white dark:bg-black">{steps.length} étapes</Badge>
        </div>
        <CardContent className="p-6 space-y-6">
          
          {steps.map((step, index) => (
            <div key={index} className="flex gap-4 items-start relative animate-in slide-in-from-left-4 duration-300 bg-zinc-50/50 dark:bg-zinc-900/20 p-4 rounded-xl border">
              <div className="mt-1 flex-shrink-0 w-8 h-8 bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-400 font-bold rounded-full flex items-center justify-center shadow-inner">
                {index + 1}
              </div>
              <div className="flex-1 space-y-3">
                 <Textarea 
                   placeholder="Décrivez cette étape avec précision..." 
                   className="resize-none font-medium h-20"
                   value={step.instruction}
                   onChange={(e) => {
                     const newSteps = [...steps];
                     newSteps[index].instruction = e.target.value;
                     setSteps(newSteps);
                   }}
                   required
                 />
                 
                 {/* Minuteur intelligent intégré */}
                 <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-white dark:bg-zinc-950 border px-3 py-1.5 rounded-lg shadow-sm">
                      <IconClock size={16} className="text-zinc-400" />
                      <span className="text-xs font-semibold whitespace-nowrap text-muted-foreground mr-1">Minuteur (optionnel):</span>
                      <Input 
                        type="number" 
                        placeholder="min" 
                        className="h-8 w-20 border-0 shadow-none bg-zinc-100 dark:bg-zinc-800 focus-visible:ring-0 px-2"
                        value={step.timerMinutes}
                        onChange={(e) => {
                          const newSteps = [...steps];
                          newSteps[index].timerMinutes = e.target.value;
                          setSteps(newSteps);
                        }}
                      />
                    </div>
                    <span className="text-[11px] text-muted-foreground hidden sm:inline opacity-70">
                      Ce minuteur s'activera automatiquement dans le Mode Cuisine.
                    </span>
                 </div>
              </div>

              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                className="absolute -right-2 -top-2 rounded-full w-8 h-8 bg-background shadow-md border text-red-500 hover:text-red-700 hover:bg-red-50"
                onClick={() => removeStep(index)}
                disabled={steps.length === 1}
              >
                <IconTrash size={14} />
              </Button>
            </div>
          ))}

          <Button type="button" variant="outline" onClick={addStep} className="w-full mt-4 border-dashed border-2 hover:border-orange-500 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-950/30 transition-all font-semibold">
            <IconPlus size={18} className="mr-2" /> Ajouter une étape
          </Button>

        </CardContent>
      </Card>

      {/* Barre d'Action Finale Flottante (Fixe en bas sur mobile) */}
      <div className="sticky bottom-6 flex justify-end pt-4 pb-4 px-4 bg-background/80 backdrop-blur-md border-t rounded-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.2)]">
         <Button 
           type="submit" 
           size="lg" 
           className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white shadow-xl shadow-orange-500/20 px-8 text-lg rounded-2xl font-bold transition-all hover:scale-105 active:scale-95"
           disabled={isSubmitting}
         >
           {isSubmitting ? (
             <span className="flex items-center gap-2">
                <IconFlame className="animate-pulse" size={20} /> Publication en cours...
             </span>
           ) : (
             <span className="flex items-center gap-2">
                Publier ma Recette <IconPlus size={20} />
             </span>
           )}
         </Button>
      </div>

    </form>
  );
}
