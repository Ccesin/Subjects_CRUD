import { useState } from 'react';
import { Container, VStack, Heading, Box, useColorModeValue, Input, Button, useToast } from '@chakra-ui/react';

import { useMateriaStore } from '../Store/materia';

const CreatePage = () => {
  const [newMateria,  setNewMateria] = useState({
    name: '',
    uc: '',
    profesor: '',
    descripcion: '',
    horario: '',
    aula: '',
    prelacion: '',
    cupomax: '',
    image: ''
  });

  const toast = useToast();

  const { createMateria } = useMateriaStore();


  const handleAddMateria = async()=> {
    console.log("newMateria useState: "+newMateria);
    const {success, message} = await createMateria(newMateria);
    if (!success) {
      toast({ 
        title: 'Error', 
        description: message, 
        status: 'error', 
        isClosable: true 
      });
    }
    else {
      toast({
        title: 'Materia Added',
        description: message,
        status: 'success',
        isClosable: true
      });
    }
    setNewMateria ({name:'', uc:'', profesor:'', descripcion:'', horario:'', aula:'', prelacion:'', cupomax:'', image:''});
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack
        spacing={8}
      >
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8} >
          Crear una nueva Materia
        </Heading>

        <Box
          w={"full"} 
          bg={useColorModeValue("#f5f5f5","#12161f")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              data-testid="cypress-input-name" 
              placeholder="Nombre" 
              name="name"
              value={newMateria.name}
              onChange={(e) => setNewMateria({...newMateria, name: e.target.value})}
            />
            <Input
              data-testid="cypress-input-uc" 
              placeholder="Unidades de credito" 
              name="uc"
              value={newMateria.uc}
              onChange={(e) => setNewMateria({...newMateria, uc: e.target.value})}
            />
            <Input
              data-testid="cypress-input-profesor" 
              placeholder="Profesor" 
              name="profesor"
              value={newMateria.profesor}
              onChange={(e) => setNewMateria({...newMateria, profesor: e.target.value})}
            />
            <Input
              data-testid="cypress-input-descripcion" 
              placeholder="Descripcion" 
              name="descripcion"
              value={newMateria.descripcion}
              onChange={(e) => setNewMateria({...newMateria, descripcion: e.target.value})}
            />
            <Input
              data-testid="cypress-input-horario" 
              placeholder="Horario" 
              name="horario"
              value={newMateria.horario}
              onChange={(e) => setNewMateria({...newMateria, horario: e.target.value})}
            />
            <Input
              data-testid="cypress-input-aula" 
              placeholder="Aula" 
              name="aula"
              value={newMateria.aula}
              onChange={(e) => setNewMateria({...newMateria, aula: e.target.value})}
            />
            <Input
              data-testid="cypress-input-prelacion" 
              placeholder="Prelacion" 
              name="prelacion"
              value={newMateria.prelacion}
              onChange={(e) => setNewMateria({...newMateria, prelacion: e.target.value})}
            />
            <Input
              data-testid="cypress-input-cupomax" 
              placeholder="Cupo Maximo" 
              name="cupomax"
              value={newMateria.cupomax}
              onChange={(e) => setNewMateria({...newMateria, cupomax: e.target.value})}
            />
            <Input
              data-testid="cypress-input-image" 
              placeholder="Imagen" 
              name="image"
              value={newMateria.image}
              onChange={(e) => setNewMateria({...newMateria, image: e.target.value})}
            />

            <Button data-testid="cypress-submit" colorScheme="blue" onClick={handleAddMateria} w="full" >
              Agregar Materia
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}
export default CreatePage;
