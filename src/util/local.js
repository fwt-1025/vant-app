
/**
 * 获取本地存储的数据
 */
export const localUser = () => {
  let a = JSON.parse(localStorage.getItem('user'))
  return a
}

// buffer 转 base64
export const arrayBufferToBase64 = (buffer) => {
  var binary = ''
  var bytes = new Uint8Array( buffer )
  var len = bytes.byteLength
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode( bytes[ i ] )
  }
  return window.btoa( binary )
}

// base64 转 buffer
export const  base64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
                // eslint-disable-next-line no-useless-escape
                .replace(/\-/g, '+')
                .replace(/_/g, '/');
    const rawData = window.atob( base64 )
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }