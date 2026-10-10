# Glossaries

A glossary fixes **one translation per concept** in a language, so the same English term is always
translated the same way. The automated reviews (AI review and `@claude`) read the glossary of the
language they review and flag new translations that contradict it.

| File | Content |
| --- | --- |
| [`concepts.md`](concepts.md) | What the English terms mean (charger vs. stall vs. plug, …). Shared by every language. |
| `<language>.md` | The chosen terms, register and style rules for one language, named like the translation file: `de.md` for `de.json`, `pt-br.md` for `pt-br.json`. |

Available languages: [German](de.md).

## Using a glossary

When you translate or review a file, read `concepts.md` and the glossary of that language first.
If your wording differs from the glossary, either follow the glossary or say in your pull request
why the glossary should change. Do not introduce a second word for a concept that already has one.

The glossary is guidance for new and edited strings; existing strings are brought in line when
they are touched anyway.

## Adding or changing a glossary

- One file per language, named exactly like its translation file (without `.json`).
- Start from [`de.md`](de.md): a short register section, a term table (English, use, avoid), and
  the language's writing conventions.
- Base the term table on the wording the language file already uses most often, and only choose
  a different term where the current wording is inconsistent or wrong.
- Keep it language specific. Meaning of English terms belongs in `concepts.md`.
- Keep entries short and checkable: a reviewer must be able to decide from the table whether a
  translation follows it.
