export type Purchase = {
  id?: number
  name: string
  installmentsNumber: number
  value: number
  category: number
  firstInstallmentDate: string
  installments_paid?: number
  value_paid?: number
}
