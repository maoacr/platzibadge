import React from 'react';
import { Link } from 'react-router-dom';

import './styles/BadgesList.css';
import Gravatar from './Gravatar';

class BadgesListItem extends React.Component {
  render() {
    return (
      <div className="BadgesListItem">
        <Gravatar
          className="BadgesListItem__avatar"
          email={this.props.badge.email}
        />

        <div>
          <strong>
            {this.props.badge.firstName} {this.props.badge.lastName}
          </strong>
          <br />@{this.props.badge.twitter}
          <br />
          {this.props.badge.jobTitle}
        </div>
      </div>
    );
  }
}

//Uso de Hooks, no permite usarlo en clases sino en funciones
function useSearchBadges(badges) {
  //Permite tener el query y sus actualizaciones, React.useState permite poner un valor inicial. query es el valor que se escribe en la barra de filtro
  const [query, setQuery] = React.useState('');
  //Permite obtener el filtro de badges y sus actualizaciones
  const [filteredBadges, setFilteredBadges] = React.useState(badges);

  //Sirve para "memorizar" lo que se va escribiendo en el filtro, y lo hace más eficiente
  React.useMemo(() => {
    //Para cada badges se filtra en el nombre y el apellido (buscando coincidencias, incluso si se escribe con minuscula)
    const result = badges.filter(badge => {
      return `${badge.firstName} ${badge.lastName}`
        .toLowerCase()
        //includes sirve para buscar si lo que se escribe en el filtro coincide con el nombre y apellido (query es lo que se escribe en el filtro)
        .includes(query.toLowerCase());
    });

    //Actualiza el filtro de badges con las coincidencias (que se guardan en el constante result)
    setFilteredBadges(result);
  }, [badges, query]);

  //Regresa estos valores cuando se ejecuta esta función
  return { query, setQuery, filteredBadges };
}

function BadgesList(props) {
  const badges = props.badges;

  //Se guarda el query, el setQuery y el filteredBadges que se regreso cuando se ejecutó la función useSearchBadges
  const { query, setQuery, filteredBadges } = useSearchBadges(badges);

  //Este if sirve para que no desaparezca la barra de filtro cuando nngún nombre coincide con la búsqueda, sino la aplicación manda al 404
  if (filteredBadges.length === 0) {
    return (
      <div>
        {/* Barra del filtro, donde se escribe la búsqueda, el valor es query */}
        <div className="form-group">
          <label>Filter Badges</label>
          <input
            type="text"
            className="form-control"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
            }}
          />
        </div>

        <h3>No badges were found</h3>
        <Link className="btn btn-primary" to="/badges/new">
          Create new badge
        </Link>
      </div>
    );
  }

  return (
    //Aquí se presenta la barra de filtro, llamando al valor como query, y haciendo coincidir los cambios con dicho valor
    <div className="BadgesList">
      <div className="form-group">
        <label>Filter Badges</label>
        <input
          type="text"
          className="form-control"
          value={query}
          onChange={e => {
            setQuery(e.target.value);
          }}
        />
      </div>

      <ul className="list-unstyled">
        {filteredBadges.map(badge => {
          return (
            <li key={badge.id}>
              <Link
                className="text-reset text-decoration-none"
                to={`/badges/${badge.id}`}
              >
                <BadgesListItem badge={badge} />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default BadgesList;
