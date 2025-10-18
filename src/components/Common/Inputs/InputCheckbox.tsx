import { Center, Checkbox, rem, Text, Tooltip } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { useState } from "react";
import { Control, Controller, FieldError } from "react-hook-form";

export interface InputNumberProps {
  name: string;
  control: Control<any>;
  error?: FieldError;
  label: string;
  size?: "lg" | "md" | "sm" | "xl" | "xs";
  required?: boolean;
  infoText?: string;
}

export default function InputCheckbox({
  name,
  control,
  error,
  label,
  required,
  infoText,
  size = "md",
}: Readonly<InputNumberProps>) {
  const [opened, setOpened] = useState(false);

  const toggleTooltip = () => setOpened((o) => !o);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur } }) => (
        <div className="flex items-center gap-3">
          <Checkbox
            onChange={(e) => onChange(e.target.checked)}
            onBlur={onBlur}
            label={label}
            required={required}
            error={error?.message}
            size={size}
            className="w-fit"
          />
          {infoText && (
            <Tooltip
              label={infoText}
              withArrow
              transitionProps={{ transition: "pop-bottom-right" }}
              opened={opened}
              multiline
            >
              <Text
                component="div"
                c="dimmed"
                style={{ cursor: "help" }}
                onClick={toggleTooltip}
                onMouseEnter={() => setOpened(true)}
                onMouseLeave={() => setOpened(false)}
              >
                <Center>
                  <IconInfoCircle style={{ width: rem(24), height: rem(24) }} stroke={1.5} />
                </Center>
              </Text>
            </Tooltip>
          )}
        </div>
      )}
    />
  );
}
