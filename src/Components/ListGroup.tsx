import { useState } from "react";
import styled from "styled-components";

interface Props {
    title: string;
    items: string[];
    onItemSelected: (index: number) => void;
}

interface LiProps {
    selected: boolean;
}

const Li = styled.li.attrs<LiProps>(props => ({
    className: props.selected ? "list-group-item active" : "list-group-item"
}))``;

function ListGroup({ title, items, onItemSelected }: Props) {
    const [selectedItem, setSelectedItem] = useState(-1)

    const handleClick = (index: number) => {
        console.log("clicked", index)
        setSelectedItem(index)
        onItemSelected(index)
    }
    return (
        <>
            <h1>{title}</h1>
            <ul className="list-group">
                {items.map((item, index) => (
                    <Li
                        selected={selectedItem === index}
                        key={index}
                        onClick={() => { handleClick(index) }}
                    >
                        {item}
                    </Li>
                ))
                }
            </ul >
        </>
    );
}





export default ListGroup;




