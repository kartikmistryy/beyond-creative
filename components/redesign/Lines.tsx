/** Renders newline-separated copy as block lines so headings reveal line by line. */
export default function Lines({ text }: { text: string }) {
  return text.split("\n").map((line, index) => (
    <span key={index} className="block">
      {line}
    </span>
  ));
}
