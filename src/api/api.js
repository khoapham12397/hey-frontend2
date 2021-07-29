import axios from 'axios';
import {message} from 'antd';
import {getJwtFromStorage, isEmptyString} from "../utils/utils";
// neu ko set la localhost ma dat theo dang ki : 
export const host = 'http://localhost:8081';
export const ws_host = 'ws://localhost:8090/';
const auth_type = 'Bearer';

// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: host
});

instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  // Do something with response data

  return response;
}, function (error) {
  //ignore ping
  if(!error.request.responseURL.endsWith('api/protected/ping')) {
    //alert(error.response.toString());
    alert(error.toString());
    if (error.response.data.error.message) {
      message.error(error.response.data.error.message);
    } else {
      message.error('Ooops, The server was unable to complete your request. We will be back soon :(');
    }
  }
  return Promise.reject(error);
});
export const api = {

  get: (url) => {
    var jwt = getJwtFromStorage();
    if (!isEmptyString(jwt)) {
      jwt = auth_type + ' ' + jwt;
    } else {
      jwt = '';
    };
    return instance.get(`${url}`, {headers: {'Authorization': jwt}});
  },
  post: (url, req) => {
    var jwt = getJwtFromStorage();
    if (!isEmptyString(jwt)) {
      jwt = auth_type + ' ' + jwt;
    } else {
      jwt = '';
    };
    return instance.post(`${url}`, req, {headers: {'Authorization': jwt}});
  },
  put: (url, req) => {
    return instance.put(`${url}`, req);
  },
  patch: (url, req) => {
    return instance.patch(`${url}`, req);
  },
  delete: (url) => {
    return instance.delete(`${url}`);
  }
}
// nen luu vao trong data base dung chua ?
// co 1 su thuc la gi ???
// cai user nay rat la de de lam vi no hau nhu la luu cai dang kia ??
// dung vay do :
// user_name + user_id hau nhu la no change dung vay do:
// con van de nay nua??
// do la cai gi ??
// khi 
// khi do co the di vao trong thang nay de lam:
// ban dau khi ma thuc hien 1 con host khac de ma manage account and balance:
// dung fya :
// how to set up 1 thang ben trong do luon ??
// dung vay do hoac la lam sao de ma set up duoc ?/
// dung la vay do dung roi:
// co ban la vay do :
// sau do the nao ??
// co khi minh can combine all things lai de ma lam do :
// van de nay the nao vay ha ??

// co the mang den duoc do dung chua 

// dung vay do :
// sinh api la duoc do sau do tach no ra the nay la duoc ro


// nen tu tu di da dung roi do // cai nay nhieu khi nen vay do 
// dung ay 

// co the mang di dioc 
// vi du check tu trong redis ??
// thong tin ve 1 account -> co nhieu info ve transaction ?
// dung ko ??
// vi du he thong thong tin thanh toan ??
// can xac dinh cai chieu la gi ??/
// dung vay do:
// xac dinh cai nguon description => xac dinh cai transaction content:
// date => cu the : => luu theo cai timestamp  ???
// dung ko dunvya
// timestamp la ex:
// quen password dang ky the nao ??
// van de management quan trong nhat la gi ??/
// do la viec ma authentication  => de ma tien hanh xu ly va cap quyen cho no ??
// dieu nay no quan trong day ???
// redis-cache la luu luon dung vay do ://
// nen luu theo dang do :
// dunv ay :

// tuc la co 2 thu the nay: // transaction-id, user_id => 
// transaction:user:=> 
// no luu theo dang nay ???
// dieu nay lieu co nen ???

// khong don gian dau dung vay do :
// do la ly do tai sao tui kia co the co 1 cai level rat cao ???
// nhung ma van ko lam ???
// don gian la vi the nay :
// de ma day duoc tui no :??

// neu ma cai thang service no do trong cache truoc :
// sau do moi tien hanh lam sau ??
// vi du the nay ne :
// do su dung redis cache nen cung can co them cach de tien hanh ??
// dung chua ???
// dung vay do :
// nen lam theo cach do se tot hon do :
// dieu do la dung roi do :
// sau do the nao ??
// dieu dau tien la vay ne:

// no khong luu cai dang kia dua??
// dung chua  ?? no khong co cai don:
// dung vay :

// sau do rest api => goi item info ve de ma render len 

// dieu do cung kha dac biet Ldung
