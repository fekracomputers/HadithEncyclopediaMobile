$(document).ready(function() {
  var color = '';
  function getColor(text) {
    if (text.search('ثقة') != -1) {
      return '#004f00';
    } else if (text.search('صدوق') != -1) {
      return "#009F00";
    } else if (text.search('مقبول') != -1) {
      return 'rgba(0, 190, 0, 0.57)';
    } else if (text.search('ضعيف') != -1) {
      return '#002BBE';
    } else if (text.search('متهم') != -1 || text.search('بالكذب') != -1
      || text.search('بالوضع') != -1 || text.search('كذاب') != -1) {
      return '#BE000E';
    } else if (text.search('متروك') != -1 || text.search('منكر') != -1) {
      return '#BEB900';
    } else if (text.search('صحابي') != -1) {
      return color = "#000";
    } else if (text.search('مجهول') != -1) {
      return "#bebdbd";
    }
    else {
      return '#3a8789';
    }
  }



});
