import PuiRadio from '../packages/components/pui-radio/pui-radio'
import { action } from '@storybook/addon-actions'

export default {
  title: 'PRIME-UI/Radio',
  component: PuiRadio,
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
  components: { PuiRadio },
  template: '<pui-radio v-bind="$props" @change="action" ></pui-radio>',
  methods: {
    action: action('Pui-Radio Changed.')
  }
})

export const Default = Template.bind({})
Default.args = {
  label: 'Pui-Radio',
  value: 'Pui-Radio'
}
export const Primary = Template.bind({})
Primary.args = {
  ...Default.args,
  type: 'primary'
}
export const Success = Template.bind({})
Success.args = {
  ...Default.args,
  type: 'success'
}
export const Info = Template.bind({})
Info.args = {
  ...Default.args,
  type: 'info'
}
export const Warning = Template.bind({})
Warning.args = {
  ...Default.args,
  type: 'warning'
}
export const Danger = Template.bind({})
Danger.args = {
  ...Default.args,
  type: 'danger'
}
