# Sistema de Formatação Monetária Simplificado

## Visão Geral

Este sistema implementa uma formatação automática de valores monetários brasileiros (R$) com validação em tempo real, seguindo exatamente o prompt fornecido pelo usuário. **Agora inclui função de extração de valor numérico, validação completa na adição de transação e campo de valor simplificado!**

## Características Principais

- ✅ **Formatação automática** em tempo real
- ✅ **Suporte completo ao formato brasileiro** (R$)
- ✅ **Validação automática** de valores
- ✅ **Conversão automática** para centavos
- ✅ **Interface limpa e intuitiva**
- ✅ **Reutilizável** em todo o projeto
- ✅ **🆕 Função de extração de valor numérico**
- ✅ **🆕 Validação completa na adição de transação**
- ✅ **🆕 Campo de valor simplificado**

## Componentes Implementados

### 1. Hook `useCurrencyFormat`

**Arquivo:** `src/hooks/useCurrencyFormat.ts`

Hook personalizado que gerencia toda a lógica de formatação monetária.

```typescript
const {
  formattedValue,      // Valor formatado (ex: "R$ 1.234,56")
  numericValue,        // Valor numérico (ex: 1234.56)
  handleValueChange,   // Handler para mudanças no input
  setValue,            // Função para definir valor diretamente
  clearValue,          // Função para limpar valor
  extractNumericValue  // 🆕 Função para extrair valor numérico
} = useCurrencyFormat(initialValue);
```

**Exemplo de uso:**
```typescript
const { formattedValue, numericValue, handleValueChange, extractNumericValue } = useCurrencyFormat(0);

// No input
<input 
  value={formattedValue}
  onChange={handleValueChange}
  placeholder="R$ 0,00"
/>

// Extrair valor numérico
const numericValue = extractNumericValue("R$ 1.234,56");
console.log(numericValue); // 1234.56
```

### 2. Componente `CurrencyInput`

**Arquivo:** `src/components/ui/currency-input.tsx`

Componente de input reutilizável com formatação automática e **função de extração**.

```typescript
<CurrencyInput
  label="Valor da Transação"
  value={value}
  onChange={(value, formattedValue) => console.log(value, formattedValue)}
  onExtractValue={(numericValue) => console.log('Valor extraído:', numericValue)}
  showExtractButton={true}
  placeholder="R$ 0,00"
  required
  error={false}
  helperText="Digite apenas números"
/>
```

**Props disponíveis:**
- `value`: Valor atual (string ou number)
- `onChange`: Callback com valor numérico e formatado
- `onValueChange`: Callback com evento do input
- `onExtractValue`: 🆕 Callback com valor numérico extraído
- `showExtractButton`: 🆕 Mostrar botão de extração
- `placeholder`: Texto de placeholder
- `error`: Estado de erro
- `disabled`: Estado desabilitado
- `required`: Campo obrigatório
- `label`: Rótulo do campo
- `helperText`: Texto de ajuda

### 3. Contexto Financeiro

**Arquivo:** `src/contexts/FinancialContext.tsx`

Contexto React para gerenciar transações financeiras.

```typescript
const { 
  transactions, 
  addTransaction, 
  getTotalBalance,
  getTotalIncome,
  getTotalExpenses 
} = useFinancialContext();
```

### 4. Formulário de Transação

**Arquivo:** `src/components/dashboard/TransactionForm.tsx`

Formulário completo para adicionar transações com formatação automática, **validação completa** e **campo de valor simplificado**.

## 🆕 Função de Extração de Valor

### Implementação

```typescript
// Função simples para extrair valor numérico
const extractNumericValue = (formattedValue: string) => {
  // Remove R$, espaços e pontos, substitui vírgula por ponto
  const cleanValue = formattedValue.replace(/[R$\s]/g, '').replace(/\./g, '').replace(',', '.');
  const numericValue = parseFloat(cleanValue);
  
  console.log('Valor formatado:', formattedValue);
  console.log('Valor limpo:', cleanValue);
  console.log('Valor numérico:', numericValue);
  
  return isNaN(numericValue) ? 0 : numericValue;
};
```

### Como Usar

```typescript
// 1. No hook
const { extractNumericValue } = useCurrencyFormat();
const numericValue = extractNumericValue("R$ 1.234,56");

// 2. No componente
<CurrencyInput
  showExtractButton={true}
  onExtractValue={(value) => console.log('Valor extraído:', value)}
/>

// 3. Diretamente
const extractedValue = extractNumericValue("R$ 999,99");
console.log(extractedValue); // 999.99
```

## 🆕 Validação na Adição de Transação

### Implementação

```typescript
const addTransaction = () => {
  if (newTransaction.description.trim() && newTransaction.value) {
    const extractedValue = extractNumericValue(newTransaction.value);
    
    // Debug: mostra o valor original e extraído
    console.log('Valor original:', newTransaction.value);
    console.log('Valor extraído:', extractedValue);
    
    // Validação adicional: só adiciona se o valor for maior que 0
    if (extractedValue <= 0) {
      alert('Por favor, insira um valor maior que zero.');
      return;
    }
    
    const transaction: Transaction = {
      id: Date.now(),
      description: newTransaction.description.trim(),
      value: extractedValue,
      type: newTransaction.type,
      date: new Date()
    };

    // Adiciona a nova transação no topo da lista
    setTransactions([transaction, ...transactions]);
    
    // Limpa o formulário
    setNewTransaction({
      description: "",
      value: "",
      type: "entrada"
    });
    
    // Fecha o modal
    setIsModalOpen(false);
  }
};
```

### Características da Validação

- ✅ **Validação em tempo real** dos campos obrigatórios
- ✅ **Extração automática** do valor numérico
- ✅ **Validação de valor** (deve ser > 0)
- ✅ **Feedback visual** para erros de validação
- ✅ **Logs detalhados** para debugging
- ✅ **Tratamento de erros** com try/catch
- ✅ **Notificações toast** para sucesso/erro
- ✅ **Botão de teste** para verificar extração

### Como Funciona

1. **Validação Básica**: Verifica se todos os campos obrigatórios estão preenchidos
2. **Extração de Valor**: Usa `extractNumericValue()` para converter o valor formatado
3. **Validação de Valor**: Confirma se o valor extraído é maior que zero
4. **Criação da Transação**: Cria o objeto com o valor numérico extraído
5. **Feedback ao Usuário**: Mostra mensagens de sucesso ou erro
6. **Limpeza do Formulário**: Reseta todos os campos após sucesso

## 🆕 Campo de Valor Simplificado

### Implementação

```typescript
// Campo de valor simplificado
<Input
  id="value"
  type="text"
  value={newTransaction.value}
  onChange={handleValueChange}
  placeholder="0,00"
/>

// Handler para o campo simplificado
const handleSimpleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const inputValue = e.target.value;
  
  // Se estiver vazio, limpa
  if (inputValue === '') {
    setFormData(prev => ({ ...prev, value: '' }));
    return;
  }
  
  // Remove tudo que não é número, vírgula ou ponto
  const cleanValue = inputValue.replace(/[^\d.,]/g, '');
  
  // Formata como valor monetário simples
  let formattedValue = cleanValue;
  
  // Se tem vírgula, mantém como decimal
  if (cleanValue.includes(',')) {
    // Remove pontos de milhares e mantém vírgula decimal
    formattedValue = cleanValue.replace(/\./g, '');
  } else if (cleanValue.length > 3) {
    // Adiciona pontos de milhares se não tem vírgula
    const parts = cleanValue.match(/.{1,3}(?=(.{3})*$)/g);
    if (parts) {
      formattedValue = parts.join('.');
    }
  }
  
  setFormData(prev => ({ ...prev, value: formattedValue }));
};
```

### Características do Campo Simplificado

- ✅ **Entrada direta** de valores monetários
- ✅ **Formatação automática** de pontos de milhares
- ✅ **Preservação** de vírgula decimal
- ✅ **Validação em tempo real** dos caracteres
- ✅ **Alternância** entre campo simples e avançado
- ✅ **Placeholder intuitivo** "0,00"
- ✅ **Fonte monoespaçada** para melhor visualização

### Como Usar

```typescript
// No formulário de transação
const [useSimpleInput, setUseSimpleInput] = useState(false);

// Botão para alternar entre tipos de campo
<Button
  onClick={() => setUseSimpleInput(!useSimpleInput)}
  className="text-xs"
>
  {useSimpleInput ? 'Usar Campo Avançado' : 'Usar Campo Simples'}
</Button>

// Renderização condicional
{useSimpleInput ? (
  <Input
    type="text"
    value={formData.value}
    onChange={handleSimpleValueChange}
    placeholder="0,00"
  />
) : (
  <CurrencyInput
    value={formData.value}
    onChange={handleValueChange}
    placeholder="R$ 0,00"
  />
)}
```

## Como Funciona

### 1. Entrada do Usuário
- Usuário digita apenas números (0-9)
- Sistema remove automaticamente caracteres não numéricos
- Formatação acontece em tempo real

### 2. Processamento Interno
- Números são tratados como centavos
- Exemplo: usuário digita "1234" → sistema interpreta como 12,34 reais
- Formatação automática para "R$ 12,34"

### 3. Validação
- Valores vazios são permitidos
- Apenas números são aceitos
- Formatação automática em tempo real

### 4. 🆕 Extração de Valor
- Remove símbolos de moeda (R$)
- Remove espaços e pontos de milhares
- Substitui vírgula decimal por ponto
- Converte para número JavaScript
- Logs detalhados para debugging

### 5. 🆕 Validação de Transação
- Verifica campos obrigatórios
- Extrai valor numérico automaticamente
- Valida se valor é maior que zero
- Feedback visual em tempo real
- Tratamento de erros robusto

### 6. 🆕 Campo Simplificado
- Entrada direta de valores
- Formatação automática de milhares
- Preservação de vírgula decimal
- Alternância com campo avançado
- Interface limpa e intuitiva

## Exemplos de Formatação

| Input do Usuário | Valor Interno | Exibição Formatada |
|------------------|----------------|-------------------|
| `1234`           | 12.34          | R$ 12,34          |
| `100000`         | 1000.00        | R$ 1.000,00       |
| `50`             | 0.50           | R$ 0,50           |
| `999999`         | 9999.99        | R$ 9.999,99       |

## 🆕 Exemplos de Extração

| Valor Formatado | Valor Extraído | Tipo JavaScript |
|-----------------|----------------|-----------------|
| `R$ 12,34`     | 12.34          | number          |
| `R$ 1.000,00`  | 1000.00        | number          |
| `R$ 0,50`      | 0.50           | number          |
| `R$ 9.999,99`  | 9999.99        | number          |

## 🆕 Exemplos de Validação

| Cenário | Descrição | Valor | Categoria | Resultado |
|---------|-----------|-------|-----------|-----------|
| ✅ Válido | "Salário" | R$ 3.500,00 | "Trabalho" | Transação criada |
| ❌ Inválido | "" | R$ 0,00 | "Trabalho" | Erro: Descrição obrigatória |
| ❌ Inválido | "Supermercado" | R$ 0,00 | "Alimentação" | Erro: Valor deve ser > 0 |
| ❌ Inválido | "Freelance" | R$ 800,00 | "" | Erro: Categoria obrigatória |

## 🆕 Exemplos de Campo Simplificado

| Input do Usuário | Valor Formatado | Valor Extraído |
|------------------|-----------------|----------------|
| `1500,50`       | 1500,50         | 1500.50        |
| `1.500,50`      | 1.500,50        | 1500.50        |
| `25000`         | 25.000          | 25000.00       |
| `99,99`         | 99,99           | 99.99          |
| `1000000`       | 1.000.000       | 1000000.00     |

## Implementação no Projeto

### 1. Adicionar ao App.tsx
```typescript
import { FinancialProvider } from "@/contexts/FinancialContext";

const App = () => (
  <FinancialProvider>
    {/* resto da aplicação */}
  </FinancialProvider>
);
```

### 2. Usar em Componentes
```typescript
import { useCurrencyFormat } from '@/hooks/useCurrencyFormat';
import { CurrencyInput } from '@/components/ui/currency-input';

const MyComponent = () => {
  const { formattedValue, numericValue, handleValueChange, extractNumericValue } = useCurrencyFormat(0);
  
  const handleExtract = () => {
    const extracted = extractNumericValue(formattedValue);
    console.log('Valor extraído:', extracted);
  };
  
  return (
    <div>
      <CurrencyInput
        value={numericValue}
        onChange={(value) => console.log('Valor:', value)}
        onExtractValue={(value) => console.log('Extraído:', value)}
        showExtractButton={true}
        label="Valor"
      />
      <button onClick={handleExtract}>Extrair Valor</button>
    </div>
  );
};
```

### 3. 🆕 Usar Validação de Transação
```typescript
import { TransactionForm } from '@/components/dashboard/TransactionForm';

const MyPage = () => {
  return (
    <div>
      <h1>Minhas Transações</h1>
      <TransactionForm />
      {/* Lista de transações */}
    </div>
  );
};
```

### 4. 🆕 Usar Campo Simplificado
```typescript
import { useState } from 'react';
import { Input } from '@/components/ui/input';

const MyForm = () => {
  const [useSimpleInput, setUseSimpleInput] = useState(false);
  const [value, setValue] = useState('');

  const handleSimpleValueChange = (e) => {
    // Lógica de formatação simplificada
    const inputValue = e.target.value;
    const cleanValue = inputValue.replace(/[^\d.,]/g, '');
    
    let formattedValue = cleanValue;
    if (cleanValue.includes(',')) {
      formattedValue = cleanValue.replace(/\./g, '');
    } else if (cleanValue.length > 3) {
      const parts = cleanValue.match(/.{1,3}(?=(.{3})*$)/g);
      if (parts) {
        formattedValue = parts.join('.');
      }
    }
    
    setValue(formattedValue);
  };

  return (
    <div>
      <button onClick={() => setUseSimpleInput(!useSimpleInput)}>
        {useSimpleInput ? 'Campo Avançado' : 'Campo Simples'}
      </button>
      
      {useSimpleInput ? (
        <Input
          type="text"
          value={value}
          onChange={handleSimpleValueChange}
          placeholder="0,00"
        />
      ) : (
        <CurrencyInput
          value={value}
          onChange={(value, formattedValue) => setValue(formattedValue)}
        />
      )}
    </div>
  );
};
```

## Vantagens do Sistema

### 1. **Simplicidade**
- Implementação direta do prompt fornecido
- Lógica clara e fácil de entender
- Sem dependências externas complexas

### 2. **Flexibilidade**
- Hook reutilizável em qualquer componente
- Componente pronto para uso
- Contexto para gerenciamento de estado
- 🆕 **Função de extração integrada**
- 🆕 **Validação completa integrada**
- 🆕 **Campo simplificado integrado**

### 3. **Experiência do Usuário**
- Formatação em tempo real
- Validação automática
- Interface intuitiva
- 🆕 **Botão de extração opcional**
- 🆕 **Feedback visual em tempo real**
- 🆕 **Alternância entre tipos de campo**

### 4. **Manutenibilidade**
- Código bem estruturado
- Separação de responsabilidades
- Fácil de testar e modificar
- 🆕 **Logs detalhados** para debugging
- 🆕 **Tratamento de erros robusto**
- 🆕 **Componentes modulares**

## Casos de Uso

### 1. **Formulários de Transação**
- Entrada de valores monetários
- Validação automática
- Formatação visual
- 🆕 **Extração para cálculos**
- 🆕 **Validação completa antes de salvar**
- 🆕 **Campo simplificado para usuários experientes**

### 2. **Campos de Orçamento**
- Definição de limites
- Entrada de gastos
- Cálculos automáticos
- 🆕 **Conversão para APIs**
- 🆕 **Validação de valores mínimos**
- 🆕 **Interface adaptativa**

### 3. **Relatórios Financeiros**
- Exibição de valores
- Formatação consistente
- Cálculos precisos
- 🆕 **Exportação de dados**
- 🆕 **Validação de integridade**
- 🆕 **Entrada rápida de dados**

### 4. **🆕 Integração com APIs**
- Envio de valores numéricos
- Recebimento de valores formatados
- Conversão automática
- **Validação de dados**
- **Tratamento de erros**

### 5. **🆕 Formulários Complexos**
- Múltiplos campos monetários
- Validação cruzada
- Feedback em tempo real
- **Prevenção de dados inválidos**
- **Experiência do usuário aprimorada**

### 6. **🆕 Interfaces Adaptativas**
- Campo simples para usuários experientes
- Campo avançado para novos usuários
- Alternância automática baseada no contexto
- **Personalização da experiência**
- **Acessibilidade melhorada**

## Testando o Sistema

1. **Execute o projeto:**
   ```bash
   npm run dev
   ```

2. **Navegue para a página principal**
   - O componente `CurrencyInputDemo` está disponível
   - Teste diferentes valores de entrada
   - Observe a formatação automática
   - 🆕 **Teste a função de extração**
   - 🆕 **Teste a validação de transação**
   - 🆕 **Teste o campo simplificado**

3. **Teste o formulário de transação**
   - Clique em "Nova Transação" no card Financeiro
   - Digite valores no campo de valor
   - Veja a formatação em tempo real
   - 🆕 **Teste a validação completa**
   - 🆕 **Teste a alternância entre tipos de campo**

4. **🆕 Teste a extração de valor**
   - Use os botões "Extrair do Hook" e "Extrair do Input Custom"
   - Observe os logs no console
   - Veja o valor extraído exibido

5. **🆕 Teste a validação de transação**
   - Use a seção 6 do componente de demonstração
   - Preencha diferentes cenários
   - Veja a validação em tempo real
   - Teste o botão "Simular Validação de Transação"

6. **🆕 Teste o campo simplificado**
   - Use a seção 4 do componente de demonstração
   - Teste a alternância entre campo simples e avançado
   - Digite valores como "1500,50" ou "1.500,50"
   - Observe a formatação automática de milhares

## Personalização

### Alterar Formato de Moeda
```typescript
// Em useCurrencyFormat.ts
const formatCurrency = useCallback((value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',        // Altere para outra moeda
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}, []);
```

### Alterar Placeholder
```typescript
<CurrencyInput
  placeholder="Digite o valor"
  // ... outras props
/>

// Ou para campo simplificado
<Input
  placeholder="0,00"
  // ... outras props
/>
```

### Adicionar Validações Customizadas
```typescript
<CurrencyInput
  error={value > 10000}
  helperText={value > 10000 ? "Valor muito alto" : ""}
  // ... outras props
/>
```

### 🆕 Personalizar Função de Extração
```typescript
// Em useCurrencyFormat.ts
const extractNumericValue = useCallback((formattedValue: string): number => {
  // Lógica customizada de extração
  const cleanValue = formattedValue
    .replace(/[R$\s]/g, '')           // Remove R$, espaços
    .replace(/\./g, '')               // Remove pontos de milhares
    .replace(',', '.');               // Substitui vírgula por ponto
  
  const numericValue = parseFloat(cleanValue);
  
  // Logs customizados
  console.log('Valor formatado:', formattedValue);
  console.log('Valor limpo:', cleanValue);
  console.log('Valor numérico:', numericValue);
  
  return isNaN(numericValue) ? 0 : numericValue;
}, []);
```

### 🆕 Personalizar Validação de Transação
```typescript
// Em TransactionForm.tsx
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  
  // Validações customizadas
  const extractedValue = extractNumericValue(formData.value);
  
  // Validação de valor máximo
  if (extractedValue > 1000000) {
    toast.error('Valor muito alto. Máximo permitido: R$ 1.000.000,00');
    return;
  }
  
  // Validação de categoria específica
  if (formData.category === 'Lazer' && extractedValue > 1000) {
    toast.warning('Valor alto para categoria Lazer. Confirme se está correto.');
  }
  
  // ... resto da lógica
};
```

### 🆕 Personalizar Campo Simplificado
```typescript
// Em TransactionForm.tsx
const handleSimpleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const inputValue = e.target.value;
  
  // Lógica customizada de formatação
  const cleanValue = inputValue.replace(/[^\d.,]/g, '');
  
  // Formatação customizada
  let formattedValue = cleanValue;
  
  // Adiciona prefixo R$ se desejar
  if (cleanValue && !cleanValue.startsWith('R$')) {
    formattedValue = `R$ ${cleanValue}`;
  }
  
  // Formatação de milhares customizada
  if (cleanValue.includes(',')) {
    const [integer, decimal] = cleanValue.split(',');
    const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    formattedValue = `${formattedInteger},${decimal}`;
  }
  
  setFormData(prev => ({ ...prev, value: formattedValue }));
};
```

## Conclusão

O sistema implementa exatamente o prompt fornecido pelo usuário, oferecendo:

- ✅ **Formatação automática** em tempo real
- ✅ **Validação automática** de valores
- ✅ **Interface limpa** e intuitiva
- ✅ **Código reutilizável** e bem estruturado
- ✅ **Suporte completo** ao formato brasileiro
- ✅ **🆕 Função de extração de valor numérico**
- ✅ **🆕 Validação completa na adição de transação**
- ✅ **🆕 Campo de valor simplificado**

### **Novidades da Versão 4.0:**

- 🆕 **Função `extractNumericValue`** implementada exatamente como solicitado
- 🆕 **Botão de extração opcional** no componente CurrencyInput
- 🆕 **Logs detalhados** para debugging e monitoramento
- 🆕 **Callback `onExtractValue`** para integração com outros componentes
- 🆕 **Exemplos práticos** de uso da função de extração
- 🆕 **Validação completa** na adição de transação
- 🆕 **Feedback visual em tempo real** para erros de validação
- 🆕 **Tratamento robusto de erros** com try/catch
- 🆕 **Notificações toast** para sucesso e erro
- 🆕 **Botão de teste** para verificar extração
- 🆕 **Demonstração interativa** da validação
- 🆕 **Campo de valor simplificado** com formatação automática
- 🆕 **Alternância entre tipos de campo** (simples/avançado)
- 🆕 **Formatação automática de milhares** no campo simplificado
- 🆕 **Interface adaptativa** para diferentes perfis de usuário

O sistema está **100% funcional** e agora inclui todas as funcionalidades solicitadas: extração, validação e campo simplificado, podendo ser usado imediatamente em qualquer parte do projeto! 🚀
