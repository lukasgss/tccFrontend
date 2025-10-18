import { Avatar, Group, Menu, Text, UnstyledButton, rem, useMantineTheme } from "@mantine/core";
import { HeartStraight } from "@phosphor-icons/react";
import { IconChevronDown, IconLogout, IconPaw, IconUser } from "@tabler/icons-react";
import cx from "clsx";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import classes from "../Header/header.module.css";

export default function UserData() {
  const navigate = useNavigate();

  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const theme = useMantineTheme();
  const { userData, handleLogout } = useContext(AuthContext);

  const userNames = userData!.fullName.split(" ");
  let formattedUserFullName: string;
  if (userNames.length > 1) {
    const [firstName, lastName] = userNames;
    formattedUserFullName = `${firstName} ${lastName}`;
  } else {
    formattedUserFullName = userNames.join();
  }

  return (
    <Menu
      width={260}
      position="bottom-end"
      transitionProps={{ transition: "pop-top-right" }}
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
      zIndex={2000000}
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton className={`${cx(classes.user, { [classes.userActive]: userMenuOpened }, classes.userButton)}`}>
          <Group gap={7}>
            <Avatar src={userData?.image} alt={userData?.image} radius="xl" size={22} />
            <Text fw={500} className="text-[15px]" lh={1} mr={3}>
              {formattedUserFullName}
            </Text>
            <IconChevronDown style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown className={classes.menuDropdown}>
        <Menu.Item
          leftSection={
            <IconUser style={{ width: rem(16), height: rem(16) }} color={theme.colors["brand-blue"][6]} stroke={1.5} />
          }
          onClick={() => navigate("/minha-conta")}
          className="hover:bg-[var(--mantine-color-gray-2)]"
        >
          Minha conta
        </Menu.Item>
        <Menu.Item
          leftSection={
            <HeartStraight style={{ width: rem(16), height: rem(16) }} weight="duotone" color={theme.colors.red[6]} />
          }
          onClick={() => navigate("/alertas-salvos")}
          className="hover:bg-[var(--mantine-color-gray-2)]"
        >
          Meus alertas salvos
        </Menu.Item>
        <Menu.Item
          leftSection={<IconPaw style={{ width: rem(16), height: rem(16) }} color="#431407" stroke={1.5} />}
          onClick={() => navigate("/meus-alertas")}
          className="hover:bg-[var(--mantine-color-gray-2)]"
        >
          Meus alertas
        </Menu.Item>

        <Menu.Item
          leftSection={<IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
          className="hover:bg-[var(--mantine-color-gray-2)]"
          onClick={handleLogout}
        >
          Sair
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
