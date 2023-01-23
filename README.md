# waiters

## Um aplicativo para os garçons e um dashboard web para os cozinheiros. Ambos integrados, a ideia é a substituição da comanda nos restaurantes.

## Após o Garçom realizar a criação do pedido (Similar à Comanda, com mesa, produtos e as quantidades, além do valor) no app, e efetuar a devida confirmação, o pedido será disponibilizado, com valor, quantidades, ingredientes e mesa referente, no dashboard web.

## Totalmente integrado e em tempo real, utilizando WebSockets. (socket.io)

# Tecnologias utilizadas: Docker, Mongoose, Express, Typescript, React e ReactNative.

# Como rodar o app: 
### 1. Tenha um container MongoDB apontando para a porta 27017
### 2. "yarn/npm dev", dentro da pasta fe, para iniciar o vite e ver o dashboard web.
### 3. "yarn/npm start", dentro da pasta api, para iniciar a api.
### 4. "yarn/npm dev", dentro da pasta app, para iniciar o expo e conseguir usar o emulador/celular.
### 5. Para que as imagens sejam visualizadas, deve-se trocar o ip das urls das mesmas. Procure por "192" e substitua os ips pelo seu.
### O seu IP aparecerá assim que iniciar o expo, copie e cole nos locais e as imagens estarão disponíveis.
