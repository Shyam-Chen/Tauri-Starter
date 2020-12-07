import * as pulumi from '@pulumi/pulumi';
import * as k8s from '@pulumi/kubernetes';

// Minikube does not implement services of type `LoadBalancer`; require the user to specify if we're
// running on minikube, and if so, create only services of type ClusterIP.
const config = new pulumi.Config();
const isMinikube = config.requireBoolean('isMinikube');

const appName = 'nginx';
const appLabels = { app: appName };
const deployment = new k8s.apps.v1.Deployment(appName, {
  spec: {
    selector: { matchLabels: appLabels },
    replicas: 1,
    template: {
      metadata: { labels: appLabels },
      spec: { containers: [{ name: appName, image: 'nginx' }] },
    },
  },
});

// Allocate an IP to the Deployment.
const frontend = new k8s.core.v1.Service(appName, {
  metadata: { labels: deployment.spec.template.metadata.labels },
  spec: {
    type: isMinikube ? 'ClusterIP' : 'LoadBalancer',
    ports: [{ port: 80, targetPort: 80, protocol: 'TCP' }],
    selector: appLabels,
  },
});

// When "done", this will print the public IP.
export const ip = isMinikube
  ? frontend.spec.clusterIP
  : frontend.status.loadBalancer.apply((lb) => lb.ingress[0].ip || lb.ingress[0].hostname);

/**
 * $ minikube start
 * $ kubectl version --short
 *
 * $ pulumi config set isMinikube true
 * $ pulumi up
 *
 * $ kubectl get service
 * $ kubectl port-forward service/nginx-xb43mkd8 8080:80
 *
 * $ pulumi destroy
 * $ pulumi stack rm dev
 * $ minikube stop
 *
 * ---
 *
 * $ http 127.0.0.1:8080
 */
