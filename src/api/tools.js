/**
 * Created  @date 2021/4/18 16:26
 * @author zh_elk
 */
import request from '@/utils/request'

export function upload() {
  return request({
    url: 'other/upload/',
    method: 'post',
    baseURL: 'http://localhost:3000/'
  })
}
