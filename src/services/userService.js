const baseUrl = "http://localhost:8080/api";

const postRequest = async (url, body) => {
  let res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
  const data = await res.json();
  if (!res.ok) {
    let message;

    if (data?.message) {
      message = data.message;
    } else {
      message = data;
    }
    return { error: true, message };
  }
  return data;
};

const getRequest = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) {
    let message;

    if (data?.message) {
      message = data.message;
    } else {
      message = data;
    }
    return { error: true, message };
  }
  return data;
};

export { baseUrl, postRequest, getRequest };
