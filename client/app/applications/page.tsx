'use client';
import React, { useEffect, useState } from 'react';
import { Input, Kbd } from '@nextui-org/react';
import { Checkbox, Image } from '@nextui-org/react';
import { FaSearch } from 'react-icons/fa';

interface Application {
  name: string;
  description: string;
  image: string;
  command: string;
}

export default function ApplicationsPage() {
  const [data, setData] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  useEffect(() => {
    fetch('https://api.jsonbin.io/v3/b/65b3810adc746540189b555c')
      .then((response) => response.json())
      .then((data) => {
        setData(data.record.applications);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const filteredData = data.filter((application) =>
    application.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCheckboxChange = (index: number) => {
    setCheckedItems((prevCheckedItems) => {
      const newCheckedItems = { ...prevCheckedItems };
      newCheckedItems[index] = !newCheckedItems[index];
      return newCheckedItems;
    });
  };

  const handleDownloadClick = () => {
    const selectedItems = filteredData.filter(
      (_, index) => checkedItems[index]
    );
    console.log('Selected Items:', selectedItems);
  };

  return (
    <div>
      <h1 className="mb-8 text-4xl font-bold">Applications</h1>
      <div className="flex flex-row w-full justify-between mb-4">
        <div className="w-full">
          <Input
            aria-label="Search"
            classNames={{
              inputWrapper: 'bg-default-100',
              input: 'text-sm w-full',
            }}
            endContent={
              <Kbd className="hidden lg:inline-block" keys={['command']}>
                K
              </Kbd>
            }
            labelPlacement="outside"
            placeholder="Search..."
            startContent={
              <FaSearch className="text-base text-default-400 pointer-events-none flex-shrink-0" />
            }
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button
          onClick={handleDownloadClick}
          className="ml-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        >
          Download
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 m-2 w-full gap-2">
          {filteredData.map(({ name, image }, index) => (
            <div
              key={index}
              className="flex flex-row items-center p-1 h-20 rounded-lg dark:bg-default-100 shadow"
            >
              <Checkbox
                className="ml-2 mr-2"
                isSelected={checkedItems[index] || false}
                onChange={() => handleCheckboxChange(index)}
              />
              <Image
                src={image}
                width={32}
                height={32}
                alt={name}
                className="rounded-full"
              />
              <h2 className="ml-4 text-foreground/90 text-lg font-medium">
                {name}
              </h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
