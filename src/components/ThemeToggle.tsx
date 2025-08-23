import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const ThemeToggle = () => {
  const { theme, setTheme, isDark, toggleTheme, isSystemTheme } = useTheme();

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-4 w-4" />;
      case 'dark':
        return <Moon className="h-4 w-4" />;
      case 'system':
        return <Monitor className="h-4 w-4" />;
      default:
        return <Sun className="h-4 w-4" />;
    }
  };

  const getThemeLabel = () => {
    switch (theme) {
      case 'light':
        return 'Claro';
      case 'dark':
        return 'Escuro';
      case 'system':
        return 'Sistema';
      default:
        return 'Claro';
    }
  };

  return (
    <TooltipProvider>
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-md border border-border hover:bg-accent hover:text-accent-foreground"
                onClick={toggleTheme}
              >
                {getThemeIcon()}
                <span className="sr-only">Alternar tema</span>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Tema atual: {getThemeLabel()}</p>
          </TooltipContent>
        </Tooltip>

        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem
            onClick={() => setTheme('light')}
            className={`flex items-center gap-2 ${theme === 'light' ? 'bg-accent' : ''}`}
          >
            <Sun className="h-4 w-4" />
            <span>Claro</span>
            {theme === 'light' && <span className="ml-auto text-xs">✓</span>}
          </DropdownMenuItem>
          
          <DropdownMenuItem
            onClick={() => setTheme('dark')}
            className={`flex items-center gap-2 ${theme === 'dark' ? 'bg-accent' : ''}`}
          >
            <Moon className="h-4 w-4" />
            <span>Escuro</span>
            {theme === 'dark' && <span className="ml-auto text-xs">✓</span>}
          </DropdownMenuItem>
          
          <DropdownMenuItem
            onClick={() => setTheme('system')}
            className={`flex items-center gap-2 ${theme === 'system' ? 'bg-accent' : ''}`}
          >
            <Monitor className="h-4 w-4" />
            <span>Sistema</span>
            {theme === 'system' && <span className="ml-auto text-xs">✓</span>}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  );
};
