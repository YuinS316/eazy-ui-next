import { describe, expect, it } from 'vitest'
import { isArray } from '../index'

describe('type Assert', () => {
  describe('isArray', () => {
    it('should be true when input array', () => {
      expect(isArray([])).toBe(true)
    })
  })
})
