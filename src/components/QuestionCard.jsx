// Renders a single question with tappable choices.
// `selected` is the chosen choice key (number) or null. Once a choice is picked
// the answer is revealed (correct in green, a wrong pick in red) and locked.
export default function QuestionCard({ question, selected, onSelect }) {
  const answered = selected != null
  const isCorrect = selected === question.answer

  // Breadcrumb under the category pill: subcategory + folder path + note name.
  const subPath = [
    question.subcategory,
    ...(question.topicPath || []),
    question.topic,
  ]
    .filter(Boolean)
    .join(' / ')

  return (
    <section className="card">
      {question.category && (
        <div className="q-cat">
          <span className="cat-pill">{question.category}</span>
          {subPath && <span className="cat-sub">{subPath}</span>}
        </div>
      )}

      <h1 className="question">{question.question}</h1>

      <ul className="choices">
        {question.choices.map((choice) => {
          const correct = choice.key === question.answer
          const picked = choice.key === selected

          let cls = 'choice'
          if (answered) {
            if (correct) cls += ' correct'
            else if (picked) cls += ' incorrect'
            else cls += ' dim'
          }

          return (
            <li key={choice.key}>
              <button
                type="button"
                className={cls}
                onClick={() => onSelect(choice.key)}
                disabled={answered}
                aria-pressed={picked}
              >
                <span className="choice-key">{choice.key}</span>
                <span className="choice-text">{choice.text}</span>
                {answered && correct && <span className="mark">✓</span>}
                {answered && picked && !correct && <span className="mark">✗</span>}
              </button>
            </li>
          )
        })}
      </ul>

      {answered && (
        <p className={`feedback ${isCorrect ? 'ok' : 'no'}`}>
          {isCorrect
            ? 'Correct'
            : `Incorrect — the answer is ${question.answer}`}
        </p>
      )}
    </section>
  )
}
