import { motion } from 'motion/react';
import { Dock, DockMagnify } from '@/components/ui/dock';

const COPY: Record<string, { step: string; title: string; parts: string[] }> = {
  login: { step: 'Sign in', title: 'Staff code', parts: ['Nurse or physician', 'Keypad', 'Demo codes'] },
  ward: { step: 'Patients', title: "Who's next?", parts: ['Patient ID tabs', 'Wristband scanner', 'Patient file'] },
  capture: { step: 'Capture', title: 'Encounter capture', parts: ['Symptom checklist', 'Live transcription', 'Ready for doctor'] },
  review: { step: 'Clinical review', title: 'Workflow boards', parts: ['Intake to follow-up', 'Approval checklist', 'EHR note'] },
  signoff: { step: 'Sign-off', title: 'Sign and send', parts: ['Signature', 'Update EHR', 'Prescription email'] },
};

/** Placeholder for screens not yet moved over from prototype/patient-diary.html. */
export function ComingSoon({ screen }: { screen: string }) {
  const c = COPY[screen];
  return (
    <section className="grid min-h-[calc(100vh-40px)] place-items-center px-5 pb-28">
      <motion.div
        initial={{ y: 100, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
        className="border-border bg-card flex w-full max-w-lg flex-col gap-4 rounded-2xl border p-7"
      >
        <p className="text-muted-foreground text-sm">{c.step}</p>
        <h1 className="text-3xl">{c.title}</h1>
        <p className="text-muted-foreground">
          This screen is next to move over from the HTML prototype. The full flow still runs in
          prototype/patient-diary.html.
        </p>
        <Dock className="gap-2 pt-3" magnification={1.5}>
          {c.parts.map((x) => (
            <DockMagnify key={x} className="border-border rounded-lg border px-3 py-1.5 text-sm">
              {x}
            </DockMagnify>
          ))}
        </Dock>
      </motion.div>
    </section>
  );
}
