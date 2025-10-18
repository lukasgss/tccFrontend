import { Button, Group, Image, Text, Title, Tooltip, UnstyledButton, rem, useMantineTheme } from "@mantine/core";
import { Dropzone, FileWithPath, MIME_TYPES } from "@mantine/dropzone";
import { File, XCircle } from "@phosphor-icons/react";
import { IconCloudUpload, IconDownload, IconX } from "@tabler/icons-react";
import { useRef, useState } from "react";
import { Control, Controller, FieldError, Merge, UseFormSetValue } from "react-hook-form";

import { bytesFormatter } from "../../../../utils/formatters";
import AttachmentFile from "../../File/AttachmentFile";
import classes from "./InputDropzone.module.css";

interface InputDropzoneProps {
  control: Control<any>;
  inputName: string;
  existingFilesInputName?: string;
  existingFileName?: string;
  label: string;
  error?: Merge<FieldError, (FieldError | undefined)[]> | undefined;
  title: string;
  description: string;
  existingFiles?: string[];
  multiFile: boolean;
  required?: boolean;
  maxSize?: number;
  isImage: boolean;
  setExistingFilesValue?: (value: string | undefined) => void;
  setValue: UseFormSetValue<any>;
}

export default function InputDropzone({
  control,
  inputName,
  existingFilesInputName,
  existingFileName,
  label,
  error,
  multiFile,
  title,
  description,
  existingFiles,
  required = false,
  maxSize = 30 * 1024 ** 2,
  isImage,
  setExistingFilesValue,
  setValue,
}: Readonly<InputDropzoneProps>) {
  const [files, setFiles] = useState<FileWithPath | FileWithPath[]>([]);
  const [invalidError, setInvalidError] = useState(false);
  const [alreadyExistingFiles, setAlreadyExistingFiles] = useState(existingFiles);

  const theme = useMantineTheme();
  const openRef = useRef<() => void>(null);

  const isImageValidToInsert = (image: FileWithPath) => {
    const compareFiles = (file: FileWithPath, imageToCompare: FileWithPath): boolean => {
      return (
        file.path === imageToCompare.path &&
        file.lastModified === imageToCompare.lastModified &&
        file.name === imageToCompare.name &&
        file.size === imageToCompare.size &&
        file.type === imageToCompare.type
      );
    };

    if (Array.isArray(files)) {
      return !files.some((file) => compareFiles(file, image));
    }

    return !compareFiles(files, image);
  };

  const removeAddedFile = (imageName: string) => {
    if (Array.isArray(files)) {
      const imagesWithImageRemoved = files.filter((image) => image.name !== imageName);
      setFiles(imagesWithImageRemoved);
      if (imagesWithImageRemoved.length === 0) {
        setValue(inputName, null);
      } else {
        setValue(inputName, imagesWithImageRemoved);
      }
    } else {
      setFiles([]);
      setValue(inputName, null);
    }
  };

  const removeExistingFile = (imageUrl: string) => {
    if (multiFile) {
      const imagesWithImageRemoved = alreadyExistingFiles?.filter((image) => image !== imageUrl);
      setAlreadyExistingFiles(imagesWithImageRemoved);

      if (existingFilesInputName) {
        setValue(existingFilesInputName, imagesWithImageRemoved);
      }
    } else {
      setAlreadyExistingFiles(undefined);
      if (existingFilesInputName) {
        setValue(existingFilesInputName, undefined);
      }
    }
  };

  return (
    <div className={classes.wrapper}>
      <div className="flex items-center gap-1.5">
        <Title order={4}>{label}</Title>
        {required && (
          <Title c="red" size="xl">
            *
          </Title>
        )}
      </div>
      <Controller
        control={control}
        name={inputName}
        render={({ field: { onChange } }) => (
          <Dropzone
            openRef={openRef}
            onDrop={(e) => {
              if (!isImageValidToInsert(e[0])) {
                setInvalidError(true);
                return;
              }
              if (multiFile) {
                const newFiles = [...(files as FileWithPath[]), ...e];
                onChange(newFiles);
                setFiles(newFiles);
              } else {
                onChange(e[0]);
                setFiles(e);
                if (existingFilesInputName) {
                  setValue(existingFilesInputName, undefined);
                  setExistingFilesValue?.(undefined);
                }
              }
              setInvalidError(false);
            }}
            className={`${classes.dropzone} ${error ? "border border-[var(--mantine-color-error)]" : ""}`}
            radius="md"
            accept={
              isImage
                ? [MIME_TYPES.jpeg, MIME_TYPES.png, MIME_TYPES.webp]
                : [MIME_TYPES.pdf, MIME_TYPES.docx, MIME_TYPES.doc, MIME_TYPES.xlsx, MIME_TYPES.xls]
            }
            maxSize={maxSize}
          >
            <div style={{ pointerEvents: "none" }}>
              <Group justify="center">
                <Dropzone.Accept>
                  <IconDownload
                    style={{ width: rem(50), height: rem(50) }}
                    color={theme.colors["brand-blue"][6]}
                    stroke={1.5}
                  />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <IconX style={{ width: rem(50), height: rem(50) }} color={theme.colors.red[6]} stroke={1.5} />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <IconCloudUpload
                    style={{ width: rem(50), height: rem(50) }}
                    stroke={1.5}
                    color={error ? theme.colors.red[6] : theme.colors["brand-blue"][6]}
                  />
                </Dropzone.Idle>
              </Group>

              <Text ta="center" fw={700} fz="lg" mt="xl">
                <Dropzone.Accept>Solte os arquivos aqui</Dropzone.Accept>
                <Dropzone.Reject>Arquivo não suportado!</Dropzone.Reject>
                <Dropzone.Idle>
                  <span className={error ? "text-[var(--mantine-color-error)]" : ""}>{title}</span>
                </Dropzone.Idle>
              </Text>
              <Text ta="center" fz="sm" mt="xs" c="dimmed">
                {description}
              </Text>
            </div>
          </Dropzone>
        )}
      />
      {error && <Text c="red">{error.message as string}</Text>}

      {invalidError && (
        <Text size="lg" c="red" className="text-center">
          {isImage ? "Essa imagem já foi inserida." : "Esse arquivo já foi inserido."}
        </Text>
      )}
      <div className="flex justify-center mt-4">
        <Button className={classes.control} size="md" radius="xl" onClick={() => openRef.current?.()}>
          Adicionar arquivo
        </Button>
      </div>

      <div className="flex flex-wrap gap-x-8 gap-y-0 mt-14">
        {alreadyExistingFiles?.map((file) => (
          <div className={`relative ${isImage ? "w-[300px] h-[300px]" : ""} object-cover mb-6`} key={file}>
            <UnstyledButton className="absolute top-1 right-1 z-10" onClick={() => removeExistingFile(file)}>
              <Tooltip label={isImage ? "Remover imagem" : "Remover arquivo"}>
                <XCircle size={24} className="text-[var(--mantine-color-error)] bg-zinc-100 rounded-full" />
              </Tooltip>
            </UnstyledButton>
            {isImage ? (
              <Image
                src={file}
                draggable={false}
                className="rounded border-2 border-zinc-200 h-full w-full object-cover"
              />
            ) : (
              <AttachmentFile file={file} fileName={existingFileName} />
            )}
          </div>
        ))}

        {Array.isArray(files) ? (
          files.map((file, idx) => {
            const fileUrl = URL.createObjectURL(file);
            return (
              <div
                className={`relative flex items-center object-cover mb-6 ${
                  isImage
                    ? "w-[300px] h-[300px]"
                    : "h-28 w-72 shadow-[0px_2px_1px_-1px_rgba(0,0,0,0.2),0px_1px_1px_0px_rgba(0,0,0,0.14),0px_1px_3px_0px_rgba(0,0,0,0.12)] rounded"
                }`}
                // eslint-disable-next-line react/no-array-index-key
                key={`${file.name}-${idx}`}
              >
                <UnstyledButton className="absolute top-1 right-1">
                  <Tooltip label={isImage ? "Remover imagem" : "Remover arquivo"}>
                    <XCircle
                      size={24}
                      onClick={() => removeAddedFile(file.name)}
                      className="text-[var(--mantine-color-error)] bg-zinc-100 rounded-full"
                    />
                  </Tooltip>
                </UnstyledButton>
                {isImage ? (
                  <Image
                    src={fileUrl}
                    onLoad={() => URL.revokeObjectURL(fileUrl)}
                    draggable={false}
                    className="rounded border-2 border-zinc-200 h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex items-center gap-3 px-2 truncate">
                    <div
                      className="flex items-center justify-center min-h-[90px] min-w-[90px] 
                    bg-[#f3f5f7] border-[#CFD2D4] border"
                    >
                      <div className="flex flex-col items-center">
                        <File size={38} />
                        <Text size="sm" className="opacity-80">
                          {file.name.split(".").pop()}
                        </Text>
                      </div>
                    </div>
                    <div className="flex flex-col truncate">
                      <Tooltip label={file.name}>
                        <Text className="truncate">{file.name}</Text>
                      </Tooltip>
                      <Text size="sm" className="opacity-70">
                        {bytesFormatter(file.size)}
                      </Text>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div
            className={`relative flex items-center object-cover mb-6 ${
              isImage
                ? "w-[300px] h-[300px]"
                : "h-28 w-72 shadow-[0px_2px_1px_-1px_rgba(0,0,0,0.2),0px_1px_1px_0px_rgba(0,0,0,0.14),0px_1px_3px_0px_rgba(0,0,0,0.12)] rounded"
            }`}
            key={files.name}
          >
            <UnstyledButton className="absolute top-1 right-1">
              <Tooltip label={isImage ? "Remover imagem" : "Remover arquivo"}>
                <XCircle
                  size={24}
                  onClick={() => removeAddedFile(files.name)}
                  className="text-[var(--mantine-color-error)] bg-zinc-100 rounded-full"
                />
              </Tooltip>
            </UnstyledButton>
            {isImage ? (
              <Image
                src={URL.createObjectURL(files)}
                onLoad={() => URL.revokeObjectURL(URL.createObjectURL(files))}
                draggable={false}
                className="rounded border-2 border-zinc-200 h-full w-full object-cover"
              />
            ) : (
              <div className="flex items-center gap-3 px-2 truncate">
                <div
                  className="flex items-center justify-center min-h-[90px] min-w-[90px] 
                    bg-[#f3f5f7] border-[#CFD2D4] border"
                >
                  <div className="flex flex-col items-center">
                    <File size={38} />
                    <Text size="sm" className="opacity-80">
                      {files.name.split(".").pop()}
                    </Text>
                  </div>
                </div>
                <div className="flex flex-col truncate">
                  <Tooltip label={files.name}>
                    <Text className="truncate">{files.name}</Text>
                  </Tooltip>
                  <Text size="sm" className="opacity-70">
                    {bytesFormatter(files.size)}
                  </Text>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
