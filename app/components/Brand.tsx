import Link from "next/link";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link className="brand" href="/" aria-label="QuantStation home">
      <span className="brand-mark" aria-hidden="true">
        <span className="brand-bars"><i /><i /><i /></span>
        <span className="brand-anvil" />
      </span>
      {!compact && <span className="brand-name">QuantStation</span>}
    </Link>
  );
}

