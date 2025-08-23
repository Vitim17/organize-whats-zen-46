# Sistema de Tema Escuro - Organizezap

## Visão Geral

O Organizezap agora possui um sistema completo de tema escuro que permite aos usuários alternar entre três modos:
- **Claro**: Tema padrão com fundo branco e texto escuro
- **Escuro**: Tema escuro com fundo preto e texto branco
- **Sistema**: Segue automaticamente a preferência do sistema operacional

## Funcionalidades Implementadas

### 1. Meta Tags HTML
- `color-scheme: light dark` - Indica suporte a ambos os temas
- `theme-color` - Cor da barra de navegação do navegador
- Suporte automático para preferências do sistema

### 2. Contexto de Tema (ThemeContext)
- Gerenciamento centralizado do estado do tema
- Persistência no localStorage
- Detecção automática da preferência do sistema
- Listener para mudanças em tempo real

### 3. Componente ThemeToggle
- Botão de alternância rápida entre temas
- Dropdown com opções específicas
- Tooltips informativos
- Ícones contextuais (Sol, Lua, Monitor)

### 4. Hook Personalizado (useThemeToggle)
- Interface simplificada para componentes
- Métodos para definir temas específicos
- Informações sobre o tema atual

## Como Usar

### No Header
O toggle de tema está disponível no header principal, permitindo alternância rápida.

### Nas Configurações
A página de configurações (`/settings`) possui uma seção dedicada para personalização do tema.

### Em Componentes
```tsx
import { useTheme } from '@/contexts/ThemeContext';
// ou
import { useThemeToggle } from '@/hooks/useThemeToggle';

const MyComponent = () => {
  const { theme, isDark, toggleTheme } = useTheme();
  // ou
  const { theme, isDark, toggleTheme, setLightTheme, setDarkTheme } = useThemeToggle();
  
  return (
    <div className={`${isDark ? 'dark' : ''}`}>
      {/* Conteúdo do componente */}
    </div>
  );
};
```

## Classes CSS Disponíveis

### Modo Claro (Padrão)
- `bg-background` - Fundo principal
- `text-foreground` - Texto principal
- `bg-card` - Fundo dos cards
- `border-border` - Bordas

### Modo Escuro
- `dark:bg-black` - Fundo preto
- `dark:bg-slate-900` - Fundo cinza escuro
- `dark:text-white` - Texto branco
- `dark:border-slate-700` - Bordas cinza escuro

## Variáveis CSS Personalizadas

O sistema usa variáveis CSS HSL para cores, permitindo fácil personalização:

```css
:root {
  --background: 250 50% 98%;      /* Fundo claro */
  --foreground: 240 10% 15%;     /* Texto escuro */
  --primary: 142 76% 36%;        /* Verde WhatsApp */
}

.dark {
  --background: 0 0% 0%;         /* Fundo preto */
  --foreground: 0 0% 100%;       /* Texto branco */
  --primary: 142 76% 60%;        /* Verde mais vibrante */
}
```

## Persistência

- O tema escolhido é salvo automaticamente no localStorage
- A preferência é restaurada ao recarregar a página
- Suporte a mudanças em tempo real da preferência do sistema

## Acessibilidade

- Suporte completo a `prefers-color-scheme`
- Transições suaves entre temas
- Contraste otimizado para ambos os modos
- Ícones e labels descritivos

## Compatibilidade

- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari
- ✅ Dispositivos móveis
- ✅ PWA (Progressive Web App)

## Personalização

Para adicionar novos temas ou modificar cores existentes:

1. Edite as variáveis CSS em `src/index.css`
2. Adicione novas classes no `tailwind.config.ts`
3. Atualize o `ThemeContext` se necessário
4. Teste em ambos os modos

## Troubleshooting

### Tema não muda
- Verifique se o `ThemeProvider` está envolvendo a aplicação
- Confirme se as classes `dark:` estão sendo aplicadas
- Verifique o console para erros

### Cores não aplicadas
- Confirme se as variáveis CSS estão definidas
- Verifique se o Tailwind está configurado corretamente
- Teste com classes diretas do Tailwind

### Persistência não funciona
- Verifique se o localStorage está disponível
- Confirme se a chave `organizezap-theme` está sendo salva
- Teste em modo privado/incógnito
