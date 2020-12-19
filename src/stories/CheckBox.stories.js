import PuiCheckBox from '../packages/components/pui-checkbox/pui-checkbox'
import { action } from '@storybook/addon-actions'

export default {
  title: 'PRIME-UI/CheckBox',
  component: PuiCheckBox,
  argTypes: {
    theme: {
      control: {
        type: 'select',
        options: [
          'default',
          'blue',
          'green',
          'gray',
          'orange',
          'red'
        ]
      }
    }
    // size: { control: { type: 'select', options: ['default', 'medium', 'small', 'mini'] } }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { PuiCheckBox },
  template: '<pui-checkbox v-bind="$props" @change="action" ></pui-checkbox>',
  methods: {
    action: action('Pui-CheckBox Changed.')
  }
})

export const Default = Template.bind({})
Default.args = {
  theme: 'dark',
  label: 'Pui-CheckBox'
}
export const Blue = Template.bind({})
Blue.args = {
  ...Default.args,
  theme: 'blue'
}
export const Green = Template.bind({})
Green.args = {
  ...Default.args,
  theme: 'green'
}
export const Gray = Template.bind({})
Gray.args = {
  ...Default.args,
  theme: 'gray'
}
export const Orange = Template.bind({})
Orange.args = {
  ...Default.args,
  theme: 'orange'
}
export const Red = Template.bind({})
Red.args = {
  ...Default.args,
  theme: 'red'
}
