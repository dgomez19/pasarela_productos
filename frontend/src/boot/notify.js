import { Notify } from 'quasar'
import { boot } from 'quasar/wrappers'

export default boot(({ app }) => {
  Notify.registerType('success', {
    color: 'positive',
    icon: 'check_circle',
    position: 'right'
  })

  Notify.registerType('warning', {
    color: 'warning',
    icon: 'warning',
    position: 'right'
  })

  Notify.registerType('error', {
    color: 'negative',
    icon: 'error',
    position: 'right'
  })
})
