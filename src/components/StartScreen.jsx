import { useMemo, useState } from 'react'
import { groupKeyOf } from '../useQuestions'

// Sort leaves alphabetically, but keep the "General" bucket (notes sitting
// directly in a category, with no subcategory) last.
function sortLeaves(a, b) {
  if (a.sub === '' && b.sub !== '') return 1
  if (b.sub === '' && a.sub !== '') return -1
  return a.sub.localeCompare(b.sub)
}

export default function StartScreen({ questions, skipped, onStart }) {
  // Group questions into categories, each holding its subcategory "leaves".
  // A leaf is the smallest selectable unit (category+subcategory, or just the
  // category when a note has no subcategory).
  const categories = useMemo(() => {
    const m = new Map()
    for (const q of questions) {
      let cat = m.get(q.category)
      if (!cat) {
        cat = { name: q.category, count: 0, leaves: new Map() }
        m.set(q.category, cat)
      }
      cat.count += 1
      const sub = q.subcategory || ''
      let leaf = cat.leaves.get(sub)
      if (!leaf) {
        leaf = { key: groupKeyOf(q), sub, count: 0 }
        cat.leaves.set(sub, leaf)
      }
      leaf.count += 1
    }
    return [...m.values()]
      .map((cat) => {
        const leaves = [...cat.leaves.values()].sort(sortLeaves)
        return {
          name: cat.name,
          count: cat.count,
          leaves,
          // "Has subcategories" → render as an expandable group. A category whose
          // only leaf is the empty bucket is a single selectable row instead.
          hasSubs: leaves.some((l) => l.sub !== ''),
        }
      })
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [questions])

  const allLeafKeys = useMemo(
    () => categories.flatMap((c) => c.leaves.map((l) => l.key)),
    [categories],
  )

  // Selection is tracked at leaf granularity. Everything starts selected.
  const [selected, setSelected] = useState(() => new Set(allLeafKeys))
  // Which expandable categories are open. Collapsed by default.
  const [expanded, setExpanded] = useState(() => new Set())
  const [shuffleEnabled, setShuffleEnabled] = useState(true)

  const empty = questions.length === 0
  const selectedCount = useMemo(() => {
    let n = 0
    for (const cat of categories) {
      for (const leaf of cat.leaves) if (selected.has(leaf.key)) n += leaf.count
    }
    return n
  }, [categories, selected])

  function toggleLeaf(key) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  // Tri-state for a category header: 'all' | 'some' | 'none' of its leaves on.
  function catState(cat) {
    const on = cat.leaves.filter((l) => selected.has(l.key)).length
    if (on === 0) return 'none'
    if (on === cat.leaves.length) return 'all'
    return 'some'
  }

  function toggleCat(cat) {
    const keys = cat.leaves.map((l) => l.key)
    const allOn = catState(cat) === 'all'
    setSelected((prev) => {
      const next = new Set(prev)
      for (const k of keys) {
        if (allOn) next.delete(k)
        else next.add(k)
      }
      return next
    })
  }

  function toggleExpand(name) {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }

  const selectAll = () => setSelected(new Set(allLeafKeys))
  const selectNone = () => setSelected(new Set())

  return (
    <main className="app start">
      <div className="hero">
        <h1 className="title">Interview Prep</h1>
        <p className="subtitle">Review your notes, one question at a time</p>
      </div>

      {empty ? (
        <div className="card empty">
          <p className="empty-title">No questions yet</p>
          <p className="empty-body">
            Add questions to <code>public/questions.json</code> as a JSON array
            matching the schema, then reload.
          </p>
        </div>
      ) : (
        <div className="card">
          <div className="cat-head">
            <p className="count">
              {selectedCount} of {questions.length} question
              {questions.length === 1 ? '' : 's'} selected
            </p>
            <div className="cat-tools">
              <button type="button" className="chip-btn" onClick={selectAll}>
                All
              </button>
              <button type="button" className="chip-btn" onClick={selectNone}>
                None
              </button>
            </div>
          </div>

          {skipped > 0 && (
            <p className="skip-note">
              {skipped} entr{skipped === 1 ? 'y' : 'ies'} skipped (invalid format)
            </p>
          )}

          <ul className="cat-list">
            {categories.map((cat) => {
              // Single-leaf category → one selectable row (no expansion).
              if (!cat.hasSubs) {
                const leaf = cat.leaves[0]
                const on = selected.has(leaf.key)
                return (
                  <li key={cat.name}>
                    <button
                      type="button"
                      className={`cat-row ${on ? 'on' : ''}`}
                      onClick={() => toggleLeaf(leaf.key)}
                      aria-pressed={on}
                    >
                      <span className="cat-check" aria-hidden="true">
                        {on ? '✓' : ''}
                      </span>
                      <span className="cat-name">{cat.name}</span>
                      <span className="cat-count">{cat.count}</span>
                    </button>
                  </li>
                )
              }

              // Expandable category with subcategory children.
              const state = catState(cat)
              const open = expanded.has(cat.name)
              return (
                <li key={cat.name}>
                  <div className={`cat-row cat-parent ${state}`}>
                    <button
                      type="button"
                      className="cat-check-btn"
                      onClick={() => toggleCat(cat)}
                      aria-pressed={state === 'all'}
                      aria-label={`Select all in ${cat.name}`}
                    >
                      <span className={`cat-check ${state}`} aria-hidden="true">
                        {state === 'all' ? '✓' : state === 'some' ? '–' : ''}
                      </span>
                    </button>
                    <button
                      type="button"
                      className="cat-expand"
                      onClick={() => toggleExpand(cat.name)}
                      aria-expanded={open}
                    >
                      <span className="cat-caret" aria-hidden="true">
                        {open ? '▾' : '▸'}
                      </span>
                      <span className="cat-name">{cat.name}</span>
                      <span className="cat-count">{cat.count}</span>
                    </button>
                  </div>

                  {open && (
                    <ul className="cat-sublist">
                      {cat.leaves.map((leaf) => {
                        const on = selected.has(leaf.key)
                        const label = leaf.sub === '' ? 'General' : leaf.sub
                        return (
                          <li key={leaf.key}>
                            <button
                              type="button"
                              className={`cat-row cat-subrow ${on ? 'on' : ''}`}
                              onClick={() => toggleLeaf(leaf.key)}
                              aria-pressed={on}
                            >
                              <span className="cat-check" aria-hidden="true">
                                {on ? '✓' : ''}
                              </span>
                              <span className="cat-name">{label}</span>
                              <span className="cat-count">{leaf.count}</span>
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </li>
              )
            })}
          </ul>

          <label className="toggle">
            <input
              type="checkbox"
              checked={shuffleEnabled}
              onChange={(e) => setShuffleEnabled(e.target.checked)}
            />
            <span>Shuffle questions</span>
          </label>

          <button
            className="btn primary block"
            disabled={selectedCount === 0}
            onClick={() => onStart(shuffleEnabled, [...selected])}
          >
            Start {selectedCount} question{selectedCount === 1 ? '' : 's'}
          </button>
        </div>
      )}
    </main>
  )
}
