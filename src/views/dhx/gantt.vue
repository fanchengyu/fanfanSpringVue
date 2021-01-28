
<template>
  <div style="width：100%;height:100%">
    <h1>DHTMLX_GANTT</h1>
    <div ref="gantt" style="height:100%" />
  </div>
</template>
<script>
// import { gantt } from 'dhtmlx-gantt'
export default {
  name: 'Gantt',
  components: {},
  data() {
    return {
      tasks: {
        data: [
          {
            id: 1,
            text: '兰州万里项目',
            start_date: '2021-01-17',
            duration: 30,
            progress: 0.6,
            open: true
          },
          {
            id: 11,
            text: '万里项目规划',
            start_date: '2021-01-17',
            duration: 5,
            progress: 0.1,
            parent: 1,

            calendar_id: 'custom'
          },
          {
            id: 12,
            text: '万里项目进行',
            start_date: '2021-01-22',
            duration: 10,
            progress: 0.3,
            parent: 1,

            calendar_id: 'custom'
          },
          {
            id: 13,
            text: '万里项目收尾',
            start_date: '2021-02-02',
            duration: 3,
            progress: 0.22,
            parent: 1,

            calendar_id: 'custom'
          },
          {
            id: 2,
            text: '兰飞项目',
            start_date: '2021-02-16',
            duration: 16,
            progress: 0.03,
            open: true
          },
          {
            id: 21,
            text: '立项',
            start_date: '2021-02-16',
            duration: 2,
            progress: 0.8,
            parent: 2,

            calendar_id: 'custom'
          },
          {
            id: 22,
            text: '进行',
            start_date: '2021-02-18',
            duration: 11,
            progress: 0.5,
            parent: 2,
            calendar_id: 'custom'
          },
          {
            id: 23,
            text: '收尾',
            start_date: '2021-02-29',
            duration: 2,
            progress: 0.6,
            parent: 2,
            calendar_id: 'custom'
          }
        ],
        links: [{ id: 1, source: 1, target: 2, type: '0' }]
      }
    }
  },
  mounted() {
    // eslint-disable-next-line no-undef
    const ganttS = gantt

    ganttS.plugins({
      tooltip: true,
      multiselect: true
    })
    ganttS.locale.labels.column_duration = '工期'
    ganttS.locale.labels.column_start_date = '开始时间'
    ganttS.locale.labels.column_text = '项目名称'
    const 月 = [
      '一月',
      '二月',
      '三月',
      '四月',
      '五月',
      '六月',
      '七月',
      '八月',
      '九月',
      '十月',
      '十一月',
      '十二月'
    ]
    ganttS.locale.date.month_short = 月
    ganttS.locale.date.month_full = 月
    /** 设置时间格式 */
    ganttS.config.xml_date = '%Y-%m-%d'
    /** 表格列宽自适应*/
    // ganttS.config.autofit = false
    /** autoscroll 拖拽时的滚动条*/
    ganttS.config.autoscroll = true
    ganttS.config.autoscroll_speed = 50
    /** autosize 自适应甘特图尺寸大小 */
    // gantt.config.autosize = 'y'
    ganttS.config.scale_unit = 'day'
    ganttS.config.date_scale = '%Y-%m-%d'
    ganttS.config.drag_links = true
    ganttS.config.multiselect = true
    ganttS.config.multiselect_one_level = true
    /** 弹出框左下角的按钮 */
    ganttS.locale.labels['complete_button'] = '完成'

    ganttS.locale.labels['gantt_cancel_btn'] = '取消'
    ganttS.locale.labels['gantt_delete_btn'] = '删除'
    ganttS.config.open_tree_initially = true
    ganttS.config.order_branch = true
    ganttS.config.order_branch_free = true
    ganttS.config.tooltip_timeout = 30
    ganttS.config.tooltip_hide_timeout = 5000
    ganttS.config.tooltip_offset_x = 40
    ganttS.config.tooltip_offset_y = 40
    ganttS.templates.tooltip_text = (start, end, task) => {
      return (
        '<b>项目名称:</b> ' + task.text + '<br/><b>工期:</b> ' + task.duration
      )
    }
    ganttS.attachEvent('onGanttReady', () => {
      ganttS.config.buttons_left = [
        'gantt_save_btn',
        'gantt_cancel_btn',
        'complete_button'
      ]
    })

    ganttS.init(this.$refs.gantt)
    ganttS.parse(this.tasks)
    console.log('config', ganttS)
  },
  methods: {}
}
</script>

<style >
/* @import '~dhtmlx-gantt/codebase/dhtmlxgantt.css'; */
.complete_button {
  margin-top: 2px;
  /**background-image: url('common/v_complete.png');*/
  width: 20px;
}
</style>
