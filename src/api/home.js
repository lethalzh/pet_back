/**
 * Created  @date 2021/4/20 16:09
 * @author zh_elk
 */
import request from '@/utils/request'

export function productsNum() {
  return request({
    url: '/products_num',
    method: 'get',
    baseURL: 'http://localhost:3000/'
  })
}

export function getVideoConnum() {
  return request({
    url: '/getVideoConnum',
    method: 'get',
    baseURL: 'http://localhost:3000/'
  })
}

export function getSumGoods() {
  return request({
    url: '/getSumGoods',
    method: 'get',
    baseURL: 'http://localhost:3000/'
  })
}

export function getSumOrderPrice() {
  return request({
    url: '/getSumOrderPrice',
    method: 'get',
    baseURL: 'http://localhost:3000/'
  })
}

export function getPanelGroup() {
  return request({
    url: '/getPanelGroup',
    method: 'get',
    baseURL: 'http://localhost:3000/'
  })
}
