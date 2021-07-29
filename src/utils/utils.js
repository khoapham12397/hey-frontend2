export function setUserIdToStorage(userId) {
  sessionStorage.setItem('userId', userId);
}

export function getUserIdFromStorage() {
  var data = sessionStorage.getItem('userId');
  return data;
}

export function setJwtToStorage(jwt) {
  sessionStorage.setItem('jwt', jwt);
}
// no dung sessionStorage dung vay kha la tot dung vay do :
// hen gi no dong tab cai la xong ?? dung la vay do : ok chua dung vay do :
// neu ma ko xac thuc duoc thi sao ??? ro rang la khi send cai jwt ra
export function getJwtFromStorage() {
  var data = sessionStorage.getItem('jwt');
  return data;
}

export function clearStorage() {
  sessionStorage.clear();
}

export function isAuthenticated() {
  var jwt = getJwtFromStorage();
  return isEmptyString(jwt);
}

export function isEmptyString(prop) {
  if (prop == null || prop == "") {
    return true;
  } else {
    return false;
  }
}

