import { LinkPath } from '@/data/usecases'

export const HOME_LINK = new LinkPath('/')
export const LOGIN_LINK = new LinkPath('/login')
export const CREDIT_CARD_MANAGEMENT_LINK = new LinkPath('/credit-card-management')
export const CREDIT_CARD_MANAGEMENT_PURCHASES_LINK = new LinkPath(`${CREDIT_CARD_MANAGEMENT_LINK.full()}/purchase`)
export const CREDIT_CARD_MANAGEMENT_INSTALLMENTS_LINK = new LinkPath(`${CREDIT_CARD_MANAGEMENT_LINK.full()}/installments`)
