import { LabelSelector } from './cluster';
import { KubeObject, KubeObjectInterface } from './KubeObject';

export interface KubeRuleWithOperations {
  apiGroups: string[];
  apiVersions: string[];
  operations: string[];
  resources: string[];
  scope?: string;
}

export interface KubeWebhookClientConfig {
  caBundle: string;
  url?: string;
  service?: {
    name: string;
    namespace: string;
    path?: string;
    port?: number;
  };
}

export interface KubeMutatingWebhookConfiguration extends KubeObjectInterface {
  webhooks: {
    admissionReviewVersions: string[];
    clientConfig: KubeWebhookClientConfig;
    failurePolicy?: string;
    matchPolicy?: string;
    name: string;
    namespaceSelector?: {
      matchExpressions: LabelSelector['matchExpressions'];
      matchLabels: LabelSelector['matchLabels'];
    };
    objectSelector?: {
      matchExpressions: LabelSelector['matchExpressions'];
      matchLabels: LabelSelector['matchLabels'];
    };
    reinvocationPolicy?: string;
    rules?: KubeRuleWithOperations[];
    sideEffects?: string;
    timeoutSeconds?: number;
  }[];
}

class MutatingWebhookConfiguration extends KubeObject<KubeMutatingWebhookConfiguration> {
  static kind = 'MutatingWebhookConfiguration';
  static apiName = 'mutatingwebhookconfigurations';
  static apiVersion = 'admissionregistration.k8s.io/v1';
  static isNamespaced = false;

  static getBaseObject(): KubeMutatingWebhookConfiguration {
    const baseObject = super.getBaseObject() as KubeMutatingWebhookConfiguration;
    baseObject.webhooks = [
      {
        admissionReviewVersions: [],
        clientConfig: {
          caBundle: '',
          service: {
            name: '',
            namespace: '',
          },
        },
        name: '',
        rules: [
          {
            apiGroups: [],
            apiVersions: [],
            operations: [],
            resources: [],
          },
        ],
      },
    ];
    return baseObject;
  }

  get webhooks(): KubeMutatingWebhookConfiguration['webhooks'] {
    return this.jsonData.webhooks;
  }
}

export default MutatingWebhookConfiguration;
