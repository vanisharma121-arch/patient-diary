import { motion, type Transition } from 'motion/react';
import { BellRing, KanbanSquare, Mic, PenLine, ScanLine, Stethoscope } from 'lucide-react';
import { Logo } from '@/components/logo';
import { FamilyReceiveComponent } from '@/components/ui/family-receive';
import { Dock, DockMagnify } from '@/components/ui/dock';

const spring: Transition = { type: 'spring', bounce: 0, duration: 0.4 };
const rise = (delay: number) => ({
  initial: { y: 40, opacity: 0, scale: 0.98 },
  animate: { y: 0, opacity: 1, scale: 1 },
  transition: { ...spring, delay },
});

const FEATURES = [
  { label: 'Wristband scan', Icon: ScanLine },
  { label: 'Live transcription', Icon: Mic },
  { label: 'Ready for doctor', Icon: BellRing },
  { label: 'Workflow boards', Icon: KanbanSquare },
  { label: 'Sign-off & EHR', Icon: PenLine },
];

export function WelcomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <section className="grid min-h-[calc(100vh-40px)] place-items-center px-5 py-10 text-center">
      <div className="flex max-w-3xl flex-col items-center gap-6">
        <motion.div {...rise(0)} className="border-border bg-card rounded-2xl border p-3">
          <Logo className="h-14 w-14" />
        </motion.div>
        <motion.p {...rise(0.08)} className="text-muted-foreground text-sm">
          Outpatient clinic · Demo shift
        </motion.p>
        <motion.h1 {...rise(0.16)} className="text-5xl leading-[1.02] md:text-7xl">
          Welcome to <span className="text-primary">Patient Diary</span>
        </motion.h1>
        <motion.p {...rise(0.24)} className="text-muted-foreground max-w-[44ch] text-lg leading-relaxed">
          Scan a wristband, talk with your patient, and let the diary sort the notes. Then send it to the doctor and
          sign off.
        </motion.p>
        <motion.div {...rise(0.32)}>
          <Dock className="flex-wrap justify-center gap-2.5 pt-4" magnification={1.6} distance={120}>
            {FEATURES.map(({ label, Icon }) => (
              <DockMagnify
                key={label}
                className="border-border bg-card text-foreground flex items-center gap-2 rounded-lg border px-3 py-2 text-sm"
              >
                <Icon size={16} strokeWidth={1.75} className="text-muted-foreground" />
                {label}
              </DockMagnify>
            ))}
          </Dock>
        </motion.div>
        <motion.div {...rise(0.4)} className="-my-24">
          <FamilyReceiveComponent
            triggerLabel="Get started"
            title="Start today's clinic"
            description="Open a demo shift with synthetic patients. No real health data is used."
            confirmLabel="Start shift"
            icon={<Stethoscope size={20} strokeWidth={1.75} />}
            onConfirm={onStart}
          />
        </motion.div>
      </div>
    </section>
  );
}
