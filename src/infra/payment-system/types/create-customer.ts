export interface NewCustomerRequest {
  name: string;
  cpfCnpj: string;
  email: string;
}
export interface NewCustomerResponse {
  id: string; // Identificador único do cliente no Asaas
  dateCreated: string; // Data de criação do cliente
  name: string; // Nome do cliente
  email: string; // E-mail do cliente
  phone: string; // Telefone do cliente
  mobilePhone: string; // Celular do cliente
  address: string; // Endereço do cliente
  addressNumber: string; // Número do endereço do cliente
  complement: string; // Complemento do endereço do cliente
  province: string; // Bairro do endereço do cliente
  city: string; // Identificador único da cidade no Asaas
  cityName: string; // Cidade do endereço do cliente
  state: string; // Estado do endereço do cliente
  country: string; // País do cliente
  postalCode: string; // CEP do endereço do cliente
  cpfCnpj: string; // CPF ou CNPJ do cliente
  personType: 'JURIDICA' | 'FISICA'; // Tipo de pessoa
  deleted: boolean; // Indica se é um cliente deletado
  additionalEmails?: string; // E-mails adicionais do cliente (opcional)
  externalReference?: string; // Referência externa do cliente (opcional)
  notificationDisabled: boolean; // Indica se as notificações estão desabilitadas
  observations?: string; // Observações do cliente (opcional)
  foreignCustomer: boolean; // Indica se o pagador é estrangeiro
  object: string;
}
