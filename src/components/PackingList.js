import React from "react";

const Item = ({ item, onDeleteItem, onToggleItem }) => {
    return (
        <li key={item.id}>
            <input
                type="checkbox"
                value={item.packed}
                onChange={() => onToggleItem(item.id)}
            />
            <span style={item.packed ? { textDecoration: "line-through" } : {}}>
                {item.quantity} {item.description}
            </span>
            <button onClick={() => onDeleteItem(item.id)}>❌</button>
        </li>
    );
};
const PackingList = ({ items, onDeleteItem, onToggleItem, onClearList }) => {
    const [sortBy, setSortBy] = React.useState("input");

    let sortedItems = [...items];
    if (sortBy === "description") {
        sortedItems = items.slice().sort((a, b) => {
            return a.description.localeCompare(b.description);
        });
    }
    if (sortBy === "packed") {
        sortedItems = items.slice().sort((a, b) => {
            return Number(a.packed) - Number(b.packed);
        });
    }
    return (
        <div className="list">
            <ul>
                {sortedItems.map((item) => {
                    return (
                        <Item
                            item={item}
                            key={item.id}
                            onDeleteItem={onDeleteItem}
                            onToggleItem={onToggleItem}
                        />
                    );
                })}
            </ul>
            <div
                className="actions"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
            >
                <select>
                    <option value="input">Sort by input order</option>
                    <option value="description">Sorty by description</option>
                    <option value="packed">Sort by packed status</option>
                </select>
                <button onClick={onClearList}>Clear list</button>
            </div>
        </div>
    );
};

export default PackingList;
