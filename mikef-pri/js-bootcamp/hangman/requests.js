const getPuzzle = async (wordCount) => {
  const response = await fetch(
    `http://puzzle.mead.io/puzzle?wordCount=${wordCount}`
  );

  if (response.status === 200) {
    const data = await response.json();
    return data.puzzle;
  } else {
    throw new Error('Unable to fetch the puzzle');
  }
};

const getCountry = async (countryCode) => {
  const response = await fetch('https://restcountries.com/v3.1/all');

  if (response.status === 200) {
    const data = await response.json();
    return data.find((country) => country.cca2 === countryCode);
  } else {
    throw new Error('Unable to fetch the country');
  }
};

const getLocation = async () => {
  const response = await fetch('https://ipinfo.io/json?token=4762bbb8b2a029');

  if (response.status === 200) {
    return response.json();
  } else {
    throw new Error('Unable to fetch your location');
  }
};

const getCurrentCountry = async () => {
  const location = await getLocation();
  const country = await getCountry(location.country);
  return country;
};
