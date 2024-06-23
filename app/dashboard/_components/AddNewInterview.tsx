"use client";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
  Textarea,
} from "@nextui-org/react";
import { useUser } from "@clerk/nextjs";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { chatSession } from "@/utils/geminiAiModel";
import { insertMockInterview } from "@/actions/interview";

type Props = {};

const AddNewInterview = (props: Props) => {
  // const [openDailog,setOpenDailog]=useState(false)
  const [jobPosition, setJobPosition] = useState<string>("");
  const [jobDesc, setJobDesc] = useState<string>("");
  const [jobExperience, setJobExperience] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [jsonResponse, setJsonResponse] = useState<string>("");
  const router = useRouter();

  const { user } = useUser();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    console.log(jobPosition, jobDesc, jobExperience);

    const InputPrompt = `Job position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}, Depends on Job Position, Job Description & Years of Experience give us ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} Interview question along with Answer without code in JSON format, Give us question and answer field on JSON`;

    const result = await chatSession.sendMessage(InputPrompt);
    const responseText = await result.response.text();
    console.log("this is the repsponse from the gemini", responseText);

    const MockJsonRespp = responseText
      .replace("```json", "")
      .replace("```", "");
    const MockJsonResp = MockJsonRespp.replace("```", "");
    console.log("this is the parsed response", MockJsonResp);
    setJsonResponse(MockJsonResp);

    if (MockJsonResp) {
      const res = await insertMockInterview(
        MockJsonResp,
        uuidv4(),
        jobPosition,
        jobDesc,
        jobExperience,
        user?.primaryEmailAddress?.emailAddress || "",
        moment().toISOString()
      );
      console.log("Inserted ID:", res);

      if (res) {
        onClose();
        router.push(`/dashboard/interview/${res?.mockInterview?.mockId}`);
      }
    } else {
      console.log("ERROR");
    }
    setLoading(false);
  };
  return (
    <div>
      <div
        className="p-10 border rounded-lg 
    hover:scale-105 hover:shadow-md cursor-pointer
     transition-all "
        onClick={() => onOpen()}
      >
        <h2 className="text-lg text-center">+ Add New</h2>
      </div>

      {/* <Button onPress={onOpen} color="primary">
        Open Modal
      </Button> */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        className="bg-[#088395]"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 ">
                <p className="text-[#071952] font-extrabold text-xl">Tell us more about your job interviwing</p>
              </ModalHeader>
              <ModalBody>
                <form onSubmit={onSubmit}>
                  <div>
                    <h2>
                      Add Details about yout job position/role, Job description
                      and years of experience
                    </h2>

                    <div className="mt-7 my-3">
                      <label>Job Role/Job Position</label>
                      <Input
                        placeholder="Ex. Full Stack Developer"
                        required
                        color="primary"
                        onChange={(event) => setJobPosition(event.target.value)}
                      />
                    </div>
                    <div className=" my-3">
                      <label>Job Description/ Tech Stack (In Short)</label>
                      <Textarea
                        placeholder="Ex. React, Angular, NodeJs, MySql etc"
                        required
                        color="primary"

                        onChange={(event) => setJobDesc(event.target.value)}
                      />
                    </div>
                    <div className=" my-3">
                      <label>Years of experience</label>
                      <Input
                        placeholder="Ex.5"
                        type="number"
                        max="100"
                        color="primary"

                        required
                        onChange={(event) =>
                          setJobExperience(event.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="flex gap-5 justify-end">
                    <Button type="button" className="bg-[#c2eaf3] text-[#071952]" onPress={onClose}>
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-[#071952]" disabled={loading}>
                      {loading ? (
                        <>
                          <LoaderCircle className="animate-spin" /> Generating
                          from AI
                        </>
                      ) : (
                        "Start Interview"
                      )}
                    </Button>
                  </div>
                </form>
              </ModalBody>
              {/* <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Sign in
                </Button>
              </ModalFooter> */}
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddNewInterview;
