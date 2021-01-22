import { mount } from '@vue/test-utils'
import Vue from 'vue'
import Vuetify from 'vuetify'
import Button from '@/components/Button.vue'

Vue.use(Vuetify)


describe('Component', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(Button);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});