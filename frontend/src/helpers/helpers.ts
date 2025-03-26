export const convertStringToArray = (age: any) => {
  let minValue, maxValue;

  if (age === undefined || age === null || age === '') {
    return null;
  }

  if (Object.values(age)) {
    if (age.includes('-')) {
      // Age is in the format "0-1", extract values accordingly
      const ageArray = age.split('-');
      minValue = parseInt(ageArray[0], 10);
      maxValue = parseInt(ageArray[1], 10);
      return [minValue, maxValue];
    } else if (age?.includes('+')) {
      // Age is in the format "8+", treat it as minimum age
      minValue = parseInt(age, 10);
      maxValue = 30;

      return [minValue, maxValue];
    }
  }

  return { label: null, tooltipText: null };
};

export const createPetsAgeForDropdown = (ageValue: any) => {
  const uniqueLabels = new Set<string>();

  const resultArray = ageValue.map((age: any) => {
    let label = '';
    let tooltipText = '';

    if (age > 0 && age <= 1) {
      label = 'Baby';
      tooltipText = '0-1';
    } else if (age > 1 && age <= 3) {
      label = 'Young';
      tooltipText = '1-3';
    } else if (age > 3 && age <= 8) {
      label = 'Adult';
      tooltipText = '3-8';
    } else {
      label = 'Senior';
      tooltipText = '8+';
    }

    // Check if the label is unique, if yes, add to the set and return the object
    if (!uniqueLabels.has(label)) {
      uniqueLabels.add(label);
      return { label, tooltipText };
    }

    return null; // If not unique, return null
  });

  // Filter out null values (non-unique objects)
  const filteredResultArray = resultArray.filter((item: any) => item !== null);

  return filteredResultArray;
};

export const checkAgeMonthOrYear = (age: any) => {
  if (age < 1) {
    if (age === 0.1) {
      return 'mo.';
    }
    return 'mos.';
  } else {
    if (age === 1) {
      return 'yr.';
    }
    return 'yrs.';
  }
};

export const checkNumber = (inputStr: any) => {
  const integerRegex = /^\d+$/;
  const floatRegex = /^\d+(\.\d)?$/;

  if (integerRegex.test(inputStr) || floatRegex.test(inputStr)) {
    return '';
  } else {
    return 'Age must be a number';
  }
};

export const toTitleCase = (str: string) => {
  return str
    .toLowerCase()
    .split(' ')
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
};
