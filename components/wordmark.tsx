/**
 * The five-bar Resonance mark, sized by the caller.
 *
 * It declares `--lp-accent` on itself rather than inheriting it, so it renders the
 * same in the workspace as it does on the landing page, which sets that variable
 * at its own root.
 */
export const Wordmark = ({ height }: { height: number }) => {
  const scale = height / 15;
  return (
    <span
      className="flex items-end gap-0.5 [--lp-accent:var(--chart-1)] dark:[--lp-accent:var(--chart-2)]"
      style={{ height: `${height}px` }}
      aria-hidden
    >
      {[6, 13, 9, 15, 5].map((bar, index) => (
        <span
          key={index}
          className={index === 2 ? "bg-(--lp-accent)" : "bg-foreground"}
          style={{ width: "1.5px", height: `${bar * scale}px` }}
        />
      ))}
    </span>
  );
};
