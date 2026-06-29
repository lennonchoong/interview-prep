import { useEffect, useState } from 'react'

// A choice key must be a positive integer (serialized as a string in JSON).
const KEY_RE = /^[1-9][0-9]*$/

// Validate a raw question object against the MCQ schema:
//   { question: string, choices: { "1": string, ... (>=4) }, answer: number }
// `answer` must reference an existing choice key.
function isValid(q) {
  if (!q || typeof q.question !== 'string' || !q.question.trim()) return false
  if (typeof q.choices !== 'object' || q.choices === null) return false
  const keys = Object.keys(q.choices)
  if (keys.length < 4) return false
  const keysOk = keys.every(
    (k) => KEY_RE.test(k) && typeof q.choices[k] === 'string' && q.choices[k].trim(),
  )
  if (!keysOk) return false
  if (typeof q.answer !== 'number' || !keys.includes(String(q.answer))) return false
  return true
}

// Turn the choices object into a key-sorted array for stable rendering.
function normalizeChoices(choices) {
  return Object.keys(choices)
    .map((k) => ({ key: Number(k), text: choices[k] }))
    .sort((a, b) => a.key - b.key)
}

export const UNCATEGORIZED = 'Uncategorized'

// Derive a category + topic breadcrumb from a note's `source` path, mirroring
// the C++/ vault folder structure. e.g.
//   "C++/Algorithms & Data Structures/Graph Algorithms/Bellman-Ford.md"
//   → { category: "Algorithms & Data Structures",
//       topicPath: ["Graph Algorithms"],
//       note: "Bellman-Ford" }
// The leading "C++" vault root and the trailing ".md" filename are stripped.
function deriveCategory(source) {
  if (typeof source !== 'string' || !source.trim()) {
    return { category: UNCATEGORIZED, topicPath: [], note: '' }
  }
  const segments = source.split('/').filter(Boolean)
  if (segments[0] === 'C++') segments.shift()
  const file = segments.pop() || ''
  const note = file.replace(/\.md$/i, '')
  const category = segments.length ? segments[0] : UNCATEGORIZED
  const topicPath = segments.slice(1)
  return { category, topicPath, note }
}

// Loads and validates questions from public/questions.json at runtime.
// Returns { status: 'loading' | 'ready' | 'error', questions, error, skipped }.
export function useQuestions() {
  const [state, setState] = useState({
    status: 'loading',
    questions: [],
    error: null,
    skipped: 0,
  })

  useEffect(() => {
    let cancelled = false
    const url = `${import.meta.env.BASE_URL}questions.json`

    fetch(url, { cache: 'no-store' })
      .then((res) => {
        if (!res.ok) throw new Error(`Could not load questions (HTTP ${res.status})`)
        return res.json()
      })
      .then((data) => {
        if (cancelled) return
        const raw = Array.isArray(data) ? data : [data]
        const valid = raw.filter(isValid)
        const questions = valid.map((q, i) => {
          const derived = deriveCategory(q.source)
          // An explicit `category` field wins; otherwise fall back to the one
          // derived from the C++/ `source` path.
          const category =
            typeof q.category === 'string' && q.category.trim()
              ? q.category.trim()
              : derived.category
          return {
            id: i,
            question: q.question,
            choices: normalizeChoices(q.choices),
            answer: q.answer,
            category,
            topicPath: derived.topicPath,
            topic: q.topic || derived.note,
          }
        })
        setState({
          status: 'ready',
          questions,
          error: null,
          skipped: raw.length - valid.length,
        })
      })
      .catch((err) => {
        if (cancelled) return
        setState({ status: 'error', questions: [], error: err.message, skipped: 0 })
      })

    return () => {
      cancelled = true
    }
  }, [])

  return state
}
