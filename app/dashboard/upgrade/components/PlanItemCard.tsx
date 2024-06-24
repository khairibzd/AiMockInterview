"use client";
import { SubscriptionPlan } from "@/types";
import { useUser } from "@clerk/nextjs";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import React from "react";

type Props = {
  plan: SubscriptionPlan;
};

function PlanItemCard({ plan }: Props) {
  const { user } = useUser();
  return (
    <Card className="max-w-[400px] border-none text-white" style={{
      background: "rgba(171, 171, 180, 0.1)",
      boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      borderRadius: "10px",
      border: "1px solid rgba(255, 255, 255, 0.18)",
    }}>
      <CardHeader className="flex gap-3  font-bold items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-medium ">
            {plan.name}
            <span className="sr-only">Plan</span>
          </h2>

          <p className="mt-2 sm:mt-4">
            <strong className="text-3xl font-bold  sm:text-4xl">
              {" "}
              {plan.cost}${" "}
            </strong>

            <span className="text-sm font-medium ">/month</span>
          </p>
        </div>
      </CardHeader>
      <CardBody className="items-center text-center">
        <ul className="mt-6 space-y-2">
          {plan.offering.map((item, index) => (
            <li className="flex items-center gap-1 mb-2">
              <h2 className="">{item.value}</h2>
            </li>
          ))}
        </ul>
      </CardBody>
      <CardFooter className="justify-center">
        <a
          href={
            plan.paymentLink +
            "?prefilled_email=" +
            (user?.primaryEmailAddress?.emailAddress ?? "")
          }
          target="_blank"
        >
          <Button className="bg-[#37B7C3]">Get Started</Button>
        </a>
      </CardFooter>
    </Card>
  );
}

export default PlanItemCard;
