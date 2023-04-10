import React from 'react'
import { render, screen } from '@testing-library/react'
import MonthPicker from '@/presentation/components/month-picker/month-picker'
import { clickButton } from '@/tests/presentation/helpers/form-helper'

type SutTypes = {
  date: Date
  setDate: jest.Mock
}

const makeSut = (date = new Date(0, 2020, 2)): SutTypes => {
  const setDate = jest.fn()

  render(
    <MonthPicker date={date} setDate={setDate} />
  )

  return {
    date,
    setDate
  }
}

describe('MonthPicker Component', () => {
  it.each([
    { monthName: 'Janeiro', number: 0, year: 1999 },
    { monthName: 'Fevereiro', number: 1, year: 2000 },
    { monthName: 'Março', number: 2, year: 2001 },
    { monthName: 'Abril', number: 3, year: 2002 },
    { monthName: 'Maio', number: 4, year: 2003 },
    { monthName: 'Junho', number: 5, year: 2004 },
    { monthName: 'Julho', number: 6, year: 2005 },
    { monthName: 'Agosto', number: 7, year: 2006 },
    { monthName: 'Setembro', number: 8, year: 2007 },
    { monthName: 'Outubro', number: 9, year: 2009 },
    { monthName: 'Novembro', number: 10, year: 2142 },
    { monthName: 'Dezembro', number: 11, year: 3523 }
  ])('should show correct month name and year', ({ monthName, number, year }) => {
    const date = new Date(year, number, 2)

    makeSut(date)

    const dateDescription = screen.queryByTestId('date-description')
    expect(dateDescription.textContent).toBe(`${monthName} de ${year}`)
  })

  it('should add one month on right arrow click', async () => {
    const date = new Date(2023, 5, 2)
    const { setDate } = makeSut(date)

    const rightArrow = screen.queryByTestId('arrow-right')
    await clickButton(rightArrow)

    expect(setDate).toHaveBeenCalledWith(new Date(2023, 6, 2))
  })

  it('should add one month and year on right arrow click, for december', async () => {
    const date = new Date(2023, 11, 2)
    const { setDate } = makeSut(date)

    const rightArrow = screen.queryByTestId('arrow-right')
    await clickButton(rightArrow)

    expect(setDate).toHaveBeenCalledWith(new Date(2024, 0, 2))
  })

  it('should remove one month on left arrow click', async () => {
    const date = new Date(2023, 5, 2)
    const { setDate } = makeSut(date)

    const leftArrow = screen.queryByTestId('arrow-left')
    await clickButton(leftArrow)

    expect(setDate).toHaveBeenCalledWith(new Date(2023, 4, 2))
  })

  it('should remove one month and one year on left arrow click, on january', async () => {
    const date = new Date(2023, 0, 2)
    const { setDate } = makeSut(date)

    const leftArrow = screen.queryByTestId('arrow-left')
    await clickButton(leftArrow)

    expect(setDate).toHaveBeenCalledWith(new Date(2022, 11, 2))
  })
})
