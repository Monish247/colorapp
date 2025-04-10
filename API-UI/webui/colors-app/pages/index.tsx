import { useState } from 'react';
import ColorList from '../components/ColorList';
import ColorForm from '../components/ColorForm';

export default function Home() {
  const [refreshList, setRefreshList] = useState<boolean>(false);

  const handleColorAdded = () => {
    setRefreshList(!refreshList);
  };

  return (
    <div className="container">
      <header>
        <h1>Color Manager</h1>
      </header>
      
      <main>
        <ColorList key={refreshList.toString()} />
        <ColorForm onColorAdded={handleColorAdded} />
      </main>
      
      <footer>
        <p>Color Manager App - Built with Next.js and .NET Core 8</p>
      </footer>
    </div>
  );
}