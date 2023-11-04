import { useState } from "react";



function Post() {

    const [arr, setArr] = useState([1, 2, 3, 4, 5, 6, 7, 8]);

    const onclick = () => {
        // increment a value
        setArr([...arr, 9]);

        // delete value
        setArr(arr.filter((item) => item !== 3))

        //update value
        setArr(arr.map((item) => item === 5 ? 50 : item))
    }

    onclick();
    return (
        <>
            <h1>Post1</h1>
            <h1>Post2</h1>
        </>
    )
}
export default Post

