import { mount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import Button from '@/components/Button.vue';

Vue.use(Vuetify);

describe('Button.vue', () => {
  // コンポーネントが表示されるかどうか
  it('is a Vue instance', () => {
    const wrapper = mount(Button);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  // it('mountオプションでプロパティを渡す', () => {
  //   const wrapper = mount(type, {
  //     propsData: {
  //       String: 'ボタン'
  //     }
  //   });

  //   expect(wrapper.vm.props.string).toBe()

  // })

});
