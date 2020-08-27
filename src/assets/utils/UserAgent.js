/**
 * Created by joustany on 2017/8/11.
 */
/**
 * Created by joustany on 17/1/23.
 */
/* eslint-disable */
export default {
  getPlatform () {
    var platform;
    if (this.b().android) {
      platform = 'android';
    } else if (this.b().ios || this.b().iPhone) {
      platform = 'ios';
    } else {
      platform = 'unknown';
      /*if (location.origin == 'http://test.aos.chijidun.com:8858') {
       platform = other;
       } else {
       location.href = 'http://www.chijidun.com/';
       }*/
    }
    return platform;
  },
  b () {
    var u = navigator.userAgent.toLowerCase();
    var app = navigator.appVersion.toLowerCase();
    return {
      useragent: u, // 浏览器版本信息
      version: (u.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1], // 版本号
      msie: /msie/.test(u) && !/opera/.test(u), // IE内核
      mozilla: /mozilla/.test(u) && !/(compatible|webkit)/.test(u), // 火狐浏览器
      safari: /safari/.test(u) && !/chrome/.test(u), //是否为safair
      chrome: /chrome/.test(u), //是否为chrome
      opera: /opera/.test(u), //是否为oprea
      presto: u.indexOf('presto/') > -1, //opera内核
      webKit: u.indexOf('applewebkit/') > -1, //苹果、谷歌内核
      gecko: u.indexOf('gecko/') > -1 && u.indexOf('khtml') == -1, //火狐内核
      mobile: !!u.match(/applewebkit.*mobile.*/), //是否为移动终端
      ios: !!u.match(/\(i[^;]+;( u;)? cpu.+mac os x/), //ios终端
      android: u.indexOf('android') > -1, //android终端
      iPhone: u.indexOf('iphone') > -1, //是否为iPhone
      iPad: u.indexOf('ipad') > -1, //是否iPad
      weixin: u.match(/MicroMessenger/i) == "micromessenger", //是否是微信内置
      alipay: u.match(/AlipayClient\/([\d.]+)/i), // 是否是支付宝内置
      tmall: u.match(/aliapp\(tm/i), // 是否是天猫内置
      taobao: u.match(/aliapp\(tb/i), // 是否是淘宝内置
      miniProgram: u.match(/miniProgram/i) == "miniprogram", // 是否是小程序webview环境
      webApp: !!u.match(/applewebkit.*mobile.*/) && u.indexOf('safari/') == -1, //是否web应用程序，没有头部与底部
      vanke: u.indexOf('vanke_app/zhuzher') > -1, // 万科住这儿webview
      dface: u.indexOf('dface') > -1, // 脸脸App
      ipX: !!u.match(/\(i[^;]+;( u;)? cpu.+mac os x/) && ((screen.height === 812 || screen.height === 724) && screen.width === 375)
    }
  },
  /**
   * 判断浏览器所在机器操作系统版本
   */
  getOsVersion () {
    var u = navigator.userAgent, version = '';
    if (u.indexOf('Mac OS X') > -1) {
      //ios
      var regStr_saf = /OS\sX [\d._]*/gi;
      var verinfo = u.match(regStr_saf);
      version = (verinfo + "").replace(/[^0-9|_.]/ig, '').replace(/_/ig, '.');
    } else if (u.indexOf('Android') > -1
      || u.indexOf('Linux') > -1) {
      //android
      version = u.substr(u.indexOf('Android') + 8, u.indexOf(";", u.indexOf("Android")) - u.indexOf('Android') - 8);
    } else if (u.indexOf('BB10') > -1) {
      //黑莓bb10系统
      version = u.substr(u.indexOf('BB10') + 5, u.indexOf(";", u.indexOf("BB10")) - u.indexOf('BB10') - 5);
    } else if (u.indexOf('IEMobile')) {
      //windows phone
      version = u.substr(u.indexOf('IEMobile') + 9, u.indexOf(";", u.indexOf("IEMobile")) - u.indexOf('IEMobile') - 9);
    }
    return version;
  }
}
/* eslint-able */
