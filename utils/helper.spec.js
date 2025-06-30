// import { expect } from "@playwright/test";

// export async function authenticateUser(username, password, { request }) {
//   const response = await request.post(
//     "https://thinking-tester-contact-list.herokuapp.com/users/login",
//     {
//       headers: { "Content-Type": "application/json" },
//       data: { email: username, password },
//     }
//   );

//   console.log(`Status: ${response.status()}`);
//   const data = await response.json();
//   console.log(`Body: ${JSON.stringify(data)}`);

//   expect(response.status()).toBe(200);
//   return data.token;
// }

// export async function createEntity(data, token, module, { request }) {
//   const response = await request.post(
//     `https://thinking-tester-contact-list.herokuapp.com${module}`,
//     {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       data,
//     }
//   );
//   expect(response.status()).toBe(201);
//   return await response.json();
// }

// export async function getEntity(
//   token,
//   module,
//   entityId,
//   expectedStatus,
//   { request }
// ) {
//   const response = await request.get(
//     `https://thinking-tester-contact-list.herokuapp.com${module}/${entityId}`,
//     {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );
//   expect(response.status()).toBe(parseInt(expectedStatus));
//   return await response.json();
// }
// export async function validateEntity(accessToken, module, status, { request }) {
//   const res = await request.get(
//     `https://thinking-tester-contact-list.herokuapp.com${module}`,
//     {
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: `Bearer ${accessToken}`,
//       },
//     }
//   );

//   const statusCode = response.status();
//   expect(statusCode).toBe(parseInt(status));
// }

// export async function deleteEntity(token, module, entityId, { request }) {
//   const response = await request.delete(
//     `https://thinking-tester-contact-list.herokuapp.com${module}/${entityId}`,
//     {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );
//   expect(response.status()).toBe(200);
// }
const axios = require("axios");
import { expect } from "@playwright/test";
// import cookie from "cookie"

let apiUrl;

export async function authenticateUser(username, password, { request }) {
  const apiUrl = await getApiBaseUrl();
  const headers = {
    "Content-Type": "application/json",
  };
  const requestBody = {
    email: username,
    password: password,
  };
  const response = await request.post(`${apiUrl}/users/login`, {
    data: requestBody,
    headers,
  });
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  const token = responseBody.token;
  return token;
}

async function getApiBaseUrl() {
  apiUrl = process.env.API_BASE_URL;
  if (!apiUrl) {
    apiUrl = "https://thinking-tester-contact-list.herokuapp.com";
  }
  return apiUrl;
}

export async function createEntity(userData, accessToken, module, { request }) {
  const apiUrl = await getApiBaseUrl();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    authorization: "Bearer " + accessToken,
  };
  const response = await request.post(apiUrl + module, {
    headers,
    data: JSON.stringify(userData),
  });

  const responseBody = await response.json();
  const statusCode = response.status();
  expect(statusCode).toBe(201);
  if (responseBody && responseBody.id) {
    return responseBody.id;
  } else {
    return null;
  }
}
export async function deleteEntity(token, module, entityId, { request }) {
  const response = await request.delete(
    `https://thinking-tester-contact-list.herokuapp.com${module}/${entityId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  expect(response.status()).toBe(200);
}
