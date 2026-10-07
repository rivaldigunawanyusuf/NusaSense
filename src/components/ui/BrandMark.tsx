interface BrandMarkProps {
  className?: string;
}

/** NusaSense logo mark: a signal pulse inside a rounded tile. */
export function BrandMark({ className }: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <rect width="32" height="32" rx="9" fill="#141414" />
      <rect x="0.5" y="0.5" width="31" height="31" rx="8.5" stroke="#333333" />
      <path
        d="M6 17.5h5l2.5-6 4 11 3-8 1.5 3H26"
        stroke="#a3e635"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="26" cy="17.5" r="1.75" fill="#a3e635" />
    </svg>
  );
}
