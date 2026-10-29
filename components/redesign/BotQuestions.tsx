export default function BotQuestions({ questions }: { questions: readonly string[] }) {
  return (
    <>
      <p id="bot-questions" className="text-label leading-4 text-ash">
        TRY ASKING
      </p>
      <ul aria-labelledby="bot-questions" className="flex flex-wrap gap-2">
        {questions.map((question) => (
          <li key={question} className="rounded-full border border-rule px-4 py-2.5 text-sm leading-4.5">
            {question}
          </li>
        ))}
      </ul>
    </>
  );
}
