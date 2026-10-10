import { ClipboardList, House, KeyRound, Mic, Moon, PenLine, Sun, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { Dock, DockIcon } from '@/components/ui/dock';
import { useTheme } from '@/hooks/use-theme';
import type { Screen } from '@/screens/types';

const ITEMS: { screen: Screen; label: string; Icon: typeof House }[] = [
  { screen: 'welcome', label: 'Welcome', Icon: House },
  { screen: 'login', label: 'Sign in', Icon: KeyRound },
  { screen: 'ward', label: 'Patients', Icon: Users },
  { screen: 'capture', label: 'Capture', Icon: Mic },
  { screen: 'review', label: 'Clinical review', Icon: ClipboardList },
  { screen: 'signoff', label: 'Sign-off', Icon: PenLine },
];

/** Floating bottom dock: every screen plus the light/dark switch. */
export function AppDock({ screen, onGo }: { screen: Screen; onGo: (s: Screen) => void }) {
  const { dark, toggle } = useTheme();
  return (
    <motion.nav
      aria-label="Screens"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', bounce: 0, duration: 0.4, delay: 0.5 }}
      className="fixed inset-x-0 bottom-[calc(16px+env(safe-area-inset-bottom,0px))] z-40 flex justify-center px-4"
    >
      <Dock className="border-border bg-card/90 h-[70px] max-w-full gap-2.5 overflow-visible rounded-2xl border px-3 pb-3 shadow-[0_16px_40px_-16px_rgba(31,18,56,0.3)] backdrop-blur-md">
        {ITEMS.map(({ screen: s, label, Icon }) => (
          <DockIcon key={s} label={label} active={screen === s} onClick={() => onGo(s)}>
            <Icon size={20} strokeWidth={1.75} />
          </DockIcon>
        ))}
        <span className="bg-border mx-1 h-9 w-px self-end" aria-hidden="true" />
        <DockIcon label={dark ? 'Light mode' : 'Dark mode'} onClick={toggle}>
          {dark ? <Sun size={20} strokeWidth={1.75} /> : <Moon size={20} strokeWidth={1.75} />}
        </DockIcon>
      </Dock>
    </motion.nav>
  );
}
