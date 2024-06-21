<template>
    <div>
      <a-table
        :columns="columns"
        :dataSource="data"
        pagination="true"
        bordered
      />
    </div>
  </template>
  
  <script setup>
  const columns = [
    {
      title: "Nº protocolo",
      dataIndex: "protocol",
      key: "protocol",
    },
    {
      title: "Atendente Origem",
      dataIndex: "attendant",
      key: "attendant",
    },
    {
      title: "Tipo de serviço",
      dataIndex: "service",
      key: "service",
    },
    {
      title: "N° Contrato",
      dataIndex: "contract",
      key: "contract",
    },
    {
      title: "Ponto de acesso",
      dataIndex: "olt",
      key: "olt",
    },
    {
      title: "Slot",
      dataIndex: "slot",
      key: "slot",
    },
    {
      title: "Port",
      dataIndex: "port",
      key: "port",
    },
    {
      title: "Posição",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Potência",
      dataIndex: "potency",
      key: "potency",
    },
  ];
  
  const data = [
    {
      key: "1",
      protocol: "202306181001",
      attendant: "João da Silva",
      service: "Visita técnica",
      contract: "987654",
      olt: "OLT-1",
      slot: "3",
      port: "15",
      position: "1",
      status: "Ativo",
      potency: "-22dBm",
    },
    {
      key: "2",
      protocol: "202306181002",
      attendant: "Maria Pereira",
      service: "Retorno 15 dias",
      contract: "123456",
      olt: "OLT-2",
      slot: "1",
      port: "7",
      position: "3",
      status: "Pendente",
      potency: "-18dBm",
    },
  ];
  </script>
  
  <style lang="scss" scoped>
  /* Adicione seu estilo customizado aqui, se necessário */
  </style>
  