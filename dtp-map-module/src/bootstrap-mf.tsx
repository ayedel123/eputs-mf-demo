// src/bootstrap-mf.tsx
import React from "react";
import ReactDOM from "react-dom"; // React 17
import Root from "./root";

// Функция для внешнего вызова
export const render = async (containerId: string) => {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container #${containerId} not found`);
    return;
  }

  // Рендерим корневой компонент
  ReactDOM.render(<Root />, container);
};
