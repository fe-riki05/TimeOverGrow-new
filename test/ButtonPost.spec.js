import { mount } from '@vue/test-utils'
import Vue from 'vue'
import Vuetify from 'vuetify'
import ButtonPost from '@/components/ButtonPost.vue'

Vue.use(Vuetify)

describe('Component', () => {
	// テストの比較
	it('is a Vue instance', () => {
		const wrapper = mount(ButtonPost)
		expect(wrapper.isVueInstance()).toBeTruthy()
	})

	it('Click on button calls onClick', async () => {
		const myMock = jest.fn()
		const wrapper = mount(ButtonPost, {
			propsData: {
				onClick: myMock,
			},
		})
		await wrapper.find('button').trigger('click')

		expect(myMock.mock.calls.length).toBe(1)
	})
})
