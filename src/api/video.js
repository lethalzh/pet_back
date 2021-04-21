/**
 * Created  @date 2021/4/19 11:08
 * @author zh_elk
 */
import request from '@/utils/request'

export function getVideoList(data) {
  return request({
    url: 'back/getVideoList',
    method: 'post',
    data,
    baseURL: 'http://localhost:3000/'
  })
}
export function deleteVideoItem(data) {
  return request({
    url: 'back/deleteVideoItem/' + data,
    method: 'get',
    baseURL: 'http://localhost:3000/'
  })
}

export function addVideoItem(data) {
  return request({
    url: 'back/addVideoItem',
    method: 'post',
    data,
    baseURL: 'http://localhost:3000/'
  })
}

export function editVideoItem(data) {
  return request({
    url: 'back/editVideoItem',
    method: 'post',
    data,
    baseURL: 'http://localhost:3000/'
  })
}
