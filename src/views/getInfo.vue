<template>
  <div class="out" ref="out">
    <div class="card">
      <div class="cardBlock">
        <div class="cardTitle" @click="toHide(0)">
          系统信息{{ hide[0] === 1 ? " -" : " +" }}
        </div>
        <transition name="fade">
          <div class="cardBody" v-show="hide[0]">
            <ul>
              <li v-for="(value, key, index) in ua" :key="index">
                {{ value.name }} : {{ value.value }}
              </li>
            </ul>
          </div>
        </transition>
      </div>
      <div class="cardBlock">
        <div class="cardTitle" @click="toHide(1)">
          浏览器信息{{ hide[1] === 1 ? " -" : " +" }}
        </div>
        <transition name="fade">
          <div class="cardBody" v-show="hide[1]">
            <ul>
              <li v-for="(value, key, index) in screenOther" :key="index">
                {{ value.name }} : {{ value.value }}
              </li>
            </ul>
          </div>
        </transition>
      </div>
      <div class="cardBlock">
        <div class="cardTitle" @click="toHide(2)">
          用户信息{{ hide[2] === 1 ? " -" : " +" }}
        </div>
        <transition name="fade">
          <div class="cardBody" v-show="hide[2]">
            <ul>
              <li v-for="(value, key, index) in user" :key="index">
                {{ value.name }} : {{ value.value }}
              </li>
              <li v-for="(value, key, index) in ip" :key="index">
                {{ value.name }} : {{ value.value }}
              </li>
            </ul>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import UA from "@/assets/utils/UserAgent";
import axios from "axios";
export default {
  data() {
    return {
      ua: {},
      screenOther: {},
      ip: {},
      user: {},
      hide: [1, 1, 1]
    };
  },
  methods: {
    //获取系统信息
    getUA() {
      this.ua = {
        platForm: {
          name: "平台",
          value: UA.getPlatform()
        },
        os: {
          name: "操作系统版本",
          value: UA.getOsVersion()
        }
      };
      let otherUaInfo = UA.b();
      for (let item of Object.entries(otherUaInfo)) {
        if (item[1]) {
          this.ua[item[0]] = {};
          this.ua[item[0]].name = item[0];
          this.ua[item[0]].value = item[1];
        }
      }
    },
    //获取浏览器信息
    getScreen() {
      this.screenOther = {
        clientWidth: {
          name: "窗口宽",
          value: document.body.clientWidth
        },
        clientHeight: {
          name: "窗口高",
          value: document.body.clientHeight
        },
        width: {
          name: "屏幕宽",
          value: window.screen.width
        },
        height: {
          name: "屏幕高",
          value: window.screen.height
        },
        availTop: {
          name: "屏幕左边边界的第一个像素点",
          value: window.screen.availTop
        },
        availLeft: {
          name: "屏幕上边边界的第一个像素点",
          value: window.screen.availLeft
        },
        availHeight: {
          name: "窗口中垂直方向可用空间的像素值",
          value: window.screen.availHeight
        },
        availWidth: {
          name: "窗口中水平方向可用空间的像素值",
          value: window.screen.availWidth
        },
        colorDepth: {
          name: "屏幕的色彩深度",
          value: window.screen.colorDepth
        },
        orientation: {
          name: "当前屏幕的转向",
          value:
            (screen.orientation || {}).type ||
            screen.mozOrientation ||
            screen.msOrientation
        },
        pixelDepth: {
          name: "屏幕的像素点",
          value: window.screen.pixelDepth
        },
        dpr: {
          name: "设备dpr",
          value: window.devicePixelRatio
        },
        network: {
          name: "网络状态",
          value:
            navigator.connection.effectiveType || "浏览器不支持获取网络状态"
        },
        language: {
          name: "浏览器语言",
          value: navigator.browserLanguage || navigator.language
        }
      };
    },
    //获取用户信息
    getUserInfo() {
      //异步获取ip信息
      try {
        axios
          .jsonp("http://whois.pconline.com.cn/ipJson.jsp?level=2")
          .then(data => {
            let temp = {};
            for (let item of Object.entries(data)) {
              if (item[1]) {
                temp[item[0]] = {};
                temp[item[0]].name = item[0];
                temp[item[0]].value = item[1];
              }
            }
            this.ip = temp;
            //ip是最后拿到的，所以在这里进行埋点
            // this.toBlueEyes();
          });
      } catch (err) {
        //失败也埋点
        // this.toBlueEyes();
      }
      //获取用户

      this.user = {
        phone: {
          name: "手机号",
          value: "获取失败"
        },
        name: {
          name: "昵称",
          value: "获取失败"
        }
      };

      this.user.cookie = {
        name: "cookie",
        value: document.cookie.split(";")
      };
    },
    //切换显示隐藏
    toHide(num) {
      this.hide[num] === 0
        ? this.hide.splice(num, 1, 1)
        : this.hide.splice(num, 1, 0);
    }
  },
  mounted() {
    //获取系统信息
    this.getUA();
    //获取浏览器信息
    this.getScreen();
    //获取用户信息
    this.getUserInfo();
  }
};
</script>
<style scoped>
.out {
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 100%;
  width: 100%;
  font-size: 20px;
  box-sizing: border-box;
  padding: 20px;
}
.card {
  width: 100%;
  max-width: 800px;
  height: 100%;
  border: 1px black solid;
  border-radius: 40px;
  padding: 30px;
}
li {
  word-wrap: break-word;
  line-height: 2em;
}
.cardBlock {
  margin-bottom: 16px;
}
.cardTitle {
  text-align: center;
  border-bottom: 1px black solid;
  margin: 10px;
  font-size: 32px;
}
.cardBody {
  padding: 10px;
  font-size: 28px;
}
.hide {
  display: none;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter,
.fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
button {
  margin: 10px;
  padding: 10px;
  font-size: 20px;
  width: 100%;
  max-width: 800px;
  border-radius: 40px;
  border: 0;
  background: lightblue;
  color: white;
}
</style>
