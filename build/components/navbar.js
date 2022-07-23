import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Avatar,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';


import Image from "next/image"

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box className='navbar-container'>
      <div className='transition-cover'></div>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        align={'center'}>
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>


        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }} style={{ alignItems: "center" }}>

          <a style={{ background: "none", display: "inline-flex", cursor: "pointer", textAlign: useBreakpointValue({ base: 'center', md: 'left' }) }} href="/">
            <Image
              alt="Devnetic"
              src="/images/devnetic-logo.png"
              width="43px"
              height="43px"
            />
          </a>

          <Text
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            color={useColorModeValue('gray.800', 'white')}>
          </Text>
          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>

          <a href="/app" onClick={(e) => {
            e.preventDefault()
            if (!localStorage.getItem("theme") || localStorage.getItem("theme") === "dark") document.body.classList.add("transitioning-to-devnetic-app")
            else {
              document.body.classList.add("transitioning-to-devnetic-app-light");
              document.body.classList.add("transitioning-to-devnetic-app")
            }
            setTimeout(function () {
              window.location.href = "/app/index.html"
            }, 800)
          }}>
            <Button
              className='open-devnetic-header-btn'
              fontSize={'sm'}
              fontWeight={600}
              color={'white'}
              bg={'blue.400'}
              _hover={{
                bg: 'blue.500',
              }}>
              Open App
            </Button>
          </a >
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? '#'}
                fontSize={'sm'}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}>
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}>
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Link
      href={href}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('blue.50', 'gray.900') }}>
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'blue.400' }}
            fontWeight={500}>
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}>
          <Icon color={'blue.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}>
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}>
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};


const NAV_ITEMS = [
  {
    label: <span>Sections<Icon
      as={ChevronDownIcon}
      transition={'all .25s ease-in-out'}
      w={6}
      h={6}
    /></span>,
    children: [
      {
        label: "Web Development",
        subLabel: "Learn technologies like Express.JS and React!",
        href: "/app/index.html#/track/webdev/"
      },
      {
        label: "Web Dev Projects",
        subLabel: "Put your skills to use with our interactive IDE!",
        href: "/app/index.html#/track/webdev-projects/"
      },
      {
        label: "Artificial Intelligence",
        subLabel: "Learn tree AI, regression, SVG, and much more!",
        href: "/app/index.html#/track/ai/"
      },
      {
        label: "Intro to CS",
        subLabel: "Learn to solve USACO problems with Python!",
        href: "/app/index.html#/track/intro-to-cs/"
      }
    ]
  },
  {
    label: 'App Dev League',
    href: "https://appdevleague.org/#"
  },
  {
    label: <span>Open Source<Icon
      as={ChevronDownIcon}
      transition={'all .25s ease-in-out'}
      w={6}
      h={6}
    /></span>,
    children: [
      {
        label: 'Github',
        subLabel: 'View all our code on Github',
        href: 'https://github.com/App-Dev-League/Devnetic',
      },
      {
        label: 'Contribute',
        subLabel: 'Help us squash bugs or create new features',
        href: 'https://github.com/App-Dev-League/Devnetic/issues',
      },
    ],
  },
  {
    label: 'Download',
    href: 'https://github.com/App-Dev-League/Devnetic/releases',
  },
  {
    label: 'Contact',
    href: 'https://appdevleague.org/contact',
  },
];