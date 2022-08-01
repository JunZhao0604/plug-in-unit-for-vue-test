<!--
 * @Description: 倒计时 特殊样式
 * @Author: Ace
 * @Date: 2021-11-19 14:51:04
 * @LastEditors: 'lipei' lipei@hdkjyfb.com
 * @LastEditTime: 2022-07-27 16:17:46
 * @FilePath: \police-law-admin\src\components\countTime\down-time.vue
 * Copyright (C) 2021 huzhenhong. All rights reserved.
-->
<template>
    <div>
        <div class="time-warp" v-if="isOverTime != '2' && countDownText !== '00:00:00'">
            <span>{{name}}距超时</span>
            <span :class="['time-count',isOverTime == '1'?'cr1':'cr0']">
                {{countDownText}}
            </span>
            <span>请联系客户完成！</span>
        </div>
        <div class="time-warp" v-if="isOverTime == '2' && countDownText !== '00:00:00'">
            <span>{{name}}<span v-if="countDownText !== '已超时'">已超时</span></span>
            <span class="time-count cr2">
                {{countDownText}}
            </span>
            <span>请联系客户完成！</span>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
export default {
    props: {
        info: {
            type: Object,
            default: () => {
                return {
                    systemTime: '',
                    trueOverTime: '',
                    alarmTimeLong: ''
                }
            }
        },
        name: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            timer: null,
            systemTime: '',
            isOverTime: '0', //倒计时
            countDownText: '00:00:00',
        };
    },
    created () {
        this.systemTime = this.info.systemTime;
        this.getTimeState();
        if (this.timer) {
            clearInterval(this.timer)
        }
        this.timer = setInterval(() => this.getTimeState(), 1000);
    },
    methods: {
        getTimeState () {
            let {
                trueOverTime,
                alarmTimeLong
            } = this.info;
            let nowDate = new Date(this.systemTime).getTime();
            let overDate = new Date(trueOverTime).getTime();
            let alarmTime = parseFloat(alarmTimeLong) * 60 * 60 * 1000;
            let countTime = overDate - nowDate;
            // 文字颜色
            if (countTime < alarmTime) {
                this.isOverTime = '1';
            }
            if (countTime < 0) {
                this.isOverTime = '2';
            };
            //console.log(this.isOverTime)
            // 转换时分
            let h = parseInt(Math.abs(countTime) / 1000 / 60 / 60)
            let m = parseInt(Math.abs(countTime) / 1000 / 60 % 60)
            let s = parseInt(Math.abs(countTime) / 1000 % 60)
            h = h >= 10 ? h : '0' + h
            m = m >= 10 ? m : '0' + m
            s = s >= 10 ? s : '0' + s
            if (countTime < 0) {
                this.countDownText = `已超时`;
            } else {
                this.countDownText = `${h}:${m}:${s}`
            }
            let newDate = nowDate + 1000;
            //console.log(newDate)
            this.systemTime = moment(newDate).format('YYYY-MM-DD HH:mm:ss')
        }
    },
    destroyed () {
        if (this.timer) {
            clearInterval(this.timer)
        }
    },
}
</script>

<style lang="scss" scoped>
.time-warp {
    .split-line {
        vertical-align: 2px;
        padding: 0 3px;
    }

    .time-count {
        font-weight: bold;
        font-size: 20px;
        padding-left: 10px;
        vertical-align: -2px;

        &.cr1 {
            color: rgba(230, 162, 60, 1);
        }

        &.cr2 {
            color: #c45556;
        }
    }
}
</style>
