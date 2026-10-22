/** Renders copy as word spans so a paragraph can reveal word by word. */
export default function Words({ text }: { text: string }) {
  return text.split(" ").map((word, index) => (
    <span key={index}>
      <span className="inline-block">{word}</span>{" "}
    </span>
  ));
}
