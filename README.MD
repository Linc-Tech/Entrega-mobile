# Guia de instalação

## Uso

Para que o aplicativo rode corretamente é necessário fazer a configuração do backend anteriormente. Caso, você efetue algum passo de forma incorreta isso poderá acarretar em falhas durante a utilização da aplicação.


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

   <img width="479" alt="foto-pom" src="https://user-images.githubusercontent.com/61299646/136713290-f15b09a0-4cde-401f-b49b-d4c21727845d.png">

#### Configurando o banco de dados

1. Em resources, renomeie o arquivo example.application.properties para somente application.properties.
2. Configure-o com os dados do seu banco Oracle SQL da FIAP.
   1. Caso utilize não utilize o servidor da FIAP, mude a `datasource.url` para a sua esperada.
3. Rode o arquivo executável do projeto - `SofiaBagApplication`


**ATENÇÃO**

Para que os endpoints funcionem corretamente, eles esperam que os dados do CRUD que irá testar, estejam relacionados com um usuário específico. Além disso, também é necessário um usuário para você fazer o login na nosso app. Portanto, ao acessar a aplicação, clique em "Cadastrar" e após isso efetue o seu login.
<img width="316" alt="Captura de Tela 2021-10-19 às 23 40 24" src="https://user-images.githubusercontent.com/61299646/138019147-a33db801-dc03-49de-bdc7-96c70d84cebe.png">

Agora é só rodar o frontend, baixar suas dependências com `npm i` e executar o projeto


## Projeto

https://user-images.githubusercontent.com/61299646/136713379-5ca2d9c3-e61e-4183-b3b8-062827b562c3.mp4


