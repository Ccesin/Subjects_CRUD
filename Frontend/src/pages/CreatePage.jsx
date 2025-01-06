import { useState } from 'react';
import { Container, VStack, Heading, Box, useColorModeValue, Input, Button, useToast } from '@chakra-ui/react';

import { useProductStore } from '../Store/product';

const CreatePage = () => {
  const [newProduct,  setNewProduct] = useState({
    name: '',
    price: '',
    image: ''
  });

  const toast = useToast();

  const { createProduct } = useProductStore();


  const handleAddProduct = async()=> {
    console.log("newProduct useState: "+newProduct);
    const {success, message} = await createProduct(newProduct);
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
        title: 'Product Added',
        description: message,
        status: 'success',
        isClosable: true
      });
    }
    setNewProduct ({name:'', price:'', image:''});
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack
        spacing={8}
      >
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8} >
          Create New Product
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
              placeholder="Product Name" 
              name="name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
            />
            <Input 
              placeholder="Product Price" 
              name="price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
            />
            <Input 
              placeholder="Product Image" 
              name="image"
              value={newProduct.image}
              onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
            />

            <Button colorScheme="blue" onClick={handleAddProduct} w="full" >
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}
export default CreatePage;
