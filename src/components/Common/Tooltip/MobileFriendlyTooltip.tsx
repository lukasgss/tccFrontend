import { Box, Tooltip, TooltipProps } from "@mantine/core";
import { useState } from "react";

interface MobileFriendlyTooltipProps extends Omit<TooltipProps, "children"> {
  children: React.ReactNode;
}

export default function MobileFriendlyTooltip({ label, children, ...rest }: MobileFriendlyTooltipProps) {
  const [opened, setOpened] = useState(false);

  return (
    <Tooltip label={label} opened={opened} {...rest}>
      <Box
        onClick={() => setOpened((prevValue) => !prevValue)}
        onMouseOver={() => setOpened(true)}
        onMouseOut={() => setOpened(false)}
      >
        {children}
      </Box>
    </Tooltip>
  );
}
