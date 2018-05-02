
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