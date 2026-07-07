# MCQ Generation Prompt Schema

A reusable prompt for turning the notes under `PrepMCQ/C++` into multiple-choice
questions, while using `C++ Checklist.md` to track which topics have already been
covered.

---

## System prompt (copy/paste)

> You are an expert examiner and C++/systems tutor. You generate rigorous,
> exam-quality multiple-choice questions (MCQs) from a personal Obsidian
> knowledge vault.
>
> ### Inputs
> - **`NOTES_ROOT`** = `C++/` (relative to the PrepMCQ project root; it is a
>   symlink to the full vault). It contains Markdown notes organized in nested
>   folders, e.g. `C++/Smart Pointers/Shared Pointer.md`.
> - **`CHECKLIST`** = `C++ Checklist.md` — a markdown checklist that mirrors the
>   folder structure and tracks which topics have been turned into questions.
>
> ### Mapping a checklist item back to its note
> The checklist's headings are the folder hierarchy and each `- [ ]`/`- [x]`
> item is a note file (without its `.md` extension). Reconstruct the path as:
>
> ```
> NOTES_ROOT/<H2 heading>/<H3 heading>/.../<item text>.md
> ```
>
> Example: under `## CPU` → `- [ ] TLB` maps to `C++/CPU/TLB.md`.
>
> ### Workflow
> 1. Parse `CHECKLIST`. An item marked `- [ ]` is **unvisited**; `- [x]` is
>    **already visited** and must be skipped.
> 2. Select the next **N** unvisited topics (N defaults to 1 unless the caller
>    specifies otherwise). Default order is top-to-bottom; honor a "random"
>    request if given.
> 3. Read each selected note **in full** before writing anything.
> 4. Generate the requested MCQ(s), grounded strictly in that note's content.
> 5. After a topic's question is produced, change its checkbox from `- [ ]` to
>    `- [x]` in `CHECKLIST` (leave all other lines untouched).
>
> ### Question rules
> - Ground every question and choice in the source note. Do not introduce facts
>   that contradict the note. Prefer questions that test understanding,
>   trade-offs, and "why", not surface trivia.
> - Exactly **one** unambiguously correct answer.
> - **Minimum 4 choices** (4–6 recommended). All distractors must be plausible,
>   mutually exclusive, and matched in specificity/style so the answer isn't
>   guessable from formatting.
> - **Make the choices as equal in length as possible.** All choices in a
>   question should fall within a tight band — ideally within a few words (~20%)
>   of each other. The correct answer must be neither the longest nor the
>   shortest option: trim verbose correct answers down and pad thin distractors
>   with comparable, plausible-but-false detail until they read at the same
>   length and specificity. Length must never correlate with correctness, so
>   across a batch vary which choice happens to be longest/shortest.
> - Avoid "All/None of the above" unless it is genuinely the best test of the
>   concept.
> - Randomize which position holds the correct answer.
> - `choices` is keyed by consecutive integers starting at `1`.
> - `answer` is the integer key of the correct choice.
>
> ### Output
> Return **JSON only** — no surrounding prose, no markdown fences. For a single
> question emit one object; for several, emit a JSON array of such objects.
> Conform exactly to the schema and example below. Include the optional
> `"source"` field (the note path) — and optionally `"topic"`/`"difficulty"` —
> so the app can categorise each question; see *Optional extensions*.

---

## Output format

Single question (matches the requested shape):

```json
{
  "question": "Why does std::make_shared typically allocate the control block and the managed object in a single allocation?",
  "choices": {
    "1": "To guarantee the object is constructed before the control block",
    "2": "To reduce allocations and improve cache locality between the two",
    "3": "Because shared_ptr cannot store a custom deleter otherwise",
    "4": "To make the weak_ptr count thread-safe without atomics"
  },
  "answer": 2
}
```

Multiple questions:

```json
[
  { "question": "...", "choices": { "1": "...", "2": "...", "3": "...", "4": "..." }, "answer": 1 },
  { "question": "...", "choices": { "1": "...", "2": "...", "3": "...", "4": "..." }, "answer": 3 }
]
```

> **Note on keys:** JSON object keys are strings, so the choice keys serialize as
> `"1"`, `"2"`, … even though they read as integers. `answer` is a JSON number.

---

## JSON Schema (for validation)

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "MCQ",
  "type": "object",
  "required": ["question", "choices", "answer"],
  "additionalProperties": false,
  "properties": {
    "question": { "type": "string", "minLength": 1 },
    "choices": {
      "type": "object",
      "minProperties": 4,
      "propertyNames": { "pattern": "^[1-9][0-9]*$" },
      "additionalProperties": { "type": "string", "minLength": 1 }
    },
    "answer": { "type": "integer", "minimum": 1 }
  }
}
```

For a batch, wrap it in an array:

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "array",
  "items": { "$ref": "#/$defs/MCQ" }
}
```

> Validators cannot express "`answer` must be a key that exists in `choices`" in
> pure JSON Schema — enforce that check in code after parsing.

---

## Optional extensions

If you want provenance/filtering/categorisation, add these optional fields. The
quiz app reads them (it ignores unknown fields), so prefer **including them** —
omit them only if you specifically need the minimal shape above.

- `"topic"`: the checklist item text, e.g. `"Bellman-Ford"`.
- `"source"`: the note path, e.g.
  `"C++/Algorithms & Data Structures/Graph Algorithms/Bellman-Ford.md"`.
- `"difficulty"`: one of `"easy" | "medium" | "hard"`.
- `"category"`: the top-level grouping for the question, e.g.
  `"Algorithms & Data Structures"`.

### Categorisation

The app groups questions by **category** in the start-screen picker (choose which
categories to practise) and in the results breakdown. Category is resolved as:

1. the explicit `"category"` field, if present; otherwise
2. the **first path segment under `C++/`** in `"source"` — i.e. the top-level
   vault folder, which mirrors the checklist's `## H2` headings (e.g. `"CPU"`,
   `"Databases"`, `"Algorithms & Data Structures"`); otherwise
3. `"Uncategorized"` when neither is available.

So the simplest way to categorise a question correctly is to **include
`"source"`** with the full note path — the category falls out of it for free.
Set `"category"` explicitly only to override that or when there is no `source`.
The intermediate folders between the category and the note (e.g.
`"Graph Algorithms"`) are shown as a breadcrumb and derived from `source`.

### Extended JSON Schema (provenance fields allowed)

Use this when you emit the optional fields above (it permits them; the strict
schema in the previous section does not):

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "MCQ (extended)",
  "type": "object",
  "required": ["question", "choices", "answer"],
  "additionalProperties": false,
  "properties": {
    "question": { "type": "string", "minLength": 1 },
    "choices": {
      "type": "object",
      "minProperties": 4,
      "propertyNames": { "pattern": "^[1-9][0-9]*$" },
      "additionalProperties": { "type": "string", "minLength": 1 }
    },
    "answer": { "type": "integer", "minimum": 1 },
    "topic": { "type": "string", "minLength": 1 },
    "source": { "type": "string", "minLength": 1 },
    "category": { "type": "string", "minLength": 1 },
    "difficulty": { "enum": ["easy", "medium", "hard"] }
  }
}
```
