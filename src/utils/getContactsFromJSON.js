const getContactsFromJSON = key => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? [];
  } catch (error) {
    console.log(error.message);
  }
};

export { getContactsFromJSON };
