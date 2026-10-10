import React, { createContext, useContext, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react';
import { cn } from '@/lib/utils';

/*
 * macOS-style dock magnification.
 * <Dock> tracks the pointer; each child grows as the pointer gets close.
 *  - <DockIcon> grows in size and pushes its neighbours, like real dock icons.
 *  - <DockMagnify> scales any content (chips, cards, buttons) without changing layout.
 */

type DockCtx = { mouseX: MotionValue<number>; distance: number; magnification: number; reduced: boolean };
const DockContext = createContext<DockCtx | null>(null);
const spring = { mass: 0.1, stiffness: 170, damping: 14 };

function useDistance(ref: React.RefObject<HTMLElement | null>, mouseX: MotionValue<number>) {
  return useTransform(mouseX, (x) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r || !Number.isFinite(x)) return Infinity;
    return x - r.left - r.width / 2;
  });
}

export interface DockProps extends React.HTMLAttributes<HTMLDivElement> {
  /** How far, in pixels, the effect reaches from the pointer. */
  distance?: number;
  /** Peak scale for DockMagnify and DockIcon. 1.5 means 150 percent. */
  magnification?: number;
}

export function Dock({ className, children, distance = 140, magnification = 1.5, ...rest }: DockProps) {
  const mouseX = useMotionValue(Infinity);
  const reduced = !!useReducedMotion();
  return (
    <DockContext.Provider value={{ mouseX, distance, magnification, reduced }}>
      <div
        {...rest}
        onPointerMove={(e) => mouseX.set(e.clientX)}
        onPointerLeave={() => mouseX.set(Infinity)}
        onPointerCancel={() => mouseX.set(Infinity)}
        className={cn('flex items-end', className)}
      >
        {children}
      </div>
    </DockContext.Provider>
  );
}

function useDock() {
  const ctx = useContext(DockContext);
  if (!ctx) throw new Error('Dock items must be placed inside <Dock>.');
  return ctx;
}

export interface DockIconProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  active?: boolean;
  /** Resting size in pixels. */
  size?: number;
}

/** A square dock button that grows and pushes its neighbours, with a label above it. */
export function DockIcon({ label, active, size = 44, className, children, ...rest }: DockIconProps) {
  const { mouseX, distance, magnification, reduced } = useDock();
  const ref = useRef<HTMLButtonElement>(null);
  const d = useDistance(ref, mouseX);
  const target = useTransform(d, [-distance, 0, distance], [size, size * magnification, size]);
  const sizeMv = useSpring(target, spring);
  const iconScale = useTransform(sizeMv, (s) => s / size);

  return (
    <motion.button
      ref={ref}
      type="button"
      aria-label={label}
      aria-current={active ? 'page' : undefined}
      style={reduced ? { width: size, height: size } : { width: sizeMv, height: sizeMv }}
      whileTap={{ scale: 0.92 }}
      className={cn(
        'group border-border bg-card text-foreground hover:bg-muted relative grid shrink-0 cursor-pointer place-items-center rounded-xl border',
        active && 'bg-muted border-transparent',
        className,
      )}
      {...(rest as React.ComponentProps<typeof motion.button>)}
    >
      <motion.span style={reduced ? undefined : { scale: iconScale }} className="grid place-items-center">
        {children}
      </motion.span>
      <span
        role="presentation"
        className="bg-deep text-deep-foreground pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 translate-y-1 rounded-lg px-2.5 py-1 text-xs font-medium whitespace-nowrap opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
      >
        {label}
      </span>
      {active && <span className="bg-deep absolute -bottom-2 h-1 w-1 rounded-full" aria-hidden="true" />}
    </motion.button>
  );
}

export interface DockMagnifyProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Where the item grows from. Bottom feels most like a dock. */
  origin?: 'bottom' | 'center';
}

/** Wrap any element so it magnifies as the pointer passes over the row. */
export function DockMagnify({ origin = 'bottom', className, style, children, ...rest }: DockMagnifyProps) {
  const { mouseX, distance, magnification, reduced } = useDock();
  const ref = useRef<HTMLDivElement>(null);
  const d = useDistance(ref, mouseX);
  const peak = 1 + (magnification - 1) * 0.5; // text content looks best with a gentler peak
  const scale = useSpring(useTransform(d, [-distance, 0, distance], [1, peak, 1]), spring);
  const lift = useTransform(scale, (s) => (s - 1) * -24);
  const z = useTransform(scale, (s) => (s > 1.02 ? 2 : 0));

  return (
    <motion.div
      ref={ref}
      style={
        reduced
          ? style
          : { ...style, scale, y: lift, zIndex: z, transformOrigin: origin === 'bottom' ? '50% 100%' : '50% 50%' }
      }
      className={cn('relative', className)}
      {...(rest as React.ComponentProps<typeof motion.div>)}
    >
      {children}
    </motion.div>
  );
}
