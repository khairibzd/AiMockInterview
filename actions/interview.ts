"use server";

import { client } from "@/utils/prsima";

export const insertMockInterview = async (
  jsonMockResp: string,
  mockId: string, // Change Number to string
  jobPosition: string,
  jobDesc: string,
  jobExperience: string,
  createdBy: string,
  createdAt: string
) => {
  try {
    const newMockInterview = await client.mockInterview.create({
      data: {
        jsonMockResp,
        mockId,
        jobPosition,
        jobDesc,
        jobExperience,
        createdBy,
        createdAt,
      },
      select: {
        mockId: true,
      },
    });

    if (newMockInterview) {
      return { status: 200, mockInterview: newMockInterview };
    }
  } catch (error) {
    console.error("Error inserting mock interview:", error);
    return { status: 400 };
  }
};

export const insertUserAnswer = async (
  mockIdRef: string, // Change Number to string
  question: string,
  correctAns: string,
  userAns: string,
  feedback: string,
  rating: number,
  userEmail: string,
  createdAt: string
) => {

  try {
  const interviewData = await client.mockInterview.findUnique({
    where: { mockId: mockIdRef } // Replace 'your-mock-id' with the actual mockId you want to reference
  });

  if (!interviewData) {
    throw new Error('MockInterview not found');
  }
  
    const newUserAnswer = await client.userAnswer.create({
      data: {
        mockIdRef,
        question,
        correctAns,
        userAns,
        feedback,
        rating,
        userEmail,
        createdAt,
      },
    });

    if (newUserAnswer) {
      return { status: 200};
    }
  } catch (error) {
    console.error("Error inserting mock interview:", error);
    return { status: 400 };
  }
};



export const getInterviewDetails = async (interviewId: string) => {
  
  try {
    const result = await client.mockInterview.findUnique({
      where: { mockId: interviewId },
    });

    if (result) {
      // console.log('this is not cleaned',result.jsonMockResp)
      const jsonMockResp = JSON.parse(result.jsonMockResp);
      // const cleanedJsonString = result.jsonMockResp.replace(/[\u0000-\u001F\u007F-\u009F]/g, '').trim();
      // console.log("Cleaned JSON response:", cleanedJsonString);

      // Parse the cleaned JSON string
      // const jsonMockResp = JSON.parse(cleanedJsonString);
      return { status: 200, jsonMockResp, interviewData: result };
    } else {
      console.error("No interview found with the given ID");
      return { status: 404, message: "No interview found with the given ID" };
    }
  } catch (error) {
    console.error("Error fetching interview details:", error);
    return { status: 500, message: "Error fetching interview details" };
  }
};



export const getFeedbackDetails = async (interviewId: string) => {
  try {
    const result = await client.userAnswer.findMany({
      where: {
        mockIdRef: interviewId,
      },
      orderBy: {
        id: 'asc',
      },
    });
    return result; // Return the array directly
  } catch (error) {
    console.error("Error fetching interview details:", error);
    throw new Error("Error fetching interview details");
  }
};

export const getInterviewList = async (createdBy: string) => {
  try {
    const result = await client.mockInterview.findMany({
      where: {
        createdBy: createdBy,
      },
      orderBy: {
        id: 'desc',
      },
    });
    return result; // Return the array directly
  } catch (error) {
    console.error("Error fetching interview details:", error);
    throw new Error("Error fetching interview details");
  }
}