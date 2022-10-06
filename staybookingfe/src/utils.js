const domain = 'https://refreshing-gear-362222.wm.r.appspot.com';
// const domain = 'http://localhost:8080';

// credentials = { username: string, password: string}
export const login = (credential, asHost) => {
  const loginUrl = `${domain}/authenticate/${asHost ? "host" : "guest"}`;
  return fetch(loginUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credential),
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to log in");
    }
 
    return response.json();
  });
};
 
export const register = (credential, asHost) => {
  const registerUrl = `${domain}/register/${asHost ? "host" : "guest"}`;
  return fetch(registerUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credential),
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to register");
    }
  });
};
 
export const getReservations = () => {
  const authToken = localStorage.getItem("authToken");
  const listReservationsUrl = `${domain}/reservations`;
 
  return fetch(listReservationsUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to get reservation list");
    }
 
    return response.json();
  });
};
 
export const getStaysByHost = () => {
  const authToken = localStorage.getItem("authToken");
  const listStaysUrl = `${domain}/stays/`;
 
  return fetch(listStaysUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to get stay list");
    }
 
    return response.json();
  });
};
 
export const searchStays = (query) => {
  const authToken = localStorage.getItem("authToken");
  // 生成url的api方法 URL
  // key: val
  const searchStaysUrl = new URL(`${domain}/search/`);
  // const searchStaysUrl = new URL(`http://localhost:3000/search/`);
  searchStaysUrl.searchParams.append("guest_number", query.guest_number);
  searchStaysUrl.searchParams.append(
    "checkin_date",
    query.range_piker[0].format("YYYY-MM-DD")
  );
  searchStaysUrl.searchParams.append(
    "checkout_date",
    query.range_piker[1].format("YYYY-MM-DD")
  );
  // add geo function
  searchStaysUrl.searchParams.append("address", query.address);
  // searchStaysUrl.searchParams.append("lat", 37);
  // searchStaysUrl.searchParams.append("lon", -122);

  return fetch(searchStaysUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to search stays");
    }
    // 处理后端返回的数据
    return response.json();
  });
};
 
export const deleteStay = (stayId) => {
  const authToken = localStorage.getItem("authToken");
  const deleteStayUrl = `${domain}/stays/${stayId}`;
 
  return fetch(deleteStayUrl, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to delete stay");
    }
  });
};
 
export const bookStay = (data) => {
  const authToken = localStorage.getItem("authToken");
  const bookStayUrl = `${domain}/reservations`;
 
  return fetch(bookStayUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to book reservation");
    }
  });
};
 
export const cancelReservation = (reservationId) => {
  const authToken = localStorage.getItem("authToken");
  const cancelReservationUrl = `${domain}/reservations/${reservationId}`;
 
  return fetch(cancelReservationUrl, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to cancel reservation");
    }
  });
};
 
export const getReservationsByStay = (stayId) => {
  const authToken = localStorage.getItem("authToken");
  const getReservationByStayUrl = `${domain}/stays/reservations/${stayId}`;
 
  return fetch(getReservationByStayUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to get reservations by stay");
    }
 
    return response.json();
  });
};
 
export const uploadStay = (data) => {
  const authToken = localStorage.getItem("authToken");
  const uploadStayUrl = `${domain}/stays`;
 
  return fetch(uploadStayUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    body: data,
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to upload stay");
    }
  });
};
