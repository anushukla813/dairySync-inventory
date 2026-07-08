const API_URL = "http://localhost:8080/api/vendor";

/* ADD MILK ENTRY */

export const addMilkSupply = async (supplyData) => {

  const response = await fetch(
    `${API_URL}/milk-entry`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(supplyData)
    }
  );

  const data = await response.json();

  if (!response.ok) {

    throw new Error(
      data.message || "Failed to add milk entry"
    );
  }

  return data;
};