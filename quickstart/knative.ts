import * as k8s from '@pulumi/kubernetes';

new k8s.apiextensions.CustomResource('helloworld-go', {
  apiVersion: 'serving.knative.dev/v1',
  kind: 'Service',
  metadata: {
    name: 'helloworld-go',
    namespace: 'default',
  },
  spec: {
    template: {
      spec: {
        containers: [
          {
            image: 'gcr.io/knative-samples/helloworld-go',
            env: [{ name: 'TARGET', value: 'Go Sample v1' }],
          },
        ],
      },
    },
  },
});
// ```yaml
// apiVersion: serving.knative.dev/v1 # Current version of Knative
// kind: Service
// metadata:
//   name: helloworld-go # The name of the app
//   namespace: default # The namespace the app will use
// spec:
//   template:
//     spec:
//       containers:
//         - image: gcr.io/knative-samples/helloworld-go # Reference to the image of the app
//           env:
//             - name: TARGET # The environment variable printed out by the sample app
//               value: "Go Sample v1"
// ```
