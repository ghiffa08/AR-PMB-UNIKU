// Type declarations for mind-ar package
declare module 'mind-ar' {
  export interface MindARViewerOptions {
    container: HTMLElement;
    imageTargetSrc: string;
    maxTrack?: number;
    uiScanning?: boolean;
    uiLoading?: string | boolean;
  }

  export class MindARViewer {
    constructor(options: MindARViewerOptions);
    
    on(event: 'targetFound' | 'targetLost', callback: () => void): void;
    start(): Promise<void>;
    stop(): void;
  }
}

declare module 'mind-ar-react' {
  export interface MindARReactProps {
    imageTargetSrc: string;
    onTargetFound?: () => void;
    onTargetLost?: () => void;
    children?: React.ReactNode;
  }

  export const MindARReact: React.FC<MindARReactProps>;
}
