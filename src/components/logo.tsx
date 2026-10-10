import { cn } from '@/lib/utils';

/** Patient Diary mark: a journal with a pencil across it. */
export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={cn('h-10 w-10', className)}>
      <rect x="7" y="5" width="22" height="30" rx="3" fill="var(--primary)" />
      <rect x="7" y="5" width="5" height="30" rx="2" fill="var(--primary-foreground)" opacity=".28" />
      <path d="M15 13h9M15 18h9M15 23h5" stroke="var(--primary-foreground)" strokeWidth="2" strokeLinecap="round" />
      <g transform="rotate(40 30 26)">
        <rect x="27" y="12" width="6" height="20" rx="1" fill="var(--warn)" stroke="var(--card)" strokeWidth="1.5" />
        <path d="M27 32l3 5 3-5z" fill="var(--foreground)" stroke="var(--card)" strokeWidth="1.2" strokeLinejoin="round" />
        <rect x="27" y="12" width="6" height="3.5" fill="var(--danger)" />
      </g>
    </svg>
  );
}
