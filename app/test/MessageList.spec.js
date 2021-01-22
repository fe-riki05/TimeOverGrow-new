import { mount } from '@vue/test-utils'
import Vue from 'vue'
import Vuetify from 'vuetify'
import MessageList from '@/components/MessageList.vue'

Vue.use(Vuetify)

describe('Component', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(MessageList);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});