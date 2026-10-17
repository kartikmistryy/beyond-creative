/** Beyond Creative wordmark. Scales with its container width (container query units). */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`block [container-type:inline-size] ${className}`} aria-label="Beyond Creative">
      <span aria-hidden className="flex items-start whitespace-nowrap leading-[0.78]">
        <span className="font-[850] uppercase tracking-[-0.07em] [font-size:20.9cqw]">Beyond</span>
        <span className="serif ml-[1.5cqw] mt-[1cqw] [font-size:8cqw] leading-none">creative</span>
      </span>
    </span>
  );
}
