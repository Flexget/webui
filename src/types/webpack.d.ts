// images
declare module '*.png';
declare module '*.svg';
declare module '*.gif';
declare module '*.jpg';

// fonts
declare module '*.eot';
declare module '*.woff';
declare module '*.woff2';
declare module '*.ttf';
declare module '*.otf';

// videos
declare module '*.mp4';

// workers
declare module "worker-loader!*" {
  class WebpackWorker extends Worker {
    constructor();
  }

  export default WebpackWorker;
}
