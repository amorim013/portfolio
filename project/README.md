# Tarimfy

Plataforma de venda de cursos online com sistema de pagamentos integrado, gestão de conteúdo e análise de métricas.

## Tecnologias

- React
- Node.js
- PostgreSQL
- Stripe
- AWS
- Supabase

## Funcionalidades

- Sistema de autenticação
- Catálogo de cursos
- Pagamentos via Stripe
- Área do instrutor
- Dashboard administrativo
- Análise de métricas
- Sistema de progresso do aluno

## Instalação

```bash
# Clone o repositório
git clone https://github.com/amorim013/tarimfy.git

# Entre no diretório
cd tarimfy

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env

# Inicie o servidor de desenvolvimento
npm run dev
```

## Estrutura do Projeto

```
src/
  ├── components/     # Componentes React
  ├── lib/           # Bibliotecas e configurações
  ├── stores/        # Estado global (Zustand)
  └── styles/        # Estilos e temas
```

## Licença

MIT