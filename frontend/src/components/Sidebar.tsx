import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import mapMarkerImg from '../images/marker.svg';

import '../styles/components/sidebar.css';

import { Parag, ParagSmall } from '../styles/components/styles'

export default function Sidebar() {

  const { goBack } = useHistory();

  return (
    <aside className="app-sidebar">
      <img src={mapMarkerImg} alt="Happy" />

      {/* <Parag
        fontSize={40}
        > O
        <span> teste </span>
      </Parag>

      <ParagSmall
        fontSize={10}
      > O
        <span> teste small</span>
      </ParagSmall> */}

      <footer>
        <button type="button" onClick={goBack}>
          <FiArrowLeft size={24} color="#FFF" />
        </button>
      </footer>
    </aside>
  );

}