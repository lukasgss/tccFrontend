import { Group, PasswordInput, Text } from "@mantine/core";
import { FieldError, UseFormRegister } from "react-hook-form";
import { Link } from "react-router-dom";

type InputPasswordProps = {
  name: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  required: boolean;
  label: string;
  placeholder: string;
  showForgotPassword?: boolean;
};

export default function InputPassword({
  register,
  name,
  error,
  required,
  label,
  placeholder,
  showForgotPassword,
}: InputPasswordProps) {
  return (
    <div>
      {showForgotPassword && (
        <Group justify="space-between">
          <Text component="label" htmlFor={name} size="sm" fw={500}>
            {label}
          </Text>

          <Link to="/esqueci-senha" className="hover:underline text-[var(--mantine-color-dimmed)]">
            <Text pt={2} fw={500} fz="sm" c="dimmed">
              Esqueceu sua senha?
            </Text>
          </Link>
        </Group>
      )}

      <PasswordInput
        {...register(name)}
        error={error ? error.message : null}
        required={required}
        label={showForgotPassword ? undefined : label}
        placeholder={placeholder}
        radius="md"
      />
    </div>
  );
}
