import * as React from 'react';
import './style.css';

export default function App() {
  const people = [
    {
      name: 'Calvin Hawkins',
      email: 'calvin.hawkins@example.com',
      currency: 'dollar',
      country: 'africa',
      image:
        'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      name: 'Kristen Ramos',
      email: 'kristen.ramos@example.com',
      currency: 'euro',
      country: 'oceania',
      image:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      name: 'Ted Fox',
      email: 'ted.fox@example.com',
      currency: 'pound',
      country: 'asia',
      image:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      name: 'Ted Brun',
      email: 'ted.fox@example.com',
      currency: 'euro',
      country: 'europe',
      image:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ];

  // const [isOpen, setOpen] = React.useState<boolean>(false);
  const [isCountrySearch, setCountrySearch] = React.useState<boolean>(false);
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [countries, setCountries] = React.useState([]);
  const [selectedRegion, setSelectedRegion] = React.useState<string>('');
  const [countriesByCountry, setCountriesByCountry] = React.useState([]);
  const [option, setOption] = React.useState(undefined);

  React.useEffect(() => {
    checkIfLoading();
    fetch('https://restcountries.com/v3.1/all', {
      method: 'GET', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response.length);
        setCountries(response);
      })
      .catch((error) => console.log(error));
  }, []);

  const checkIfLoading = () => {
    if (countries) {
      setLoading(!isLoading);
    } else {
      setLoading(isLoading);
    }
  };

  const modifySearchCriteria = () => {
    //find all countries by region
    setCountrySearch(true);
    const endpoint = 'https://restcountries.com/v3.1/region/' + selectedRegion;
    console.log(endpoint.toString());
    fetch(endpoint.toString(), {
      method: 'GET', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        mode: 'cors',
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response.length);
        setCountriesByCountry(response);
      })
      .catch((error) => console.log(error));
  };

  const onChange = (ev) => {
    const val = ev.target.value;
    setOption(val);

    const person = people[val];
    if (person) {
      setSelectedRegion(person.country);
    }
  };

  return (
    <div className="left-10 right-0 mt-2 w-150 rounded-md shadow-lg">
      <h1 className="text-2xl">Countries of the World</h1>
      <input
        type="text"
        value={selectedRegion}
        onChange={(ev) => setSelectedRegion(ev.target.value)}
      />
      <select value={option} onChange={onChange}>
        <option>By Region</option>
        {people.map((person, index) => (
          <option value={index} key={index}>
            {person.country}
          </option>
        ))}
      </select>
      <button
        onClick={() => modifySearchCriteria()}
        className="bg-indigo-400 text-white px-5 py-2.5 focus:bg-green-500"
      >
        Search
      </button>
      {!isCountrySearch && (
        <div className="left-10 right-0 mt-2 w-150 rounded-md shadow-lg">
          {countries.sort(function (a, b){
            if (a.name.official < b.name.official) {return -1;}
            else if (a.name.official > b.name.official) {return 1;}
            else{return 0}}).reverse().map((country, i) => (
            <li key={i} className="py-4 flex">
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                   {country.name.official}, {country.capital}, {country.region}
                </p>
              </div>
            </li>
          ))}
        </div>
      )}
      {isCountrySearch && (
        <div className="left-10 right-0 mt-2 w-150 rounded-md shadow-lg">
          <h1>Filtered by region</h1>
          {countriesByCountry.map((country, i) => (
            <li key={i} className="py-4 flex">
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  <img src={country.flags.png} alt="flag" />
                  {country.name.official}, {country.region}
                </p>
              </div>
            </li>
          ))}
        </div>
      )}
    </div>
  );
}
