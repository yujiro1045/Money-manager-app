"use client";
import React from "react";
import { LegendPayload } from "recharts";

interface CustomLegendProps {
  payload?: LegendPayload[];
  activeData: "all" | "ingresos" | "gastos";
  onChange: (value: "all" | "ingresos" | "gastos") => void;
}

const CustomLegend: React.FC<CustomLegendProps> = ({
  payload = [],
  activeData,
  onChange,
}) => {
  const items = [
    { value: "Todos", type: "all", color: "#6B7280" },
    ...payload.map((item) => ({
      value: item.value as string,
      type: (item.value as string).toLowerCase(),
      color: item.color,
    })),
  ];

  return (
    <div style={{ display: "flex", gap: "1rem", cursor: "pointer" }}>
      {items.map((entry) => (
        <div
          key={entry.type}
          onClick={() => onChange(entry.type as "all" | "ingresos" | "gastos")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            opacity: activeData === entry.type ? 1 : 0.5,
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              backgroundColor: entry.color,
            }}
          />
          <span
            style={{
              color: activeData === entry.type ? "#1a1a1a" : "#555", // más oscuro cuando está activo
              fontWeight: activeData === entry.type ? "bold" : "normal",
            }}
          >
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
