import { defineStore } from 'pinia';

export const useClientProvisionStore = defineStore('clientProvisionStore', {
    state: () => ({
        equipment: '',
        ceo: '',
        selectedOlt: null,
        provisionResponse: null,
        error: null,
    }),
    actions: {
        setEquipment(value) {
            this.equipment = value;
        },
        setCeo(value) {
            this.ceo = value;
        },
        setSelectedOlt(olt) {
            this.selectedOlt = olt;
        },
        async submitProvision() {
            try {
                if (this.selectedOlt) {
                    this.provisionResponse = 'Provisionamento realizado com sucesso!';
                    this.error = null;
                } else {
                    throw new Error('Nenhuma OLT selecionada.');
                }
            } catch (error) {
                this.provisionResponse = null;
                this.error = 'Falha ao realizar o provisionamento: ' + error.message;
            }
        },
    },
});
