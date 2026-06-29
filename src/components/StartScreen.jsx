import { useMemo, useState } from 'react'

export default function StartScreen({ questions, skipped, onStart }) {
  // Group the loaded questions by their C++/ category and count each.
  const categories = useMemo(() => {
    const counts = new Map()
    for (const q of questions) {
      counts.set(q.category, (counts.get(q.category) || 0) + 1)
    }
    return [...counts.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [questions])

  const [selected, setSelected] = useState(
    () => new Set(categories.map((c) => c.name)),
  )
  const [shuffleEnabled, setShuffleEnabled] = useState(true)

  const empty = questions.length === 0
  const selectedCount = categories
    .filter((c) => selected.has(c.name))
    .reduce((n, c) => n + c.count, 0)

  function toggle(name) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }

  const selectAll = () => setSelected(new Set(categories.map((c) => c.name)))
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
            {categories.map((c) => {
              const on = selected.has(c.name)
              return (
                <li key={c.name}>
                  <button
                    type="button"
                    className={`cat-row ${on ? 'on' : ''}`}
                    onClick={() => toggle(c.name)}
                    aria-pressed={on}
                  >
                    <span className="cat-check" aria-hidden="true">
                      {on ? '✓' : ''}
                    </span>
                    <span className="cat-name">{c.name}</span>
                    <span className="cat-count">{c.count}</span>
                  </button>
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
