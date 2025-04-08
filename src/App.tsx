import React, { useState, useEffect } from "react";
import { FoodItem, FoodColumn } from "./types";
// import { UserService } from './api/userService';
// import { TransformedData } from './api/types';
// import { DepartmentStats } from './components/DepartmentStats';
import "./App.css";

// Fruits and Vegetables Data
const initialItems: FoodItem[] = [
  { type: "Fruit", name: "Apple" },
  { type: "Vegetable", name: "Broccoli" },
  { type: "Vegetable", name: "Mushroom" },
  { type: "Fruit", name: "Banana" },
  { type: "Vegetable", name: "Tomato" },
  { type: "Fruit", name: "Orange" },
  { type: "Fruit", name: "Mango" },
  { type: "Fruit", name: "Pineapple" },
  { type: "Vegetable", name: "Cucumber" },
  { type: "Fruit", name: "Watermelon" },
  { type: "Vegetable", name: "Carrot" },
];

// API Data State (commented out for now)
// const [data, setData] = useState<TransformedData | null>(null);
// const [loading, setLoading] = useState(true);
// const [error, setError] = useState<string | null>(null);

const App: React.FC = () => {
  // Fruits and Vegetables State
  const [items, setItems] = useState<FoodItem[]>(initialItems);
  const [columns, setColumns] = useState<FoodColumn[]>([
    { type: "Fruit", items: [] },
    { type: "Vegetable", items: [] },
  ]);

  // API Data Fetching (commented out for now)
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const userService = UserService.getInstance();
  //       const users = await userService.getUsersHttp();
  //       const transformedData = userService.transformData(users);
  //       setData(transformedData);
  //     } catch (err) {
  //       setError('Failed to fetch data. Please try again later.');
  //       console.error('Error fetching data:', err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const moveToColumn = (item: FoodItem) => {
    setColumns((prevColumns) => {
      const newColumns = prevColumns.map((column) => {
        if (column.type === item.type) {
          return {
            ...column,
            items: [...column.items, item],
          };
        }
        return column;
      });
      return newColumns;
    });

    setItems((prevItems) => prevItems.filter((i) => i.name !== item.name));

    // Set timeout to move item back after 5 seconds
    setTimeout(() => {
      setColumns((prevColumns) => {
        const newColumns = prevColumns.map((column) => {
          if (column.type === item.type) {
            return {
              ...column,
              items: column.items.filter((i) => i.name !== item.name),
            };
          }
          return column;
        });
        return newColumns;
      });

      setItems((prevItems) => [...prevItems, item]);
    }, 5000);
  };

  const returnToMainList = (item: FoodItem) => {
    setColumns((prevColumns) => {
      const newColumns = prevColumns.map((column) => {
        if (column.type === item.type) {
          return {
            ...column,
            items: column.items.filter((i) => i.name !== item.name),
          };
        }
        return column;
      });
      return newColumns;
    });

    setItems((prevItems) => [...prevItems, item]);
  };

  return (
    <div className="app">
      {/* Fruits and Vegetables Section */}
      <div className="food-section">
        <div className="main-list">
          <h2>Main List</h2>
          {items.map((item) => (
            <button
              key={item.name}
              className="item-button"
              onClick={() => moveToColumn(item)}
            >
              {item.name}
            </button>
          ))}
        </div>
        <div className="columns">
          {columns.map((column) => (
            <div key={column.type} className="column">
              <h2>{column.type}s</h2>
              {column.items.map((item) => (
                <button
                  key={item.name}
                  className="item-button"
                  onClick={() => returnToMainList(item)}
                >
                  {item.name}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* API Section (commented out for now) */}
      {/* {loading ? (
        <div className="loading">Loading...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : data ? (
        <>
          <h1>Department Statistics</h1>
          <DepartmentStats data={data} />
        </>
      ) : (
        <div className="error">No data available</div>
      )} */}
    </div>
  );
};

export default App;
