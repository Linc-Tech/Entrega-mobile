Guia de instalação

## Uso

Para que o aplicativo rode corretamente é necessário fazer a configuração do backend anteriormente. Caso, você efetue algum passo de forma incorreta isso poderá acarretar em falhas durante a utilização da aplicação.

---

### Configuração do backend

O nosso backend conta com o uso de uma lib chamada “lombok” e, ela é configurada de forma diferente quando utilizado com o Eclipse. Portanto, aconselhamos que faça a instalação do IntelliJ IDE para não correr riscos de falhas tendo em vista que ele executa essa configuração automaticamente. Caso contrário, siga o passo-a-passo desse site para configurar o lombok no Eclipse - https://dicasdejava.com.br/como-configurar-o-lombok-no-eclipse/.

#### IntelliJ IDE.

1. Abra o IntelliJ IDE
2. Clique em Open
3. Procure o projeto que irá importar e selecione o pom.xml dele
4. Clique em Open com o pom selecionado
5. Clique em Open as Project
6. E agora só aguarde as dependências serem baixadas (as vezes é comum aparecer um popup no canto inferior direito da tela pedindo sua permissão para instalar as dependências, rodar o projeto como Maven ou até mesmo para baixar a versão do Java que estamos utilizando caso, esteja rodando o projeto pela primeira vez)

**Observações**

- O nosso projeto está sendo realizado em Maven, portanto, para importá-lo no IntelliJ é necessário encontrar o **pom.xml** da aplicação e selecioná-la, senão, a IDE não conseguirá baixar as dependências do Maven e reconhecê-lo como um projeto Maven.

![Screnshot](../assests/fot-pom.png)

#### Configurando o banco de dados

1. Em resources, renomeie o arquivo example.application.properties para somente application.properties.
2. Configure-o com os dados do seu banco Oracle SQL da FIAP.
   1. Caso utilize não utilize o servidor da FIAP, mude a `datasource.url` para a sua esperada.
3. Rode o arquivo executável do projeto - `SofiaBagApplication`

#### Criando um usuário

Para que os endpoints funcionem corretamente, eles esperam que os dados do CRUD que irá testar, estejam relacionados com um usuário específico. Como na nossa aplicação frontend, o usuário está fixo, utilizando algum software de teste de API (Postman, Insomnia…), faça:

1. Abra o Insomnia (ou qualquer outro de preferência)
2. Crie um novo request do tipo `POST`
3. Coloque essa url http://localhost:8082/api/v1/user
4. E no body do request insira:

```
{
    "id": "DJOI208",
    "name": "Jason Le",
    "nickname": "Jale",
    "email": "jason_le@gmail.com",
    "password": "password"
}
```

5. Execute o request para criar seu usuário

**ATENÇÃO**
Não altere o “id” do corpo do request acima, ele que será utilizado para relacionar os objetos criados com um usuário existente.

---

Agora é só rodar o frontend, baixar suas dependências com `npm i` e executar o projeto
