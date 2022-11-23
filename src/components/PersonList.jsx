import { getPersons } from "../data/data";
import { Link, Outlet, useSearchParams } from "react-router-dom";

const PersonList = () => {
  const persons = getPersons();
  let searchObj = useSearchParams();
  console.log(searchObj);

  return (
    <>
      <nav>
        {persons.map((person) => (
          <Link
            to={`/persons/${person.id}`}
            key={person.id}
            style={{ display: "block", margin: "1rem 0" }}
          >
            {person.name}
          </Link>
        ))}
      </nav>
      <Outlet />
    </>
  );
};

export default PersonList;
