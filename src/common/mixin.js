/* eslint-disable no-undef */

// import gantt from 'dhtmlx-gantt'

export const publicConfigGantt = {
  data() {
    return {
      gantt: null
    }
  },
  mounted() {
    this.pulicInitGantt()
  },
  methods: {
    pulicInitGantt() {
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
      // gantt.config.reorder_grid_columns = true
      gantt.config.columns = [
        { name: 'wbs', label: 'WBS', resize: true, width: 80, align: 'center', template: gantt.getWBSCode },
        { name: 'text', label: '项目名称', tree: true, width: 180, editor: textEditor, resize: true },
        { name: 'start_date', label: '开始时间', width: 80, align: 'center', editor: dateEditor, resize: true },
        { name: 'deadline', label: 'Deadline', width: 80, align: 'center' },
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
        { name: 'time', type: 'duration', map_to: 'auto' },
        {
          name: 'deadline', map_to: { start_date: 'deadline' },
          type: 'duration_optional',
          button: true,
          single_date: true
        },
        {
          name: 'baseline',
          map_to: { start_date: 'planned_start', end_date: 'planned_end' },
          button: true,
          type: 'duration_optional'
        }
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

      /** 设置deadline */
      gantt.locale.labels.deadline_enable_button = '设置截至日期'
      gantt.locale.labels.deadline_disable_button = '取消'
      gantt.locale.labels.section_deadline = '截至日期'

      /** addTaskLayer是收費的 */
      // gantt.addTaskLayer({
      //   renderer: {
      //     render: function draw_deadline(task) {
      //       if (task.deadline) {
      //         var el = document.createElement('div')
      //         el.className = 'deadline'
      //         var sizes = gantt.getTaskPosition(task, task.deadline)

      //         el.style.left = sizes.left + 'px'
      //         el.style.top = sizes.top + 'px'

      //         el.setAttribute('title', gantt.templates.task_date(task.deadline))
      //         return el
      //       }
      //       return false
      //     },
      //     // define getRectangle in order to hook layer with the smart rendering
      //     getRectangle: function(task, view) {
      //       if (task.deadline) {
      //         return gantt.getTaskPosition(task, task.deadline)
      //       }
      //       return null
      //     }
      //   }
      // })
      gantt.templates.task_class = function(start, end, task) {
        if (task.deadline && end.valueOf() > task.deadline.valueOf()) {
          return 'overdue'
        }
      }

      gantt.templates.rightside_text = function(start, end, task) {
        if (task.deadline) {
          if (end.valueOf() > task.deadline.valueOf()) {
            var overdue = Math.ceil(Math.abs((end.getTime() - task.deadline.getTime()) / (24 * 60 * 60 * 1000)))
            var text = '<b>Overdue: ' + overdue + ' days</b>'
            return text
          }
        }
      }

      gantt.attachEvent('onTaskLoading', function(task) {
        if (task.deadline) { task.deadline = gantt.date.parseDate(task.deadline, 'xml_date') }
        return true
      })
      /** 基线收费 */
      // gantt.config.task_height = 16
      // gantt.config.row_height = 40
      gantt.locale.labels.baseline_enable_button = '设置计划'
      gantt.locale.labels.baseline_disable_button = '删除计划'
      gantt.locale.labels.section_baseline = '计划'
      // adding baseline display
      // gantt.addTaskLayer({
      //   renderer: {
      //     render: function draw_planned(task) {
      //       if (task.planned_start && task.planned_end) {
      //         var sizes = gantt.getTaskPosition(task, task.planned_start, task.planned_end)
      //         var el = document.createElement('div')
      //         el.className = 'baseline'
      //         el.style.left = sizes.left + 'px'
      //         el.style.width = sizes.width + 'px'
      //         el.style.top = sizes.top + gantt.config.task_height + 13 + 'px'
      //         return el
      //       }
      //       return false
      //     },
      //     // define getRectangle in order to hook layer with the smart rendering
      //     getRectangle: function(task, view) {
      //       if (task.planned_start && task.planned_end) {
      //         return gantt.getTaskPosition(task, task.planned_start, task.planned_end)
      //       }
      //       return null
      //     }
      //   }
      // })
      gantt.templates.task_class = function(start, end, task) {
        if (task.planned_end) {
          var classes = ['has-baseline']
          if (end.getTime() > task.planned_end.getTime()) {
            classes.push('overdue')
          }
          return classes.join(' ')
        }
      }

      gantt.templates.rightside_text = function(start, end, task) {
        if (task.planned_end) {
          if (end.getTime() > task.planned_end.getTime()) {
            var overdue = Math.ceil(Math.abs((end.getTime() - task.planned_end.getTime()) / (24 * 60 * 60 * 1000)))
            var text = '<b>Overdue: ' + overdue + ' days</b>'
            return text
          }
        }
      }

      gantt.attachEvent('onTaskLoading', function(task) {
        task.planned_start = gantt.date.parseDate(task.planned_start, 'xml_date')
        task.planned_end = gantt.date.parseDate(task.planned_end, 'xml_date')
        return true
      })
      gantt.config.open_tree_initially = true
      gantt.config.order_branch = true
      gantt.config.order_branch_free = true

      /** 拖拽收费 */
      // gantt.config.autofit = true
      // gantt.config.grid_width = 1000
      // gantt.config.keep_grid_width = false
      // gantt.config.grid_resize = true
      gantt.templates.tooltip_text = (start, end, task) => {
        return (
          '<b>项目名称:</b> ' + task.text + '<br/><b>工期:</b> ' + task.duration
        )
      }

      gantt.init(this.$refs.gantt)
      console.log('性能', this.tasks)
      gantt.parse(this.tasks)
      // gantt.config.grid_width = 0
      this.gantt = gantt
      console.log('gantt', gantt)
    }
  }
}
