import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IconFlame, IconChefHat, IconMedal, IconBook, IconHeartHandshake } from "@tabler/icons-react";
import { redirect } from "next/navigation";

// Simulation de carnets sauvegardés
const MY_BOOKS = [
  { id: 1, name: "Dimanche en famille", count: 12, color: "bg-orange-500" },
  { id: 2, name: "Astuces Rapides", count: 4, color: "bg-yellow-500" },
  { id: 3, name: "Spécialités Maliennes", count: 18, color: "bg-[#25D366]" },
];

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const user = session.user;

  return (
    <div className="container max-w-5xl py-8 mb-20">
      
      {/* En-tête du profil & XP */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border shadow-sm mb-8 relative overflow-hidden flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
        
        {/* Décoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-400 opacity-10 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
        
        <Avatar className="h-32 w-32 border-4 border-orange-100 dark:border-orange-950 shrink-0 shadow-lg">
          {user.image ? <AvatarImage src={user.image} /> : <AvatarFallback className="bg-orange-200 text-orange-700 text-4xl font-black">{user.name.charAt(0)}</AvatarFallback>}
        </Avatar>

        <div className="flex-1 w-full space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold">{user.name}</h1>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
            
            <div className="bg-orange-50 dark:bg-orange-950/30 px-4 py-2 rounded-2xl border border-orange-100 flex items-center gap-2">
               <IconMedal className="text-orange-500 h-6 w-6" />
               <span className="font-extrabold text-orange-700 dark:text-orange-400 text-lg">Cordon Bleu Malien</span>
            </div>
          </div>

          {/* Barre de progression XP */}
          <div className="space-y-2 mt-4">
            <div className="flex justify-between text-sm font-semibold">
               <span className="text-zinc-600 dark:text-zinc-400">Niveau 12</span>
               <span className="text-orange-600">450 / 500 XP avant le rang &quot;Légende du Tô&quot;</span>
            </div>
            <div className="h-4 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden border">
               <div className="h-full bg-gradient-to-r from-orange-400 to-orange-600 w-[90%] rounded-full shadow-inner animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Armoire à Badges */}
      <h2 className="text-2xl font-bold mb-6 mt-12 flex items-center gap-2">
        <IconMedal className="text-orange-500" /> Vos trophées & Badges
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
         {/* Badge 1 */}
         <Card className="bg-orange-50/50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-900 shadow-sm text-center">
            <CardHeader className="pb-2 items-center">
               <div className="h-16 w-16 bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center shadow mb-2 border border-orange-100">
                  <IconFlame className="text-orange-500 h-8 w-8" />
               </div>
               <CardTitle className="text-sm">Feu Sacré</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-xs">A cuisiné 30 jours de suite</CardDescription>
            </CardContent>
         </Card>
         
         {/* Badge 2 */}
         <Card className="bg-[#25D366]/5 border-[#25D366]/20 shadow-sm text-center">
            <CardHeader className="pb-2 items-center">
               <div className="h-16 w-16 bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center shadow mb-2 border border-[#25D366]/20">
                  <IconHeartHandshake className="text-[#25D366] h-8 w-8" />
               </div>
               <CardTitle className="text-sm">Roi du Quartier</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-xs">A partagé 50 recettes sur WhatsApp</CardDescription>
            </CardContent>
         </Card>

         {/* Badge 3 */}
         <Card className="bg-yellow-50/50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-900 shadow-sm text-center">
            <CardHeader className="pb-2 items-center">
               <div className="h-16 w-16 bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center shadow mb-2 border border-yellow-100">
                  <IconChefHat className="text-yellow-600 h-8 w-8" />
               </div>
               <CardTitle className="text-sm">Spécialiste Tô</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-xs">A cuisiné 10 variantes de Tô</CardDescription>
            </CardContent>
         </Card>

         {/* Badge 4 (Verrouillé) */}
         <Card className="bg-zinc-50 dark:bg-zinc-900/50 border-dashed border-zinc-300 opacity-60 text-center grayscale">
            <CardHeader className="pb-2 items-center">
               <div className="h-16 w-16 bg-zinc-200 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-2">
                  <div className="h-8 w-8 text-zinc-400 font-bold text-xl">?</div>
               </div>
               <CardTitle className="text-sm">Sauveur de Frigo</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-xs">Utiliser le mode &quot;Dans mon placard&quot; 20 fois</CardDescription>
            </CardContent>
         </Card>
      </div>

      {/* Carnets de Recettes */}
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <IconBook className="text-orange-500" /> Vos Carnets de Recettes
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {MY_BOOKS.map((book) => (
          <div key={book.id} className="relative group cursor-pointer overflow-hidden rounded-2xl border shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
            <div className={`h-32 ${book.color} opacity-20 dark:opacity-40 w-full absolute top-0 -z-10`}></div>
            <div className="p-6">
               <div className={`h-12 w-12 ${book.color} rounded-xl flex items-center justify-center mb-4 shadow-sm`}>
                  <IconBook className="text-white h-6 w-6" />
               </div>
               <h3 className="font-bold text-lg mb-1">{book.name}</h3>
               <p className="text-sm text-muted-foreground">{book.count} recettes sauvegardées</p>
            </div>
          </div>
        ))}
        {/* Ajouter un carnet vide */}
        <div className="border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl flex flex-col items-center justify-center h-full min-h-[160px] text-zinc-500 hover:text-orange-600 hover:border-orange-300 hover:bg-orange-50/50 dark:hover:bg-orange-950/20 cursor-pointer transition-colors">
           <span className="text-3xl mb-2">+</span>
           <span className="font-medium text-sm">Créer un carnet</span>
        </div>
      </div>

    </div>
  );
}
