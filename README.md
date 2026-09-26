# 💌 Convite pra um Date

Um mini-app web interativo, em várias etapas, pra fazer um convite de date de um jeito divertido.

## ✨ Funcionalidades

- Pergunta inicial com botão "não" que foge do cursor/toque
- Tela de celebração com foto personalizada
- Seleção de data e horário
- Escolha do tipo de comida/programa (com opção "Surpresa" para digitar uma ideia livre)
- Resumo final com tudo que foi combinado
- Notificação automática via **Telegram Bot** quando alguém preenche o formulário

## 📁 Estrutura do projeto

```
├── index.html    → estrutura da página
├── style.css     → estilos e animações
├── script.js     → lógica do app (etapas, botão "não", envio ao Telegram)
├── config.js     → credenciais do bot do Telegram
└── Ney.jpg       → foto exibida na tela de celebração
```

## 🚀 Como rodar

Basta abrir o `index.html` em qualquer navegador — não precisa de servidor nem instalação.

Para publicar online, use [GitHub Pages](https://pages.github.com/) ou [Netlify Drop](https://app.netlify.com/drop), subindo todos os arquivos juntos na mesma pasta.

## 🤖 Configurando o Telegram

1. Crie um bot com [@BotFather](https://t.me/BotFather) no Telegram e pegue o token.
2. Mande uma mensagem para o seu bot e pegue seu `chat_id` em:
   `https://api.telegram.org/bot<SEU_TOKEN>/getUpdates`
3. Preencha `config.js`:

```js
const TELEGRAM_BOT_TOKEN = "SEU_TOKEN_AQUI";
const TELEGRAM_CHAT_ID   = "SEU_CHAT_ID_AQUI";
```

> ⚠️ Como este é um repositório público, o conteúdo de `config.js` fica visível para qualquer pessoa. Não é um problema grave (o bot só serve pra este app), mas se quiser mais segurança, gere um token novo periodicamente pelo BotFather.

## 🛠️ Tecnologias

HTML, CSS e JavaScript puros — sem frameworks, sem dependências externas.
