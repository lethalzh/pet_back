/**
 * Created  @date 2021/4/19 20:51
 * @author zh_elk
 */
import request from '@/utils/request'

export function getAboutList(data) {
  return request({
    url: 'back/getAboutList',
    method: 'post',
    data,
    baseURL: 'http://localhost:3000/'
  })
}

export function editAboutItem(data) {
  return request({
    url: 'back/editAboutItem',
    method: 'post',
    data,
    baseURL: 'http://localhost:3000/'
  })
}
export function addAboutItem(data) {
  return request({
    url: 'back/addAboutItem',
    method: 'post',
    data,
    baseURL: 'http://localhost:3000/'
  })
}
export function deleteAboutItem(data) {
  return request({
    url: 'back/deleteAboutItem/' + data,
    method: 'get',
    baseURL: 'http://localhost:3000/'
  })
}

