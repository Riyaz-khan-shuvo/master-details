// components/MasterDetailForm.tsx
import { useState } from 'react';
import { Person } from '../models/person';

interface MasterDetailFormProps {
  people: Person[];
}

const MasterDetailForm: React.FC<MasterDetailFormProps> = ({ people }) => {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  const handleSelectPerson = (person: Person) => {
    setSelectedPerson(person);
  };

  return (
    <div>
      <div className="master">
        <h2>People List</h2>
        <ul>
          {people.map((person) => (
            <li key={person.id} onClick={() => handleSelectPerson(person)}>
              {person.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="detail">
        <h2>Person Details</h2>
        {selectedPerson ? (
          <div>
            <p>
              <strong>Name:</strong> {selectedPerson.name}
            </p>
            <p>
              <strong>Age:</strong> {selectedPerson.age}
            </p>
            {/* Add more detail form fields here */}
          </div>
        ) : (
          <p>Select a person to view details.</p>
        )}
      </div>
    </div>
  );
};

export default MasterDetailForm;
