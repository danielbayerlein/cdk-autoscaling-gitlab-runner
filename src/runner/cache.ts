import {
  BlockPublicAccess,
  Bucket,
  BucketEncryption,
  IBucket,
} from "@aws-cdk/aws-s3";
import { Construct, Duration, RemovalPolicy, Stack } from "@aws-cdk/core";

export interface CacheProps {
  /**
   * The infix of the physical cache bucket name.
   *
   * @default "runner-cache"
   */
  bucketName?: string;
  /**
   * The number of days after which the created cache objects are deleted from S3.
   * @default 30 days
   */
  expiration?: Duration;
}

/**
 * A GitLab Runner cache consisting of an Amazon S3 bucket.
 *
 * The bucket is encrypted with a KMS managed master key, it has public access blocked and will be cleared and deleted on CFN stack deletion.
 */
export class Cache extends Construct {
  readonly bucket: IBucket;
  readonly lifeCycleRuleEnabled: boolean;
  readonly expiration: Duration;

  constructor(scope: Stack, id: string, props: CacheProps = {}) {
    super(scope, id);

    const bucketName = props.bucketName || "runner-cache";
    const uniqueCacheBucketName =
      `${scope.stackName}-${bucketName}-${scope.account}-${scope.region}`.toLocaleLowerCase();

    /* Enabled if not 0. If 0 - cache doesnt't expire. If undefined - expiration sets to expire in 30 days */
    this.expiration = props.expiration ?? Duration.days(30);
    this.lifeCycleRuleEnabled = this.expiration.toDays() !== 0;

    this.bucket = new Bucket(scope, "CacheBucket", {
      bucketName: uniqueCacheBucketName,
      lifecycleRules: [
        {
          enabled: this.lifeCycleRuleEnabled,
          expiration: this.expiration,
        },
      ],
      encryption: BucketEncryption.KMS_MANAGED,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      autoDeleteObjects: true,
      removalPolicy: RemovalPolicy.DESTROY,
    });
  }
}