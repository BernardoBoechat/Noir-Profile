# Noir Profile

Página "link na bio" minimalista, no estilo de um cartão de perfil escuro: foto, bio, redes sociais, links personalizados, player do Spotify e modal de compartilhamento com QR Code.

![Prévia do Noir Profile](docs/preview.jpg)

## Destaques

- **React 19 + TypeScript em modo strict**, empacotado com Vite
- **Tailwind CSS** para o layout e animações de entrada feitas só com CSS
- Respeita a preferência do sistema por **menos movimento** (`prefers-reduced-motion`)
- Modal de compartilhamento carregado sob demanda (*lazy loading*), com **QR Code** e botão de copiar link
- Todo o conteúdo fica em um único arquivo de dados tipado, sem mexer nos componentes
- ESLint sem avisos e Prettier configurados

## Tecnologias

React · TypeScript · Vite · Tailwind CSS · lucide-react · qrcode.react · ESLint · Prettier

## Como rodar

```bash
npm install
npm run dev
```

O Vite mostra o endereço local no terminal, normalmente `http://localhost:5173`.

### Build de produção

```bash
npm run build
npm run preview
```

## Personalização

- Dados do perfil, links, redes sociais e Spotify: `src/data/profile.ts`
- Imagens: `public/images`
- Tipos dos dados: `src/types`

## Estrutura

```text
src/
├── components/
│   ├── profile/   # Cabeçalho, estatísticas, redes e links
│   ├── music/     # Player do Spotify
│   ├── modals/    # Modal de compartilhamento (lazy)
│   └── ui/        # Botões e tooltip reutilizáveis
├── data/          # Conteúdo do perfil
├── hooks/         # useReducedMotion
├── types/
└── utils/         # Copiar para a área de transferência, formatação, cn()
```

## Comandos

| Comando                | O que faz                              |
| ---------------------- | -------------------------------------- |
| `npm run dev`          | Servidor de desenvolvimento            |
| `npm run build`        | Checagem de tipos e build otimizado    |
| `npm run preview`      | Prévia do build                        |
| `npm run lint`         | ESLint sem avisos                      |
| `npm run format`       | Formata o código com Prettier          |

---

Feito por **Bernardo Boechat** · [LinkedIn](https://www.linkedin.com/in/be-boechat-dev/)
