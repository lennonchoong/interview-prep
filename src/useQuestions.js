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

// Derive a category, subcategory and topic breadcrumb from a note's `source`
// path, mirroring the C++/ vault folder structure. e.g.
//   "C++/Algorithms & Data Structures/Graph Algorithms/Bellman-Ford.md"
//   → { category: "Algorithms & Data Structures",
//       subcategory: "Graph Algorithms",
//       topicPath: [],
//       note: "Bellman-Ford" }
//   "C++/C++/Concurrency/Primitives/Atomics/Atomic Types.md"
//   → { category: "C++", subcategory: "Concurrency",
//       topicPath: ["Primitives", "Atomics"], note: "Atomic Types" }
// The category is the first folder under C++/, the subcategory is the next
// folder (empty when a note sits directly in the category). The leading "C++"
// vault root and the trailing ".md" filename are stripped.
function deriveCategory(source) {
  if (typeof source !== 'string' || !source.trim()) {
    return { category: UNCATEGORIZED, subcategory: '', topicPath: [], note: '' }
  }
  const segments = source.split('/').filter(Boolean)
  if (segments[0] === 'C++') segments.shift()
  const file = segments.pop() || ''
  const note = file.replace(/\.md$/i, '')
  const category = segments.length ? segments[0] : UNCATEGORIZED
  const subcategory = segments.length > 1 ? segments[1] : ''
  const topicPath = segments.slice(2)
  return { category, subcategory, topicPath, note }
}

// Selection group keys are the question's path segments joined with a
// separator that cannot collide with a real folder name; group keys are
// internal (selection + tallies), never displayed.
const GROUP_SEP = '\u0000'

// A picker group holding more than this many questions is subdivided by the
// next path level, so no selectable bucket grows unboundedly.
export const MAX_GROUP_SIZE = 50

// The levels a question can be grouped by, coarsest first: category, then the
// folder segments under it, then the note itself as the finest level.
function selectionPath(q) {
  const path = [q.category]
  if (q.subcategory) path.push(q.subcategory)
  path.push(...q.topicPath)
  if (q.topic) path.push(q.topic)
  return path
}

// Build the start-screen selection tree. Each node is
//   { name, key, count, children }
// where `children` is null for a leaf (the smallest selectable unit). A group
// with more than MAX_GROUP_SIZE questions is subdivided by the next path
// level; questions sitting directly in a subdivided group fall into a
// "General" bucket. Splitting stops when a group is small enough or has no
// deeper levels. Also returns each question's leaf key for quiz filtering.
export function buildSelectionTree(questions) {
  const leafKeyById = new Map()

  function build(items, depth, key, name) {
    const count = items.length
    let children = null
    if (count > MAX_GROUP_SIZE) {
      const buckets = new Map()
      for (const item of items) {
        const seg = depth < item.path.length ? item.path[depth] : ''
        if (!buckets.has(seg)) buckets.set(seg, [])
        buckets.get(seg).push(item)
      }
      // Split only when a deeper level exists; a lone '' bucket means every
      // question sits directly at this level and the group stays a leaf.
      if (buckets.size > 1 || !buckets.has('')) {
        children = [...buckets.entries()]
          .sort(([a], [b]) => {
            // Alphabetical, with the "General" bucket last.
            if (a === '' && b !== '') return 1
            if (b === '' && a !== '') return -1
            return a.localeCompare(b)
          })
          .map(([seg, subItems]) =>
            build(subItems, depth + 1, `${key}${GROUP_SEP}${seg}`, seg || 'General'),
          )
      }
    }
    if (!children) for (const item of items) leafKeyById.set(item.q.id, key)
    return { name, key, count, children }
  }

  const byCategory = new Map()
  for (const q of questions) {
    const path = selectionPath(q)
    if (!byCategory.has(path[0])) byCategory.set(path[0], [])
    byCategory.get(path[0]).push({ q, path })
  }
  const nodes = [...byCategory.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([category, items]) => build(items, 1, category, category))

  return { nodes, leafKeyById }
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
          // An explicit `category`/`subcategory` field wins; otherwise fall
          // back to the values derived from the C++/ `source` path.
          const category =
            typeof q.category === 'string' && q.category.trim()
              ? q.category.trim()
              : derived.category
          const subcategory =
            typeof q.subcategory === 'string' && q.subcategory.trim()
              ? q.subcategory.trim()
              : derived.subcategory
          return {
            id: i,
            question: q.question,
            choices: normalizeChoices(q.choices),
            answer: q.answer,
            category,
            subcategory,
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
