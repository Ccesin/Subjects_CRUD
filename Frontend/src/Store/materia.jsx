import { create } from 'zustand'

export const useMateriaStore = create( (set)=>({
    materias: [],
    setMaterias: (materias) => set({ materias }),
    createMateria: async (newMateria)=>{
        if (!newMateria.name || !newMateria.uc || !newMateria.profesor || !newMateria.descripcion || !newMateria.horario || !newMateria.aula || !newMateria.prelacion || !newMateria.cupomax  || !newMateria.image) {
            return {success:false, message: 'Please fill in all fields.'};
        }
        const res = await fetch('/api/materias', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newMateria)
        });
        const mongoResponse = await res.json();
        set( (state)=> ({materias:[...state.materias,mongoResponse.data]}) )
        return {success:true, message: 'Materia created successfully.'};
    },
    fetchMaterias: async()=>{
        const res = await fetch('/api/materias');
        const mongoResponse = await res.json();
        set( {materias:mongoResponse.data} );
    },
    deleteMateria: async (materiaId)=>{
        const res = await fetch(`/api/materias/${materiaId}`, {
            method: 'DELETE'
        });
        const mongoResponse = await res.json();

        if (!(mongoResponse.success)) return { success:false, message: mongoResponse.message };

        // update the ui immediately, without needing a refresh
        set( (state)=> ({ 
            materias: state.materias.filter( (materia) => materia._id !== materiaId) 
        }));

        return {success:true, message: mongoResponse.message};
    },
	updateMateria: async (materiaId, updatedMateria) => {
		const res = await fetch(`/api/materias/${materiaId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedMateria),
		});
		const mongoResponse = await res.json();
		if (!mongoResponse.success) return { success: false, message: mongoResponse.message };

		// update the ui immediately, without needing a refresh
		set((state) => ({
			materias: state.materias.map((materia) => (materia._id === materiaId ? mongoResponse.data : materia)),
		}));

		return { success: true, message: mongoResponse.message };
	}
}));