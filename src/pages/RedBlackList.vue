<template>
  <div class="content">
    <div class="row">
      <div class="col-md-12">
        <card>
          <div class="row">
            <div class="col-md-6 ml-auto mr-auto text-center">
              <h4 class="card-title">周末还要上课的学院</h4>
            </div>
            <div id="saturday_lesson"></div>
          </div>
        </card>
      </div>
      <div class="col-md-6">
        <card>
          <template slot="header">
            <h4>早八最多的学院Top5</h4>
          </template>
          <div id="morning_lesson"></div>
        </card>
      </div>
      <div class="col-md-6">
        <card>
          <template slot="header">
            <h4>最喜欢晚上开课的学院Top5</h4>
          </template>
          <div id="night_lesson"></div>
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
      saturday_pie_data: [],
      morning_bar_data_yaxis: [],
      morning_bar_data_series: [],
      night_bar_data_yaxis: [],
      night_bar_data_series: [],
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
    async getSaturdayInfo() {
      const vm = this;
      await request
        .post("http://localhost:9090/getWeekendKKDWAndKCS")
        .then((res) => {
          vm.saturday_pie_data = res;
        });
    },
    async getMorningInfo() {
      const vm = this;
      await request
        .post("http://localhost:9090/getEarlyKKDWAndKCS")
        .then((res) => {
          vm.morning_bar_data_yaxis = res.axis;
          vm.morning_bar_data_series = res.series;
        });
    },
    async getNightInfo() {
      const vm = this;
      await request
        .post("http://localhost:9090/getNightKKDWAndKCS")
        .then((res) => {
          vm.night_bar_data_yaxis = res.axis;
          vm.night_bar_data_series = res.series;
        });
    },
    async showSaturdayInfo() {
      const vm = this;
      const myChart = echarts.init(document.getElementById("saturday_lesson"));
      myChart.showLoading();
      await vm.getSaturdayInfo().then((res) => {
        const option = {
          tooltip: {
            trigger: "item",
          },
          legend: {
            top: "5%",
            left: "center",
          },
          series: [
            {
              name: "课程数量",
              type: "pie",
              radius: ["40%", "70%"],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: "#fff",
                borderWidth: 2,
              },
              label: {
                show: false,
                position: "center",
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: 40,
                  fontWeight: "bold",
                },
              },
              labelLine: {
                show: false,
              },
              data: vm.saturday_pie_data,
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
    async showMorningInfo() {
      const vm = this;
      const myChart = echarts.init(document.getElementById("morning_lesson"));
      myChart.showLoading();
      await vm.getMorningInfo().then((res) => {
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
            data: vm.morning_bar_data_yaxis,
          },
          series: [
            {
              type: "bar",
              color: "#bf80ff",
              data: vm.morning_bar_data_series,
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
    async showNightInfo() {
      const vm = this;
      const myChart = echarts.init(document.getElementById("night_lesson"));
      myChart.showLoading();
      await vm.getNightInfo().then((res) => {
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
            data: vm.night_bar_data_yaxis,
          },
          series: [
            {
              type: "bar",
              color: "#ffcc66",
              data: vm.night_bar_data_series,
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
      this.showSaturdayInfo();
      this.showMorningInfo();
      this.showNightInfo();
    },
  },
};
</script>
<style>
#morning_lesson {
  height: 600px;
  width: 600px;
}
#night_lesson {
  height: 600px;
  width: 600px;
}
#saturday_lesson {
  height: 600px;
  width: 1500px;
}
</style>
