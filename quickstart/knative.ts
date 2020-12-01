import * as k8s from '@pulumi/kubernetes';

new k8s.apiextensions.CustomResource('Go', {
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
