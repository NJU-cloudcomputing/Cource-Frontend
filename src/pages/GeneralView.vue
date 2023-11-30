<template>
  <div class="content">
    <div class="row">
      <div class="col-md-6">
        <card>
          <template slot="header">
            <h4>各校区选课统计</h4>
          </template>
          <div id="campus_statistics"></div>
        </card>
      </div>
      <div class="col-md-6">
        <card>
          <template slot="header">
            <h4>计算机系选课统计</h4>
          </template>
          <div id="department_statistics"></div>
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
      campus_pie_data: [],
      department_bar_data_xaxis: [],
      department_bar_data_series: [],
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
    async getCampusInfo() {
      const vm = this;
      await request.post("http://localhost:9090/getXQAndKCS").then((res) => {
        vm.campus_pie_data = res;
      });
    },
    async getDepartmentInfo() {
      const vm = this;
      await request
        .post("http://localhost:9090/getCsKKDWAndKCS")
        .then((res) => {
          vm.department_bar_data_xaxis = res.axis;
          vm.department_bar_data_series = res.series;
        });
    },
    async showCampusInfo() {
      const vm = this;
      const myChart = echarts.init(
        document.getElementById("campus_statistics")
      );
      myChart.showLoading();
      await vm.getCampusInfo().then((res) => {
        const option = {
          tooltip: {
            trigger: "item",
          },
          legend: {
            orient: "vertical",
            left: "left",
          },
          series: [
            {
              name: "选课数",
              type: "pie",
              radius: "50%",
              data: vm.campus_pie_data,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
              },
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
    async showDepartmentInfo() {
      const vm = this;
      const myChart = echarts.init(
        document.getElementById("department_statistics")
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
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          xAxis: [
            {
              type: "category",
              data: vm.department_bar_data_xaxis,
              axisTick: {
                alignWithLabel: true,
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
              name: "课程数量",
              type: "bar",
              barWidth: "60%",
              data: vm.department_bar_data_series,
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
      this.showCampusInfo();
      this.showDepartmentInfo();
    },
  },
};
</script>
<style>
#campus_statistics {
  height: 600px;
  width: 600px;
}
#department_statistics {
  height: 600px;
  width: 600px;
}
</style>
