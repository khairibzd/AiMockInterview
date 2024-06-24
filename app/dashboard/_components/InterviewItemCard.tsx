import { DeleteInterview } from "@/actions/interview";
import { MockInterviewData } from "@/types";
import { Button } from "@nextui-org/button";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { EllipsisVertical, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  interview: MockInterviewData;
  interviewList: MockInterviewData[];
  setInterviewList: React.Dispatch<React.SetStateAction<MockInterviewData[]>>;
};

function InterviewItemCard({ interview,interviewList,setInterviewList }: Props) {
  const router = useRouter();

  const onStart = () => {
    router.push("/dashboard/interview/" + interview?.mockId);
  };

  const onFeedbackPress = () => {
    router.push("/dashboard/interview/" + interview.mockId + "/feedback");
  };

  const handleDelete = async () => {
    const interviewId = interview?.mockId;
    console.log("Deleting interview with id:", interviewId);

    try {
      await DeleteInterview(interviewId); // Assuming DeleteInterview is an async function

      // Update interview list after deletion
      const updatedList = interviewList.filter(
        (item) => item.mockId !== interviewId
      );
      setInterviewList(updatedList);

      console.log("Interview deleted successfully");
    } catch (error) {
      console.error("Error deleting interview:", error);
      // Handle error state or display error message as needed
    }
  };
  return (
    <Card
      className="max-w-[400px]"
      style={{
        background: "rgba(171, 171, 180, 0.1)",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRadius: "10px",
        border: "1px solid rgba(255, 255, 255, 0.18)",
      }}
    >
      <CardHeader className="flex justify-between items-center">
        <h2 className=" text-xl font-extrabold text-white">
          {interview?.jobPosition}
        </h2>
        <Dropdown className="bg-[#EBF4F6] text-[#071952] p-0 rounded-lg">
          <DropdownTrigger>
            <EllipsisVertical />
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Static Actions"
            className="p-0"
            itemClasses={{
              base: [
                "rounded-md",

                "data-[hover=true]:bg-[#071952]",
                "data-[selectable=true]:focus:bg-[#071952]",
              ],
            }}
          >
            {/* <DropdownItem key="new">New file</DropdownItem>
            <DropdownItem key="copy">Copy link</DropdownItem>
            <DropdownItem key="edit">Edit file</DropdownItem> */}
            <DropdownItem
              key="delete"
              className="flex items-center"
              onClick={handleDelete}
            >
              <span className="flex justify-between items-center">
                Delete interview
                <Trash2 className="ml-2 h-5 w-5" />
              </span>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
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
          className="w-full bg-[#37B7C3]"
          onClick={onFeedbackPress}
        >
          Feedback
        </Button>
        <Button
          size="sm"
          className="w-full bg-[#EBF4F6] text-[#071952]"
          onClick={onStart}
        >
          Start
        </Button>
      </CardFooter>
    </Card>
  );
}

export default InterviewItemCard;
