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
    IconButton
} from '@chakra-ui/react';
import { ReactElement } from 'react';



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

export default function SplitWithImage(props) {
    if (props.inverted) {
        return (
            <Container maxW={'8xl'} py={12}>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                    <Flex>
                        <Image
                            rounded={'md'}
                            alt={'feature image'}
                            src={props.image}
                            objectFit={'cover'}
                        />
                    </Flex>
                    <Stack spacing={4}>
                        <IconButton backgroundColor={"blue.400"} size="lg" style={{ width: "fit-content", pointerEvents: "none" }}>
                            <Icon as={props.icon} color={'white'} w={5} h={5} />
                        </IconButton>
                        <Heading>{props.name}</Heading>
                        <Text color={'gray.500'} fontSize={'lg'}>
                            {props.description}
                        </Text>
                        <Stack
                            spacing={4}
                            divider={
                                <StackDivider
                                    borderColor={useColorModeValue('gray.100', 'gray.700')}
                                />
                            }>
                        </Stack>
                    </Stack>
                </SimpleGrid>
            </Container>
        );
    } else {
        return (
            <Container maxW={'8xl'} py={12}>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                    <Stack spacing={4}>
                        <IconButton backgroundColor={"blue.400"} size="lg" style={{ width: "fit-content", pointerEvents: "none" }}>
                            <Icon as={props.icon} color={'white'} w={5} h={5} />
                        </IconButton>
                        <Heading>{props.name}</Heading>
                        <Text color={'gray.500'} fontSize={'lg'}>
                            {props.description}
                        </Text>
                        <Stack
                            spacing={4}
                            divider={
                                <StackDivider
                                    borderColor={useColorModeValue('gray.100', 'gray.700')}
                                />
                            }>
                        </Stack>
                    </Stack>
                    <Flex>
                        <Image
                            rounded={'md'}
                            alt={'feature image'}
                            src={props.image}
                            objectFit={'cover'}
                        />
                    </Flex>
                </SimpleGrid>
            </Container>
        );
    }
}