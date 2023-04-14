import { Navbar, Center, Stack, } from '@mantine/core';


import {
  IconUserCircle,
  IconMessages,
  IconAddressBook,
  IconPhoneCall,
  IconBookmark,
  IconSettings,
  IconLogout,
  IconMessageCircle,
} from '@tabler/icons-react';
import { NavbarLink } from './NavbarLink';
import { useRouter } from 'next/router';

const linksData = [
  { icon: IconUserCircle, label: 'Profile', route: "/profile" },
  { icon: IconMessages, label: 'Chats', route: "/chats" },
  { icon: IconAddressBook, label: 'Contacts', route: "/contacts" },
  { icon: IconPhoneCall, label: 'Calls', route: "/calls" },
  { icon: IconBookmark, label: 'Bookmark', route: "/bookmark" },
  { icon: IconSettings, label: 'Settings', route: "/settings" },
];

export function NavbarComponent() {
  const router = useRouter();
  console.log(router.pathname)
  const links = linksData.map((link, _index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={router.pathname === link.route}
      onClick={() => {
        router.push(link.route);
      }}
    />
  ));

  return <Navbar height={"100vh"} width={{ base: 80 }} p="md">
    <Center>
      <IconMessageCircle size="2.3rem" stroke={1.5} />
    </Center>
    <Navbar.Section grow mt={50}>
      <Stack justify="center" spacing={0}>
        {links}
      </Stack>
    </Navbar.Section>
    <Navbar.Section>
      <Stack justify="center" spacing={0}>
        <NavbarLink icon={IconLogout} label="Logout" />
      </Stack>
    </Navbar.Section>
  </Navbar>
}