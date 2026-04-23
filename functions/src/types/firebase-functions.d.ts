// Minimal typing to satisfy TypeScript when firebase-functions package isn't installed.

declare module "firebase-functions" {
  namespace functions {
    namespace https {
      interface CallableContext {
        auth?: { uid: string; token: any };
        rawRequest?: any;
      }

      function onCall(
        handler: (data: any, context: CallableContext) => any
      ): any;
    }
  }

  export = functions;
}
