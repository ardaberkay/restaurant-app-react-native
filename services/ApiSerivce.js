export const getMenu = async () => {
  try {
    const api = fetch(
      "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json"
    );
    const response = await api;
    const json = await response.json();
    return json.menu;
  } catch (error) {
    console.error(error);
    return [];
  }
};
