// Basic A-Frame typings for JSX and module resolution

declare module "aframe" {
  const aframe: any;
  export default aframe;
}

declare namespace JSX {
  interface IntrinsicElements {
    "a-scene": any;
    "a-assets": any;
    "a-entity": any;
    "a-box": any;
    "a-sky": any;
    "a-text": any;
    "a-sound": any;
    "a-marker": any;
    // additional A-Frame tags used in the project
    "a-asset-item": any;
    "a-light": any;
    "a-plane": any;
    "a-camera": any;
  }
}

