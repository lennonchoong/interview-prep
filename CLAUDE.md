# CLAUDE.md

Guidance for working in this repo. PrepMCQ is a React + Vite quiz app that drills
multiple-choice questions generated from a personal C++/systems knowledge vault.

## Generating MCQs

When asked to create, generate, or add questions, follow
[`mcq-prompt-schema.md`](./mcq-prompt-schema.md) — it is the authoritative spec.
Treat its **System prompt** section as your instructions and obey its **Question
rules**, **Output format**, and **JSON Schema** exactly.

Key references from that schema:

- **`NOTES_ROOT`** = `C++/` — a symlink to the full Obsidian vault. Read the
  selected note **in full** before writing any question; ground every question
  and choice strictly in that note.
- **`CHECKLIST`** = `C++ Checklist.md` — mirrors the vault's folder structure.
  `- [ ]` is unvisited (eligible), `- [x]` is already done (skip it). Reconstruct
  a note path as `C++/<H2>/<H3>/.../<item text>.md`.

### Workflow for a generation request

1. Parse `C++ Checklist.md`; pick the next **N** unvisited topics (N defaults to
   1, top-to-bottom, unless the caller asks for more or for "random").
2. Read each note in full, then write the MCQ(s) per the schema's question rules
   (exactly one correct answer, ≥4 plausible distractors, randomized answer
   position, `choices` keyed `"1"`, `"2"`, …, `answer` = the correct key). Keep
   all choices as equal in length as possible — the correct answer must be
   neither the longest nor the shortest so it isn't guessable from formatting.
3. **Append** the new question object(s) to the array in
   [`public/questions.json`](./public/questions.json) — this is the file the app
   loads at runtime. Do not overwrite existing questions.
4. Flip each covered topic's checkbox from `- [ ]` to `- [x]` in
   `C++ Checklist.md`, leaving all other lines untouched.

### Output contract

`public/questions.json` is a JSON **array** of MCQ objects. Each object must
satisfy the schema in `mcq-prompt-schema.md` and the runtime validator in
[`src/useQuestions.js`](./src/useQuestions.js) (`isValid`): non-empty
`question` string, `choices` object with ≥4 entries keyed by positive integers,
and an integer `answer` that references an existing choice key. Invalid objects
are silently dropped by the loader, so validate before saving.

Emit JSON only into the file — no prose, no markdown fences.

## Commands

- `npm run dev` — start the Vite dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the production build
- `npm run lint` — Oxlint over `src`
