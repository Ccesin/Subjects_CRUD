import { Container, VStack, HStack, Text, SimpleGrid, Box, Input,Button } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { useMateriaStore } from '../Store/materia';
import MateriaCard from '../components/MateriaCard';

const HomePage = () => {
  const { fetchMaterias, materias } = useMateriaStore();

  const [email, setEmail] = useState("");

  useEffect( ()=>{
    fetchMaterias();
  }, [fetchMaterias] );
  
  const handleNewsLetterSubmit = (e) => {
	e.preventDefault();
  
	// Log the submitted email
	console.log("Email submitted:", email);
	
	// Regular expression for validating email format
	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
	// Validate the email format
	if (!emailPattern.test(email)) {
	  alert('Por favor, ingresa un correo electrónico válido.');
	  return; // Exit the function if the email is invalid
	}
  
	// Get existing emails from local storage
	const existingEmails = JSON.parse(localStorage.getItem('subscribedEmails')) || [];
	
	// Check if the email is already in the list
	if (!existingEmails.includes(email)) {
	  // Add the new email to the list
	  existingEmails.push(email);
	  
	  // Save the updated list back to local storage
	  localStorage.setItem('subscribedEmails', JSON.stringify(existingEmails));
	  
	  // Clear the input field after submission
	  setEmail('');
	  
	  // Show a success message
	  alert('Gracias por suscribirte!');
	} else {
	  // Show a message if the email is already subscribed
	  alert('Este correo ya está suscrito.');
	}

};

  console.log("Materias:", materias);

  return (
		<Container maxW='container.xl' py={12}>
			<VStack spacing={8}>
				<Text
					fontSize={"30"}
					fontWeight={"bold"}
					bgGradient={"linear(to-r, cyan.400, blue.500)"}
					bgClip={"text"}
					textAlign={"center"}
				>
					Materias Actuales 🚀
				</Text>

				<SimpleGrid
					columns={{
						base: 1,
						md: 2,
						lg: 3,
					}}
					spacing={10}
					w={"full"}
				>
					{materias.map((materia) => (
						<MateriaCard key={materia._id} materia={materia} />
					))}
				</SimpleGrid>

        {materias.length === 0 && (
					<Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
						No hay materias en la BBD 😢{" "}
						<Link to={"/create"}>
							<Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
								Crear materia
							</Text>
						</Link>
					</Text>
				)}

        </VStack>

		<Box as="form" onSubmit={handleNewsLetterSubmit} w="full" maxW="md" mt={8}>
          <HStack spacing={4}>
            <Input
              type="email"
              placeholder="Ingresa tu correo electronico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" colorScheme="blue">
              Subscribete
            </Button>
          </HStack>
        </Box>

    </Container>
  );
}

export default HomePage;
