import { sleep } from '@/helpers/sleep'
import type { ChatMessage } from '@/interfaces/chat-message.interface'
import type { YesNoResponse } from '@/interfaces/yes-no.response'
import { ref } from 'vue'

export const useChat = () => {
  const messages = ref<ChatMessage[]>([])

  const getHerResponse = async (): Promise<YesNoResponse> => {
    const response = await fetch('https://yesno.wtf/api')
    return (await response.json()) as YesNoResponse
  }

  const onMessage = async (message: string) => {
    if (message.length === 0) return

    messages.value.push({
      id: new Date().getTime(),
      message,
      itsMine: true,
    })

    if (!message.endsWith('?')) return

    await sleep(1)
    const { answer, image } = await getHerResponse()

    messages.value.push({
      id: new Date().getTime(),
      message: answer,
      itsMine: false,
      image,
    })
  }

  return {
    messages,
    onMessage,
  }
}
