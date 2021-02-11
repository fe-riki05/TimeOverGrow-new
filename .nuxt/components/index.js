export { default as AddButton } from '../../components/AddButton.vue'
export { default as ButtonDelete } from '../../components/ButtonDelete.vue'
export { default as ButtonUpdate } from '../../components/ButtonUpdate.vue'
export { default as Chart } from '../../components/Chart.vue'
export { default as Main } from '../../components/Main.vue'
export { default as Message } from '../../components/Message.vue'
export { default as MessageList } from '../../components/MessageList.vue'
export { default as SocialLogin } from '../../components/SocialLogin.vue'
export { default as Spinner } from '../../components/Spinner.vue'
export { default as TagSearch } from '../../components/TagSearch.vue'
export { default as TextBox } from '../../components/TextBox.vue'
export { default as TotalTime } from '../../components/TotalTime.vue'

export const LazyAddButton = import('../../components/AddButton.vue' /* webpackChunkName: "components/add-button" */).then(c => c.default || c)
export const LazyButtonDelete = import('../../components/ButtonDelete.vue' /* webpackChunkName: "components/button-delete" */).then(c => c.default || c)
export const LazyButtonUpdate = import('../../components/ButtonUpdate.vue' /* webpackChunkName: "components/button-update" */).then(c => c.default || c)
export const LazyChart = import('../../components/Chart.vue' /* webpackChunkName: "components/chart" */).then(c => c.default || c)
export const LazyMain = import('../../components/Main.vue' /* webpackChunkName: "components/main" */).then(c => c.default || c)
export const LazyMessage = import('../../components/Message.vue' /* webpackChunkName: "components/message" */).then(c => c.default || c)
export const LazyMessageList = import('../../components/MessageList.vue' /* webpackChunkName: "components/message-list" */).then(c => c.default || c)
export const LazySocialLogin = import('../../components/SocialLogin.vue' /* webpackChunkName: "components/social-login" */).then(c => c.default || c)
export const LazySpinner = import('../../components/Spinner.vue' /* webpackChunkName: "components/spinner" */).then(c => c.default || c)
export const LazyTagSearch = import('../../components/TagSearch.vue' /* webpackChunkName: "components/tag-search" */).then(c => c.default || c)
export const LazyTextBox = import('../../components/TextBox.vue' /* webpackChunkName: "components/text-box" */).then(c => c.default || c)
export const LazyTotalTime = import('../../components/TotalTime.vue' /* webpackChunkName: "components/total-time" */).then(c => c.default || c)
