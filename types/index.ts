import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type MockInterviewData = {
  
  mockId: string;
  jsonMockResp: string;
  jobPosition: string;
  jobDesc: string;
  jobExperience: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
};


export type MockInterviewQuestion = {
  question: string;
  answer: string;
};

export type feedbackData =  {
  id: number;
  mockIdRef: string;
  question: string;
  correctAns: string | null;
  userAns: string | null;
  feedback: string | null;
  rating: number | null;
  userEmail: string | null;
  createdAt: Date;
};


export type Offering  = {
  value: string;
}

export type  SubscriptionPlan = {
  id: number;
  name: string;
  cost: number;
  paymentLink?: string; // Optional property
  offering: Offering[];
}