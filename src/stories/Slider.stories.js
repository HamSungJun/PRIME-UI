import PuiSlider from '../packages/components/pui-slider/pui-slider'
import { action } from '@storybook/addon-actions'

export default {
  title: 'PRIME-UI/Slider',
  component: PuiSlider,
  argTypes: {
    theme: {
      control: {
        type: 'select',
        options: [
          'dark',
          'blue',
          'green',
          'gray',
          'orange',
          'red'
        ]
      }
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { PuiSlider },
  template: '<div style="height: 40px;"><pui-slider v-bind="$props" @change="action"></pui-slider></div>',
  methods: {
    action: action('Pui-Slider Changed.')
  }
})

export const Dark = Template.bind({})
Dark.args = {
  theme: 'dark',
  label: 'Pui-Slider'
}
export const Blue = Template.bind({})
Blue.args = {
  ...Dark.args,
  theme: 'blue'
}
export const Green = Template.bind({})
Green.args = {
  ...Dark.args,
  theme: 'green'
}
export const Gray = Template.bind({})
Gray.args = {
  ...Dark.args,
  theme: 'gray'
}
export const Orange = Template.bind({})
Orange.args = {
  ...Dark.args,
  theme: 'orange'
}
export const Red = Template.bind({})
Red.args = {
  ...Dark.args,
  theme: 'red'
}
