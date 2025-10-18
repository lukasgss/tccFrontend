import { Stepper, em, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect, useState } from "react";

import classes from "./FormStepper.module.css";

export type Step = {
  label: string;
  description: string;
  text?: string;
  icon: JSX.Element;
};

interface FormStepperProps {
  currentStep: number;
  steps: Step[];
  changeCurrentStep: (idx: number) => void;
}

export default function FormStepper({ currentStep, steps, changeCurrentStep }: Readonly<FormStepperProps>) {
  const [active, setActive] = useState(currentStep);
  const [highestStepVisited, setHighestStepVisited] = useState(active);

  const isVertical = useMediaQuery(`(max-width: ${em(1023)})`);

  const theme = useMantineTheme();

  function handleStepClick(idx: number) {
    setActive(idx);
    changeCurrentStep(idx);
  }

  useEffect(() => {
    setActive(currentStep);
  }, [currentStep]);

  useEffect(() => {
    if (active > highestStepVisited) {
      setHighestStepVisited(active);
    }
  }, [active, highestStepVisited]);

  const shouldAllowSelectStep = (step: number) => highestStepVisited >= step && active !== step;

  return (
    <Stepper
      active={active}
      onStepClick={(idx) => handleStepClick(idx)}
      orientation={isVertical ? "vertical" : "horizontal"}
      className="flex justify-center"
      classNames={{ steps: classes.stepper }}
    >
      {steps.map((step, idx) => (
        <Stepper.Step
          key={step.label}
          label={step.label}
          description={step.description}
          allowStepSelect={shouldAllowSelectStep(idx)}
          icon={step.icon}
          color={theme.colors["brand-blue"][6]}
        >
          {step.text}
        </Stepper.Step>
      ))}
    </Stepper>
  );
}
