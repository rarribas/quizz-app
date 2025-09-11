export const getToken = async (): Promise<string | null> => {
  try {
    const res = await fetch("https://opentdb.com/api_token.php?command=request");
    const data = await res.json();
    if (data.response_code === 0) {
      return data.token;
    }
    console.error("Failed to get token", data);
    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
};