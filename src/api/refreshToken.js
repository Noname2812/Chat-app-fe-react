export const refreshToken = async ({ userId, refreshToken }) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/auth/refresh-token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, refreshToken }),
    }
  );
  const data = await response.json();
  return data.value;
};
