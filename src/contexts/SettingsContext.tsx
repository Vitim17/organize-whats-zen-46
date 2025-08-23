import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UserSettings {
  // Perfil
  name: string;
  email: string;
  timezone: string;
  language: 'pt-BR' | 'en-US';
  
  // Notificações
  pushNotifications: boolean;
  emailNotifications: boolean;
  taskReminders: boolean;
  financialReminders: boolean;
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
  };
  
  // Financeiro
  currency: string;
  customCategories: string[];
  financialGoals: boolean;
  dataEncryption: boolean;
  
  // Agenda
  workHours: {
    start: string;
    end: string;
  };
  defaultReminders: number[]; // em minutos
  calendarIntegration: boolean;
  
  // Dashboard
  defaultWidgets: string[];
  updateFrequency: number; // em minutos
  chartPreferences: string;
  
  // Segurança
  twoFactorAuth: boolean;
  sessionTimeout: number; // em minutos
  loginHistory: boolean;
  
  // Dados
  cloudSync: boolean;
  autoBackup: {
    enabled: boolean;
    frequency: 'daily' | 'weekly' | 'monthly';
  };
  dataRetention: number; // em dias
}

const defaultSettings: UserSettings = {
  name: 'Usuário',
  email: 'usuario@example.com',
  timezone: 'America/Sao_Paulo',
  language: 'pt-BR',
  
  pushNotifications: true,
  emailNotifications: true,
  taskReminders: true,
  financialReminders: true,
  quietHours: {
    enabled: false,
    start: '22:00',
    end: '08:00'
  },
  
  currency: 'BRL',
  customCategories: ['Trabalho', 'Saúde', 'Lazer', 'Educação'],
  financialGoals: true,
  dataEncryption: false,
  
  workHours: {
    start: '09:00',
    end: '18:00'
  },
  defaultReminders: [15, 60, 1440], // 15min, 1h, 1 dia
  calendarIntegration: false,
  
  defaultWidgets: ['resumo', 'financeiro', 'agenda', 'grafico'],
  updateFrequency: 5,
  chartPreferences: 'line',
  
  twoFactorAuth: false,
  sessionTimeout: 30,
  loginHistory: true,
  
  cloudSync: true,
  autoBackup: {
    enabled: true,
    frequency: 'daily'
  },
  dataRetention: 365
};

interface SettingsContextType {
  settings: UserSettings;
  updateSettings: (updates: Partial<UserSettings>) => void;
  resetSettings: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<UserSettings>(() => {
    const saved = localStorage.getItem('organizezap-settings');
    return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
  });

  const updateSettings = (updates: Partial<UserSettings>) => {
    const newSettings = { ...settings, ...updates };
    setSettings(newSettings);
    localStorage.setItem('organizezap-settings', JSON.stringify(newSettings));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.removeItem('organizezap-settings');
  };

  useEffect(() => {
    localStorage.setItem('organizezap-settings', JSON.stringify(settings));
  }, [settings]);

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, resetSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};
