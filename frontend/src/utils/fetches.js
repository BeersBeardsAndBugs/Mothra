export const post = async (path, body, error) => {
  try {
    console.log("body", body);
    let res = await fetch(path, {
      method: "post",
      headers: {
        Accept: "text/html",
        "Content-Type": "text/html",
      },
      body: JSON.stringify(body),
    });
    const json = res.json();
    return json;
  } catch (e) {
    console.log("Caught Error!");
    error(e);
  }
};

export const get = async (path, error) => {
  try {
    let res = await fetch(path, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.json();
  } catch (e) {
    console.log("Caught Error!");
    error(e);
  }
};
