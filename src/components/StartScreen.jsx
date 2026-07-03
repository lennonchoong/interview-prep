import { useMemo, useState } from 'react'

// How many questions the "Random N" quick-start button draws from the
// current selection (fewer when the selection is smaller).
const RANDOM_SAMPLE_SIZE = 50

// Collect the leaf keys under a node. A leaf (children === null) is the
// smallest selectable unit in the picker.
function leafKeysOf(node, out = []) {
  if (!node.children) out.push(node.key)
  else for (const child of node.children) leafKeysOf(child, out)
  return out
}

// Number of selected questions under a node.
function selectedCountOf(node, selected) {
  if (!node.children) return selected.has(node.key) ? node.count : 0
  let n = 0
  for (const child of node.children) n += selectedCountOf(child, selected)
  return n
}

export default function StartScreen({ questions, tree, skipped, onStart }) {
  const allLeafKeys = useMemo(() => tree.flatMap((n) => leafKeysOf(n)), [tree])

  // Selection is tracked at leaf granularity. Everything starts selected.
  const [selected, setSelected] = useState(() => new Set(allLeafKeys))
  // Which group nodes are open, by node key. Collapsed by default.
  const [expanded, setExpanded] = useState(() => new Set())
  const [shuffleEnabled, setShuffleEnabled] = useState(true)

  const empty = questions.length === 0
  const selectedCount = useMemo(
    () => tree.reduce((n, node) => n + selectedCountOf(node, selected), 0),
    [tree, selected],
  )

  function toggleLeaf(key) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  // Tri-state for a group node: 'all' | 'some' | 'none' of its leaves on.
  function nodeState(node) {
    const keys = leafKeysOf(node)
    const on = keys.filter((k) => selected.has(k)).length
    if (on === 0) return 'none'
    if (on === keys.length) return 'all'
    return 'some'
  }

  function toggleGroup(node) {
    const keys = leafKeysOf(node)
    const allOn = keys.every((k) => selected.has(k))
    setSelected((prev) => {
      const next = new Set(prev)
      for (const k of keys) {
        if (allOn) next.delete(k)
        else next.add(k)
      }
      return next
    })
  }

  function toggleExpand(key) {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const selectAll = () => setSelected(new Set(allLeafKeys))
  const selectNone = () => setSelected(new Set())

  // Render a tree node: a selectable row for a leaf, or an expandable row
  // with nested children for a group. Nesting depth indents via cat-sublist.
  function renderNode(node, depth) {
    const subCls = depth > 0 ? ' cat-subrow' : ''

    if (!node.children) {
      const on = selected.has(node.key)
      return (
        <li key={node.key}>
          <button
            type="button"
            className={`cat-row${subCls} ${on ? 'on' : ''}`}
            onClick={() => toggleLeaf(node.key)}
            aria-pressed={on}
          >
            <span className="cat-check" aria-hidden="true">
              {on ? '✓' : ''}
            </span>
            <span className="cat-name">{node.name}</span>
            <span className="cat-count">{node.count}</span>
          </button>
        </li>
      )
    }

    const state = nodeState(node)
    const open = expanded.has(node.key)
    return (
      <li key={node.key}>
        <div className={`cat-row cat-parent${subCls} ${state}`}>
          <button
            type="button"
            className="cat-check-btn"
            onClick={() => toggleGroup(node)}
            aria-pressed={state === 'all'}
            aria-label={`Select all in ${node.name}`}
          >
            <span className={`cat-check ${state}`} aria-hidden="true">
              {state === 'all' ? '✓' : state === 'some' ? '–' : ''}
            </span>
          </button>
          <button
            type="button"
            className="cat-expand"
            onClick={() => toggleExpand(node.key)}
            aria-expanded={open}
          >
            <span className="cat-caret" aria-hidden="true">
              {open ? '▾' : '▸'}
            </span>
            <span className="cat-name">{node.name}</span>
            <span className="cat-count">{node.count}</span>
          </button>
        </div>

        {open && (
          <ul className="cat-sublist">
            {node.children.map((child) => renderNode(child, depth + 1))}
          </ul>
        )}
      </li>
    )
  }

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

          <ul className="cat-list">{tree.map((node) => renderNode(node, 0))}</ul>

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

          <button
            className="btn ghost block"
            disabled={selectedCount === 0}
            onClick={() => onStart(true, [...selected], RANDOM_SAMPLE_SIZE)}
          >
            Random {Math.min(RANDOM_SAMPLE_SIZE, selectedCount)} from selection
          </button>
        </div>
      )}
    </main>
  )
}
