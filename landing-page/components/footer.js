import { ReactNode } from 'react';
import {
    Box,
    Container,
    Stack,
    SimpleGrid,
    Text,
    Link,
    VisuallyHidden,
    chakra,
    useColorModeValue,
} from '@chakra-ui/react';
import Image from "next/image"
import { FaFacebook, FaYoutube, FaInstagram, FaLinkedin, FaDiscord } from 'react-icons/fa';

import AppStoreBadge from './AppStoreBadge';
import PlayStoreBadge from './PlayStoreBadge';
import WindowsBadge from './WindowsBadge';

const ListHeader = ({ children }) => {
    return (
        <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
            {children}
        </Text>
    );
};

const SocialButton = ({
    children,
    label,
    href,
    target
}) => {
    return (
        <chakra.button
            bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
            rounded={'full'}
            w={8}
            h={8}
            cursor={'pointer'}
            as={'a'}
            href={href}
            target={target}
            display={'inline-flex'}
            alignItems={'center'}
            justifyContent={'center'}
            transition={'background 0.3s ease'}
            _hover={{
                bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
            }}>
            <VisuallyHidden>{label}</VisuallyHidden>
            {children}
        </chakra.button>
    );
};

export default function LargeWithAppLinksAndSocial() {
    return (
        <Box
            bg={useColorModeValue('gray.50', 'gray.900')}
            color={useColorModeValue('gray.700', 'gray.200')}>
            <Container as={Stack} maxW={'6xl'} py={10}>
                <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
                    <Stack spacing={6}>
                        <Box>
                            <Image
                                alt="ADL Logo"
                                src="/images/adl-logo.png"
                                width="100px"
                                height="100px"
                            />
                        </Box>
                        <Text fontSize={'sm'}>
                            Created with ❤️ by the ADL development team
                        </Text>
                    </Stack>

                    <Stack align={'flex-start'}>
                        <ListHeader>Company</ListHeader>
                        <Link href={'https://appdevleague.org/about'}>About Us</Link>
                        <Link href={'https://medium.com/@appdevleague'}>Blog</Link>
                        <Link href={'https://appdevleague.org/get-involved'}>Get Involved</Link>
                        <Link href={'https://appdevleague.org/contact'}>Contact Us</Link>
                    </Stack>

                    <Stack align={'flex-start'}>
                        <ListHeader>Support</ListHeader>
                        <Link href={'https://github.com/App-Dev-League/Devnetic/issues'} target="_blank">Issue reporting</Link>
                        <Link href={'https://github.com/App-Dev-League/Devnetic/discussions'} target="_blank">Forums</Link>
                        <Link href={'https://github.com/App-Dev-League/Devnetic/blob/main/LICENSE'} target="_blank">Usage License</Link>
                    </Stack>


                    <Stack align={'flex-start'}>
                        <ListHeader>Install App</ListHeader>
                        <AppStoreBadge />
                        <PlayStoreBadge />
                        <WindowsBadge/>
                    </Stack>
                </SimpleGrid>
            </Container>

            <Box
                borderTopWidth={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.700')}>
                <Container
                    as={Stack}
                    maxW={'6xl'}
                    py={4}
                    direction={{ base: 'column', md: 'row' }}
                    spacing={4}
                    justify={{ md: 'space-between' }}
                    align={{ md: 'center' }}>
                    <Text>Copyright © 2019-2022 by App Dev League, Inc.</Text>
                    <Stack direction={'row'} spacing={6}>
                        <SocialButton label={'Facebook'} href={'https://www.facebook.com/appdev.league'} target="_blank">
                            <FaFacebook />
                        </SocialButton>
                        <SocialButton label={'YouTube'} href={'https://www.youtube.com/channel/UCxhMD8Fvm5LP6QzdrYnFixA'} target="_blank">
                            <FaYoutube />
                        </SocialButton>
                        <SocialButton label={'Instagram'} href={'https://www.instagram.com/appdevleague/'} target="_blank">
                            <FaInstagram />
                        </SocialButton>
                        <SocialButton label={'Linkedin'} href={'https://www.linkedin.com/company/appdevleague/'} target="_blank">
                            <FaLinkedin />
                        </SocialButton>
                        <SocialButton label={'Discord'} href={'https://discord.gg/FtegFYAuZ6'} target="_blank">
                            <FaDiscord />
                        </SocialButton>
                    </Stack>
                </Container>
            </Box>
        </Box>
    );
}