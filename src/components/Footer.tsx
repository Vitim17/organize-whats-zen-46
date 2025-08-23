import { HelpCircle, MessageSquare, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          {/* Informações */}
          <div className="text-xs text-muted-foreground">
            Organizezap v1.0.0 - © 2024 - Inspirado no WhatsApp
          </div>

          {/* Versão */}
          <div className="text-xs text-muted-foreground">
            Gerencie tudo pelo WhatsApp
          </div>
        </div>
      </div>
    </footer>
  );
};