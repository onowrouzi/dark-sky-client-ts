export type DarkSkyAlertObject = {
  title: string;
  regions: string[];
  severity: DarkSkySeverity;
  time: number;
  expires: number;
  description: string;
  uri: string;
};

export type DarkSkySeverity = "advisory" | "watch" | "warning";
