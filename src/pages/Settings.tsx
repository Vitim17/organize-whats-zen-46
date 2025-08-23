import React, { useState } from 'react';
import { ArrowLeft, Sun, Moon, Monitor, Save, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTheme } from '@/contexts/ThemeContext';
import { useSettings } from '@/contexts/SettingsContext';
import { useNavigate } from 'react-router-dom';

export const Settings = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { settings, updateSettings, resetSettings } = useSettings();
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('appearance');

  const handleSave = async () => {
    setIsSaving(true);
    // Simular salvamento
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  const handleReset = () => {
    if (confirm('Tem certeza que deseja redefinir todas as configurações?')) {
      resetSettings();
    }
  };

  return (
    <div className="min-h-screen bg-background dark:bg-black">
      {/* Header */}
      <div className="border-b bg-card dark:bg-slate-900 dark:border-slate-700">
        <div className="container flex h-16 items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
            className="mr-2 dark:text-white dark:hover:bg-slate-800"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold dark:text-white">Configurações</h1>
            <p className="text-sm text-muted-foreground dark:text-slate-300">
              Personalize sua experiência no Organizezap
            </p>
          </div>
        </div>
      </div>

      <div className="container py-6">
        {/* Simple Tab Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { id: 'appearance', label: 'Aparência' },
              { id: 'profile', label: 'Perfil' },
              { id: 'notifications', label: 'Notificações' },
              { id: 'financial', label: 'Financeiro' },
              { id: 'security', label: 'Segurança' },
              { id: 'data', label: 'Dados' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground dark:bg-blue-500 dark:text-white'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {/* Aparência */}
            {activeTab === 'appearance' && (
              <div className="bg-card dark:bg-slate-900 rounded-lg p-6 border dark:border-slate-700">
                <h3 className="text-lg font-semibold mb-4 dark:text-white">Tema e Aparência</h3>
                <p className="text-sm text-muted-foreground mb-6 dark:text-slate-300">
                  Personalize a aparência da interface
                </p>
                
                <div className="space-y-6">
                  <div className="space-y-4">
                    <Label className="text-base font-medium dark:text-white">Tema</Label>
                    <div className="grid grid-cols-3 gap-4">
                      <Button
                        variant={theme === 'light' ? 'default' : 'outline'}
                        onClick={() => setTheme('light')}
                        className="h-20 flex-col space-y-2 dark:border-slate-600 dark:text-slate-300"
                      >
                        <Sun className="h-6 w-6" />
                        <span>Claro</span>
                      </Button>
                      <Button
                        variant={theme === 'dark' ? 'default' : 'outline'}
                        onClick={() => setTheme('dark')}
                        className="h-20 flex-col space-y-2 dark:border-slate-600 dark:text-slate-300"
                      >
                        <Moon className="h-6 w-6" />
                        <span>Escuro</span>
                      </Button>
                      <Button
                        variant={theme === 'system' ? 'default' : 'outline'}
                        onClick={() => setTheme('system')}
                        className="h-20 flex-col space-y-2 dark:border-slate-600 dark:text-slate-300"
                      >
                        <Monitor className="h-6 w-6" />
                        <span>Sistema</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Perfil */}
            {activeTab === 'profile' && (
              <div className="bg-card dark:bg-slate-900 rounded-lg p-6 border dark:border-slate-700">
                <h3 className="text-lg font-semibold mb-4 dark:text-white">Informações Pessoais</h3>
                <p className="text-sm text-muted-foreground mb-6 dark:text-slate-300">
                  Gerencie suas informações básicas e preferências
                </p>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="dark:text-white">Nome</Label>
                      <Input
                        id="name"
                        value={settings.name}
                        onChange={(e) => updateSettings({ name: e.target.value })}
                        placeholder="Seu nome completo"
                        className="dark:bg-slate-800 dark:border-slate-600 dark:text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="dark:text-white">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={settings.email}
                        onChange={(e) => updateSettings({ email: e.target.value })}
                        placeholder="seu@email.com"
                        className="dark:bg-slate-800 dark:border-slate-600 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notificações */}
            {activeTab === 'notifications' && (
              <div className="bg-card dark:bg-slate-900 rounded-lg p-6 border dark:border-slate-700">
                <h3 className="text-lg font-semibold mb-4 dark:text-white">Notificações</h3>
                <p className="text-sm text-muted-foreground mb-6 dark:text-slate-300">
                  Configure como e quando receber notificações
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="dark:text-white">Notificações Push</Label>
                      <p className="text-sm text-muted-foreground dark:text-slate-300">
                        Receber notificações no navegador
                      </p>
                    </div>
                    <Switch
                      checked={settings.pushNotifications}
                      onCheckedChange={(checked) => updateSettings({ pushNotifications: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="dark:text-white">Notificações por Email</Label>
                      <p className="text-sm text-muted-foreground dark:text-slate-300">
                        Receber lembretes por email
                      </p>
                    </div>
                    <Switch
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => updateSettings({ emailNotifications: checked })}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Financeiro */}
            {activeTab === 'financial' && (
              <div className="bg-card dark:bg-slate-900 rounded-lg p-6 border dark:border-slate-700">
                <h3 className="text-lg font-semibold mb-4 dark:text-white">Configurações Financeiras</h3>
                <p className="text-sm text-muted-foreground mb-6 dark:text-slate-300">
                  Personalize suas preferências financeiras
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="dark:text-white">Metas Financeiras</Label>
                      <p className="text-sm text-muted-foreground dark:text-slate-300">
                        Ativar alertas para metas financeiras
                      </p>
                    </div>
                    <Switch
                      checked={settings.financialGoals}
                      onCheckedChange={(checked) => updateSettings({ financialGoals: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="dark:text-white">Criptografia de Dados</Label>
                      <p className="text-sm text-muted-foreground dark:text-slate-300">
                        Criptografar dados financeiros sensíveis
                      </p>
                    </div>
                    <Switch
                      checked={settings.dataEncryption}
                      onCheckedChange={(checked) => updateSettings({ dataEncryption: checked })}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Segurança */}
            {activeTab === 'security' && (
              <div className="bg-card dark:bg-slate-900 rounded-lg p-6 border dark:border-slate-700">
                <h3 className="text-lg font-semibold mb-4 dark:text-white">Segurança e Privacidade</h3>
                <p className="text-sm text-muted-foreground mb-6 dark:text-slate-300">
                  Gerencie a segurança da sua conta
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="dark:text-white">Autenticação de Dois Fatores</Label>
                      <p className="text-sm text-muted-foreground dark:text-slate-300">
                        Adicionar uma camada extra de segurança
                      </p>
                    </div>
                    <Switch
                      checked={settings.twoFactorAuth}
                      onCheckedChange={(checked) => updateSettings({ twoFactorAuth: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="dark:text-white">Histórico de Login</Label>
                      <p className="text-sm text-muted-foreground dark:text-slate-300">
                        Manter registro de atividades de login
                      </p>
                    </div>
                    <Switch
                      checked={settings.loginHistory}
                      onCheckedChange={(checked) => updateSettings({ loginHistory: checked })}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Dados */}
            {activeTab === 'data' && (
              <div className="bg-card dark:bg-slate-900 rounded-lg p-6 border dark:border-slate-700">
                <h3 className="text-lg font-semibold mb-4 dark:text-white">Dados e Sincronização</h3>
                <p className="text-sm text-muted-foreground mb-6 dark:text-slate-300">
                  Gerencie seus dados e sincronização
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="dark:text-white">Sincronização em Nuvem</Label>
                      <p className="text-sm text-muted-foreground dark:text-slate-300">
                        Sincronizar dados entre dispositivos
                      </p>
                    </div>
                    <Switch
                      checked={settings.cloudSync}
                      onCheckedChange={(checked) => updateSettings({ cloudSync: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="dark:text-white">Backup Automático</Label>
                      <p className="text-sm text-muted-foreground dark:text-slate-300">
                        Fazer backup automático dos dados
                      </p>
                    </div>
                    <Switch
                      checked={settings.autoBackup.enabled}
                      onCheckedChange={(checked) => 
                        updateSettings({ 
                          autoBackup: { ...settings.autoBackup, enabled: checked } 
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex justify-between items-center pt-6 border-t dark:border-slate-700">
          <Button
            variant="outline"
            onClick={handleReset}
            className="flex items-center space-x-2 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Redefinir Tudo</span>
          </Button>

          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center space-x-2 dark:bg-blue-500 dark:hover:bg-blue-400"
          >
            <Save className="h-4 w-4" />
            <span>{isSaving ? 'Salvando...' : 'Salvar Configurações'}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
