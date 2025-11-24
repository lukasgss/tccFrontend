import { Box, Burger, Button, Divider, Drawer, Group, rem, useMantineTheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEyeX, IconHome, IconRadar, IconZoomExclamation } from "@tabler/icons-react";
import { useContext } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logoImage from "../../../assets/images/ache-meu-pet-logo.webp";
import DrawerTitle from "../components/DrawerTitle";
import MobileNavButton from "../components/MobileNavButton";
import UserData from "../components/UserData";

import { AuthContext } from "../../../contexts/AuthContext";
import useAdoptionNotificationsQuery from "../../../queries/useAdoptionNotificationsQuery";
import AlertNotifications from "../components/AlertNotifications";
import classes from "./header.module.css";

interface HeaderProps {
  showRegistrationButtons?: boolean;
}

const links = [
  {
    icon: <IconHome style={{ width: rem(20), height: rem(20), marginBottom: "3px" }} />,
    title: "Início",
    route: "/",
  },
  {
    icon: <IconZoomExclamation style={{ width: rem(20), height: rem(20), marginBottom: "3px" }} />,
    title: "Adoção",
    route: "/adocoes",
  },
  {
    icon: <IconEyeX style={{ width: rem(20), height: rem(20), marginBottom: "3px" }} />,
    title: "Perdidos",
    route: "/perdidos",
  },
  {
    icon: <IconRadar style={{ width: rem(20), height: rem(20), marginBottom: "3px" }} />,
    title: "Encontrados",
    route: "/encontrados",
  },
];

export default function Header({ showRegistrationButtons = true }: Readonly<HeaderProps>) {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const theme = useMantineTheme();
  const location = useLocation();

  const { isAuthenticated } = useContext(AuthContext);

  const { data: notifications, refetch: refetchNotifications } = useAdoptionNotificationsQuery(isAuthenticated);

  return (
    <Box className="sticky top-0 z-[999]">
      <header className={`${classes.header} shadow border-b-1 bg-white`}>
        <Group justify="space-between" h="100%" px="md" className="py-3 md:pt-0">
          <Link to="/">
            <img src={logoImage} alt="Logo AcheMeuPet" className="w-28" />
          </Link>
          <div className="h-full gap-7 hidden min-[822px]:flex text-base">
            {links.map((link) => (
              <NavLink
                to={link.route}
                key={link.route}
                className={`${classes.link}`}
                style={({ isActive }) => ({
                  color: isActive ? theme.colors["brand-blue"][6] : "",
                  textDecoration: isActive ? "underline" : "",
                })}
              >
                {link.title}
              </NavLink>
            ))}
          </div>

          {isAuthenticated && (
            <div className="hidden min-[822px]:flex gap-3">
              <AlertNotifications notifications={notifications} refetchNotifications={refetchNotifications} />
              <UserData />
            </div>
          )}

          {!isAuthenticated && showRegistrationButtons && (
            <div className="hidden min-[822px]:block">
              <div className="flex gap-3">
                <Link to="/login" className="w-full">
                  <Button variant="outline" color="brand-orange" fullWidth className="max-w-none w-full">
                    Login
                  </Button>
                </Link>
                <Link to="/registrar" className="w-full">
                  <Button variant="filled" color="brand-orange" fullWidth className="max-w-none w-full">
                    Cadastrar
                  </Button>
                </Link>
              </div>
            </div>
          )}

          <Burger
            className="min-[822px]:hidden"
            opened={drawerOpened}
            onClick={toggleDrawer}
            aria-label="Alternar navegação"
            color={theme.colors.gray[7]}
          />
        </Group>
      </header>

      <Drawer
        position="right"
        opened={drawerOpened}
        onClose={closeDrawer}
        size="xs"
        title={<DrawerTitle />}
        padding="md"
        zIndex={1000}
      >
        {isAuthenticated ? (
          <>
            <Divider my="lg" />
            <div>
              <UserData />
            </div>
            <Divider my="md" />
            <AlertNotifications notifications={notifications} refetchNotifications={refetchNotifications} />
            <Divider my="md" />
          </>
        ) : (
          <Divider my="sm" />
        )}

        <div className="flex flex-col gap-3">
          {links.map((link) => (
            <MobileNavButton
              route={link.route}
              key={link.route}
              Icon={link.icon}
              isCurrentLocation={location.pathname === link.route}
            >
              {link.title}
            </MobileNavButton>
          ))}
        </div>

        <Divider my="md" />

        {!isAuthenticated && showRegistrationButtons && (
          <Group justify="center" pb="xl" px="md">
            <Link to="/login" className="w-full">
              <Button variant="default" fullWidth className="max-w-none w-full">
                Login
              </Button>
            </Link>
            <Link to="/registrar" className="w-full">
              <Button variant="default" fullWidth className="max-w-none">
                Cadastrar
              </Button>
            </Link>
          </Group>
        )}
      </Drawer>
    </Box>
  );
}
