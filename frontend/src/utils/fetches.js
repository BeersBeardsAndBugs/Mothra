const post = async (path, body, error) => {
  try {
    let res = await fetch(path, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return res.json();
  } catch (e) {
    error(e);
  }
};
