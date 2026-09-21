"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IconBookmark, IconFolderPlus, IconCheck, IconX } from "@tabler/icons-react";

interface SaveRecipeButtonProps {
  recipeId: string;
}

export function SaveRecipeButton({ recipeId }: SaveRecipeButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  
  // Simulation de dossiers (En réalité, on recevra ça de la BDD pour chaque utilisateur)
  const [folders, setFolders] = useState([
    { id: "1", name: "Tous les favoris", hasRecipe: false },
    { id: "2", name: "Dimanche en famille", hasRecipe: false },
    { id: "3", name: "Recettes rapides", hasRecipe: false },
  ]);
  
  const [newFolderName, setNewFolderName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const toggleFolder = (folderId: string) => {
    setFolders((prev) => 
      prev.map((f) => {
        if (f.id === folderId) {
          const adding = !f.hasRecipe;
          // Si on ajoute dans un dossier, on considère que la recette est globalement "sauvegardée"
          if (adding) setIsSaved(true);
          return { ...f, hasRecipe: adding };
        }
        return f;
      })
    );
  };

  const handleCreateNewFolder = () => {
    if (newFolderName.trim() === "") return;
    setFolders([
      ...folders,
      { id: Date.now().toString(), name: newFolderName, hasRecipe: true }
    ]);
    setNewFolderName("");
    setIsCreating(false);
    setIsSaved(true);
  };

  return (
    <div className="relative flex-1">
      <Button 
        onClick={() => setIsOpen(!isOpen)}
        variant="outline" 
        className={`w-full h-12 rounded-2xl transition-colors ${
          isSaved 
            ? "border-orange-500 text-orange-600 bg-orange-50 dark:bg-orange-950/30" 
            : "border-zinc-200 dark:border-zinc-800 hover:bg-orange-50 dark:hover:bg-zinc-800"
        }`}
      >
        <IconBookmark className={`mr-2 h-5 w-5 ${isSaved ? "fill-orange-500" : ""}`} /> 
        {isSaved ? "Sauvegardé" : "Sauvegarder"}
      </Button>

      {/* Menu Modale de sauvegarde */}
      {isOpen && (
        <div className="absolute top-14 left-0 w-80 bg-background border shadow-2xl rounded-2xl z-50 overflow-hidden flex flex-col p-4 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex justify-between items-center mb-4">
             <h4 className="font-bold text-foreground">Enregistrer dans...</h4>
             <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8">
               <IconX size={18} />
             </Button>
          </div>

          <div className="flex flex-col gap-2 max-h-60 overflow-y-auto mb-4">
            {folders.map((folder) => (
              <button 
                key={folder.id} 
                onClick={() => toggleFolder(folder.id)}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-orange-50 dark:hover:bg-zinc-900 transition-colors text-left"
              >
                <span className="font-medium text-sm truncate">{folder.name}</span>
                {folder.hasRecipe && <IconCheck className="text-orange-600 h-5 w-5" />}
              </button>
            ))}
          </div>

          {!isCreating ? (
            <Button 
              variant="outline" 
              onClick={() => setIsCreating(true)}
              className="w-full border-dashed rounded-xl"
            >
               <IconFolderPlus className="mr-2 h-4 w-4" /> Créer un nouveau carnet
            </Button>
          ) : (
            <div className="flex gap-2">
              <Input 
                autoFocus
                placeholder="Nom du carnet..." 
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCreateNewFolder()}
                className="rounded-xl border-orange-200 focus-visible:ring-orange-500"
              />
              <Button onClick={handleCreateNewFolder} className="bg-orange-600 text-white rounded-xl">
                OK
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
