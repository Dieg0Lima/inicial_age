import { defineStore } from 'pinia';
import { useToast } from "vue-toastification";

export const useClientProvisionStore = defineStore('clientProvisionStore', {
    state: () => ({
        equipment: '',
        ceo: '',
        selectedOltId: null,
        provisionResponse: null,
        error: null,
    }),
    actions: {
        setEquipment(value) {
            this.equipment = value;
        },
        setCeo(value) {
            this.cto = value;
        },
        setSelectedOlt(oltId) {
            this.selectedOltId = oltId;
        },

        async submitProvision(provisionData) {
            const toast = useToast();
            try {

                console.log('Dados antes da operação:', {
                    equipment: provisionData.equipment || this.equipment,
                    cto: provisionData.cto || this.cto,
                    oltId: provisionData.oltId,
                    contract: provisionData.contract,
                    connection_id: provisionData.connection_id,
                });

                await new Promise(resolve => setTimeout(resolve, 1000));

                this.provisionResponse = 'Provisionamento realizado com sucesso!';
                this.error = null;

                toast.success("Operação realidaza com sucesso:", this.provisionResponse)
            } catch (error) {
                this.provisionResponse = null;
                this.error = 'Falha ao realizar o provisionamento: ' + error.message;
                console.error('Erro no provisionamento:', this.error);
            }
        }
    },
});
