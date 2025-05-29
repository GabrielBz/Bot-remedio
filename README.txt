
# Bot de Lembrete de Remédio no WhatsApp

## Como usar

1. Instale o Node.js no seu computador: https://nodejs.org/
2. Abra o terminal (Prompt de Comando ou PowerShell no Windows).
3. Navegue até a pasta do projeto.

## Comandos para rodar:

Instalar as dependências (apenas na primeira vez):
```
npm install
```

Rodar o bot:
```
node index.js
```

## O que faz:

- Envia todos os dias às 9h a pergunta:
"Você já tomou seu remédio hoje? ✅ ❌ 🚫"

- Se responder ✅ ou 🚫, para os lembretes do dia.
- Se responder ❌, envia lembretes de hora em hora até que marque ✅ ou 🚫.

## Histórico:

O histórico dos dias fica salvo no arquivo `historico.json`.

## Observação:

- O bot funciona enquanto o computador estiver ligado e o script rodando.
- Na primeira vez, aparecerá um QR Code para escanear no WhatsApp Web.
