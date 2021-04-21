/**
 * Created  @date 2021/4/16 15:24
 * @author zh_elk
 */

import request from '@/utils/request'

export function getOrderList(data) {
  return request({
    url: 'back/getOrderList',
    method: 'post',
    data,
    baseURL: 'http://localhost:3000/'
  })
}

export function getOrderCom(data) {
  return request({
    url: 'back/getOrderCom',
    method: 'post',
    data,
    baseURL: 'http://localhost:3000/'
  })
}

export function editOrderItem(data) {
  return request({
    url: 'back/editOrderItem/' + data,
    method: 'get',
    baseURL: 'http://localhost:3000/'
  })
}
