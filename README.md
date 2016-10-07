Teste Front-end
===============
A fim de agilizar e padronizar o projeto, eu utilizei algumas ferramentas e tecnologias para determinadas etapas.
Quis fazer um tipo de WebApp para termos os scripts, css e html minificados, portanto, para criar a estrutura do projeto utilizei o Yeoman. Ele cria todas as pastas e a estrutura base do projeto através da pack generator-webapp. 
```
yo webapp
```

Para gerenciar algumas dependências e bibliotecas do projeto, alem do npm, usei o Bower. Através de comandos como: 
```
bower install bootstrap --save
```

Para automatizar o desenvolvimento e build do projeto usei o Gulp que também ajuda muito com seu LiveReload que atualiza o browser automaticamente a cada alteração dos arquivos que compõem o projeto. Ele ja vem instalado com a estrutura do projeto.
```
gulp build | gulp serve 
```

Para programação das animações e manipulação dos DOMs utilizei o JQuery.

O design do projeto foi um tipo de MVC. Onde o model seria o Back-end, o view os DOMs e os controles são os scripts.

Como implementar o Projeto localmente:
-----------
```
git clone https://github.com/filipednb/teste-apontamentos.git
```
```
cd teste-apontamentos
```
```
bower install
```

```
npm install
```

Como testar
------------
```
gulp serve
```

Como publicar
------------

```
gulp build
```

Servindo a pasta /dist (produção)
```
gulp serve:dist
```

