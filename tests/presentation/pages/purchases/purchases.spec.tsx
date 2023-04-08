import React from 'react'
import { SagaUseCases } from '@/presentation/store/reducers/root-saga'
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore'
import { Purchases } from '@/presentation/pages'
import { renderWithProvider } from '@/tests/presentation/mocks'
import { screen } from '@testing-library/react'
import { clickButton, testMessage } from '@/tests/presentation/helpers/form-helper'
import { mockCategory, mockCategoryList, mockPurchase, mockPurchaseList } from '@/tests/domain/mocks'
import { Category, Purchase } from '@/domain/models'
import { mockError, mockLoading } from '@/tests/presentation/helpers/saga-helper'
import { MessageType } from '@/presentation/components/message/message'
import { DateFormatter } from '@/domain/usecases/date'
import { Dependencies } from '@/presentation/dependencies'

type SutType = {
  renderScreen: Function
  sagaUsecases: SagaUseCases
  store: ToolkitStore
  purchases: Purchase[]
  categories: Category[]
  dateFormatter: DateFormatter
}

const makeSut = (purchases = mockPurchaseList(), categories = mockCategoryList()): SutType => {
  const Page: React.FC = () => (
    <Purchases />
  )

  const {
    store,
    sagaUsecases,
    renderScreen,
    diContainer
  } = renderWithProvider({ Page })

  const loadPurchases = sagaUsecases.loadPurchasesUsecase.loadAll as jest.Mock
  loadPurchases.mockReturnValue(purchases)

  const loadCategories = sagaUsecases.loadCategoriesUsecase.loadAll as jest.Mock
  loadCategories.mockReturnValue(categories)

  return {
    renderScreen,
    sagaUsecases,
    store,
    purchases,
    categories,
    dateFormatter: diContainer.get<DateFormatter>(Dependencies.DateFormatter)
  }
}

describe('Purchases Component', () => {
  describe('Purchase', () => {
    it('should open create purchase modal on open button click', async () => {
      const { renderScreen } = makeSut()
      await renderScreen()

      let createPurchaseModal = screen.queryByTestId('create-purchase-modal')
      expect(createPurchaseModal).toBeNull()

      const addButton = screen.queryByTestId('add-button') as HTMLButtonElement
      await clickButton(addButton)

      createPurchaseModal = screen.queryByTestId('create-purchase-modal')
      expect(createPurchaseModal).toBeTruthy()
    })

    it('should list correct purchases on start', async () => {
      const categories: Category[] = [
        mockCategory(1, 'category1'),
        mockCategory(2, 'category2')
      ]
      const purchases: Purchase[] = [
        mockPurchase(4, categories[0].id),
        mockPurchase(5, categories[1].id)
      ]

      const {
        renderScreen,
        dateFormatter
      } = makeSut(purchases, categories)

      const format = dateFormatter.format as jest.Mock
      format
        .mockReturnValueOnce(purchases[0].firstInstallmentDate)
        .mockReturnValueOnce(purchases[1].firstInstallmentDate)

      await renderScreen()

      const purchasesElements = screen.queryAllByTestId('purchase')

      expect(purchasesElements.length).toBe(purchases.length)

      expect(purchasesElements[0].children[0].textContent).toBe(`${purchases[0].name}`)
      expect(purchasesElements[0].children[1].textContent).toBe(`${categories[0].name}`)
      expect(purchasesElements[0].children[2].textContent).toBe(`${purchases[0].installmentsNumber}`)
      expect(purchasesElements[0].children[3].textContent).toBe(`${purchases[0].firstInstallmentDate}`)
      expect(purchasesElements[0].children[4].textContent).toBe(`R$ ${purchases[0].value}`)

      expect(purchasesElements[1].children[0].textContent).toBe(`${purchases[1].name}`)
      expect(purchasesElements[1].children[1].textContent).toBe(`${categories[1].name}`)
      expect(purchasesElements[1].children[2].textContent).toBe(`${purchases[1].installmentsNumber}`)
      expect(purchasesElements[1].children[3].textContent).toBe(`${purchases[1].firstInstallmentDate}`)
      expect(purchasesElements[1].children[4].textContent).toBe(`R$ ${purchases[1].value}`)
    })

    it('should show no purchase message if there is no purchase', async () => {
      const { renderScreen } = makeSut([])
      await renderScreen()

      const purchasesElements = screen.queryAllByTestId('purchase')
      const noPurchaseMessage = screen.queryByTestId('no-purchases')

      expect(purchasesElements.length).toBe(0)
      expect(noPurchaseMessage).toBeTruthy()
    })

    it('should display error message on purchase load error', async () => {
      const {
        renderScreen,
        sagaUsecases
      } = makeSut()

      const loadPurchases = sagaUsecases.loadPurchasesUsecase.loadAll as jest.Mock
      mockError(loadPurchases)

      await renderScreen()

      testMessage(MessageType.ERROR)
    })

    it('should display spinner on purchase load loading', async () => {
      const {
        renderScreen,
        sagaUsecases
      } = makeSut()

      const loadPurchases = sagaUsecases.loadPurchasesUsecase.loadAll as jest.Mock
      mockLoading(loadPurchases)

      await renderScreen()

      const addButton = screen.queryByTestId('purchase-table')
      expect(addButton).toBeNull()

      const spinner = screen.queryByTestId('spinner')
      expect(spinner).toBeTruthy()
    })

    it('should show dash if the purchase does not have a category', async () => {
      const purchase = mockPurchase(1)
      purchase.category = null

      const { renderScreen } = makeSut([purchase])
      await renderScreen()

      const purchaseElement = screen.queryByTestId('purchase')

      expect(purchaseElement.children[1].textContent).toBe('-')
    })

    it('should show dash if the purchase category is not on the categories list', async () => {
      const purchase = mockPurchase(1)
      purchase.category = 54545

      const { renderScreen } = makeSut([purchase])
      await renderScreen()

      const purchaseElement = screen.queryByTestId('purchase')

      expect(purchaseElement.children[1].textContent).toBe('-')
    })

    it('should call date formatter to format the date', async () => {
      const purchase = mockPurchase(1)
      purchase.firstInstallmentDate = '2022-10-5'

      const {
        renderScreen,
        dateFormatter
      } = makeSut([purchase])

      const format = dateFormatter.format as jest.Mock
      format.mockReturnValueOnce('05/10/2022')

      await renderScreen()

      const purchaseElement = screen.queryByTestId('purchase')

      expect(purchaseElement.children[3].textContent).toBe('05/10/2022')
      expect(format).toHaveBeenCalledTimes(1)
      expect(format).toHaveBeenCalledWith(purchase.firstInstallmentDate)
    })
  })
  describe('Category', () => {
    it('should call loadCategories usecase', async () => {
      const {
        renderScreen,
        sagaUsecases
      } = makeSut()
      await renderScreen()

      const loadAll = sagaUsecases.loadCategoriesUsecase.loadAll as jest.Mock
      expect(loadAll).toHaveBeenCalledTimes(1)
    })

    it('should display error message on category load error', async () => {
      const {
        renderScreen,
        sagaUsecases
      } = makeSut()

      const loadCategories = sagaUsecases.loadCategoriesUsecase.loadAll as jest.Mock
      mockError(loadCategories)

      await renderScreen()

      testMessage(MessageType.ERROR, 'Categoria: Algo de errado aconteceu')
    })

    it('should show dash in category name if it is loading', async () => {
      const categories: Category[] = [
        mockCategory(1, 'category1'),
        mockCategory(2, 'category2')
      ]
      const purchases: Purchase[] = [
        mockPurchase(4, categories[0].id),
        mockPurchase(5, categories[1].id)
      ]

      const {
        renderScreen,
        sagaUsecases
      } = makeSut(purchases, categories)

      const loadCategories = sagaUsecases.loadCategoriesUsecase.loadAll as jest.Mock
      mockLoading(loadCategories)

      await renderScreen()

      const purchasesElements = screen.queryAllByTestId('purchase')

      expect(purchasesElements[0].children[1].textContent).toBe('-')
      expect(purchasesElements[1].children[1].textContent).toBe('-')
    })
  })
})
