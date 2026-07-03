import { useState, useMemo } from 'react';

const LETTERS = ['A', 'B', 'C', 'D', 'E'];

// Classes escritas por extenso (não interpoladas) para o Tailwind conseguir
// detectá-las na varredura estática do build.
const ACCENTS = {
  enem: { bg: 'bg-enem', text: 'text-enem', border: 'border-enem' },
  escolar: { bg: 'bg-escolar', text: 'text-escolar', border: 'border-escolar' },
  ds: { bg: 'bg-ds', text: 'text-ds', border: 'border-ds' },
};

export default function Quiz({ questions, accent = 'enem' }) {
  const [answers, setAnswers] = useState({});
  const [corrected, setCorrected] = useState({});

  const correctedCount = Object.keys(corrected).length;
  const correctCount = useMemo(
    () =>
      questions.reduce(
        (acc, q, i) => acc + (corrected[i] && answers[i] === q.correctIndex ? 1 : 0),
        0
      ),
    [corrected, answers, questions]
  );
  const anyStarted = Object.keys(answers).length > 0 || correctedCount > 0;

  function select(qIndex, optIndex) {
    if (corrected[qIndex]) return;
    setAnswers((prev) => ({ ...prev, [qIndex]: optIndex }));
  }

  function correctOne(qIndex) {
    setCorrected((prev) => ({ ...prev, [qIndex]: true }));
  }

  function restore() {
    setAnswers({});
    setCorrected({});
  }

  const { bg: accentBg, text: accentText, border: accentBorder } = ACCENTS[accent] ?? ACCENTS.enem;

  return (
    <div className="not-prose my-10 border-t-2 border-line pt-8">
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-6">
        <h3 className="font-display text-xl md:text-2xl font-bold text-ink">
          Teste de Fogo
        </h3>
        {correctedCount > 0 && (
          <span className="font-mono text-sm text-ink-soft">
            {correctCount} / {correctedCount} corrigidas corretas
          </span>
        )}
      </div>

      <div className="space-y-8">
        {questions.map((q, qi) => {
          const userAnswer = answers[qi];
          const isCorrected = !!corrected[qi];
          const isCorrectQ = isCorrected && userAnswer === q.correctIndex;

          return (
            <div key={qi} className="bg-white/60 border border-paper-dark rounded-lg p-5">
              <div className="flex items-start gap-3 mb-4">
                <span className={`font-mono text-xs font-bold ${accentText} shrink-0 mt-1`}>
                  Q{qi + 1}
                </span>
                <p className="font-body text-ink leading-relaxed">{q.question}</p>
              </div>

              <div className="space-y-2 ml-7">
                {q.options.map((opt, oi) => {
                  const selected = userAnswer === oi;
                  const showCorrect = isCorrected && oi === q.correctIndex;
                  const showWrongSelected = isCorrected && selected && oi !== q.correctIndex;

                  let stateClasses = 'border-paper-dark hover:border-ink-soft';
                  if (selected && !isCorrected) stateClasses = `${accentBorder} bg-paper-dark/40`;
                  if (showCorrect) stateClasses = 'border-ds bg-ds-soft';
                  if (showWrongSelected) stateClasses = 'border-enem bg-enem-soft';

                  return (
                    <button
                      key={oi}
                      type="button"
                      onClick={() => select(qi, oi)}
                      disabled={isCorrected}
                      className={`w-full text-left flex gap-3 items-start px-4 py-3 rounded-md border text-sm font-body text-ink transition-colors disabled:cursor-default ${stateClasses}`}
                    >
                      <span className="font-mono font-bold text-ink-soft shrink-0">
                        {LETTERS[oi]}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              <div className="ml-7 mt-4">
                {!isCorrected ? (
                  <button
                    type="button"
                    disabled={userAnswer === undefined}
                    onClick={() => correctOne(qi)}
                    className={`font-display font-bold text-sm px-5 py-2.5 rounded-md text-white ${accentBg} disabled:opacity-30 disabled:cursor-not-allowed transition-opacity`}
                  >
                    Corrigir
                  </button>
                ) : (
                  <div
                    className={`text-sm font-body leading-relaxed border-l-2 pl-4 ${
                      isCorrectQ ? 'border-ds text-ink' : 'border-enem text-ink'
                    }`}
                  >
                    <p className="font-mono text-xs font-bold uppercase tracking-wide mb-1 text-ink-soft">
                      {isCorrectQ ? 'Correto' : `Gabarito: ${LETTERS[q.correctIndex]}`}
                    </p>
                    <p>{q.explanation}</p>
                    {q.source && (
                      <p className="text-xs text-ink-soft mt-1">{q.source}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {anyStarted && (
        <div className="mt-8">
          <button
            type="button"
            onClick={restore}
            className="font-display font-bold px-6 py-3 rounded-md border-2 border-ink text-ink hover:bg-ink hover:text-paper transition-colors"
          >
            ↺ Restaurar e tentar de novo
          </button>
        </div>
      )}
    </div>
  );
}
