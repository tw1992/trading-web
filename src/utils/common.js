import calc from 'calculatorjs'
export function isPoneAvailable(phone) {            //验证手机号
    var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(phone)) {
        return false;
    } else {
        return true;
    }
  }

export function isPassword(pwd) {                   //验证密码
    var myreg=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!myreg.test(pwd)) {
        return false;
    } else {
        return true;
    }
  }
export function exchangeIsPassword(pwd) {                   //验证密码
  var myreg=/^\d{6}$/;
  if (!myreg.test(pwd)) {
    return false;
  } else {
    return true;
  }
}
export function exchangeIsCode(pwd) {                   //验证密码
  var myreg=/^\d{4,6}$/;
  if (!myreg.test(pwd)) {
    return false;
  } else {
    return true;
  }
}
export function toFixed(value,num) {              //保留小数
    if (value != 0 && !value) return ''
    value = (value*1).toFixed(num)
    return value;
}

export function toPercent(point,num) {            //转换百分数
    var str=Number(point*100).toFixed(num);
    str+="%";
    return str;
}

export function add(value1,value2,fixed) {        //加
    if(!fixed){
        var fixed = 2;
    }
    return calc.add(value1, value2).toFixed(fixed);
}

export function sub(value1,value2,fixed) {        //减
    return calc.sub(value1, value2).toFixed(fixed);
}

export function mul(value1,value2,fixed) {        //乘
    return calc.mul(value1, value2).toFixed(fixed);
}

export function divide(value1,value2,fixed) {        //除
    if(!fixed){
        var fixed = 2;
    }
    if(value2 == 0){
        var val = 0;
        return calc.round(val,fixed);
      }
    return calc.div(value1, value2).toFixed(fixed);
}

export function round(value,fixed) {              //四舍五入
    return calc.round(value,fixed);
}
