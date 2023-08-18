import React, { useState } from "react";
import authservice from "../service/authservice";
import MainHeader from "../MainHeader";
import Sidepannel from "../sidepannel";

const CommonSearch = () => {
    const [isListOpen, setIsListOpen] = useState(false);
    const [selectedData, setSelectedData] = useState([]);
    const [selectedItem, setSelectedItem] = useState("");

    const select = (item) => {
        
        console.log(item)
        setSelectedData((prevSelectedData => [...prevSelectedData, item]));
        setSelectedItem(item)
        setIsListOpen(false);
        console.log(selectedData)
    };

    const [searchData, setSearchData] = useState([])
    const commonSearch = (searchQuery) => {
        
        if (searchQuery.length >= 8) {
            authservice.commonSearch(searchQuery)
                .then((response) => {
                    console.log(response);
                    setSearchData(response.data);
                });
        } else {
            setSearchData([]);
        }
    };

    return (
        <div>
             <MainHeader />
             <Sidepannel />
             <div className="page-wrapper">
            <label>Search Box</label>
            <input
                type="search"
                style={{ width: "150px" }}
                // value={searchData}
                onChange={(e) => commonSearch(e.target.value)}
                onFocus={() => setIsListOpen(true)}
            />
            <input type="button" name="Search" value="search" onClick={commonSearch} />
            {isListOpen && searchData.length > 0 && (
                <div style={{ border: "1px solid", width: "150px", marginLeft: "6%" }}>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        {searchData.map((item) => (
                            <li
                                key={item}
                                style={{ cursor: "pointer" }}
                                onClick={() => select(item)}
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <h1 style={{ alignItems: "center", justifyContent: "center", textAlign: "center" }}>Datatable</h1>
            <div className="searchTable">
                <table>
                    <thead>
                        <tr>
                            <th>S.no</th>
                            <th>Spid</th>
                            <th>Spisin</th>
                            <th>Spinstrument</th>
                            <th>Spsymbol</th>
                            <th>Pdclose</th>
                            <th>Pdhigh</th>
                            <th>Pdtimestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedData.map((item, index) => (
                            <tr key={item}>
                                <td>{index + 1}</td>
                                <td>{item.spid}</td>
                                <td>{item.spisin}</td>
                                <td>{item.spinstrument}</td>
                                <td>{item.spsymbol}</td>
                                <td>{item.twtimestamp}</td>
                                <td>{item.pdclose}</td>
                                <td>{item.pdhigh}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    );
};

export default CommonSearch;
