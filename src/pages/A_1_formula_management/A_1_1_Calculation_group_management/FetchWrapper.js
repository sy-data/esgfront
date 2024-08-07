import { getCookie, setCookie } from "../States/storage/Cookie";

// 호스트 주소를 환경 변수에서 가져옵니다. 환경 변수가 설정되어 있지 않으면 빈 문자열을 사용합니다.
const host = process.env.REACT_APP_PROD_API_ENDPOINT
  ? process.env.REACT_APP_PROD_API_ENDPOINT
  : "";

// 사용자 로그인 함수
export async function loginDev(payload) {
  try {
    // API 호출
    const res = await fetch(`${host}/api/auth/local`, {
      method: "POST", // HTTP 메서드를 POST로 설정
      headers: {
        "Content-Type": "application/json", // 요청 본문이 JSON 형식임을 지정
      },
      body: JSON.stringify({
        identifier: payload.id, // 사용자 ID
        password: payload.password, // 사용자 비밀번호
      }),
    });

    // 응답이 성공적이면
    if (res.ok) {
      const data = await res.json(); // JSON 형식으로 응답을 파싱
      if ("jwt" in data) {
        // 응답에 JWT 토큰이 포함되어 있으면
        localStorage.setItem("token", data["jwt"]); // 로컬 스토리지에 토큰 저장
        setCookie("token", data["jwt"]); // 쿠키에 토큰 저장
        return data.user; // 사용자 데이터를 반환
      } else if ("error" in data) {
        // 응답에 오류가 포함되어 있으면
        alert(`status : ${data.error.status}\n${data.error.message}`); // 오류 메시지를 알림으로 표시
      }
    }
  } catch (error) {
    console.log(error); // 에러가 발생하면 콘솔에 출력
  }
}

// 공통 API 호출 함수
export function esgFetch(url, method = "GET", body = {}, requiredAuth = true) {
  const token = getCookie("token"); // 쿠키에서 토큰을 가져옴

  // 인증이 필요한데 토큰이 없으면
  if (requiredAuth && !token) {
    window.location.href = "/unauthorized"; // 인증되지 않은 페이지로 이동
  }

  // API 호출
  return fetch(`${host}${url}`, {
    method: method, // HTTP 메서드를 설정
    headers: {
      // POST 또는 PUT 메서드일 경우 Content-Type을 JSON으로 설정
      ...((method === "POST" || method === "PUT") && {
        "Content-Type": "application/json",
      }),
      // 인증이 필요한 경우 Authorization 헤더에 토큰 추가
      ...(requiredAuth && { Authorization: `Bearer ${token}` }),
    },
    // 요청 본문이 있는 경우 JSON 형식으로 변환하여 추가
    ...(Object.keys(body).length > 0 && { body: JSON.stringify(body) }),
  }).then((response) => {
    // 응답이 성공적이지 않은 경우
    if (!response.ok) {
      return response.json().then((err) => {
        throw new Error(err.error); // 에러 메시지를 포함한 예외 발생
      });
    }
    return response.json(); // 응답을 JSON 형식으로 변환하여 반환
  });
}
