
export type FlagType = {
  type: "red" | "green";
  text: string;
  votes: number;
  percentage: number;
};

export type CompanyType = {
  id: string;
  name: string;
  logo: string;
  industry: string;
  location: string;
  size: string;
  founded: string;
  redFlagCount: number;
  greenFlagCount: number;
  reviewCount: number;
  flags: FlagType[];
};
