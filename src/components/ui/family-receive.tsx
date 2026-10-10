'use client';

import React, { useState } from 'react';
import {
  motion,
  AnimatePresence,
  LayoutGroup,
  type Transition,
} from 'motion/react';
import { X, Fingerprint } from 'lucide-react';

export interface FamilyReceiveComponentProps {
  triggerLabel?: string;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  icon?: React.ReactNode;
}

const springTransition: Transition = {
  type: 'spring',
  bounce: 0,
  duration: 0.4,
};

export const FamilyReceiveComponent: React.FC<FamilyReceiveComponentProps> = ({
  triggerLabel = 'Receive',
  title = 'Confirm',
  description = 'Are you sure you want to receive hell load of money?',
  confirmLabel = 'Receive',
  cancelLabel = 'Cancel',
  onConfirm,
  icon,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="theme-injected relative flex h-[400px] w-[320px] max-w-full items-center justify-center md:w-[520px]">
      <LayoutGroup>
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              key="trigger"
              layoutId="action-button"
              onClick={() => setIsOpen(true)}
              className="bg-deep text-deep-foreground relative h-12 w-64 cursor-pointer rounded-xl text-base font-medium shadow-[0_8px_24px_-8px_rgba(31,18,56,0.45)] md:h-14 md:w-80 md:text-lg"
              whileTap={{ scale: 0.95 }}
              transition={springTransition}
            >
              {triggerLabel}
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 px-4 backdrop-blur-sm"
            >
              <motion.div
                initial={{ y: 100, opacity: 0, scale: 0.98 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 100, opacity: 0, scale: 0.98 }}
                transition={springTransition}
                className="border-border bg-card text-card-foreground relative w-[320px] max-w-full overflow-hidden rounded-2xl border p-6 shadow-[0_24px_60px_-20px_rgba(31,18,56,0.35)] md:w-[480px] md:p-7"
              >
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-muted-foreground hover:text-foreground absolute top-5 right-5"
                >
                  <X size={22} strokeWidth={1.75} />
                </button>

                <div className="mb-4 flex items-center gap-3">
                  <div className="border-border text-foreground flex h-10 w-10 items-center justify-center rounded-xl border">
                    {icon ?? <Fingerprint size={20} strokeWidth={1.75} />}
                  </div>
                  <h2 className="text-card-foreground text-xl font-medium tracking-tight md:text-2xl">
                    {title}
                  </h2>
                </div>

                <p className="text-muted-foreground my-4 max-w-sm text-base md:my-6 md:text-lg">
                  {description}
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="border-border text-foreground hover:bg-muted h-11 flex-1 cursor-pointer rounded-xl border text-base font-medium md:h-12"
                  >
                    {cancelLabel}
                  </button>

                  <motion.button
                    layoutId="action-button"
                    onClick={() => {
                      onConfirm?.();
                      setIsOpen(false);
                    }}
                    className="bg-deep text-deep-foreground hover:bg-deep/90 h-11 flex-1 cursor-pointer rounded-xl text-base font-medium md:h-12"
                    transition={springTransition}
                  >
                    {confirmLabel}
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </LayoutGroup>
    </div>
  );
};
