import { HelpCircle, MessageSquare, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          {/* Links rápidos */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="h-8">
              <HelpCircle className="mr-2 h-3 w-3" />
              Ajuda
            </Button>
            <Button variant="ghost" size="sm" className="h-8">
              <MessageSquare className="mr-2 h-3 w-3" />
              Suporte
            </Button>
            <Button variant="ghost" size="sm" className="h-8">
              <Info className="mr-2 h-3 w-3" />
              Sobre
            </Button>
          </div>

          {/* Versão */}
          <div className="text-xs text-muted-foreground">
            Organizezap v1.0.0 - © 2024
          </div>
        </div>
      </div>
    </footer>
  );
};