
/**
 * 获取本地存储的数据
 */
export const localUser = () => {
  let a = JSON.parse(localStorage.getItem('user'))
  return a
}