import { mount } from '@vue/test-utils'
import Vue from 'vue'
import Vuetify from 'vuetify'
import Button from '@/components/Button.vue'

Vue.use(Vuetify)

describe('Component', () => {
	// テストの比較
	it('is a Vue instance', () => {
		const wrapper = mount(Button)
		expect(wrapper.isVueInstance()).toBeTruthy()
	})
	
	it('Click on button calls onClick', async () => {
		const myMock = jest.fn();
		const wrapper = mount(Button, {
			propsData: {
				onClick: myMock
			}
		})
		await wrapper.find('button').trigger('click')

		expect(myMock.mock.calls.length).toBe(1);
	})
})
