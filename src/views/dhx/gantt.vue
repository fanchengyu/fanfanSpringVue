
<template>
  <div style="width：100%;height:calc(100vh - 60px)">
    <div style="text-align:center;padding:10px 0;">
      <el-row>
        <el-button>编辑</el-button>
        <el-button type="danger">删除</el-button>
        <el-button type="primary">office projrct导入</el-button>
        <el-button type="primary">excel导入</el-button>
        <el-button type="primary" @click="updateCriticalPath">{{ `${showCritical?'隐藏':'显示'}关键路径` }}</el-button>
        <el-button type="success">成功按钮</el-button>
        <el-button type="info">信息按钮</el-button>
        <el-button type="warning">警告按钮</el-button>

        <el-button>默认按钮</el-button>
        <el-button type="primary">主要按钮</el-button>
        <el-button type="success">成功按钮</el-button>
        <el-button type="info">信息按钮</el-button>
        <el-button type="warning">警告按钮</el-button>
        <el-button type="danger">危险按钮</el-button>
      </el-row>
    </div>
    <div
      ref="gantt"
      style="height:100%;padding: 0px;
			margin: 0px;
			overflow: hidden;"
    />
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
        data: [],
        links: []
      },
      ganttS: null,
      showCritical: false
    }
  },
  created() {
    for (let i = 1; i <= 200; i++) {
      this.tasks.data.push({
        id: i,
        // calendar_id: 'custom',
        text: '兰州万里项目',
        start_date: '',
        duration: 0,
        progress: 0.6,
        open: true,
        cs1: 'ddd',
        cs2: 'ddd',
        cs3: 'ddd'
      },
      {
        id: `${i}-1`,
        text: '万里项目规划',
        start_date: '2021-01-17',
        duration: 5,
        progress: 0.1,
        parent: i,
        calendar_id: 'custom',
        open: true
      },
      {
        id: `${i}-2`,
        text: '万里项目进行',
        start_date: '2021-01-25',
        duration: 10,
        progress: 0.3,
        parent: i,
        calendar_id: 'custom',
        open: true
      },
      {
        id: `${i}-3`,
        text: '万里项目收尾',
        start_date: '2021-02-08',
        duration: 3,
        progress: 0.22,
        parent: i,
        calendar_id: 'custom',
        open: true
      },
      {
        id: `${i}-4`,
        text: '万里项目里程碑',
        start_date: '2021-02-12',
        duration: 0,
        progress: 0.22,
        parent: i,
        calendar_id: 'custom',
        open: true,
        type: 'milestone'
      })
      this.tasks.links.push({
        id: `${i}-1`, source: `${i}-1`, target: `${i}-2`, type: '0'
      }, {
        id: `${i}-2`, source: `${i}-2`, target: `${i}-3`, type: '0'
      }, {
        id: `${i}-3`, source: `${i}-3`, target: `${i}-4`, type: '0'
      })
    }
  },
  mounted() {
    // eslint-disable-next-line no-undef
    const ganttS = gantt
    this.ganttS = ganttS
    ganttS.i18n.setLocale('cn')
    ganttS.config.min_column_width = 40
    // ganttS.config.auto_types = true
    ganttS.plugins({
      // click_drag: true,
      tooltip: true,
      multiselect: true, // 多选
      critical_path: true, // 关键路径，
      marker: true // 标记线
    })
    /** 设置时间格式 */
    ganttS.config.xml_date = '%Y-%m-%d'
    ganttS.config.date_format = '%Y-%m-%d %H:%i'
    /** 表格列宽自适应*/
    // ganttS.config.autofit = false
    /** autoscroll 拖拽时的滚动条*/
    ganttS.config.autoscroll = true
    ganttS.config.autoscroll_speed = 60
    /** autosize 自适应甘特图尺寸大小 */
    // ganttS.config.autosize = 'xy'
    // ganttS.config.autosize_min_width = 14600
    var weekScaleTemplate = function(date) {
      const dateToStr = ganttS.date.date_to_str('%M%d日')
      var endDate = ganttS.date.add(ganttS.date.add(date, 1, 'week'), -1, 'day')
      return dateToStr(date) + ' - ' + dateToStr(endDate)
    }
    // ganttS.templates.timeline_cell_class = function(item, date) {
    //   if (!ganttS.isWorkTime(date)) {
    //     return 'weekend'
    //   }
    // }

    var daysStyle = function(date) {
      if (date.getDay() === 0 || date.getDay() === 6) {
        return 'weekend'
      }
      return ''
    }
    ganttS.config.scales = [
      { unit: 'month', format: '%Y年%M' },
      { unit: 'week', step: 1, format: weekScaleTemplate },
      { unit: 'day', step: 1, format: '%D', css: daysStyle },
      { unit: 'day', step: 1, format: '%j', css: daysStyle }
    ]
    ganttS.config.scale_height = 90

    /** 行编辑功能 */
    const textEditor = { type: 'text', map_to: 'text' }
    const dateEditor = { type: 'date', map_to: 'start_date', min: new Date(2018, 0, 1), max: new Date(2059, 0, 1) }
    const durationEditor = { type: 'number', map_to: 'duration', min: 0, max: 100 }
    ganttS.config.reorder_grid_columns = true
    ganttS.config.columns = [
      { name: 'wbs', label: 'WBS', resize: true, width: 80, align: 'center', template: ganttS.getWBSCode },
      { name: 'text', label: '项目名称', tree: true, min_width: 180, editor: textEditor, resize: true },
      { name: 'start_date', label: '开始时间', align: 'center', editor: dateEditor, resize: true },
      { name: 'duration', label: '工期', align: 'center', width: 100, editor: durationEditor, resize: true },
      { name: 'add', label: '', resize: true }
    ]
    /** 自定义编辑事件 */
    var mapping = {
      init: function(inlineEditors) {
        ganttS.attachEvent('onTaskDblClick', function(id, e) {
          var cell = inlineEditors.locateCell(e.target)
          if (cell && inlineEditors.getEditorConfig(cell.columnName)) {
            inlineEditors.startEdit(cell.id, cell.columnName)
            return false
          }
          return true
        })
        ganttS.attachEvent('onEmptyClick', function() {
          inlineEditors.hide()
          return true
        })
      },
      onShow: function(inlineEditors, node) {
        node.onkeydown = function(e) {
          e = e || window.event
          if (e.defaultPrevented) {
            return
          }

          var keyboard = ganttS.constants.KEY_CODES

          var shouldPrevent = true
          switch (e.keyCode) {
            case ganttS.keys.edit_save:
              inlineEditors.save()
              break
            case ganttS.keys.edit_cancel:
              inlineEditors.hide()
              break
            case keyboard.TAB:
              if (e.shiftKey) {
                inlineEditors.editPrevCell(true)
              } else {
                inlineEditors.editNextCell(true)
              }
              break
            default:
              shouldPrevent = false
              break
          }
          if (shouldPrevent) {
            e.preventDefault()
          }
        }
      },
      onHide: function(inlineEditors, node) {}
    }
    ganttS.ext.inlineEditors.setMapping(mapping)
    /** 表头排序 */
    ganttS.config.sort = true

    /** 左侧表格横向 */
    // ganttS.config.layout = {
    //   css: 'gantt_container',
    //   cols: [
    //     {
    //       width: 400,
    //       min_width: 300,
    //       rows: [
    //         { view: 'grid', scrollX: 'gridScroll', scrollable: true, scrollY: 'scrollVer' },
    //         { view: 'scrollbar', id: 'gridScroll', group: 'horizontal' }
    //       ]
    //     },
    //     { resizer: true, width: 1 },
    //     {
    //       rows: [
    //         { view: 'timeline', scrollX: 'scrollHor', scrollY: 'scrollVer' },
    //         { view: 'scrollbar', id: 'scrollHor', group: 'horizontal' }
    //       ]
    //     },
    //     { view: 'scrollbar', id: 'scrollVer' }
    //   ]
    // }

    // ganttS.attachEvent('onParse', function() {
    //   ganttS.eachTask(function(task) {
    //     // fill 'task.user' field with random data
    //     task.user = Math.round(Math.random() * 3)
    //     //
    //     if (ganttS.hasChild(task.id)) { task.type = ganttS.config.types.project }
    //   })
    // })

    ganttS.config.drag_links = true
    /** 任务的逻辑关系提示 */
    const that = this
    ganttS.attachEvent('onLinkClick', function(id) {
      var link = this.getLink(id)
      var src = this.getTask(link.source)
      var trg = this.getTask(link.target)
      var types = this.config.links

      var first = ''; var second = ''
      console.log(types)
      switch (link.type) {
        case types.finish_to_start:
          first = '完成'
          second = '开始'
          break
        case types.start_to_start:
          first = '开始'
          second = '开始'
          break
        case types.finish_to_finish:
          first = '完成'
          second = '完成'
          break
        case types.start_to_finish:
          first = '开始'
          second = '完成'
          break
      }
      that.$message.warning(`必须${first}${src.text}才能${second}${trg.text}`)
      // ganttS.message()
    })

    /** 里程碑 */
    ganttS.templates.rightside_text = function(start, end, task) {
      if (task.type === ganttS.config.types.milestone) {
        return task.text
      }
      return ''
    }
    ganttS.config.lightbox.sections = [
      { name: 'description', height: 70, map_to: 'text', type: 'textarea', focus: true },
      { name: 'type', type: 'typeselect', map_to: 'type' },
      { name: 'time', type: 'duration', map_to: 'auto' }
    ]
    ganttS.config.multiselect = true
    ganttS.config.multiselect_one_level = true
    /** 弹出框左下角的按钮 */
    // ganttS.locale.labels['complete_button'] = '完成'

    // ganttS.locale.labels.icon_save = '保存'
    // ganttS.locale.labels.icon_cancel = '取消'
    // ganttS.locale.labels.icon_delete = '删除'

    // ganttS.attachEvent('onGanttReady', function() {
    //   ganttS.config.buttons_left = ['gantt_save_btn', 'gantt_cancel_btn',
    //     'complete_button']
    // })

    /** 拖拽新建项目--后续看 */
    // ganttS.config.click_drag = {
    //   callback: onDragEnd,
    //   singleRow: true
    // }
    // function onDragEnd(startPoint, endPoint, startDate, endDate, tasksBetweenDates, tasksInRow) {
    //   if (tasksInRow.length === 1) {
    //     var currentTask = tasksInRow[0]
    //     if (currentTask.type === 'project') {
    //       currentTask.render = 'split'
    //       ganttS.addTask({
    //         text: 'Subtask of ' + currentTask.text,
    //         start_date: ganttS.roundDate(startDate),
    //         end_date: ganttS.roundDate(endDate)
    //       }, currentTask.id)
    //     } else {
    //       var projectName = 'new Project ' + currentTask.text
    //       var newProject = ganttS.addTask({
    //         text: projectName,
    //         render: 'split',
    //         type: 'project'
    //       }, currentTask.parent)
    //       ganttS.moveTask(newProject, ganttS.getTaskIndex(currentTask.id), ganttS.getParent(currentTask.id))
    //       ganttS.moveTask(currentTask.id, 0, newProject)
    //       ganttS.calculateTaskLevel(currentTask)

    //       var newTask = ganttS.addTask({
    //         text: 'Subtask of ' + projectName,
    //         start_date: ganttS.roundDate(startDate),
    //         end_date: ganttS.roundDate(endDate)
    //       }, newProject)
    //       ganttS.calculateTaskLevel(newTask)
    //     }
    //   } else if (tasksInRow.length === 0) {
    //     ganttS.createTask({
    //       text: 'New task',
    //       start_date: ganttS.roundDate(startDate),
    //       end_date: ganttS.roundDate(endDate)
    //     })
    //   }
    // }
    /** 拖拽时避开周六周日 */
    ganttS.config.work_time = true
    ganttS.config.correct_work_time = true

    /** 甘特图显示标记线 */
    const dateToStrMarker = ganttS.date.date_to_str('%Y年%M%d日')
    const today = new Date()
    ganttS.addMarker({
      start_date: today,
      css: 'today',
      text: '今天',
      title: '今天: ' + dateToStrMarker(today)
    })
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

    ganttS.init(this.$refs.gantt)
    console.log('性能', this.tasks)
    ganttS.parse(this.tasks)

    console.log('gantt', ganttS)
  },
  methods: {
    /** 显示/隐藏关键路径 */
    updateCriticalPath() {
      this.showCritical = !this.showCritical
      this.ganttS.config.highlight_critical_path = this.showCritical
      this.ganttS.render()
    }
  }
}
</script>

<style >
/* @import '~dhtmlx-gantt/codebase/dhtmlxgantt.css'; */
.complete_button {
  margin-top: 2px;
  background-image: url('/img/icons/android-chrome-192x192.png');
  width: 20px;
}
.gantt_task_line.gantt_dependent_task {
			background-color: #65c16f;
			border: 1px solid #3c9445;
		}
.gantt_task_line.gantt_dependent_task .gantt_task_progress {
			background-color: #46ad51;
		}
    .weekend{
			background: #F0DFE5 !important;
		}
</style>
