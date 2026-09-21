"use client";
import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { IconLogout, IconLoader } from "@tabler/icons-react";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
        onRequest: () => {
          setLoading(true);
        },
        onResponse: () => {
          setLoading(false);
        },
      },
    });
  }

  return (
    <Button
      onClick={handleLogOut}
      variant="ghost"
      disabled={loading}
      className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30 font-medium"
    >
      {loading ? (
        <IconLoader className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <IconLogout className="mr-2 h-4 w-4" />
      )}
      {loading ? "Déconnexion..." : "Se déconnecter"}
    </Button>
  );
}
