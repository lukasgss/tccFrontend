import { Image } from "@mantine/core";
import { UserMessageResponse } from "../../../services/requests/UserMessages/types";
import { formatToHoursAndMinutes } from "../../../utils/dates";

interface OwnerMessageProps {
  message: UserMessageResponse;
  idx: number;
  shouldShowMessageDate: (message: UserMessageResponse, idx: number) => boolean;
  isFirstMessageOfUser: boolean;
}

export default function OwnerMessage({
  message,
  idx,
  isFirstMessageOfUser,
  shouldShowMessageDate,
}: Readonly<OwnerMessageProps>) {
  return (
    <div className="flex gap-2.5 justify-end">
      <div>
        <div className="grid mb-2">
          {isFirstMessageOfUser ? (
            <div className="message" data-date={message.timeStampUtc}>
              <h5 className="text-right text-gray-900 text-sm font-semibold leading-snug pb-1">Você</h5>

              <div className="px-3 py-2 bg-indigo-600 rounded">
                <h2 className="text-white text-sm font-normal leading-snug">{message.content}</h2>
              </div>

              {shouldShowMessageDate(message, idx) ? (
                <div className="justify-end items-center inline-flex mb-1">
                  <h6 className="text-gray-500 text-xs font-normal leading-4 py-1">
                    {formatToHoursAndMinutes(message.timeStampUtc)}
                  </h6>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="justify-center message" data-date={message.timeStampUtc}>
              <div className="grid w-fit ml-auto">
                <div className="px-3 py-2 bg-indigo-600 rounded ">
                  <h2 className="text-white text-sm font-normal leading-snug">{message.content}</h2>
                </div>

                {shouldShowMessageDate(message, idx) ? (
                  <div className="justify-end items-center inline-flex mb-1">
                    <h6 className="text-gray-500 text-xs font-normal leading-4 py-1">
                      {formatToHoursAndMinutes(message.timeStampUtc)}
                    </h6>
                  </div>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </div>
      <Image src={message.sender.image} alt="Imagem de perfil do usuário" className="w-10 h-11" />
    </div>
  );
}
