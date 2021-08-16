import { useState } from 'react';
import { Configure, Hits, InstantSearch, RefinementList } from 'react-instantsearch-dom';

import { indexName, searchClient } from './lib/algoliaClient';
import { GeoHit } from './types/StoreHit';

import Header from './components/Header/Header';
import StoreComponent from './components/StoreComponent/StoreComponent';
import Map from './components/Map/Map';

import './App.css';

function App() {
  const [currentStore, setCurrentStore] = useState<GeoHit | null>(null);

  return (
    <div className="flex w-full flex-col">

      <Header />

      <InstantSearch searchClient={searchClient} indexName={indexName}>
        <Configure aroundLatLngViaIP={true} />

        <div className="flex h-full w-full">
          <div className="flex flex-col w-1/4">
            <div className="m-2">
              <RefinementList attribute={'services'} />
            </div>

            <Hits<GeoHit> hitComponent={(hit) =>
              <StoreComponent
                key={hit.hit.objectID}
                store={hit.hit}
                onClick={(_store) => setCurrentStore(_store)}
                currentStore={currentStore}
              />
            } />
          </div>

          <div className="flex flex-col w-full">
            <Map
              currentStore={currentStore ? [currentStore._geoloc.lng, currentStore._geoloc.lat] : null}
              onClickMarker={(storeCoordinate) => {}}
            />
          </div>
        </div>
      </InstantSearch>
    </div>
  );
}

export default App;
