console.log("Inside app.js");
const GRAPHQL_URL = "http://localhost:5001";

async function fetchGreetings() {
  const response = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: "{ greeting }" }),
  });
  const { data } = await response.json();
  return data;
}

const element = document.querySelector("#app");
element.textContent = "Loading...";

fetchGreetings().then(({ greeting }) => {
  console.log({ greeting });
  element.textContent = greeting;
});
