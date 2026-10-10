import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { AppDock } from '@/components/app-dock';
import { JournalDate } from '@/components/journal-tools';
import { WelcomeScreen } from '@/screens/welcome';
import { ComingSoon } from '@/screens/coming-soon';
import type { Screen } from '@/screens/types';
import { cn } from '@/lib/utils';

export default function App() {
  const [screen, setScreen] = useState<Screen>('welcome');
  const fullGradient = screen === 'welcome' || screen === 'login';

  return (
    <>
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat transition-opacity duration-500',
          fullGradient ? 'opacity-100' : 'opacity-15',
        )}
        style={{ backgroundImage: 'var(--gradient)' }}
      />
      <div className="border-border bg-card/90 fixed top-4 right-4 z-30 rounded-xl border px-4 py-2 backdrop-blur">
        <JournalDate />
      </div>
      <AnimatePresence mode="wait">
        <motion.main
          key={screen}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {screen === 'welcome' ? <WelcomeScreen onStart={() => setScreen('login')} /> : <ComingSoon screen={screen} />}
        </motion.main>
      </AnimatePresence>
      <AppDock screen={screen} onGo={setScreen} />
    </>
  );
}
