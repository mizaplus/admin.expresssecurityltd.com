import getUrls from "get-urls";

export const generatePath = (text) => {
  const words = text.split(" ");
  const result = [];
  words.forEach((word) => {
    if (word.search(/[^a-zA-Z]+/) === -1) {
      result.push(word.toLowerCase());
    } else {
      console.log("Invalid Word");
    }
  });
  return result.join("-");
};

export const storageUrl =
  "https://expresssecurity-media54307-dev.s3.eu-west-1.amazonaws.com";

export const extractObjectKeys = (text) => {
  const urls = getUrls(text);
  const keys = [...urls].map((item) => {
    const key = item.replace(`${storageUrl}/`, "");
    return key;
  });
  return keys;
};

export const generateFileName = (filename) => {
  const text = filename.split(".");
  const name = `${text[0]}-${(Math.random() * 1000).toFixed(0)}`;
  const extension = text.reverse()[0];
  return `${name}.${extension}`;
};

export const update = (field, value, setValueFunc) => {
  setValueFunc((prevState) => {
    return {
      ...prevState,
      [field]: value,
    };
  });
};

export const multiUpdate = (fields, values, setValuesFunc) => {
  setValuesFunc((prevState) => {
    const data = { ...prevState };
    fields.forEach((field, index) => {
      data[field] = values[index];
    });
    return data;
  });
};

export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const compareStrings = (str1, str2) => {
  if (str1 !== "" && str2 !== "") {
    if (str1 === str2) {
      return true;
    } else {
      return false;
    }
  }
};

export const toMoney = (value) => {
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return formatter.format(value);
};

export const validateData = (data) => {
  let valid = true;
  const missingFields = [];
  for (const key in data) {
    if (data[key] === "highlights") {
      let isValid = true;
      data[key].forEach((item) => {
        if (item === "") {
          isValid = false;
        }
      });
      if (!isValid) {
        missingFields.push(capitalize(key));
      }
    } else if (data[key] === "") {
      valid = false;
      missingFields.push(capitalize(key));
    }
  }
  return {
    valid: valid,
    count: missingFields.length,
    message: missingFields.join(", "),
  };
};

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const partitionData = (data, count) => {
  let clonedData = [...data];
  let result = [];
  while (clonedData.length !== 0) {
    result.push(clonedData.splice(0, count));
  }
  return result;
};

export const generateData = (currentObj, targetData) => {
  const data = {};
  for (const key in targetData) {
    if (key !== "SK") {
      if (key === "highlights") {
        const currentList = currentObj[key];
        const targeList = targetData[key];
        let isNotEqual = false;
        currentList.forEach((item, i) => {
          if (item !== targeList[1]) {
            isNotEqual = true;
          }
        });
        if (isNotEqual) {
          data[key] = targetData[key];
        }
      } else if (targetData[key] !== currentObj[key]) {
        data[key] = targetData[key];
      }
    } else {
      data[key] = targetData.SK;
    }
  }
  return data;
};

export const updateRichText = (field, value, update) => {
  const text = value.trim();
  update((prevState) => {
    return {
      ...prevState,
      [field]: text === "<p><br></p>" ? "" : value,
    };
  });
};
