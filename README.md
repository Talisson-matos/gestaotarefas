# Kanban Todo — TypeScript + Vite

Aplicação de gerenciamento de tarefas no estilo Kanban com checklist de documentos.

## 🚀 Como rodar

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build
```

## 📁 Estrutura de Diretórios

```
kanban-todo/
├── index.html
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── package.json
└── src/
    ├── main.tsx              # Entry point
    ├── App.tsx               # Componente raiz + lógica principal
    ├── types/
    │   └── index.ts          # Tipos TypeScript (Task, Column, Checklist...)
    ├── utils/
    │   └── storage.ts        # Funções de leitura/escrita no localStorage
    ├── styles/
    │   └── globals.css       # CSS global (variáveis, componentes, layout)
    └── components/
        ├── KanbanColumn.tsx  # Coluna do quadro (Droppable)
        ├── TaskCard.tsx      # Card de tarefa (Draggable)
        ├── TaskModal.tsx     # Modal de criação/edição de tarefa
        └── ConfirmModal.tsx  # Modal de confirmação de deleção
```

## ✨ Funcionalidades

- **4 colunas Kanban**: A Fazer → Em Progresso → Em Revisão → Concluído
- **Drag & Drop** entre colunas
- **Criar** tarefas com título, descrição, prioridade e coluna
- **Editar** tarefas clicando no ícone de lápis
- **Deletar** tarefas com confirmação
- **Checklist de documentos**: CTE, MDFE, CTRB, GUIA, Adiantamento, Redundância, Bloqueio de Saldo, Checklist, Tag Inativa
- **Barra de progresso** do checklist em cada card
- **Persistência** no localStorage do navegador
- **Prioridade**: Baixa, Média, Alta

## 📦 Dependências principais

| Pacote | Uso |
|--------|-----|
| `react` + `react-dom` | Framework UI |
| `@hello-pangea/dnd` | Drag and Drop |
| `lucide-react` | Ícones |
| `uuid` | Geração de IDs únicos |
| `vite` | Build tool |
| `typescript` | Tipagem |
