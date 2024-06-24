"use client";
import { insertUserAnswer } from "@/actions/interview";
import { MockInterviewData, MockInterviewQuestion } from "@/types";
import { chatSession } from "@/utils/geminiAiModel";
import { useUser } from "@clerk/nextjs";
import { Button } from "@nextui-org/button";
import { Mic, StopCircle } from "lucide-react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import Webcam from "react-webcam";
import Image from "next/image";
type Props = {
  mockInterviewQuestion: MockInterviewQuestion[];
  activeQuestionIndex: number;
  interviewData: MockInterviewData;
};
type ResultType = {
  transcript: string;
};

type JsonFeedbackResp = {
  feedback: string;
  rating: number;
};

function RecordANswerSection({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}: Props) {
  const [userAnswer, setUserAnswer] = useState<string>("");
  const { user } = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: false,
    useLegacyResults: false,
  });
  useEffect(() => {
    if (results) {
      (results as ResultType[]).forEach((result) => {
        setUserAnswer((prevAns) => prevAns + result.transcript);
      });
    }
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer?.length > 10) {
      UpdateUserAnswer();
    }
  }, [userAnswer]);
  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async () => {
    console.log(userAnswer);
    setLoading(true);
    const feedbackPrompt =
      "Question:" +
      mockInterviewQuestion[activeQuestionIndex]?.question +
      ", User Answer:" +
      userAnswer +
      ",Depends on question and user answer for give interview question " +
      " please give us rating for answer and feedback as area of improvmenet if any " +
      "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";

    const result = await chatSession.sendMessage(feedbackPrompt);
    const mockJsonResp = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");
    const JsonFeedbackResp: JsonFeedbackResp = JSON.parse(mockJsonResp);
    console.log(
      "this is teh json feeback response from gemini",
      JsonFeedbackResp
    );
    const resp = insertUserAnswer(
      interviewData.mockId,
      mockInterviewQuestion[activeQuestionIndex]?.question,
      mockInterviewQuestion[activeQuestionIndex]?.answer,
      userAnswer,
      JsonFeedbackResp?.feedback,
      JsonFeedbackResp?.rating,
      user?.primaryEmailAddress?.emailAddress || "",
      moment().toISOString()
    );
    console.log("this is the respnse from update user answer", resp);

    // toast("User Answer recorded successfully");
    setUserAnswer("");
    setResults([]);

    setLoading(false);
  };

  return (
    <div className="flex flex-col  justify-center items-center bg-transparent rounded-lg">
      {/* <Image
          src={"/webcam.png"}
          width={200}
          height={200}
          className="absolute"
          alt="webcam"
        /> */}
      <Webcam
        mirrored={true}
        style={{
          height: 350,
          width: 550,
          zIndex: 10,
          borderRadius: "10px", // This makes the webcam view rounded
          objectFit: "cover", // This ensures the video covers the entire circle
          marginBottom: "20px",
        }}
      />
      <Button disabled={loading} className="bg-[#37B7C3] mb-4 mt-3" onClick={StartStopRecording}>
        {isRecording ? (
          <h2 className="text-red-600 animate-pulse flex gap-2 items-center">
            <StopCircle />
            Stop Recording
          </h2>
        ) : (
          <h2 className="text-[#EBF4F6]  flex gap-2 items-center">
            <Mic /> Record Answer
          </h2>
        )}
      </Button>
    </div>
  );
}

export default RecordANswerSection;
