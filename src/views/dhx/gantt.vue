
<template>
  <div style="width：100%;height:calc(100vh - 60px)">
    <div style="text-align:center;padding:10px 0;">
      <el-row>
        <el-button>编辑</el-button>
        <el-button type="danger">删除</el-button>
        <el-button type="primary">office projrct导入</el-button>
        <el-button type="primary">excel导入</el-button>
        <el-button type="primary" @click="updateCriticalPath">{{ `${showCritical?'隐藏':'显示'}关键路径(收费)` }}</el-button>
        <el-button type="success" @click="undo">回退</el-button>
        <el-button type="info" @click="redo">前进</el-button>
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
      class="ok"
      style="height:100%;padding: 0px;
			margin: 0px;
			overflow: hidden;"
    />
  </div>
</template>
<script>
import { gantt } from 'dhtmlx-gantt'
export default {
  name: 'Gantt',
  components: {},
  data() {
    return {
      tasks: {
        data: [],
        links: []
      },
      gantt: null,
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
        // type: 'project',
        // render: 'split',
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
    this.gantt = gantt
    gantt.i18n.setLocale('cn')
    gantt.config.min_column_width = 40
    // gantt.config.auto_types = true
    gantt.plugins({
      // click_drag: true,
      tooltip: true,
      multiselect: true, // 多选
      critical_path: true, // 关键路径，
      marker: true, // 标记线,
      undo: true // 回退
      // keyboard_navigation: true // 键盘操作
    })
    //  隐藏周末  收费
    // gantt.ignore_time = function(date) {
    //   if (date.getDay() === 0 || date.getDay() === 6) { return true }
    //   return false
    // }
    /** 设置时间格式 */
    gantt.config.xml_date = '%Y-%m-%d'
    gantt.config.date_format = '%Y-%m-%d %H:%i'
    /** 表格列宽自适应*/
    // gantt.config.autofit = false
    /** autoscroll 拖拽时的滚动条*/
    gantt.config.autoscroll = true
    gantt.config.autoscroll_speed = 60
    /** autosize 自适应甘特图尺寸大小 */
    // gantt.config.autosize = 'xy'
    // gantt.config.autosize_min_width = 14600
    var weekScaleTemplate = function(date) {
      const dateToStr = gantt.date.date_to_str('%M%d日')
      var endDate = gantt.date.add(gantt.date.add(date, 1, 'week'), -1, 'day')
      return dateToStr(date) + ' - ' + dateToStr(endDate)
    }
    // gantt.templates.timeline_cell_class = function(item, date) {
    //   if (!gantt.isWorkTime(date)) {
    //     return 'weekend'
    //   }
    // }
    // gantt.templates.scale_cell_class = function(date) {
    //   if (date.getDay() === 0 || date.getDay() === 6) {
    //     return 'weekend'
    //   }
    // }
    gantt.templates.timeline_cell_class = function(item, date) {
      if (date.getDay() === 0 || date.getDay() === 6) {
        return 'weekend'
      }
    }

    var daysStyle = function(date) {
      if (date.getDay() === 0 || date.getDay() === 6) {
        return 'weekend'
      }
      return ''
    }
    gantt.config.scales = [
      { unit: 'month', format: '%Y年%M' },
      { unit: 'week', step: 1, format: weekScaleTemplate },
      { unit: 'day', step: 1, format: '%D', css: daysStyle },
      { unit: 'day', step: 1, format: '%j', css: daysStyle }
    ]
    gantt.config.scale_height = 90

    /** 行编辑功能 */
    const textEditor = { type: 'text', map_to: 'text' }
    const dateEditor = { type: 'date', map_to: 'start_date', min: new Date(2018, 0, 1), max: new Date(2059, 0, 1) }
    const durationEditor = { type: 'number', map_to: 'duration', min: 0, max: 100 }
    gantt.config.reorder_grid_columns = true
    gantt.config.columns = [
      { name: 'wbs', label: 'WBS', resize: true, width: 80, align: 'center', template: gantt.getWBSCode },
      { name: 'text', label: '项目名称', tree: true, min_width: 180, editor: textEditor, resize: true },
      { name: 'start_date', label: '开始时间', align: 'center', editor: dateEditor, resize: true },
      { name: 'duration', label: '工期', align: 'center', width: 100, editor: durationEditor, resize: true },
      { name: 'add', label: '', resize: true }
    ]
    /** 自定义编辑事件 */
    var mapping = {
      init: function(inlineEditors) {
        gantt.attachEvent('onTaskDblClick', function(id, e) {
          var cell = inlineEditors.locateCell(e.target)
          if (cell && inlineEditors.getEditorConfig(cell.columnName)) {
            inlineEditors.startEdit(cell.id, cell.columnName)
            return false
          }
          return true
        })
        gantt.attachEvent('onEmptyClick', function() {
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

          var keyboard = gantt.constants.KEY_CODES

          var shouldPrevent = true
          switch (e.keyCode) {
            case gantt.keys.edit_save:
              inlineEditors.save()
              break
            case gantt.keys.edit_cancel:
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
    gantt.ext.inlineEditors.setMapping(mapping)
    /** 表头排序 */
    gantt.config.sort = true

    /** 左侧表格横向 */
    // gantt.config.layout = {
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

    // gantt.attachEvent('onParse', function() {
    //   gantt.eachTask(function(task) {
    //     // fill 'task.user' field with random data
    //     task.user = Math.round(Math.random() * 3)
    //     //
    //     if (gantt.hasChild(task.id)) { task.type = gantt.config.types.project }
    //   })
    // })

    gantt.config.drag_links = true
    /** 任务的逻辑关系提示 */
    const that = this
    gantt.attachEvent('onLinkClick', function(id) {
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
      // gantt.message()
    })

    /** 里程碑 */
    gantt.templates.rightside_text = function(start, end, task) {
      if (task.type === gantt.config.types.milestone) {
        return task.text
      }
      return ''
    }
    gantt.config.lightbox.sections = [
      { name: 'description', height: 70, map_to: 'text', type: 'textarea', focus: true },
      { name: 'type', type: 'typeselect', map_to: 'type' },
      { name: 'time', type: 'duration', map_to: 'auto' }
    ]
    gantt.config.multiselect = true
    gantt.config.multiselect_one_level = true
    /** 弹出框左下角的按钮 */
    // gantt.locale.labels['complete_button'] = '完成'

    // gantt.locale.labels.icon_save = '保存'
    // gantt.locale.labels.icon_cancel = '取消'
    // gantt.locale.labels.icon_delete = '删除'

    // gantt.attachEvent('onGanttReady', function() {
    //   gantt.config.buttons_left = ['gantt_save_btn', 'gantt_cancel_btn',
    //     'complete_button']
    // })

    /** 拖拽新建项目--后续看 */
    // gantt.config.click_drag = {
    //   callback: onDragEnd,
    //   singleRow: true
    // }
    // function onDragEnd(startPoint, endPoint, startDate, endDate, tasksBetweenDates, tasksInRow) {
    //   if (tasksInRow.length === 1) {
    //     var currentTask = tasksInRow[0]
    //     if (currentTask.type === 'project') {
    //       currentTask.render = 'split'
    //       gantt.addTask({
    //         text: 'Subtask of ' + currentTask.text,
    //         start_date: gantt.roundDate(startDate),
    //         end_date: gantt.roundDate(endDate)
    //       }, currentTask.id)
    //     } else {
    //       var projectName = 'new Project ' + currentTask.text
    //       var newProject = gantt.addTask({
    //         text: projectName,
    //         render: 'split',
    //         type: 'project'
    //       }, currentTask.parent)
    //       gantt.moveTask(newProject, gantt.getTaskIndex(currentTask.id), gantt.getParent(currentTask.id))
    //       gantt.moveTask(currentTask.id, 0, newProject)
    //       gantt.calculateTaskLevel(currentTask)

    //       var newTask = gantt.addTask({
    //         text: 'Subtask of ' + projectName,
    //         start_date: gantt.roundDate(startDate),
    //         end_date: gantt.roundDate(endDate)
    //       }, newProject)
    //       gantt.calculateTaskLevel(newTask)
    //     }
    //   } else if (tasksInRow.length === 0) {
    //     gantt.createTask({
    //       text: 'New task',
    //       start_date: gantt.roundDate(startDate),
    //       end_date: gantt.roundDate(endDate)
    //     })
    //   }
    // }
    /** 拖拽时避开周六周日 */
    gantt.config.work_time = true
    gantt.config.correct_work_time = true

    /** 甘特图显示标记线 */
    const dateToStrMarker = gantt.date.date_to_str('%Y年%M%d日')
    const today = new Date()
    gantt.addMarker({
      start_date: today,
      css: 'today',
      text: '今天',
      title: '今天: ' + dateToStrMarker(today)
    })
    gantt.config.open_tree_initially = true
    gantt.config.order_branch = true
    gantt.config.order_branch_free = true
    gantt.config.tooltip_timeout = 30
    gantt.config.tooltip_hide_timeout = 5000
    gantt.config.tooltip_offset_x = 40
    gantt.config.tooltip_offset_y = 40
    /** 拖拽收费 */
    gantt.config.autofit = true
    gantt.config.grid_width = 1000
    gantt.config.keep_grid_width = false
    gantt.config.grid_resize = true
    gantt.templates.tooltip_text = (start, end, task) => {
      return (
        '<b>项目名称:</b> ' + task.text + '<br/><b>工期:</b> ' + task.duration
      )
    }

    gantt.init(this.$refs.gantt)
    console.log('性能', this.tasks)
    gantt.parse(this.tasks)

    console.log('gantt', gantt)
  },
  methods: {
    /** 显示/隐藏关键路径 */
    updateCriticalPath() {
      this.showCritical = !this.showCritical
      this.gantt.config.highlight_critical_path = this.showCritical
      this.gantt.render()
    },
    undo() {
      this.gantt.undo()
    },
    redo() {
      this.gantt.redo()
    }
  }
}
</script>

<style >
/**gantt_critical_task*/
 @import '~dhtmlx-gantt/codebase/dhtmlxgantt.css';
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
