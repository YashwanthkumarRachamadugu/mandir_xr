// src/aframe-types.d.ts
import { DetailEvent } from 'aframe';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'a-scene': any;
      'a-entity': any;
      'a-assets': any;
      'a-asset-item': any;
      'a-camera': any;
      'a-cursor': any;
      'a-plane': any;
      'a-sky': any;
      'a-light': any;
      'a-gltf-model': any;
      'a-text': any;
      // Add any other A-Frame tags you plan to use here
    }
  }
}