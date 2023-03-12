export const mockGetItemReturn = 'any-token'

export const mockLocalStorage: Storage = {
  clear: jest.fn(),
  getItem: jest.fn(() => mockGetItemReturn),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  key: jest.fn(),
  length: 2
}
