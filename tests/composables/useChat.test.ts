import { useChat } from '@/composables/useChat'

describe('useChat', () => {
  test('add message correctly when onMessage is called', async () => {
    const text = 'Hola Mundo'
    const { messages, onMessage } = useChat()
    await onMessage(text)

    expect(messages.value.length).toBe(1)
    expect(messages.value[0].itsMine).toBe(true)
    expect(messages.value[0].message).toBe(text)
    expect(messages.value[0]).toEqual({
      id: expect.any(Number),
      itsMine: true,
      message: text,
    })
  })

  test('do nothing if text is empty', async () => {
    const text = ''
    const { messages, onMessage } = useChat()
    await onMessage(text)
    expect(messages.value.length).toBe(0)
  })

  test('gets her response correctly', async () => {
    const text = '¿Quieres café?'
    const { messages, onMessage } = useChat()

    await onMessage(text)
    await new Promise((r) => setTimeout(r, 2000))

    const [myMessage, herMessage] = messages.value

    expect(messages.value.length).toBe(2)
    expect(herMessage.itsMine).toBe(false)
    expect(herMessage).toEqual({
      id: expect.any(Number),
      image: expect.any(String),
      message: expect.any(String),
      itsMine: false,
    })
    expect(myMessage).toEqual({
      id: expect.any(Number),
      itsMine: true,
      message: text,
    })
  })

  test('mock response', async () => {
    const mockResponse = { answer: 'yes', image: 'example.gif' }

    ;(window as any).fetch = vi.fn(async () => ({
      json: async () => mockResponse,
    }))

    const text = '¿Quieres café?'
    const { messages, onMessage } = useChat()
    await onMessage(text)
    await new Promise((r) => setTimeout(r, 2000))
    const [myMessage, herMessage] = messages.value
    expect(messages.value.length).toBe(2)
    expect(herMessage.itsMine).toBe(false)
    expect(herMessage).toEqual({
      id: expect.any(Number),
      image: expect.any(String),
      message: expect.any(String),
      itsMine: false,
    })
    expect(myMessage).toEqual({
      id: expect.any(Number),
      itsMine: true,
      message: text,
    })
  })
})
