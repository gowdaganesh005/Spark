
// declare global {
//     interface Window {
//       MonacoEnvironment?: Environment | undefined;
//     }
//   }
  
//   if (typeof window !== 'undefined' && !window.MonacoEnvironment) {
//     window.MonacoEnvironment = {
//       getWorkerUrl: function (moduleId: string, label: string) {
//         switch (label) {
//           case 'json':
//             return '/json.worker.js';
//           case 'javascript':
//           case 'typescript':
//             return '/ts.worker.js';
//           default:
//             return '/editor.worker.js';
//         }
//       }
//     };
//   }
  