import React, {useState} from "react";
import "./App.css";

export default function App() {
    const [query, setQuery] = useState("");
    const [data, setData] = useState(null);

    const search = () => {
        if (!query) {
            setData(undefined);
            return;
        }

        fetch(
                `https://api.giphy.com/v1/gifs/search?q=${query}&api_key=y1ZFwiomdYKWy80gtSxU4iEdv165yeOD`
        )
                .then(response => response.json())
                .then(json => {
                    setData(json.data);
                });
    };

    return (
            <div className="App">
                <h1>Giphy Client</h1>
                <div>
                    <form
                            onSubmit={e => {
                                e.preventDefault();
                                search();
                            }}
                    >
                        <input value={query} onChange={e => setQuery(e.target.value)}/>{" "}
                        <input type="submit" value="Search"/>
                    </form>
                </div>

                {data && (
                        <div>
                            <h2>Results</h2>
                            /* For each result d, d.images.fixed_width.url will be the src attribute of the image
                               and d.title will be the alt text. Please construct an unordered list of the search results.
                             */
                        </div>
                )}
            </div>
    );
}
