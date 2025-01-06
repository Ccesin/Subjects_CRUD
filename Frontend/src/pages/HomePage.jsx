import { Container, VStack, Text, SimpleGrid } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useMateriaStore } from '../Store/materia';
import MateriaCard from '../components/MateriaCard';

const HomePage = () => {
  const { fetchMaterias, materias } = useMateriaStore();

  useEffect( ()=>{
    fetchMaterias();
  }, [fetchMaterias] );
  
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
    </Container>
  );
}

export default HomePage;
