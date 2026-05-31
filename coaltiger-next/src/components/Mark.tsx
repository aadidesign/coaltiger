export default function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <use href="#ct-mark" />
    </svg>
  );
}
