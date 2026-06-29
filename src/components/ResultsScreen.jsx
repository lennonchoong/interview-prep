import { useMemo } from 'react'

function choiceText(question, key) {
  const choice = question.choices.find((c) => c.key === key)
  return choice ? choice.text : ''
}

export default function ResultsScreen({
  total,
  score,
  items,
  onRetry,
  onReshuffle,
  onHome,
}) {
  const pct = total ? Math.round((score / total) * 100) : 0

  // Per-category score with a subcategory breakdown nested underneath.
  const byCategory = useMemo(() => {
    const m = new Map()
    for (const { question, selected } of items) {
      let cat = m.get(question.category)
      if (!cat) {
        cat = { name: question.category, total: 0, score: 0, subs: new Map() }
        m.set(question.category, cat)
      }
      const ok = selected === question.answer
      cat.total += 1
      if (ok) cat.score += 1
      const sub = question.subcategory || ''
      let s = cat.subs.get(sub)
      if (!s) {
        s = { sub, total: 0, score: 0 }
        cat.subs.set(sub, s)
      }
      s.total += 1
      if (ok) s.score += 1
    }
    return [...m.values()]
      .map((cat) => {
        const subs = [...cat.subs.values()].sort((a, b) => {
          if (a.sub === '' && b.sub !== '') return 1
          if (b.sub === '' && a.sub !== '') return -1
          return a.sub.localeCompare(b.sub)
        })
        return { ...cat, subs, hasSubs: subs.some((s) => s.sub !== '') }
      })
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [items])

  // Total rows that would render (categories + their named subcategories).
  const breakdownRows = byCategory.reduce(
    (n, c) => n + 1 + (c.hasSubs ? c.subs.length : 0),
    0,
  )

  return (
    <main className="app results">
      <section className="card summary">
        <h1 className="title">Results</h1>
        <div className="score-ring">{pct}%</div>
        <p className="score-line">
          {score} / {total} correct
        </p>
        <div className="results-actions">
          <button className="btn primary block" onClick={onRetry}>
            Retry same order
          </button>
          <button className="btn ghost block" onClick={onReshuffle}>
            New shuffled session
          </button>
          <button className="btn link block" onClick={onHome}>
            Home
          </button>
        </div>
      </section>

      {breakdownRows > 1 && (
        <section className="card breakdown">
          <h2 className="breakdown-title">By category</h2>
          <ul className="breakdown-list">
            {byCategory.map((c) => (
              <li key={c.name}>
                <div className="breakdown-row breakdown-cat">
                  <span className="breakdown-name">{c.name}</span>
                  <span className="breakdown-bar">
                    <span
                      className="breakdown-fill"
                      style={{ width: `${(c.score / c.total) * 100}%` }}
                    />
                  </span>
                  <span className="breakdown-score">
                    {c.score}/{c.total}
                  </span>
                </div>
                {c.hasSubs && (
                  <ul className="breakdown-sublist">
                    {c.subs.map((s) => (
                      <li
                        key={s.sub || '(general)'}
                        className="breakdown-row breakdown-subrow"
                      >
                        <span className="breakdown-name">
                          {s.sub === '' ? 'General' : s.sub}
                        </span>
                        <span className="breakdown-bar">
                          <span
                            className="breakdown-fill"
                            style={{ width: `${(s.score / s.total) * 100}%` }}
                          />
                        </span>
                        <span className="breakdown-score">
                          {s.score}/{s.total}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="review">
        {items.map(({ question, selected }, i) => {
          const correct = selected === question.answer
          return (
            <div key={i} className={`review-item ${correct ? 'ok' : 'no'}`}>
              <div className="review-q">
                <span className="review-num">{i + 1}.</span>
                {question.question}
              </div>
              {question.category && (
                <div className="review-cat">
                  {question.subcategory
                    ? `${question.category} › ${question.subcategory}`
                    : question.category}
                </div>
              )}
              <div className="review-a">
                {correct ? '✓ ' : '✗ '}
                Your answer:{' '}
                {selected != null
                  ? `${selected}. ${choiceText(question, selected)}`
                  : '—'}
                {!correct && (
                  <div className="review-correct">
                    Correct: {question.answer}.{' '}
                    {choiceText(question, question.answer)}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </section>
    </main>
  )
}
