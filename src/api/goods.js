/**
 * Created  @date 2021/4/16 22:19
 * @author zh_elk
 */
import request from '@/utils/request'

export function getGoodList(data) {
  return request({
    url: 'back/getGoodList',
    method: 'post',
    data,
    baseURL: 'http://localhost:3000/'
  })
}

export function editGoodRow(data) {
  return request({
    url: 'back/editGoodRow',
    method: 'post',
    data,
    baseURL: 'http://localhost:3000/'
  })
}

export function addGoodRow(data) {
  return request({
    url: 'back/addGoodRow',
    method: 'post',
    data,
    baseURL: 'http://localhost:3000/'
  })
}

export function delectGoodRow(data) {
  return request({
    url: 'back/delectGoodRow/' + data,
    method: 'get',
    baseURL: 'http://localhost:3000/'
  })
}

export function getNavdata(data) {
  return request({
    url: '/navdata/' + data,
    method: 'get',
    baseURL: 'http://localhost:3000/'
  })
}
