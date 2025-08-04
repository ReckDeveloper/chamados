# Painel de Solicitações de TI

Este é um sistema simples de rastreamento de chamados de TI, permitindo que os usuários enviem novas solicitações e acompanhem seu status.

## Funcionalidades

- **Criação de Solicitações:** Um formulário para que os usuários enviem novas solicitações de TI, incluindo:
  - Nome do Solicitante (em uma lista suspensa)
  - Setor (em uma lista suspensa)
  - Categoria da Solicitação
  - Justificativa/Impacto
  - Métrica de Sucesso
  - Título da Solicitação
  - Descrição Detalhada
- **Acompanhamento de Solicitações:** Uma página de listagem que exibe todas as solicitações em uma tabela, mostrando o **Título** e o **Status**.
- **Detalhes e Atualização:**
  - Clicar em um título na lista de acompanhamento leva a uma página de detalhes.
  - A página de detalhes exibe todas as informações sobre a solicitação.
  - Os administradores podem atualizar o **Status** da solicitação e definir uma **Data Prevista para Homologação**.

## Arquitetura da Aplicação

A aplicação é composta por duas partes principais:

1.  **Frontend:** Uma aplicação React (criada com `create-react-app`) que fornece a interface do usuário.
2.  **Backend:** Um servidor Node.js/Express que fornece uma API RESTful para interagir com o banco de dados.

O banco de dados utilizado é o **SQLite**, e o arquivo do banco de dados (`database.sqlite`) está localizado no diretório `api/`.

## Configuração do Ambiente de Desenvolvimento

Siga estes passos para rodar a aplicação em um ambiente de desenvolvimento local.

1.  **Pré-requisitos:**
    *   Tenha o [Node.js](https://nodejs.org/) (versão LTS) instalado.

2.  **Navegue até o diretório `frontend`:**
    ```bash
    cd frontend
    ```
3.  **Instale as Dependências:**
    *   Este comando instalará todas as bibliotecas necessárias para o frontend e o backend.
    ```bash
    npm install
    ```
4.  **Inicialize o Banco de Dados:**
    *   Este comando criará o arquivo de banco de dados SQLite e as tabelas necessárias. Ele também criará um usuário `admin` padrão.
    ```bash
    npm run db:init
    ```
5.  **Inicie a Aplicação:**
    *   Este comando iniciará o servidor de backend (com `nodemon`) e o servidor de desenvolvimento do React simultaneamente.
    ```bash
    npm run dev
    ```
- O servidor de backend (API) estará rodando em `http://localhost:3001`.
- A aplicação React (UI) estará acessível em `http://localhost:3002`.

---

## Deploy (Implantação) em Windows 10

Este guia descreve como implantar a aplicação em uma máquina Windows 10 para produção.

### Parte 1: Instalar as Ferramentas Necessárias

1.  **Instale o Node.js:**
    *   Vá para o site oficial do [Node.js](https://nodejs.org/).
    *   Baixe a versão "LTS" (Long-Term Support).
    *   Execute o instalador, aceitando todas as opções padrão.

### Parte 2: Preparar a Aplicação

1.  **Copie os Arquivos do Projeto:**
    *   Coloque a pasta inteira do projeto na máquina Windows 10.

2.  **Instale as Dependências:**
    *   Abra o **Prompt de Comando** (`cmd`).
    *   Navegue até a pasta `frontend` do projeto (ex: `cd C:\caminho\para\o\projeto\frontend`).
    *   Execute o comando: `npm install`.

3.  **Crie a "Build" de Produção:**
    *   Este passo cria uma versão otimizada do frontend.
    *   No mesmo Prompt de Comando, execute: `npm run build`.
    *   Isso criará uma nova pasta `build` dentro do diretório `frontend`.

### Parte 3: Executar a Aplicação Permanentemente com `pm2`

`pm2` é um gerenciador de processos que manterá sua aplicação rodando 24/7.

1.  **Instale o `pm2`:**
    *   No Prompt de Comando, execute: `npm install pm2 -g`.

2.  **Inicie o Servidor de Backend (API):**
    *   Certifique-se de que você está no diretório `frontend`.
    *   Execute: `pm2 start server.js --name chamados-api`.

3.  **Sirva o Frontend (UI):**
    *   O frontend é servido a partir da pasta `build`. A maneira mais fácil é usar o pacote `serve`.
    *   **Instale o `serve`:** `npm install -g serve`.
    *   **Inicie o servidor do frontend:** `pm2 start "serve -s build -l 3002" --name chamados-ui`. (Usando a porta 3002 para corresponder à configuração de desenvolvimento).

4.  **Configure o `pm2` para Iniciar com o Windows:**
    *   Para garantir que sua aplicação reinicie junto com o computador, execute os seguintes comandos:
        1.  `pm2 startup`
        2.  `pm2 save`

### Concluído!

Sua aplicação agora está implantada e rodando.
-   A **API** está rodando e sendo gerenciada pelo `pm2`.
-   A **Interface do Usuário** está sendo servida a partir da pasta `build` na porta 3002, também gerenciada pelo `pm2`.
-   Os usuários podem acessar a aplicação em `http://localhost:3002`.

---

## Nota Sobre o Backend PHP Original

O backend original foi construído em PHP, mas foi substituído por um servidor Node.js devido a problemas de configuração do ambiente que impediam a execução correta.

O principal problema era que a extensão **`pdo_sqlite`** do PHP não estava habilitada no ambiente do servidor. Para que o backend PHP original funcione, a extensão `pdo_sqlite` deve ser instalada e habilitada.

#### Habilitando `pdo_sqlite`

**No Linux (usando um gerenciador de pacotes como o APT - para Debian/Ubuntu):**

1.  **Instale o pacote:** O nome do pacote pode variar dependendo da sua versão do PHP.
    ```bash
    # Para PHP 8.1, por exemplo:
    sudo apt-get install php8.1-sqlite3
    ```
2.  **Habilite a extensão:** A instalação geralmente habilita a extensão automaticamente. Se não, você pode habilitá-la manualmente.
3.  **Reinicie o servidor web:**
    ```bash
    sudo systemctl restart apache2
    # ou
    sudo systemctl restart nginx
    ```

**No Windows (usando XAMPP, WAMP, etc.):**

1.  **Encontre seu arquivo `php.ini`:** Geralmente, você pode acessá-lo através do painel de controle do seu servidor local (ex: XAMPP Control Panel -> Apache -> Config -> `php.ini`).
2.  **Edite o arquivo `php.ini`:** Abra o arquivo em um editor de texto.
3.  **Encontre e descomente a linha:** Procure pela seguinte linha e remova o ponto e vírgula (`;`) do início dela.
    ```ini
    ;extension=pdo_sqlite
    ```
    Deverá ficar assim:
    ```ini
    extension=pdo_sqlite
    ```
4.  **Salve o arquivo e reinicie o servidor Apache** através do painel de controle.

---

Como a alteração no ambiente original não era possível, a solução mais robusta foi migrar o backend para Node.js, que é autocontido e não depende da configuração do PHP do sistema.

---

## Deploy (Implantação) em Windows 10

Este guia descreve como implantar a aplicação em uma máquina Windows 10 para produção.

### Parte 1: Instalar as Ferramentas Necessárias

1.  **Instale o Node.js:**
    *   Vá para o site oficial do [Node.js](https://nodejs.org/).
    *   Baixe a versão "LTS" (Long-Term Support).
    *   Execute o instalador, aceitando todas as opções padrão.

### Parte 2: Preparar a Aplicação

1.  **Copie os Arquivos do Projeto:**
    *   Coloque a pasta inteira do projeto na máquina Windows 10.

2.  **Instale as Dependências:**
    *   Abra o **Prompt de Comando** (`cmd`).
    *   Navegue até a pasta `frontend` do projeto (ex: `cd C:\caminho\para\o\projeto\frontend`).
    *   Execute o comando: `npm install`.

3.  **Crie a "Build" de Produção:**
    *   Este passo cria uma versão otimizada do frontend.
    *   No mesmo Prompt de Comando, execute: `npm run build`.
    *   Isso criará uma nova pasta `build` dentro do diretório `frontend`.

### Parte 3: Executar a Aplicação Permanentemente com `pm2`

`pm2` é um gerenciador de processos que manterá sua aplicação rodando 24/7.

1.  **Instale o `pm2`:**
    *   No Prompt de Comando, execute: `npm install pm2 -g`.

2.  **Inicie o Servidor de Backend (API):**
    *   Certifique-se de que você está no diretório `frontend`.
    *   Execute: `pm2 start server.js --name chamados-api`.

3.  **Sirva o Frontend (UI):**
    *   O frontend é servido a partir da pasta `build`. A maneira mais fácil é usar o pacote `serve`.
    *   **Instale o `serve`:** `npm install -g serve`.
    *   **Inicie o servidor do frontend:** `pm2 start "serve -s build -l 3002" --name chamados-ui`. (Usando a porta 3002 para corresponder à configuração de desenvolvimento).

4.  **Configure o `pm2` para Iniciar com o Windows:**
    *   Para garantir que sua aplicação reinicie junto com o computador, execute os seguintes comandos:
        1.  `pm2 startup`
        2.  `pm2 save`

### Concluído!

Sua aplicação agora está implantada e rodando.
-   A **API** está rodando e sendo gerenciada pelo `pm2`.
-   A **Interface do Usuário** está sendo servida a partir da pasta `build` na porta 3002, também gerenciada pelo `pm2`.
-   Os usuários podem acessar a aplicação em `http://localhost:3002`.
