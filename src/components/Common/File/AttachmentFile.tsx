import { Text, Tooltip } from "@mantine/core";
import { File } from "@phosphor-icons/react";

interface NonImageFileProps {
  file: string;
  fileName?: string;
  navigateWhenClicked?: boolean;
}

export default function AttachmentFile({ file, fileName, navigateWhenClicked = false }: Readonly<NonImageFileProps>) {
  const handleOpenInNewTab = () => {
    if (navigateWhenClicked && fileName) {
      window.open(file, "_blank", "noopener,noreferrer");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (navigateWhenClicked && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      handleOpenInNewTab();
    }
  };

  const renderComponent = () => {
    const renderFileName = () => {
      return navigateWhenClicked ? (
        <div className="flex flex-col truncate">
          <Text className="truncate">{fileName}</Text>
        </div>
      ) : (
        <div className="flex flex-col truncate">
          <Tooltip label={fileName}>
            <Text className="truncate">{fileName}</Text>
          </Tooltip>
        </div>
      );
    };

    return (
      <div
        className={`relative flex items-center object-cover mb-6
        h-28 w-72 shadow-[0px_2px_1px_-1px_rgba(0,0,0,0.2),0px_1px_1px_0px_rgba(0,0,0,0.14),0px_1px_3px_0px_rgba(0,0,0,0.12)] rounded
        ${navigateWhenClicked ? "cursor-pointer hover:bg-gray-100" : ""}`}
        onClick={handleOpenInNewTab}
        onKeyDown={handleKeyDown}
        role={navigateWhenClicked ? "button" : undefined}
        tabIndex={navigateWhenClicked ? 0 : undefined}
      >
        <div className="flex items-center gap-3 px-2 truncate">
          <div
            className="flex items-center justify-center min-h-[90px] min-w-[90px]
            bg-[#f3f5f7] border-[#CFD2D4] border"
          >
            <div className="flex flex-col items-center">
              <File size={38} />
              <Text size="sm" className="opacity-80">
                {file.split(".").pop()}
              </Text>
            </div>
          </div>
          {renderFileName()}
        </div>
      </div>
    );
  };

  return navigateWhenClicked ? (
    <Tooltip label="Clique para abrir em nova aba">{renderComponent()}</Tooltip>
  ) : (
    renderComponent()
  );
}
