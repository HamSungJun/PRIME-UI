import PuiButton from '../packages/components/pui-button/pui-button'
import { action } from '@storybook/addon-actions'

export default {
  title: 'PRIME-UI/Components/Button',
  component: PuiButton,
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: [
          'default',
          'primary',
          'success',
          'info',
          'warning',
          'danger'
        ]
      }
    },
    size: { control: { type: 'select', options: ['default', 'medium', 'small', 'mini'] } }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { PuiButton },
  template: '<pui-button v-bind="$props" @click="action">Pui-Button</pui-button>',
  methods: {
    action: action('Pui-Button Clicked')
  }
})

export const Default = Template.bind({})
export const Primary = Template.bind({})
Primary.args = {
  type: 'primary'
}
export const Success = Template.bind({})
Success.args = {
  type: 'success'
}
export const Info = Template.bind({})
Info.args = {
  type: 'info'
}
export const Warning = Template.bind({})
Warning.args = {
  type: 'warning'
}
export const Danger = Template.bind({})
Danger.args = {
  type: 'danger'
}
