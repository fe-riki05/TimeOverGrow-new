export { default as Button } from '../../components/Button.vue'
export { default as Chart } from '../../components/Chart.vue'
export { default as DialogEdit } from '../../components/DialogEdit.vue'
export { default as DialogTime } from '../../components/DialogTime.vue'
export { default as Main } from '../../components/Main.vue'
export { default as Message } from '../../components/Message.vue'
export { default as MessageList } from '../../components/MessageList.vue'
export { default as SocialLogin } from '../../components/SocialLogin.vue'
export { default as Spinner } from '../../components/Spinner.vue'
export { default as TextBox } from '../../components/TextBox.vue'
export { default as TotalTime } from '../../components/TotalTime.vue'

export const LazyButton = import('../../components/Button.vue' /* webpackChunkName: "components/button" */).then(c => c.default || c)
export const LazyChart = import('../../components/Chart.vue' /* webpackChunkName: "components/chart" */).then(c => c.default || c)
export const LazyDialogEdit = import('../../components/DialogEdit.vue' /* webpackChunkName: "components/dialog-edit" */).then(c => c.default || c)
export const LazyDialogTime = import('../../components/DialogTime.vue' /* webpackChunkName: "components/dialog-time" */).then(c => c.default || c)
export const LazyMain = import('../../components/Main.vue' /* webpackChunkName: "components/main" */).then(c => c.default || c)
export const LazyMessage = import('../../components/Message.vue' /* webpackChunkName: "components/message" */).then(c => c.default || c)
export const LazyMessageList = import('../../components/MessageList.vue' /* webpackChunkName: "components/message-list" */).then(c => c.default || c)
export const LazySocialLogin = import('../../components/SocialLogin.vue' /* webpackChunkName: "components/social-login" */).then(c => c.default || c)
export const LazySpinner = import('../../components/Spinner.vue' /* webpackChunkName: "components/spinner" */).then(c => c.default || c)
export const LazyTextBox = import('../../components/TextBox.vue' /* webpackChunkName: "components/text-box" */).then(c => c.default || c)
export const LazyTotalTime = import('../../components/TotalTime.vue' /* webpackChunkName: "components/total-time" */).then(c => c.default || c)
