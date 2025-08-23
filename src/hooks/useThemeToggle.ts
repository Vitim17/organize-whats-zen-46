import { useTheme } from "@/contexts/ThemeContext";

export const useThemeToggle = () => {
  const { theme, setTheme, isDark, toggleTheme, isSystemTheme } = useTheme();

  const setLightTheme = () => setTheme('light');
  const setDarkTheme = () => setTheme('dark');
  const setSystemTheme = () => setTheme('system');

  const getThemeInfo = () => ({
    current: theme,
    isDark,
    isSystem: isSystemTheme,
    label: theme === 'light' ? 'Claro' : theme === 'dark' ? 'Escuro' : 'Sistema'
  });

  return {
    theme,
    isDark,
    isSystemTheme,
    toggleTheme,
    setLightTheme,
    setDarkTheme,
    setSystemTheme,
    getThemeInfo
  };
};
