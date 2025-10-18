import { notifications } from "@mantine/notifications";
import React from "react";

import classes from "./notify.module.css";

type NotificationType = "success" | "error";

export interface NotifyProps {
  type: NotificationType;
  title?: string;
  message: string;
  autoClose?: number | false | undefined;
  icon?: React.ReactNode;
}

function getTitleText(title: string | undefined, type: NotificationType) {
  if (title) {
    return title;
  }
  if (!title && type === "success") {
    return "Sucesso!";
  }
  if (!title && type === "error") {
    return "Erro!";
  }

  return null;
}

export default function Notify({ type, title, message, icon, autoClose = 4000 }: NotifyProps): void {
  notifications.show({
    color: "white",
    title: getTitleText(title, type),
    message,
    withCloseButton: true,
    autoClose,
    icon,
    styles: (theme) => ({
      root: {
        backgroundColor: type === "success" ? theme.colors.green[6] : theme.colors.red[6],
        borderColor: type === "success" ? theme.colors.green[6] : theme.colors.red[6],
      },
      title: {
        color: theme.white,
        fontWeight: 700,
      },
      description: {
        color: theme.white,
      },
      closeButton: {
        color: theme.white,
      },
    }),
    classNames: classes,
  });
}
