const today = new Date();

/** Journal-style date, shown top right on every screen. */
export function JournalDate() {
  return (
    <div className="flex flex-col items-end leading-tight">
      <span className="text-muted-foreground text-xs">
        {today.toLocaleDateString('en-US', { weekday: 'long' })}
      </span>
      <b className="font-medium tracking-tight whitespace-nowrap">
        {today.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
      </b>
    </div>
  );
}
