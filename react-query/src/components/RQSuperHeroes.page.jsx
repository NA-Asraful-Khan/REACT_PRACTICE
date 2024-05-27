import { Link } from "react-router-dom";
import { useCreateSuperHeroByMutation, useDeleteSuperHeroByMutation, useSuperHerosData, useUpdateSuperHeroByMutation } from "../hooks/useSuperHerosData";
import { useState } from "react";

export const RQSuperHeroesPage = () => {
  const [name, setName] = useState('');
  const [alterEgo, setAlterEgo] = useState('');
  const [editHeroId, setEditHeroId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editAlterEgo, setEditAlterEgo] = useState('');

  const onSuccess = () => {
    console.log('Perform side effect after data fetching');
  };

  const onError = (e) => {
    console.log('Perform side effect after an error', e);
  };

  const { isLoading, data, isError, error, refetch } = useSuperHerosData(onError, onSuccess);
  const { mutate: addHero, isLoading: loadingWhilePosting } = useCreateSuperHeroByMutation();
  const { mutate: deleteHero } = useDeleteSuperHeroByMutation();
  const { mutate: updateHero } = useUpdateSuperHeroByMutation();

  const handleAddHeroClick = () => {
    const hero = { name, alterEgo };
    addHero(hero);
    setName('');
    setAlterEgo('');
  };

  const handleEditHeroClick = (hero) => {
    setEditHeroId(hero.id);
    setEditName(hero.name);
    setEditAlterEgo(hero.alterEgo);
  };

  const handleUpdateHeroClick = () => {
    const updatedHero = { id: editHeroId, name: editName, alterEgo: editAlterEgo };
    updateHero(updatedHero);
    setEditHeroId(null);
    setEditName('');
    setEditAlterEgo('');
  };

  if (isLoading) {
    return <h2>Loading ....</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>RQ Super Heros Page</h2>

      <div>
        <input
          type='text'
          value={name}
          placeholder="Hero Name"
          onChange={e => setName(e.target.value)}
        />
        <input
          type='text'
          value={alterEgo}
          placeholder="Actor Name"
          onChange={e => setAlterEgo(e.target.value)}
        />
        <button onClick={handleAddHeroClick} disabled={!name || !alterEgo}>Add Hero</button>
      </div>

      {data?.data.map((hero) => (
        <div key={hero.id}>
          {editHeroId === hero.id ? (
            <>
              <input
                type='text'
                value={editName}
                placeholder="Hero Name"
                onChange={e => setEditName(e.target.value)}
              />
              <input
                type='text'
                value={editAlterEgo}
                placeholder="Actor Name"
                onChange={e => setEditAlterEgo(e.target.value)}
              />
              <button onClick={handleUpdateHeroClick} disabled={!editName || !editAlterEgo}>Update Hero</button>
              <button onClick={() => setEditHeroId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
              <button onClick={() => handleEditHeroClick(hero)}>Edit</button>
              <button onClick={() => deleteHero(hero.id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </>
  );
};
