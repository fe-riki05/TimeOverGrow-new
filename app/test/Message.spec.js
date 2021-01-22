import { mount } from '@vue/test-utils'
import Vue from 'vue'
import Vuetify from 'vuetify'
import Message from '@/components/Message.vue'

Vue.use(Vuetify)

describe('Component', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(Message);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});