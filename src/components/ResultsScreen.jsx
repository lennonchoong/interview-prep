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

  // Per-category score, shown when the session spans more than one category.
  const byCategory = useMemo(() => {
    const m = new Map()
    for (const { question, selected } of items) {
      const e = m.get(question.category) || { total: 0, score: 0 }
      e.total += 1
      if (selected === question.answer) e.score += 1
      m.set(question.category, e)
    }
    return [...m.entries()]
      .map(([name, v]) => ({ name, ...v }))
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [items])

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

      {byCategory.length > 1 && (
        <section className="card breakdown">
          <h2 className="breakdown-title">By category</h2>
          <ul className="breakdown-list">
            {byCategory.map((c) => (
              <li key={c.name} className="breakdown-row">
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
                <div className="review-cat">{question.category}</div>
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
