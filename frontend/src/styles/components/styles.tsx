import styled from 'styled-components';


export const Parag = styled.h2<{fontSize: number}>`
    color: #F00;
    background: #000;
    font-size: ${props => `${props.fontSize}px`};

    span {
        font-size: 12px;
    }
`;

export const ParagSmall = styled(Parag)`
    color: #00f;

`;