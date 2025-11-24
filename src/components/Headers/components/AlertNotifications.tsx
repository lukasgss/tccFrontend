import { Image, Loader, Text } from "@mantine/core";
import { useClickOutside, useMediaQuery } from "@mantine/hooks";
import { Bell, X } from "@phosphor-icons/react";
import { QueryObserverResult, RefetchOptions, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import Notify from "../../../hooks/notifications/notifications";
import {
  ReadAllNotifications,
  ReadNotification,
} from "../../../services/requests/AdoptionNoficiations/AdoptionNotificationsService";
import { AdoptionAlertNotificationResponse } from "../../../services/requests/AdoptionNoficiations/types";
import { formatISODate } from "../../../utils/dates";

import "./AlertNotifications.css";

interface AlertNotificationsProps {
  notifications?: AdoptionAlertNotificationResponse[];
  refetchNotifications: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<AdoptionAlertNotificationResponse[], Error>>;
}

export default function AlertNotifications({ notifications, refetchNotifications }: Readonly<AlertNotificationsProps>) {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications?.filter((n) => !n.hasBeenRead).length ?? 0;

  const ref = useClickOutside(() => setIsOpen(false));

  const { VITE_APP_BASE_URL: appBaseUrl } = import.meta.env;

  const { mutateAsync: readSingleNotificationAsync } = useMutation({
    mutationFn: (notificationId: number) => ReadNotification(notificationId),
    onSuccess: () => refetchNotifications(),
  });

  const { mutateAsync: readAllNotificationsAsync, isPending: loadingReadAllNotifications } = useMutation({
    mutationFn: ReadAllNotifications,
    onSuccess: () => refetchNotifications(),
  });

  const readAllNotifications = async () => {
    if (notifications?.every((n) => n.hasBeenRead)) {
      Notify({
        type: "success",
        message: "Todas as notificações foram marcadas como lidas!",
      });
      return;
    }

    await readAllNotificationsAsync();
  };

  const isMobile = useMediaQuery("(max-width: 825px)");

  return (
    <div className="relative flex items-center" ref={ref}>
      <button
        type="button"
        className="relative w-full flex justify-start items-center gap-2.5 min-[825px]:justify-center hover:bg-gray-100 rounded-full p-2 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="h-5 w-5 text-gray-600" />
        {unreadCount > 0 && (
          <div className="absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center">
            <span className="text-xs text-white font-medium">{unreadCount}</span>
          </div>
        )}
        {isMobile && <Text>Notificações</Text>}
      </button>

      {isOpen && (
        <div
          className="absolute top-full mt-2 w-72 min-[825px]:w-96 bg-white rounded-lg shadow-lg
          ring-1 ring-black ring-opacity-5 transform -translate-x-1/2 left-1/2 z-[999999999] mb-4"
        >
          <div className="p-4">
            <div className="relative flex flex-col min-[825px]:flex-row items-center justify-between mb-4">
              {isMobile && (
                <button type="button" onClick={() => setIsOpen(false)}>
                  <X size={20} className="absolute top-0 right-0" />
                </button>
              )}
              <h2 className="text-lg font-semibold text-gray-900">Notificações</h2>
              {notifications &&
                notifications.length > 0 &&
                (loadingReadAllNotifications ? (
                  <div className="mr-8">
                    <Loader size="sm" />
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => readAllNotifications()}
                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    Marcar todas como lida
                  </button>
                ))}
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto notifications-list">
              {notifications && notifications.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Você não possui nenhuma notificação</p>
              ) : (
                notifications?.map((notification) => (
                  <Link
                    to={`${appBaseUrl}/adocoes/${notification.alertId}`}
                    key={notification.id}
                    className="inline-block"
                  >
                    <button
                      type="button"
                      onClick={() => readSingleNotificationAsync(notification.id)}
                      className={`w-full p-3 rounded-lg transition-colors text-left
                        ${notification.hasBeenRead ? "bg-gray-50" : "bg-blue-50"}`}
                    >
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0">
                            <Image
                              src={notification.adoptionImageUrl}
                              alt="Animal disponível para adoção"
                              className="w-12 h-12 min-[825px]:w-16 min-[825px]:h-16 rounded-lg object-cover"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <p className="text-sm font-bold text-gray-900">Nova adoção</p>
                              {!notification.hasBeenRead && (
                                <div className="ml-3 flex-shrink-0">
                                  <div className="w-2 h-2 bg-blue-600 rounded-full" />
                                </div>
                              )}
                            </div>
                            <Text className="text-sm text-gray-500 mt-1">
                              Uma nova adoção compatível com suas preferências acaba de ser cadastrada! 🐾
                            </Text>
                          </div>
                        </div>

                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs text-gray-400">{formatISODate(notification.createdAt)}</span>
                          <span className="text-xs font-medium text-blue-600 hover:text-blue-700">Ver detalhes →</span>
                        </div>
                      </div>
                    </button>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
