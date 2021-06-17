export const isEmpty = (value) => {
  if (!value) {
    return true;
  }
  return false;
};

export const isEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
export const isPhone = (phone) => {
  const re = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  return re.test(Number(phone));
};

export const isLength = (password) => {
  if (password.length < 6) {
    return true;
  }
  return false;
};

export const isMatch = (password, cf_password) => {
  if (password === cf_password) {
    return true;
  }
  return false;
};
