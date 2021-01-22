import { mount } from '@vue/test-utils';
import Vue from 'vue'
import Vuetify from 'vuetify'
import TextBox from '@/components/TextBox.vue'

Vue.use(Vuetify)

describe('Component', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(TextBox);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});