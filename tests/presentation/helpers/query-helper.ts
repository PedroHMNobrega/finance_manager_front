export const queryElementByTestId = (element: Element, testId: string): Element => {
  return element.querySelector(`[data-testid="${testId}"]`)
}
