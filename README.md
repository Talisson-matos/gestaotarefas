# 📋 Kanban Board

> Aplicação de gerenciamento de tarefas no estilo Kanban, com checklist de documentos logísticos, drag & drop de cards e colunas, e persistência total via `localStorage`.

<br/>

## ✨ Demonstração Rápida

```
┌─────────────────┬──────────────────┬─────────────────┬─────────────────┐
│   📌 A Fazer    │  🔄 Em Progresso │   🔍 Em Revisão │   ✅ Concluído  │
├─────────────────┼──────────────────┼─────────────────┼─────────────────┤
│ ┌─────────────┐ │ ┌──────────────┐ │ ┌─────────────┐ │ ┌─────────────┐ │
│ │ Tarefa A    │ │ │ Tarefa B     │ │ │ Tarefa C    │ │ │ Tarefa D    │ │
│ │ ──────────  │ │ │ ──────────── │ │ │ ─────────── │ │ │ ─────────── │ │
│ │ ▓▓▓░░░ 3/9 │ │ │ ▓▓▓▓▓▓ 6/9  │ │ │ ▓▓░░░░ 2/9 │ │ │ ▓▓▓▓▓▓▓ ✓  │ │
│ │ [Alta]      │ │ │ [Média]      │ │ │ [Baixa]     │ │ │ [Alta]      │ │
│ └─────────────┘ │ └──────────────┘ │ └─────────────┘ │ └─────────────┘ │
└─────────────────┴──────────────────┴─────────────────┴─────────────────┘
         ↕ drag cards entre colunas      ↔ drag colunas para reordenar
```

<br/>

## 🚀 Começando

### Pré-requisitos

- **Node.js** v18 ou superior
- **npm** v9 ou superior

### Instalação e execução

```bash
# 1. Clone ou extraia o projeto
cd kanban-todo

# 2. Instale as dependências
npm install

# 3. Rode em modo desenvolvimento
npm run dev
```

Acesse **http://localhost:5173** no seu navegador.

### Outros comandos

```bash
# Build para produção
npm run build

# Pré-visualizar o build de produção
npm run preview
```

<br/>

## 🗂️ Estrutura de Diretórios

```
kanban-todo/
│
├── index.html                  # HTML raiz com importação de fontes Google
├── vite.config.ts              # Configuração do Vite + plugin React
├── tsconfig.json               # Config TypeScript (app)
├── tsconfig.node.json          # Config TypeScript (build tools)
├── package.json                # Dependências e scripts
│
└── src/
    ├── main.tsx                # Entry point — monta o React na DOM
    ├── App.tsx                 # Componente raiz: estado global, drag & drop, persistência
    │
    ├── types/
    │   └── index.ts            # Todos os tipos TS: Task, Column, Checklist, ColumnId...
    │
    ├── utils/
    │   └── storage.ts          # Helpers de leitura/escrita no localStorage
    │
    ├── styles/
    │   └── globals.css         # CSS global: variáveis, layout, cards, modais, checklist
    │
    └── components/
        ├── KanbanColumn.tsx    # Coluna arrastável (Draggable) com Droppable de tasks
        ├── TaskCard.tsx        # Card de tarefa com checklist inline interativo
        ├── TaskModal.tsx       # Modal de criação e edição de tarefas
        └── ConfirmModal.tsx    # Modal de confirmação antes de deletar
```

<br/>

## ⚙️ Funcionalidades

### Quadro Kanban
| Recurso | Descrição |
|---|---|
| 4 colunas padrão | A Fazer · Em Progresso · Em Revisão · Concluído |
| Arrastar cards | Mova tarefas entre colunas com drag & drop |
| Arrastar colunas | Reordene as colunas segurando o ícone `⠿` no cabeçalho |
| Contador por coluna | Exibe o total de tasks em cada coluna em tempo real |
| Estatísticas no header | Resumo de tasks por coluna e total concluído |

### Tarefas
| Recurso | Descrição |
|---|---|
| Criar tarefa | Abre modal com formulário completo |
| Editar tarefa | Clique no ícone ✏️ no card |
| Deletar tarefa | Clique no ícone 🗑️, confirma antes de excluir |
| Prioridade | Baixa (verde) · Média (amarelo) · Alta (vermelho) |
| Descrição | Campo de texto livre opcional |

### Checklist de Documentos
Cada tarefa possui um checklist com os seguintes itens que podem ser marcados diretamente no card:

| # | Item | Descrição |
|---|---|---|
| 1 | **CTE** | Conhecimento de Transporte Eletrônico |
| 2 | **MDFE** | Manifesto Eletrônico de Documentos Fiscais |
| 3 | **CTRB** | Conhecimento de Transporte Rodoviário de Carga |
| 4 | **GUIA** | Guia de pagamento / recolhimento |
| 5 | **Adiantamento** | Registro de adiantamento financeiro |
| 6 | **Redundância** | Verificação de duplicidade |
| 7 | **Bloqueio de Saldo** | Checagem de bloqueio de conta/saldo |
| 8 | **Checklist** | Item geral de checklist operacional |
| 9 | **Tag Inativa** | Verificação de tag inativa no sistema |

**Como usar o checklist no card:**
1. Clique na **barra de progresso** do card para expandir o checklist
2. Clique em qualquer item para **marcar/desmarcar** sem abrir o modal
3. A barra de progresso atualiza em tempo real (`0/9` → `9/9`)
4. Quando todos os itens são marcados, a barra fica **verde** e aparece o badge ✓ Completo

### Persistência
Todos os dados são salvos automaticamente no `localStorage` do navegador:

| Chave | Conteúdo |
|---|---|
| `kanban_tasks` | Array de todas as tarefas com seus checklists |
| `kanban_columns_order` | Ordem atual das colunas após reordenação |

> Os dados persistem entre sessões e recarregamentos de página. Para limpar, basta remover as chaves no DevTools (`F12 → Application → localStorage`).

<br/>

## 📦 Dependências

### Produção

| Pacote | Versão | Finalidade |
|---|---|---|
| `react` | ^18.3 | Biblioteca UI principal |
| `react-dom` | ^18.3 | Renderização na DOM |
| `@hello-pangea/dnd` | ^16.6 | Drag and Drop acessível (fork do react-beautiful-dnd) |
| `lucide-react` | ^0.441 | Biblioteca de ícones SVG |
| `uuid` | ^10.0 | Geração de IDs únicos para tasks |

### Desenvolvimento

| Pacote | Finalidade |
|---|---|
| `vite` | Build tool e servidor de desenvolvimento |
| `@vitejs/plugin-react` | Suporte ao React no Vite (Fast Refresh) |
| `typescript` | Tipagem estática |
| `@types/react` | Tipos do React |
| `@types/react-dom` | Tipos do ReactDOM |
| `@types/uuid` | Tipos do uuid |

<br/>

## 🎨 Design & Tecnologia

- **Tema escuro** com paleta de cores em variáveis CSS (`--bg-primary`, `--accent-blue`, etc.)
- **Tipografia**: [Syne](https://fonts.google.com/specimen/Syne) (títulos) + [DM Sans](https://fonts.google.com/specimen/DM+Sans) (corpo) via Google Fonts
- **CSS puro separado** — sem Tailwind, sem CSS-in-JS, sem módulos CSS
- **Animações**: transições suaves em hover, drag com rotação visual, modais com slide-up
- **Responsivo** horizontalmente com scroll no board

<br/>

## 🔧 Personalização

### Adicionar uma nova coluna
Em `src/types/index.ts`, adicione ao array `DEFAULT_COLUMNS`:
```ts
{ id: 'blocked' as ColumnId, title: 'Bloqueado', color: '#dc2626' }
```
E adicione `'blocked'` ao tipo `ColumnId`.

### Adicionar um novo item ao checklist
Em `src/types/index.ts`:
```ts
// 1. Adicione ao interface Checklist
export interface Checklist {
  // ...existentes
  novoItem: boolean;
}

// 2. Adicione ao CHECKLIST_LABELS
export const CHECKLIST_LABELS = {
  // ...existentes
  novoItem: 'Novo Item',
};

// 3. Adicione ao DEFAULT_CHECKLIST
export const DEFAULT_CHECKLIST = {
  // ...existentes
  novoItem: false,
};
```

<br/>

## 📄 Licença

Distribuído para uso livre. Sinta-se à vontade para adaptar conforme a necessidade do seu projeto.

---

<p align="center">Feito com React + TypeScript + Vite</p>