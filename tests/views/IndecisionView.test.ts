import { mount } from '@vue/test-utils'
import IndecisionView from '@/views/IndecisionView.vue'
import ChatMessages from '@/components/chat/ChatMessages.vue'
import MessageBox from '@/components/chat/MessageBox.vue'

const mockChatMessages = {
  template: '<div data-testid="chat-messages"> Mock ChatMessages</div>',
}

describe('<IndecisionView b', () => {
  test('renders chat messages and correctly', () => {
    const wrapper = mount(IndecisionView)
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.findComponent(ChatMessages).exists()).toBe(true)
    expect(wrapper.findComponent(MessageBox).exists()).toBe(true)
  })

  test('calls onMessage when sending  a message', async () => {
    const wrapper = mount(IndecisionView, {
      global: {
        stubs: {
          ChatMessages: mockChatMessages,
        },
      },
    })

    // Simular evento  personalizado
    const messageComponent = wrapper.findComponent(MessageBox)
    messageComponent.vm.$emit('sendMessage', 'Hello')

    await new Promise((resolve) => setTimeout(resolve, 150))
  })
})
