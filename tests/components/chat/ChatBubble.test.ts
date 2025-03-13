import { mount } from '@vue/test-utils'
import ChatBubble from '@/components/chat/ChatBubble.vue'

describe('<ChatBubble />', () => {
  test('renders own messages correctly', () => {
    const message = 'Hello'
    const wrapper = mount(ChatBubble, {
      props: {
        message,
        itsMine: true,
      },
    })

    expect(wrapper.find('.bg-blue-200').exists()).toBe(true)
    expect(wrapper.find('.bg-blue-200').exists()).toBeTruthy()
    expect(wrapper.find('.bg-blue-200').text()).toContain(message)
    expect(wrapper.find('.bg-gray-300').exists()).toBeFalsy()
  })

  test('renders received message correctly', () => {
    const message = 'Hello'
    const wrapper = mount(ChatBubble, {
      props: {
        message,
        itsMine: false,
      },
    })

    expect(wrapper.find('.bg-gray-300').exists()).toBe(true)
    expect(wrapper.find('.bg-gray-300').exists()).toBeTruthy()
    expect(wrapper.find('.bg-gray-300').text()).toContain(message)
    expect(wrapper.find('.bg-blue-200').exists()).toBeFalsy()
    expect(wrapper.find('img').exists()).toBeFalsy()
  })

  test('renders received message correctly with image', () => {
    const message = 'Hello'
    const image = 'https://via.placeholder.com/150'
    const wrapper = mount(ChatBubble, {
      props: {
        message,
        itsMine: false,
        image,
      },
    })

    expect(wrapper.find('.bg-gray-300').exists()).toBe(true)
    expect(wrapper.find('.bg-gray-300').exists()).toBeTruthy()
    expect(wrapper.find('.bg-gray-300').text()).toContain(message)
    expect(wrapper.find('.bg-blue-200').exists()).toBeFalsy()
    expect(wrapper.find('img').exists()).toBeTruthy()
    expect(wrapper.find('img').attributes('src')).toBe(image)
  })
})
