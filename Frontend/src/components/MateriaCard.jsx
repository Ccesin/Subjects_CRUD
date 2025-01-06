import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Heading,
	HStack,
	IconButton,
	Image,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useColorModeValue,
	useDisclosure,
	useToast,
	VStack,
} from "@chakra-ui/react";
import { useMateriaStore } from "../Store/materia";
import { useState } from "react";

const MateriaCard = ({materia}) => {
    const [updatedMateria, setUpdatedMateria] = useState(materia);
    
    const textColor = useColorModeValue("gray.600","gray.200");
    const bg = useColorModeValue("#ededed","#040a16");

    const {deleteMateria, updateMateria} = useMateriaStore();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleDeleteMateria = async(materiaId) => {
        const {success,message} = await deleteMateria(materiaId);
        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 5000,
                isClosable: true
            });
        }
        else {
            toast({
                title: "Materia Deleted",
                description: message,
                status: "success",
                duration: 5000,
                isClosable: true
            });
        }
    };

    const handleUpdateMateria = async (materiaId, updatedMateria) => {
		const { success, message } = await updateMateria(materiaId, updatedMateria);
		onClose();
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: "Materia updated successfully",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
	};

    return (
    <Box
        shadow="lg"
        rounded="lg"
        overflow="hidden"
        transition="all 0.3s ease-in-out"
        _hover={{ transform: "translateY(-5px)", shadow:"xl" }}
        bg={bg}
    >
        <Image src={materia.image} alt={materia.name} h={48} w="full" objectFit="cover" />
        <Box p={4}>
            <Heading as="h3" size="md" mb={2} >
                {materia.name}
            </Heading>
            <Text  fontSize="l" color={textColor} mb={1} >
               UC: {materia.uc}
            </Text>
            <Text fontWeight="" fontSize="l" color={textColor} mb={1} >
                PROFESOR: {materia.profesor}
            </Text>
            <Text fontWeight="" fontSize="l" color={textColor} mb={1} >
                DESCCRIPCION: {materia.descripcion}
            </Text>
            <Text fontWeight="" fontSize="l" color={textColor} mb={1} >
                HORARIO: {materia.horario}
            </Text>
            <Text fontWeight="" fontSize="l" color={textColor} mb={1} >
                AULA: {materia.aula}
            </Text>
            <Text fontWeight="" fontSize="l" color={textColor} mb={1} >
                PRELACION: {materia.prelacion}
            </Text>
            <Text fontWeight="" fontSize="l" color={textColor} mb={6} >
                CUPO MAXIMO: {materia.cupomax}
            </Text>
            <HStack spacing={2} >
            <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme='blue' />
                <IconButton icon={<DeleteIcon />} onClick={ ()=> handleDeleteMateria(materia._id) } colorScheme="red" />
            </HStack>
        </Box>

        
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />

				<ModalContent>
					<ModalHeader>Update Materia</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack spacing={4}>
							<Input
								placeholder='Nombre'
								name='name'
								value={updatedMateria.name}
								onChange={(e) => setUpdatedMateria({ ...updatedMateria, name: e.target.value })}
							/>
							<Input
								placeholder='Unidades de Credito'
								name='uc'
								type='number'
								value={updatedMateria.uc}
								onChange={(e) => setUpdatedMateria({ ...updatedMateria, uc: e.target.value })}
							/>
							<Input
								placeholder='profesor'
								name='profesor'
								value={updatedMateria.profesor}
								onChange={(e) => setUpdatedMateria({ ...updatedMateria, profesor: e.target.value })}
							/>
							<Input
								placeholder='descripcion'
								name='descripcion'
								value={updatedMateria.descripcion}
								onChange={(e) => setUpdatedMateria({ ...updatedMateria, descripcion: e.target.value })}
							/>
							<Input
								placeholder='horario'
								name='horario'
								value={updatedMateria.horario}
								onChange={(e) => setUpdatedMateria({ ...updatedMateria, horario: e.target.value })}
							/>
							<Input
								placeholder='aula'
								name='aula'
								value={updatedMateria.aula}
								onChange={(e) => setUpdatedMateria({ ...updatedMateria, aula: e.target.value })}
							/>
							<Input
								placeholder='prelacion'
								name='prelacion'
								value={updatedMateria.prelacion}
								onChange={(e) => setUpdatedMateria({ ...updatedMateria, prelacion: e.target.value })}
							/>
							<Input
								placeholder='cupomax'
								name='cupomax'
								type='number'
								value={updatedMateria.cupomax}
								onChange={(e) => setUpdatedMateria({ ...updatedMateria, cupomax: e.target.value })}
							/>
							<Input
								placeholder='Image URL'
								name='image'
								value={updatedMateria.image}
								onChange={(e) => setUpdatedMateria({ ...updatedMateria, image: e.target.value })}
							/>
						</VStack>
					</ModalBody>

					<ModalFooter>
						<Button
							colorScheme='blue'
							mr={3}
							onClick={() => handleUpdateMateria(materia._id, updatedMateria)}
						>
							Update
						</Button>
						<Button variant='ghost' onClick={onClose}>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>

    </Box>
    )
}
export default MateriaCard;