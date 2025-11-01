declare module 'shepherd.js' {
  export interface TourOptions {
    useModalOverlay?: boolean;
    defaultStepOptions?: any;
    steps?: any[];
    tourName?: string;
    exitOnEsc?: boolean;
    keyboardNavigation?: boolean;
    confirmCancel?: boolean;
    confirmCancelMessage?: string;
  }

  export interface StepOptions {
    id?: string;
    attachTo?: { element: string | Element | null; on?: string } | null;
    beforeShowPromise?: () => Promise<void>;
    buttons?: Array<{ text?: string; action?: (() => void) | string; classes?: string }>;
    cancelIcon?: any;
    classes?: string;
    highlightClass?: string;
    scrollTo?: boolean | { behavior?: string; block?: string };
    title?: string | null;
    text?: string | string[] | null;
    when?: Record<string, () => void>;
  }

  export class Tour {
    constructor(options?: Partial<TourOptions>);
    addStep(step: StepOptions | any): void;
    addSteps(steps: Array<StepOptions | any>): void;
    start(): void;
    next(): void;
    back(): void;
    cancel(): void;
    complete(): void;
    show(id?: string): void;
    isActive(): boolean;
    on(event: string, handler: (...args: any[]) => void): void;
  }

  export { Tour as TourClass };

  export default class Shepherd {
    static Tour: typeof Tour;
  }
}

// Provide a benign module mapping for the CJS type file that caused an export assignment conflict
declare module 'shepherd.js/dist/cjs/shepherd.d.cts' {
  import ShepherdDefault, { Tour as Tour } from 'shepherd.js';
  export { Tour };
  export default ShepherdDefault;
}
