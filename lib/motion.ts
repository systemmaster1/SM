import type {Variants} from 'framer-motion';

export const premiumEase = [0.2, 0.8, 0.2, 1] as const;

export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    y: 8,
    filter: 'blur(3px)'
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.42,
      ease: premiumEase
    }
  },
  exit: {
    opacity: 0,
    y: -5,
    transition: {
      duration: 0.18,
      ease: premiumEase
    }
  }
};

export const revealUp: Variants = {
  hidden: {
    opacity: 0,
    y: 24
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: premiumEase
    }
  }
};

export const revealSoft: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
    filter: 'blur(4px)'
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: premiumEase
    }
  }
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.04
    }
  }
};

export const hoverLift = {
  y: -4,
  transition: {
    duration: 0.2,
    ease: premiumEase
  }
};
