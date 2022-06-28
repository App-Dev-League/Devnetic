import {
    Container,
    SimpleGrid,
    Image,
    Flex,
    Heading,
    Text,
    Stack,
    StackDivider,
    Icon,
    useColorModeValue,
    Box,
} from '@chakra-ui/react';
import {
    IoAnalyticsSharp,
    IoLogoBitcoin,
    IoSearchSharp,
} from 'react-icons/io5';
import { ReactElement } from 'react';
import Carousel from "./Carousel"

const Feature = ({ text, icon, iconBg }) => {
    return (
        <Stack direction={'row'} align={'center'}>
            <Flex
                w={8}
                h={8}
                align={'center'}
                justify={'center'}
                rounded={'full'}
                bg={iconBg}>
                {icon}
            </Flex>
            <Text fontWeight={600}>{text}</Text>
        </Stack>
    );
};

export default function SplitWithImage() {
    return (
        <Container maxW={'5xl'} py={12}>
            <Stack spacing="4">
            <Text
                textTransform={'uppercase'}
                color={'blue.400'}
                fontWeight={600}
                fontSize={'sm'}
                bg={useColorModeValue('blue.50', 'blue.900')}
                p={2}
                alignSelf={'flex-start'}
                rounded={'md'}
                style={{ width: "fit-content" }}>
                For Educators
            </Text>
            <Heading>Rich, accessible curriculum slides</Heading>
            <Text color={'gray.500'} fontSize={'lg'}>
                Devnetic was built to improve the experience for educators, in addition to students. Educators have a variety of slides and projects to utilize in their teaching. With Devnetic, teachers can view and track their students' progress over time through the Devnetic dashboard. Devnetic has numerous features that enhance student-teacher interaction.
            </Text>
            <Carousel cards={[
                {
                    title: "",
                    text: "",
                    image: "/images/educator-1.png"
                },
                {
                    title: "a",
                    text: "a",
                    image: "/images/educator-2.png"
                },
                {
                    title: "a",
                    text: "a",
                    image: "/images/educator-3.png"
                }
            ]} />
            </Stack>
        </Container>
    );
}