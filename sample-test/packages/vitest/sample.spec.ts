import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

describe('suite', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })
  it("", () => {
    const date = new Date(2000, 1, 1)
    vi.setSystemTime(date)
    expect(date.toLocaleDateString()).toBe("2/1/2000")
  })
})