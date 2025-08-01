# AI Tools Icons

Ця папка призначена для зберігання іконок AI-інструментів.

## Формат файлів

-   **Розширення**: `.svg`, `.png`, `.webp`
-   **Розмір**: 48x48px або 64x64px (рекомендовано)
-   **Назва файлу**: має відповідати `id` інструменту з `src/data/ai-tools.json`

## Приклади назв файлів

```
chatgpt.svg
midjourney.png
github-copilot.webp
notion-ai.svg
runway.png
huggingface.svg
canva-magic.png
elevenlabs.svg
jasper.png
replicate.svg
stability-ai.png
anthropic-claude.svg
dall-e.png
whisper.svg
cursor.png
synthesia.svg
grammarly.png
duolingo.png
khan-academy.png
tome.svg
```

## Використання

Після додавання іконки, оновіть `image` поле в `src/data/ai-tools.json`:

```json
{
    "id": "chatgpt",
    "name": "ChatGPT",
    "image": "/icons/ai-tools/chatgpt.svg"
    // ... інші поля
}
```

## Переваги локальних іконок

-   ✅ Швидке завантаження
-   ✅ Надійність (немає залежності від зовнішніх сервісів)
-   ✅ Контроль якості
-   ✅ Можливість оптимізації
