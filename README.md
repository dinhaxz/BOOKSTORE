Documentação Técnica

Este documento descreve conceitos fundamentais utilizados no desenvolvimento do projeto, incluindo middleware no Express, escolha de banco de dados, segurança com hashing e uso de variáveis de ambiente.

🚀 1. Middleware no Express e processamento de JSON
No Express, middleware é uma função que intercepta e processa requisições HTTP antes que elas cheguem à rota final.

Essas funções têm acesso a:

req (requisição)
res (resposta)
next (função para passar o controle)
📱 Importância para aplicações mobile
Aplicativos mobile geralmente enviam dados no formato JSON no corpo da requisição. O Node.js, por padrão, não interpreta automaticamente esse formato.

Por isso, utilizamos o middleware:

app.use(express.json());
🔍 O que ele faz:
Interpreta o JSON enviado no corpo da requisição
Converte em objeto JavaScript
Disponibiliza os dados em req.body
❗ Sem esse middleware:
req.body será undefined
Não será possível acessar dados enviados pelo cliente

🗄️ 2. NoSQL vs SQL para catálogo de livros
📄 Banco NoSQL (orientado a documentos)
Estrutura flexível (schema dinâmico)
Dados armazenados em formato semelhante a JSON
Permite documentos com diferentes estruturas
Exemplo:

{ "titulo": "Livro A", "autor": "Autor X" }
{ "titulo": "Livro B", "autor": "Autor Y", "editora": "ABC" }

✔ Vantagens:
Flexibilidade para mudanças frequentes
Menor necessidade de migração de estrutura
Ideal para prototipação e evolução rápida

🧱 Banco SQL (relacional)
Estrutura rígida com tabelas e colunas definidas
Necessita de schema fixo
Exemplo:

id | titulo | autor | editora
✔ Vantagens:
Maior integridade e consistência dos dados
Suporte robusto a relacionamentos
Melhor para consultas complexas

⚖️ Comparação no cenário do projeto
Para um catálogo de livros com estrutura variável:

Critério	NoSQL	SQL
Flexibilidade	Alta	Baixa
Estrutura	Dinâmica	Fixa
Evolução do schema	Simples	Requer migração
Consistência	Menor	Maior

🔐 3. Hashing com bcryptjs
O hashing é uma técnica de segurança usada para proteger senhas armazenadas no banco de dados.

🔑 Como funciona:
A senha original é transformada em um hash (código irreversível)
Exemplo:
Senha: 123456
Hash: $2a$10$EixZaYVK1fsbw1ZfbX3OXe...

🔒 Características importantes:
Irreversível: não é possível obter a senha original
Salt automático: cada hash é único
Processamento lento: dificulta ataques de força bruta

🛡️ Proteção em caso de vazamento:
Se o banco de dados for comprometido:

Senhas não são expostas diretamente
Atacantes precisarão tentar quebrar cada hash individualmente
O custo computacional torna ataques muito mais difíceis

🌱 4. Uso de .env e dotenv
O arquivo .env é utilizado para armazenar variáveis sensíveis e configurações do sistema.

O pacote dotenv permite carregar essas variáveis no ambiente da aplicação.

📄 Exemplo de .env:
DB_PASSWORD=senha_super_secreta
JWT_SECRET=chave_ultra_secreta
API_KEY=abc123

🔐 Importância de segurança
Evita expor informações sensíveis diretamente no código:

❌ Errado:

const password = "123456";
✔ Correto:

const password = process.env.DB_PASSWORD;
📦 Boas práticas com GitHub
Adicionar .env no .gitignore
Nunca versionar credenciais
Compartilhar apenas um .env.example
🚀 Uso em diferentes ambientes
Permite configurações distintas para cada ambiente:

Desenvolvimento:

DB_PASSWORD=123
Produção:

DB_PASSWORD=senha_forte_real
🔐 Signup Workflow (React Native + Node.js + MongoDB)

O processo de cadastro de usuário segue este fluxo:

Frontend (React Native) O usuário preenche os campos username, email e password e envia os dados via requisição HTTP (POST) para o backend.

Backend (Node.js + Express)

Valida os dados recebidos

Verifica se o email já está cadastrado

Criptografa a senha usando bcrypt

Cria o usuário no banco de dados

Banco de Dados (MongoDB)

Armazena o usuário com a senha criptografada.

Resposta

O backend retorna sucesso ou erro, e o app trata essa resposta (ex: login automático ou mensagem).


🧠 1. O que são tipos de dados no Postman (JSON Schema)

No Postman, quando você define um schema, você está dizendo:

“Esse campo deve ser exatamente deste tipo — nada diferente.”

Os principais tipos são:

string → texto (ex: email, nome)
integer / number → números
boolean → true/false
object → objeto JSON
array → lista

🔎 Exemplo:
{
  "age": { "type": "integer" },
  "email": { "type": "string" }
}

👉 Se o backend mandar "age": "20" (string em vez de número), o teste falha.

⚙️ 2. O que são Constraints (restrições)

As constraints vão além do tipo. Elas dizem:

“Além de ser do tipo correto, o valor precisa obedecer certas regras.”

Exemplos comuns:

🔢 Numéricos
minimum, maximum → limites
"age": {
  "type": "integer",
  "minimum": 0
}

➡️ Impede idade negativa

📧 Strings (como email)
format: "email"
pattern (regex)
minLength, maxLength
"email": {
  "type": "string",
  "format": "email"
}

➡️ Impede emails inválidos


📋 Regras estruturais
required → campos obrigatórios
enum → valores permitidos
uniqueItems → itens únicos em arrays
"status": {
  "type": "string",
  "enum": ["active", "inactive"]
}

➡️ Evita valores inesperados

🚧 3. Por que isso é uma “primeira linha de defesa”

O ponto mais importante:

👉 O Postman valida os dados na fronteira da API, antes de chegar no app.

Segundo a própria documentação:

A validação com JSON Schema verifica dados automaticamente e rejeita dados inválidos antes de chegar à lógica da aplicação

🔥 Exemplo prático (seu cenário)
Caso 1: idade negativa

Sem validação:

{ "age": -5 }

➡️ React Native pode quebrar UI ou lógica

Com schema:

"age": {
  "type": "integer",
  "minimum": 0
}

➡️ ❌ Teste falha no Postman
➡️ Bug nunca chega ao app

Caso 2: email duplicado ou inválido
format: email → impede formato inválido
duplicidade → geralmente validada com lógica + testes

➡️ Você pode criar testes no Postman para garantir:

pm.expect(response.email).to.not.equal(existingEmail)
🧩 4. Relação direta com React Native

Sem validação:

dados inconsistentes chegam ao app
crashes, telas quebradas, bugs difíceis

Com validação no Postman:

garante contrato de dados consistente
frontend pode confiar nos dados
reduz necessidade de validação defensiva no app

👉 Em outras palavras:

Postman = teste de contrato
React Native = consumo confiável
🧪 5. Como isso funciona na prática no Postman

Você escreve um teste assim:

pm.test("Schema válido", function () {
  const schema = {
    type: "object",
    properties: {
      age: { type: "integer", minimum: 0 },
      email: { type: "string", format: "email" }
    },
    required: ["age", "email"]
  };

  pm.response.to.have.jsonSchema(schema);
});

➡️ Se qualquer regra for violada:

o teste falha
você detecta o erro antes de produção
🧱 6. Conclusão (visão arquitetural)

Os tipos + constraints no Postman atuam como:

✅ Contrato de dados

Definem exatamente como a API deve responder

🚫 Filtro de erros

Bloqueiam:

idade negativa
tipos errados
campos ausentes
formatos inválidos
🛡️ Primeira linha de teste

Evitam que dados inválidos:

cheguem ao React Native
quebrem componentes
causem bugs silenciosos

🔒 Segurança

Senhas são armazenadas com hash (bcrypt)
Nunca salvar senha em texto puro
