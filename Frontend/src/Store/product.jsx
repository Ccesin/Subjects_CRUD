import { create } from 'zustand'

export const useProductStore = create( (set)=>({
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct)=>{
        if (!newProduct.name || !newProduct.price || !newProduct.image) {
            return {success:false, message: 'Please fill in all fields.'};
        }
        const res = await fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        });
        const mongoResponse = await res.json();
        set( (state)=> ({products:[...state.products,mongoResponse.data]}) )
        return {success:true, message: 'Product created successfully.'};
    },
    fetchProducts: async()=>{
        const res = await fetch('/api/products');
        const mongoResponse = await res.json();
        set( {products:mongoResponse.data} );
    },
    deleteProduct: async (productId)=>{
        const res = await fetch(`/api/products/${productId}`, {
            method: 'DELETE'
        });
        const mongoResponse = await res.json();

        if (!(mongoResponse.success)) return { success:false, message: mongoResponse.message };

        // update the ui immediately, without needing a refresh
        set( (state)=> ({ 
            products: state.products.filter( (product) => product._id !== productId) 
        }));

        return {success:true, message: mongoResponse.message};
    },
	updateProduct: async (productId, updatedProduct) => {
		const res = await fetch(`/api/products/${productId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedProduct),
		});
		const mongoResponse = await res.json();
		if (!mongoResponse.success) return { success: false, message: mongoResponse.message };

		// update the ui immediately, without needing a refresh
		set((state) => ({
			products: state.products.map((product) => (product._id === productId ? mongoResponse.data : product)),
		}));

		return { success: true, message: mongoResponse.message };
	}
}));