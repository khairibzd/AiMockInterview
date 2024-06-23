import { MockInterviewData } from "@/types";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  interview: MockInterviewData;
};

function InterviewItemCard({ interview }: Props) {
  const router = useRouter();

  const onStart = () => {
    router.push("/dashboard/interview/" + interview?.mockId);
  };

  const onFeedbackPress = () => {
    router.push("/dashboard/interview/" + interview.mockId + "/feedback");
  };

  return (
    <Card className="max-w-[400px] bg-[#088395]">
      <CardHeader className="flex">
        <h2 className=" text-xl font-extrabold text-[#071952]">{interview?.jobPosition}</h2>
      </CardHeader>
      <CardBody className="items-start text-start">
        <h2 className="text-sm text-gray-200">
          {interview?.jobExperience} Years of Experience
        </h2>
        <h2 className="text-xs text-[#BED1CF]">
          Created At:{interview.createdAt.toLocaleDateString()}
        </h2>
      </CardBody>
      <CardFooter className="space-x-3">
       
          <Button
            size="sm"
            className="w-full bg-[#071952]"
            onClick={onFeedbackPress}
          >
            Feedback
          </Button>
          <Button size="sm" className="w-full bg-[#EBF4F6] text-[#071952]" onClick={onStart}>
            Start
          </Button>
      </CardFooter>
    </Card>
  );
}

export default InterviewItemCard;
