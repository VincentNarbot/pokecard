'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import html2canvas from 'html2canvas';

const Card = styled.div`
  width: 310px;
  height: 420px;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  background-color: ${props => {
    switch(props.type) {
      case 'fire': return '#FDDFDF';
      case 'water': return '#DEF3FD';
      case 'grass': return '#DEFDE0';
      case 'electric': return '#FCF7DE';
      case 'dragon': return '#97b3e6';
      case 'dark': return '#705848';
      case 'psychic': return '#FAD0C9';
      default: return '#FFFFFF';
    }
  }};
  border: 10px solid #FFD700;
  position: relative;
  display: flex;
  flex-direction: column;
  font-family: 'Futura', sans-serif;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const PokemonName = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const HP = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const TypeIcon = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${props => {
    switch(props.type) {
      case 'fire': return 'red';
      case 'water': return 'blue';
      case 'grass': return 'green';
      case 'electric': return 'yellow';
      case 'dragon': return 'purple';
      case 'dark': return 'black';
      case 'psychic': return 'pink';
      default: return 'gray';
    }
  }};
  border-radius: 50%;
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 16px;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  background-color: #F2F2F2;
  border: 3px solid #DAA520;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
`;

const PokemonInfo = styled.div`
  font-size: 12px;
  margin: 10px 0;
`;

const AttackContainer = styled.div`
  margin-top: 10px;
  border: 1px solid #ccc;
  padding: 5px;
  border-radius: 5px;
`;

const AttackName = styled.div`
  font-weight: bold;
`;

const AttackDamage = styled.div`
  float: right;
`;

const AttackDescription = styled.div`
  font-size: 10px;
  font-style: italic;
`;

export default function PokemonCardMaker() {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [type, setType] = useState('');
  const [hp, setHp] = useState(0);
  const [number, setNumber] = useState('');
  const [size, setSize] = useState('');
  const [height, setHeight] = useState('');
  const [attacks, setAttacks] = useState([{ name: '', damage: 0, description: '' }]);
  const cardRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImageUrl(URL.createObjectURL(file));
  };

  const handleAttackChange = (index, field, value) => {
    const newAttacks = [...attacks];
    newAttacks[index][field] = value;
    setAttacks(newAttacks);
  };

  const addAttack = () => {
    if (attacks.length < 2) {
      setAttacks([...attacks, { name: '', damage: 0, description: '' }]);
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'fire': return '🔥';
      case 'water': return '💧';
      case 'grass': return '🌿';
      case 'electric': return '⚡';
      case 'dragon': return '🐉';
      case 'dark': return '🌑';
      case 'psychic': return '🔮';
      default: return '';
    }
  };

  const downloadCard = () => {
    if (cardRef.current) {
      html2canvas(cardRef.current).then(canvas => {
        const link = document.createElement('a');
        link.download = `${name || 'pokemon'}_card.png`;
        link.href = canvas.toDataURL();
        link.click();
      });
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="w-full md:w-1/2">
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-1 font-semibold">Pokemon Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="type" className="block mb-1 font-semibold">Type:</label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select type</option>
                <option value="fire">Fire</option>
                <option value="water">Water</option>
                <option value="grass">Grass</option>
                <option value="electric">Electric</option>
                <option value="dragon">Dragon</option>
                <option value="dark">Dark</option>
                <option value="psychic">Psychic</option>
              </select>
            </div>
            <div>
              <label htmlFor="hp" className="block mb-1 font-semibold">HP:</label>
              <input
                type="number"
                id="hp"
                value={hp}
                onChange={(e) => setHp(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="number" className="block mb-1 font-semibold">Number:</label>
              <input
                type="text"
                id="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="size" className="block mb-1 font-semibold">Size:</label>
              <input
                type="text"
                id="size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="height" className="block mb-1 font-semibold">Weight:</label>
              <input
                type="text"
                id="height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="image" className="block mb-1 font-semibold">Image:</label>
              <input
                type="file"
                id="image"
                onChange={handleImageUpload}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {attacks.map((attack, index) => (
              <div key={index} className="space-y-2 p-4 bg-gray-100 rounded">
                <h3 className="font-bold text-lg">Attack {index + 1}</h3>
                <input
                  type="text"
                  placeholder="Attack Name"
                  value={attack.name}
                  onChange={(e) => handleAttackChange(index, 'name', e.target.value)}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  placeholder="Damage"
                  value={attack.damage}
                  onChange={(e) => handleAttackChange(index, 'damage', e.target.value)}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  placeholder="Attack Description"
                  value={attack.description}
                  onChange={(e) => handleAttackChange(index, 'description', e.target.value)}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
            {attacks.length < 2 && (
              <button type="button" onClick={addAttack} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
                Add Attack
              </button>
            )}
          </form>
        </div>
        <div className="w-full md:w-1/2">
          <Card type={type} ref={cardRef}>
            <CardHeader>
              <PokemonName>{name || "Pokemon Name"}</PokemonName>
              <HP>{hp || "HP"}</HP>
              <TypeIcon type={type}>{getTypeIcon(type)}</TypeIcon>
            </CardHeader>
            <ImageContainer>
              {imageUrl ? (
                <Image src={imageUrl} alt={name} layout="fill" objectFit="cover" />
              ) : (
                <div className="text-sm text-center pt-20">No image uploaded</div>
              )}
            </ImageContainer>
            <PokemonInfo>
              No. {number || "XXX"} | Size: {size || "X'XX"} | Weight: {height || "XX.X lbs."}
            </PokemonInfo>
            {attacks.map((attack, index) => (
              <AttackContainer key={index}>
                <AttackName>{attack.name || "Attack Name"}</AttackName>
                <AttackDamage>{attack.damage || "XX"}</AttackDamage>
                <AttackDescription>{attack.description || "Attack description..."}</AttackDescription>
              </AttackContainer>
            ))}
          </Card>
          <button onClick={downloadCard} className="mt-4 bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-600 transition duration-200">
            Download Card
          </button>
        </div>
      </div>
      <div className="mt-8 text-center text-sm text-gray-500">
        Pokémon and all related properties are owned by The Pokémon Company.
      </div>
    </div>
  );
}
