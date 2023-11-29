<template>
  <div class="content">
    <div class="row">
      <div class="col-md-6">
        <card>
          <template slot="header">
            <h4>开课最多的学院Top5</h4>
          </template>
          <div id="departments_with_most_lessons"></div>
        </card>
      </div>
      <div class="col-md-6">
        <card>
          <template slot="header">
            <h4>教授学生最多的老师Top5</h4>
          </template>
          <div id="teachers_with_most_students"></div>
        </card>
      </div>
      <div class="col-md-12">
        <card>
          <div class="row">
            <div class="col-md-6 ml-auto mr-auto text-center">
              <h4 class="card-title">最受欢迎的课程top10</h4>
            </div>
            <div id="lessons_most_popular"></div>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
import { Card } from "@/components/index";

import NotificationTemplate from "./Notifications/NotificationTemplate";
import * as echarts from "echarts";
import request from "../utils/request";

export default {
  components: {
    Card,
  },
  data() {
    return {
      department_bar_data_yaxis: [],
      department_bar_data_series: [],
      teacher_bar_data_yaxis: [],
      teacher_bar_data_series: [],
      lesson_bar_data_xaxis: [],
      lesson_bar_data_series: [],
    };
  },
  mounted() {
    this.showCharts();
  },
  methods: {
    notifyVue(verticalAlign, horizontalAlign) {
      const color = Math.floor(Math.random() * 4 + 1);
      this.$notify({
        component: NotificationTemplate,
        icon: "tim-icons icon-bell-55",
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: this.type[color],
        timeout: 0,
      });
    },
    async getDepartmentInfo() {
      const vm = this;
      await request
        .post("http://localhost:9090/getMostClassKKDW")
        .then((res) => {
          vm.department_bar_data_yaxis = res.axis;
          vm.department_bar_data_series = res.series;
        });
    },
    async getTeacherInfo() {
      const vm = this;
      await request.post("http://localhost:9090/getTAndsnum").then((res) => {
        vm.teacher_bar_data_yaxis = res.axis;
        vm.teacher_bar_data_series = res.series;
      });
    },
    async getLessonInfo() {
      const vm = this;
      await request.post("http://localhost:9090/getXKL").then((res) => {
        vm.lesson_bar_data_xaxis = res.axis;
        vm.lesson_bar_data_series = res.series;
      });
    },
    async showDepartmentInfo() {
      const vm = this;
      const myChart = echarts.init(
        document.getElementById("departments_with_most_lessons")
      );
      myChart.showLoading();
      await vm.getDepartmentInfo().then((res) => {
        const option = {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          legend: {},
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          xAxis: {
            type: "value",
            boundaryGap: [0, 0.01],
          },
          yAxis: {
            type: "category",
            data: vm.department_bar_data_yaxis,
          },
          series: [
            {
              type: "bar",
              data: vm.department_bar_data_series,
            },
          ],
        };
        myChart.clear();
        myChart.hideLoading();
        myChart.setOption(option, true);
        window.addEventListener("resize", () => {
          myChart.resize();
        });
      });
    },
    async showTeacherInfo() {
      const vm = this;
      const myChart = echarts.init(
        document.getElementById("teachers_with_most_students")
      );
      myChart.showLoading();
      await vm.getTeacherInfo().then((res) => {
        const option = {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          legend: {},
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          xAxis: {
            type: "value",
            boundaryGap: [0, 0.01],
          },
          yAxis: {
            type: "category",
            data: vm.teacher_bar_data_yaxis,
          },
          series: [
            {
              type: "bar",
              color: "#66ff33",
              data: vm.teacher_bar_data_series,
            },
          ],
        };
        myChart.clear();
        myChart.hideLoading();
        myChart.setOption(option, true);
        window.addEventListener("resize", () => {
          myChart.resize();
        });
      });
    },
    async showLessonInfo() {
      const vm = this;
      const myChart = echarts.init(
        document.getElementById("lessons_most_popular")
      );
      myChart.showLoading();
      await vm.getLessonInfo().then((res) => {
        const option = {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          xAxis: [
            {
              type: "category",
              data: vm.lesson_bar_data_xaxis,
              axisTick: {
                alignWithLabel: true,
              },
              axisLabel: {
                interval: 0,
                rotate: 20,
              },
            },
          ],
          yAxis: [
            {
              type: "value",
            },
          ],
          series: [
            {
              name: "选课率",
              type: "bar",
              barWidth: "60%",
              color: "#ff3399",
              data: vm.lesson_bar_data_series,
            },
          ],
        };
        myChart.hideLoading();
        myChart.clear();
        myChart.setOption(option, true);
        window.addEventListener("resize", () => {
          myChart.resize();
        });
      });
    },
    async showCharts() {
      this.showDepartmentInfo();
      this.showTeacherInfo();
      this.showLessonInfo();
    },
  },
};
</script>
<style>
#departments_with_most_lessons {
  height: 600px;
  width: 600px;
}
#teachers_with_most_students {
  height: 600px;
  width: 600px;
}
#lessons_most_popular {
  height: 600px;
  width: 1500px;
}
</style>
