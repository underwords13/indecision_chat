import { mount } from '@vue/test-utils'
import MessageBox from '@/components/chat/MessageBox.vue'

describe('<MessageBox />', () => {
  const wrapper = mount(MessageBox)

  test('render input and button elements correctly', () => {
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.find('button svg').exists()).toBe(true)
  })

  test('emits sendMessage event when button is clicked with message value', async () => {
    const message = 'Hello'

    await wrapper.find('input[type="text"]').setValue(message)

    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('sendMessage')?.[0]).toEqual([message])
    expect((wrapper.vm as any).message).toBe('')
  })

  test('emits sendMessage event when button is keypress.enter with message value', async () => {
    const message = 'Hello'

    const input = wrapper.find('input[type="text"]')
    await input.setValue(message)
    await input.trigger('keypress.enter')

    expect(wrapper.emitted('sendMessage')?.[0]).toEqual([message])
  })

  test('no emits sendMessage event when button is keypress.enter with message value', async () => {
    const wrapper = mount(MessageBox)

    const input = wrapper.find('input')
    await input.setValue('')
    await input.trigger('keypress.enter')
    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('sendMessage')).toBeFalsy()
  })
})
