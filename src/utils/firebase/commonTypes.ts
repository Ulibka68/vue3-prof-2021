export type HeaderType =
  | "ResumeHeader"
  | "ResumeSubHeader"
  | "ResumeAvatar"
  | "ResumeText";

export interface logedUserType {
  displayName: string;
  email: string;
  emailVerified: boolean;
  uid: string;
}
