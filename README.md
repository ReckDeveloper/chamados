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

## Como Executar a Aplicação

1.  **Navegue até o diretório `frontend`:**
    ```bash
    cd frontend
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    ```
3.  **Inicie a aplicação (frontend e backend simultaneamente):**
    ```bash
    npm run dev
    ```
- O servidor de backend será iniciado em `http://localhost:3001`.
- A aplicação React será aberta em `http://localhost:3002` (ou em outra porta, se a 3002 estiver ocupada).

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
