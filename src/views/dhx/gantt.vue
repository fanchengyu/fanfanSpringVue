
<template>
  <div style="width：100%;height:calc(100vh - 60px)">
    <div style="text-align:center;padding:10px 0;">
      <el-row style="display:flex;justify-content: center">
        <el-upload
          style="padding: 0 10px;"
          :show-file-list="false"
          action="#"
          accept=".mpp,.xml,.MPP,.XML"
          :http-request="importByMPP"
        >
          <el-button type="primary">通过mpp或xml导入</el-button>
        </el-upload>
        <el-upload
          style="padding: 0 10px;"
          :show-file-list="false"
          action="#"
          accept=".xls,.xlsx,.XLS,.XLSX"
          :http-request="importByEXC"
        >
          <el-button type="primary">通过EXCEL导入</el-button>
        </el-upload>

        <el-button type="primary" @click="updateCriticalPath">{{ `${showCritical?'隐藏':'显示'}关键路径(收费)` }}</el-button>
        <el-button type="success" @click="undo">回退</el-button>
        <el-button type="info" @click="redo">前进</el-button>
        <el-button type="warning" @click="exportPDF">导出为PDF</el-button>
        <el-button @click="exportToPNG">导出为PNG</el-button>
        <el-button type="primary" @click="exportToMP">导出为MS Project</el-button>
        <el-button type="success" @click="exportToExcel">导出为Excel</el-button>
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
import { publicConfigGantt } from '../../common/mixin'
export default {
  name: 'Gantt',
  components: {},
  mixins: [publicConfigGantt],
  data() {
    return {
      tasks: {
        data: [],
        links: []
      },
      showCritical: false,
      calendarId: null
    }
  },
  created() {
    for (let i = 1; i <= 5; i++) {
      this.tasks.data.push({
        id: i,
        // calendar_id: 'custom',
        text: '航天六院项目',
        start_date: '',
        duration: 0,
        // type: 'project',
        // render: 'split',
        progress: 0.6,
        open: true
      },
      {
        id: `${i}-1`,
        text: '航天六院项目规划',
        start_date: '2021-01-17',
        duration: 5,
        progress: 0.1,
        parent: i,
        deadline: '2021-01-20 00-00-00',
        planned_start: '2021-01-15',
        planned_end: '2021-01-18',
        calendar_id: 'roots',
        open: true
      },
      {
        id: `${i}-2`,
        text: '航天六院项目进行',
        start_date: '2021-01-25',
        duration: 10,
        progress: 0.3,
        parent: i,
        calendar_id: 'custom',
        open: true
      },
      {
        id: `${i}-3`,
        text: '航天六院项目收尾',
        start_date: '2021-02-08',
        duration: 3,
        progress: 0.22,
        parent: i,
        calendar_id: 'custom',
        open: true
      },
      {
        id: `${i}-4`,
        text: '航天六院项目里程碑',
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
    /** 自定义工作日 */
    // this.setCalendarId()
    /** gantt Alert */
    // this.alert()
    this.gantt.init(this.$refs.gantt)
    this.gantt.parse(this.tasks)

    console.log('gantt', this.gantt)
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
    },
    exportPDF() {
      this.gantt.exportToPDF()
    },
    exportToPNG() {
      this.gantt.exportToPNG()
    },
    exportToMP() {
      this.gantt.exportToMSProject()
    },
    exportToExcel() {
      this.gantt.exportToExcel()
    },
    importByMPP(file) {
      this.gantt.importFromMSProject({
        data: file.file,
        callback: (project) => {
          if (project) {
            this.gantt.parse(project.data)
          }
        }
      })
    },
    importByEXC(file) {
      this.gantt.importFromExcel({
        // server: 'https://export.dhtmlx.com/gantt',
        data: file.file,
        callback: (project) => {
          if (project) {
            var header = []
            var headerControls = []
            var body = []

            project.forEach((task) => {
              var cols = []
              if (!header.length) {
                for (var i in task) {
                  header.push(i)
                }
                header.forEach((col, index) => {
                  cols.push('<th>' + col + '</th>')
                  headerControls.push("<td><select data-column-mapping='" + col + "'>" + this.getOptions(index) + '</select>')
                })
                body.push('<tr>' + cols.join('') + '</tr>')
                body.push('<tr>' + headerControls.join('') + '</tr>')
              }
              cols = []
              header.forEach((col) => {
                cols.push('<td>' + task[col] + '</td>')
              })
              body.push('<tr>' + cols.join('') + '</tr>')
            })

            var div = this.gantt.modalbox({
              title: 'Assign columns',
              type: 'excel-form',
              text: '<table>' + body.join('') + '</table>',
              buttons: [
                { label: 'Save', css: 'link_save_btn', value: 'save' },
                { label: 'Cancel', css: 'link_cancel_btn', value: 'cancel' }
              ],
              callback: (result) => {
                switch (result) {
                  case 'save':
                    var selects = div.querySelectorAll('[data-column-mapping]')
                    var mapping = {}
                    selects.forEach((select) => {
                      mapping[select.getAttribute('data-column-mapping')] = select.value
                    })
                    this.loadTable(mapping, project)
                    break
                  case 'cancel':
                    // Cancel
                    break
                }
              }
            })
          }
        }
      })
    },
    loadTable(mapping, data) {
      var ganttDataset = {
        data: [],
        links: []
      }

      data.forEach((item) => {
        var copy = {}
        for (var i in item) {
          if (mapping[i]) {
            copy[mapping[i]] = item[i]
          } else {
            copy[this.to_snake_case(i)] = item[i]
          }
          copy.open = true
          if (copy.wbs) {
            var wbs = copy.wbs + ''
            copy.id = wbs
            var parts = wbs.split('.')
            parts.pop()
            copy.parent = parts.join('.')
          }
        }
        ganttDataset.data.push(copy)
      })
      console.log('OOOOKK', ganttDataset)
      this.gantt.clearAll()
      this.gantt.parse(ganttDataset)
    },
    getOptions(selectedIndex) {
      return [
        'wbs', 'text', 'start_date', 'duration', 'end_date', 'id', 'parent'
      ].map((name, index) => {
        return "<option value='" + name + "' " + (selectedIndex === index ? 'selected' : '') + '>' + name + '</option>'
      }).join('')
    },
    to_snake_case(name) {
      return (name + '').toLowerCase().replace(/ /, '_')
    },
    /** 设置/获取日历ID */
    setCalendarId() {
      const s = this.gantt.getCalendar()
      console.log({ s })
      const calendarId = this.gantt.addCalendar({
        id: 'roots', // optional
        worktime: {
          hours: ['8:00-17:00'],
          days: [1, 0, 0, 1, 1, 1, 1]
        }
      })
      console.log({ calendarId })
      const m = this.gantt.getCalendar('roots')
      console.log({ m })
    },
    /** 测试ganttAlert */
    alert() {
      this.gantt.alert({
        title: 'Alert',
        type: 'alert-error',
        text: '错误'
      })
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

		.gantt_task_cell.week_end {
			background-color: #EFF5FD;
		}

		.gantt_selected .gantt_task_cell.week_end {
			background-color: #f0e493;
		}
    /**deadline */
    .deadline {
			position: absolute;
			border-radius: 12px;
			border: 2px solid #585858;
			-moz-box-sizing: border-box;
			box-sizing: border-box;

			width: 22px;
			height: 22px;
			margin-left: -11px;
			margin-top: 6px;
			z-index: 1;
			background: url("/img/icons/bj.jpg") center no-repeat;
		}

		.overdue-indicator {
			width: 24px;
			margin-top: 5px;
			height: 24px;
			-moz-box-sizing: border-box;
			box-sizing: border-box;
			border-radius: 17px;
			color: white;
			background: rgb(255, 60, 60);
			line-height: 25px;
			text-align: center;
			font-size: 24px;
		}
    /**baseline */
    .baseline {
			position: absolute;
			border-radius: 2px;
			opacity: 0.6;
			margin-top: -7px;
			height: 12px;
			background: #ffd180;
			border: 1px solid rgb(255, 153, 0);
		}

		/* .gantt_task_line, .gantt_line_wrapper {
			margin-top: -9px;
		} */

		/* .gantt_side_content {
			margin-bottom: 7px;
		} */

		/* .gantt_task_link .gantt_link_arrow {
			margin-top: -12px
		} */

		.gantt_side_content.gantt_right {
			bottom: 0;
		}
</style>
