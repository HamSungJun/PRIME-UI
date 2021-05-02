import PuiRadio from '../packages/components/pui-radio/pui-radio'
import { action } from '@storybook/addon-actions'

export default {
  title: 'PRIME-UI/Components/Radio',
  component: PuiRadio,
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
  components: { PuiRadio },
  template: '<pui-radio v-bind="$props" @change="action" ></pui-radio>',
  methods: {
    action: action('Pui-Radio Changed.')
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
