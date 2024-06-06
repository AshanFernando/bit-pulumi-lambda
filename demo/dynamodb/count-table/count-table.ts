import * as pulumi from '@pulumi/pulumi';
import * as aws from '@pulumi/aws';

export const countTable = new aws.dynamodb.Table('count-table', {
  billingMode: 'PAY_PER_REQUEST',
  attributes: [
    {
      name: 'sessionId',
      type: 'S',
    },
    {
      name: 'count',
      type: 'N',
    },
  ],
  tableClass: 'STANDARD',
  hashKey: 'sessionId',
  globalSecondaryIndexes: [
    {
      name: 'count-index',
      hashKey: 'sessionId',
      rangeKey: 'count',
      projectionType: 'ALL',
    },
  ],
});
