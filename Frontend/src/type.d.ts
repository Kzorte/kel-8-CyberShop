// types.d.ts or any other .d.ts file in your TypeScript project

declare module '@glidejs/glide/dist/glide.esm' {
    export interface GlideOptions {
      type?: string;
      startAt?: number;
      perView?: number;
      focusAt?: string | number;
      gap?: number;
      autoplay?: boolean | number;
      hoverpause?: boolean;
      keyboard?: boolean;
      bound?: boolean;
      swipeThreshold?: boolean | number;
      dragThreshold?: boolean | number;
      perTouch?: number | boolean;
      touchRatio?: number;
      touchAngle?: number;
      animationDuration?: number;
      rewind?: boolean;
      rewindDuration?: number;
      animationTimingFunc?: string;
      throttle?: number;
      direction?: string;
      peek?: number | Record<string, number>;
      breakpoints?: Record<number, GlideOptions>;
      classes?: Record<string, string>;
      // You can continue adding more specific properties as per Glide's configuration options
    }
  
    export default class Glide {
      constructor(selector: HTMLElement | string, options?: GlideOptions);
      mount(extensions?: Record<string, any>): Glide;
      destroy(): void;
    }
  }
  