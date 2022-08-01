import MyCountTime from './CountTime.vue';

export default {
    title: 'Example/CountTime',
    component: MyCountTime,
    argTypes: {
    //   backgroundColor: { control: 'color' },
    //   size: {
    //     control: { type: 'select' },
    //     options: ['small', 'medium', 'large'],
    //   },
    },
};

  // More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { MyCountTime },
    template: '<CountTime :name="wordOrderInfo.workStatusName" :info="timeInfo"></CountTime>',
});

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Primary.args = {
    primary: true,
    label: '',
};