export const postSaveSegment = async (payload) => {
  try {
    const res = await fetch(
      "https://webhook.site/bad05dc4-decc-450f-bdf9-b986d0e3b070",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    const result = await res.json();
    return result;
  } catch (err) {
    console.log("err", err);
  }
};
