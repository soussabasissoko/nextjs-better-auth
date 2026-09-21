"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IconMessageCircleQuestion, IconSend } from "@tabler/icons-react";

interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
  isCreator?: boolean;
  avatar?: string;
  replies?: Comment[];
}

export function RecipeQA() {
  const [newQuestion, setNewQuestion] = useState("");
  
  // Base de données fictive pour les questions
  const [discussions, setDiscussions] = useState<Comment[]>([
    {
      id: "1",
      author: "Aminata C.",
      content: "Est-ce qu'on peut remplacer le mouton par de la volaille pour que ça cuise plus vite ?",
      date: "Il y a 2 jours",
      avatar: "https://i.pravatar.cc/150?u=aminata",
      replies: [
        {
          id: "r1",
          author: "Créateur de Dumuni",
          content: "Oui bien sûr Aminata ! Le poulet fumé donne d'ailleurs un super goût à ce plat. Réduisez juste le temps de cuisson à 45 mins.",
          date: "Il y a 1 jour",
          isCreator: true,
        },
      ],
    },
    {
      id: "2",
      author: "Ousmane",
      content: "Je n'ai pas de potasse sous la main, une astuce de remplacement ?",
      date: "Il y a 3 heures",
      avatar: "https://i.pravatar.cc/150?u=ousmane",
    },
  ]);

  const handleAskQuestion = () => {
    if (!newQuestion.trim()) return;
    
    const questionToAdd: Comment = {
      id: Date.now().toString(),
      author: "Toi",
      content: newQuestion,
      date: "À l'instant",
    };

    setDiscussions([questionToAdd, ...discussions]);
    setNewQuestion("");
  };

  return (
    <div className="mt-16 pt-12 border-t border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center gap-3 mb-8">
        <IconMessageCircleQuestion className="text-orange-500 h-8 w-8" />
        <h3 className="text-3xl font-extrabold tracking-tight">Questions & Entraide</h3>
      </div>

      {/* Input pour poser une question */}
      <div className="flex gap-4 mb-10 bg-orange-50/50 dark:bg-zinc-900/50 p-4 sm:p-6 rounded-3xl border">
        <Avatar className="h-12 w-12 hidden sm:block">
          <AvatarFallback className="bg-orange-200 text-orange-700">TOI</AvatarFallback>
        </Avatar>
        <div className="flex-1 flex gap-2">
          <Input 
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAskQuestion()}
            placeholder="Posez votre question (ex: Remplacement d'ingrédients...)"
            className="h-12 rounded-2xl border-orange-200 bg-white dark:bg-zinc-950 focus-visible:ring-orange-500 text-base"
          />
          <Button 
            onClick={handleAskQuestion}
            className="h-12 w-12 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white shrink-0"
            size="icon"
          >
            <IconSend size={20} />
          </Button>
        </div>
      </div>

      {/* Liste des discussions */}
      <div className="space-y-8">
        {discussions.map((discussion) => (
          <div key={discussion.id} className="flex gap-4 sm:gap-6">
            <Avatar className="h-10 w-10 sm:h-12 sm:w-12 shrink-0">
              {discussion.avatar ? <AvatarImage src={discussion.avatar} /> : <AvatarFallback>{discussion.author[0]}</AvatarFallback>}
            </Avatar>
            <div className="flex-1">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-bold text-foreground">{discussion.author}</span>
                <span className="text-xs text-muted-foreground">{discussion.date}</span>
              </div>
              <p className="text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-900 border p-4 rounded-2xl rounded-tl-none">
                {discussion.content}
              </p>

              {/* Réponses (S'il y en a) */}
              {discussion.replies && discussion.replies.length > 0 && (
                <div className="mt-4 space-y-4 pl-4 sm:pl-8 border-l-2 border-orange-200 dark:border-orange-900">
                  {discussion.replies.map((reply) => (
                    <div key={reply.id} className="flex gap-4">
                      <Avatar className="h-8 w-8 sm:h-10 sm:w-10 shrink-0 border-2 border-orange-500">
                         {reply.avatar ? <AvatarImage src={reply.avatar} /> : <AvatarFallback className="bg-orange-100 text-orange-600">CR</AvatarFallback>}
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className={`font-bold ${reply.isCreator ? "text-orange-600" : "text-foreground"}`}>
                            {reply.author}
                          </span>
                          {reply.isCreator && <span className="bg-orange-100 text-orange-700 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-sm">Auteur</span>}
                          <span className="text-xs text-muted-foreground">{reply.date}</span>
                        </div>
                        <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                          {reply.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <Button variant="link" className="text-sm p-0 h-8 text-orange-600 hover:text-orange-700 mt-2">
                Répondre
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
