export function loginDev(){
  fetch('/api/auth/local', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "identifier": process.env.REACT_APP_DEV_API_ACCOUNT,
      "password": process.env.REACT_APP_DEV_API_PASSWORD
    })
  })
    .then(response => response.json())
    .then(data => {
      if("jwt" in data){
        localStorage.setItem('token', data['jwt']);
        alert("로그인 성공");
      }
      else if("error" in data){
        alert(`status : ${data.error.status}\n${data.error.message}`);
      }
    });
}


export function esgFetch(url, method="GET", body={}, requiredAuth=true){
  const token = localStorage.getItem('token');
  
  if(requiredAuth && !token){
    alert("401 페이지로 이동 필요");
    window.location.href = "/";
  }
  return fetch(url, {
    method: method,
    headers: {
      ...(method==="POST" && {'Content-Type': 'application/json'}),
      ...(requiredAuth && {'Authorization': `Bearer ${token}`})
    },
    ...(Object.keys(body).length > 0 && {'body': JSON.stringify(body)})
  });
}