import * as React from 'react';
import './style.css';

export default function App() {
  const people1 = [];
  const people = [
    {
      name: 'Calvin Hawkins',
      email: 'calvin.hawkins@example.com',
      image:
        'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      name: 'Kristen Ramos',
      email: 'kristen.ramos@example.com',
      image:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      name: 'Ted Fox',
      email: 'ted.fox@example.com',
      image:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ];

  const [isOpen, setOpen] = React.useState<boolean>(false);
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [countries, setCountries] = React.useState([]);
  React.useEffect(() => {
    checkIfLoading();
    fetch('https://restcountries.com/v3.1/all', 
    {
      method: 'GET', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      }
    }
    )
    .then(response => response.json())
      .then(response => setCountries(response))
      .catch(error => console.log(error));
  }, []);

  const checkIfLoading = () => {
    if (countries) {
      setLoading(!isLoading);
    } else {
      setLoading(isLoading);
    }
  };

  return (
    <div>
      <input type="text" />
      <button
        onClick={() => setOpen(!isOpen)}
        className="bg-indigo-400 text-white px-5 py-2.5 focus:bg-green-500"
      >
        Search
      </button>
        <div className="right-0 mt-2 w-150 rounded-md shadow-lg ">
          {isOpen.toString()}
          Hello
          {countries.map((country, i) => (
              <li key={i} className="py-4 flex">
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                     {country.capital}, {country.name.official}, {country.region}
                  </p>
                </div>
              </li>
            ))}       
        </div>
    </div>
  );
}