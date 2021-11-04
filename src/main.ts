import { MachineImage, SubnetType, Vpc } from "@aws-cdk/aws-ec2";
import { App } from "@aws-cdk/core";
import { GitlabRunnerStack } from "./cdk-gitlab-runner-stack";

const app = new App();

new GitlabRunnerStack(app, `GitlabRunnerStack`, {
  instanceTypeIdentifier: "",
  vpc: new Vpc(app, "Vpc", {}),
  machineImage: MachineImage.genericLinux(),
  cacheBucketName: "",
  cacheExpirationInDays: 0,
  availabilityZone: "",
  vpcSubnet: null,
  managerImageId: "",
  managerInstanceType: "",
  managerKeyPair: "",
  gitlabUrl: "",
  gitlabToken: "",
  gitlabRunnerInstanceType: "",
  gitlabDockerImage: "",
  gitlabMaxBuilds: "",
  gitlabMaxConcurrentBuilds: "",
  gitlabIdleCount: "",
  gitlabIdleTime: "",
  gitlabOffPeakTimezone: "",
  gitlabOffPeakIdleCount: "",
  gitlabOffPeakIdleTime: "",
  gitlabCheckInterval: "",
  gitlabRunnerSpotInstance: "",
  gitlabRunnerSpotInstancePrice: "",

});