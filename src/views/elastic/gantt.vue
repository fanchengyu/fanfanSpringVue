
<template>
  <div id="gantt">
    <gantt-elastic :tasks="tasks" :options="options">
      <Header slot="header" />
      <!-- <Header slot="footer" /> -->
    </gantt-elastic>
  </div>
</template>
<script>
import GanttElastic from 'gantt-elastic'
import Header from 'gantt-elastic-header'
export default {
  name: 'Gantt',
  components: {
    GanttElastic,
    Header
  },
  data() {
    return {
      tasks: [
        {
          id: 1,
          label: '总项目一',
          user: '无',
          start: '2020-01-17',
          end: '2020-02-02',
          duration: 15 * 24 * 60 * 60 * 1000,
          progress: 85,
          type: 'project'
          // collapsed: true,
        },
        {
          id: 11,
          label: '二级项目一--A',
          user: '无',
          parentId: 1,
          start: '2020-01-17',
          duration: 4 * 24 * 60 * 60 * 1000,
          progress: 50,
          type: 'milestone',
          collapsed: true,
          style: {
            base: {
              fill: '#1EBC61',
              stroke: '#0EAC51'
            }
            /* 'tree-row-bar': {
              fill: '#1EBC61',
              stroke: '#0EAC51'
            },
            'tree-row-bar-polygon': {
              stroke: '#0EAC51'
            }*/
          }
        },
        {
          id: 12,
          label: '二级项目_B',
          user: '',
          parentId: 1,
          start: '2020-01-22',
          duration: 2 * 24 * 60 * 60 * 1000,
          progress: 100,
          type: 'task'
        },
        {
          id: 2,
          label: '总项目二',
          user: '',
          start: '2020-01-24',
          duration: 2 * 24 * 60 * 60 * 1000,
          progress: 50,
          type: 'task',
          dependentOn: [3]
        }
      ],

      options: {
        maxRows: 100,
        maxHeight: 300,
        title: {
          label: 'Your project title as html (link or whatever...)',
          html: false
        },
        row: {
          height: 24
        },
        calendar: {
          hour: {
            display: false
          }
        },
        chart: {
          progress: {
            bar: false
          },
          expander: {
            display: true
          }
        },
        taskList: {
          expander: {
            straight: false
          },
          columns: [
            {
              id: 1,
              label: 'ID',
              value: 'id',
              width: 40
            },
            {
              id: 2,
              label: '项目名称',
              value: 'label',
              width: 200,
              expander: true,
              html: true,
              events: {
                click({ data, column }) {
                  alert('description clicked!\n' + data.label)
                }
              }
            },
            {
              id: 3,
              label: '用户',
              value: 'user',
              width: 130,
              html: true
            },
            {
              id: 3,
              label: '开始时间',
              value: '2020-01-17',
              // value: (task) => dayjs(task.start).format('YYYY-MM-DD'),
              width: 78
            },
            {
              id: 4,
              label: 'Type',
              value: '类型',
              width: 68
            },
            {
              id: 5,
              label: '%',
              value: 'progress',
              width: 35,
              style: {
                'task-list-header-label': {
                  'text-align': 'center',
                  width: '100%'
                },
                'task-list-item-value-container': {
                  'text-align': 'center',
                  width: '100%'
                }
              }
            }
          ]
        }
      }
    }
  },
  mounted() {},
  methods: {}
}
</script>

<style >
</style>
