import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
  toggleTheme: () => void;
  isSystemTheme: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Verificar se existe tema salvo no localStorage
    const saved = localStorage.getItem('organizezap-theme');
    if (saved && ['light', 'dark', 'system'].includes(saved)) {
      return saved as Theme;
    }
    
    // Verificar preferência do sistema
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'system';
    }
    
    return 'light';
  });

  const [isDark, setIsDark] = useState(false);
  const [isSystemTheme, setIsSystemTheme] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    
    const updateTheme = () => {
      let effectiveTheme: 'light' | 'dark';
      
      if (theme === 'system') {
        effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        setIsSystemTheme(true);
      } else {
        effectiveTheme = theme;
        setIsSystemTheme(false);
      }

      setIsDark(effectiveTheme === 'dark');
      
      // Aplicar classes CSS para tema escuro
      if (effectiveTheme === 'dark') {
        root.classList.add('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        root.classList.remove('dark');
        document.documentElement.setAttribute('data-theme', 'light');
      }

      // Aplicar meta tag para cor do sistema
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', effectiveTheme === 'dark' ? '#0f0f0f' : '#ffffff');
      }
    };

    updateTheme();
    localStorage.setItem('organizezap-theme', theme);

    // Listener para mudanças na preferência do sistema
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => updateTheme();
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  // Função para alternar entre temas
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  // Efeito para aplicar tema inicial
  useEffect(() => {
    const root = window.document.documentElement;
    const savedTheme = localStorage.getItem('organizezap-theme');
    
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      root.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      setTheme, 
      isDark, 
      toggleTheme, 
      isSystemTheme 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
