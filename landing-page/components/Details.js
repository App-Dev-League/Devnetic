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
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    Box,
    AccordionPanel
} from '@chakra-ui/react';

import { ReactElement } from 'react';
import { GiArtificialHive } from 'react-icons/gi';
import { HiCode, HiDesktopComputer } from 'react-icons/hi';


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

export default function Details() {
    return (
        <Container maxW={'5xl'} py={12} id="details">
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <Stack spacing={4}>
                    <Text
                        textTransform={'uppercase'}
                        color={'blue.400'}
                        fontWeight={600}
                        fontSize={'sm'}
                        bg={useColorModeValue('blue.50', 'blue.900')}
                        p={2}
                        alignSelf={'flex-start'}
                        rounded={'md'}>
                        For Students
                    </Text>
                    <Heading>A fun, easy to use learning app</Heading>
                    <Text color={'gray.500'} fontSize={'lg'}>
                        Students will be able to freely learn computer science through an interactive, gamified teaching app. A combination of engaging, easy to understand slides and questions in lessons provide an enriching approach to learning
                    </Text>
                    <Accordion allowToggle>
                        <AccordionItem>
                            <h2>
                                <AccordionButton>
                                    <Box flex='1' textAlign='left'>
                                        <Feature
                                            icon={
                                                <Icon as={GiArtificialHive} color={'yellow.500'} w={5} h={5} />
                                            }
                                            iconBg={useColorModeValue('yellow.100', 'yellow.900')}
                                            text={'Artifical Intelligence'}
                                        />
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                            Students will be skilled in topics such as tree AI, regression, SVM, neural networks, computer vision, NLP, and unsupervised learning. Python is primarily used.
                            </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem>
                            <h2>
                                <AccordionButton>
                                    <Box flex='1' textAlign='left'>
                                        <Feature
                                            icon={<Icon as={HiDesktopComputer} color={'green.500'} w={5} h={5} />}
                                            iconBg={useColorModeValue('green.100', 'green.900')}
                                            text={'Computer Science'}
                                        />
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                            Students will be able to demonstrate loops, functions, classes, and more in their Python code. They will be able to solve USACO-style problems with these tools.
                            </AccordionPanel>
                        </AccordionItem>
                        <AccordionItem>
                            <h2>
                                <AccordionButton>
                                    <Box flex='1' textAlign='left'>
                                        <Feature
                                            icon={
                                                <Icon as={HiCode} color={'purple.500'} w={5} h={5} />
                                            }
                                            iconBg={useColorModeValue('purple.100', 'purple.900')}
                                            text={'Web Development'}
                                        />
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                            By the end of the course, students will be very familiar with languages HTML, CSS, JavaScript, Node.js, and have a strong understanding of technologies like Express, JSX, and React.
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                </Stack>
                <Flex>
                    <Image
                        rounded={'md'}
                        alt={'feature image'}
                        src={
                            '/images/details-photo1.jpg'
                        }
                        objectFit={'cover'}
                    />
                </Flex>
            </SimpleGrid>
        </Container>
    );
}