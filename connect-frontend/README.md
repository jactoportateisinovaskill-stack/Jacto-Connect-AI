# Jacto Connect AI

## Como rodar o frontend do projeto

Siga as instruções abaixo para executar o projeto localmente na sua máquina.

### Pré-requisitos

Certifique-se de ter instalado na sua máquina:
- [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
- Gerenciador de pacotes npm (já vem com o Node.js)

### Passos para instalação e execução

1. **Abra o terminal** na pasta do projeto (`connect-frontend`).

2. **Instale as dependências** do projeto rodando o seguinte comando:
   ```bash
   npm install
   ```
   *(Este comando fará o download de todas as bibliotecas necessárias, como o Next.js, Tailwind, Lucide React, etc).*

3. **Inicie o servidor de desenvolvimento** rodando:
   ```bash
   npm run dev
   ```

4. **Acesse o sistema**:
   Abra o seu navegador de preferência e acesse o endereço local:
   [http://localhost:3000](http://localhost:3000)

---

### Principais Tecnologias e Bibliotecas

- **Next.js 15+** (App Router) - Framework React
- **React 19** - Biblioteca para interfaces de usuário
- **Tailwind CSS** - Estilização utilitária
- **Framer Motion** - Animações fluidas de UI
- **Lucide React** - Ícones
- **Radix UI** - Acessibilidade e componentes de baixo nível

###  Estrutura de Rotas

O sistema apresenta roteamento dependente do papel de acesso do usuário, selecionado logo na tela inicial:
- **Técnico / Parceiro / Usuário**: Redirecionado para `/equipamento`, passando pelo fluxo de capturar imagem (`/capturar`), análise de IA (`/analisando`) e catálogo de resultado (`/resultado`).
- **Gestor**: Redirecionado para o dashboard executivo (`/insights`), exibindo um mapa de calor global e métricas de peças.

*Dica: Você pode alternar o idioma na página inicial (Português, Inglês e Espanhol), e todas as telas refletirão a internacionalização dinamicamente.*
