import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useTable } from "react-table";
import Button from "../Button/Button";
import moment from "moment";

import "./table.css";

const TableUI = () => {
    const [activitiesData, setActivitiesData] = useState(null);

    const getEntries = async () => {
        const url = "https://0r2kabf0lk.execute-api.ap-southeast-2.amazonaws.com/prod/getActivities";
        const res = await axios.get(url);
        return res.data.entries;
    };

    useEffect(async () => {
        const entries = await getEntries();
        setActivitiesData(entries);
    }, []);

    const columns = [
        {
            Header: "Activity",
            columns: [
                {
                    Header: "Activity",
                    accessor: "activity",
                },
            ],
        },
        {
            Header: "Date",
            columns: [
                {
                    Header: "Date",
                    accessor: "date",
                },
            ],
        },
        {
            Header: "Details",
            columns: [
                {
                    Header: "Details",
                    accessor: "details",
                },
            ],
        },
        {
            Header: "Register",
            columns: [
                {
                    Header: "Register",
                    accessor: "register",
                },
            ],
        },
    ];

    const Styles = styled.div`
        padding: 4rem 0;

        table {
            font-size: 0.95rem;
            border-spacing: 0;
            border: 1px solid rgb(98, 98, 98);
            border-radius: 4px;
            width: 100%;
            tr {
                :last-child {
                    td {
                        border-bottom: 0;
                    }
                }
            }

            th,
            td {
                margin: 0;
                padding: 0.5rem;
                border-bottom: 1px solid rgb(98, 98, 98);
                border-right: 1px solid rgb(98, 98, 98);
                max-width: 10rem;
                :last-child {
                    border-right: 0;
                }
            }

            th {
                background-color: #bebebe;
                color: black;
            }
        }
    `;

    const handleRegisterClick = (id) => {
        console.log(id);
    };

    const Table = ({ columns, data }) => {
        // Use the state and functions returned from useTable
        const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
            columns,
            data,
        });

        let s = headerGroups[0];

        // Render the UI for table
        return (
            <table {...getTableProps()}>
                <thead>
                    <tr {...s.getHeaderGroupProps()}>
                        {s.headers.map((column) => (
                            <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                        ))}
                    </tr>
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    if (cell.column.Header === "Activity") {
                                        return <td>{cell.row.original.name}</td>;
                                    }

                                    if (cell.column.Header === "Date") {
                                        return <td>{moment(cell.row.original.startTime).format("YYYY-MM-DD")}</td>;
                                    }

                                    if (cell.column.Header === "Details") {
                                        return (
                                            <td>
                                                <strong>Duration:</strong> {cell.row.original.duration}, <strong> Room: </strong>
                                                {cell.row.original.room[0].value}
                                            </td>
                                        );
                                    }

                                    if (cell.column.Header === "Register") {
                                        return (
                                            <td>
                                                <div style={{ display: "flex", justifyContent: "center" }}>
                                                    <Link to={`/${cell.row.original.id}`}>
                                                        <Button title="register" />
                                                    </Link>
                                                </div>
                                            </td>
                                        );
                                    }
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    };
    return (
        <div>
            <Styles>{activitiesData ? <Table columns={columns} data={activitiesData} /> : null}</Styles>
        </div>
    );
};

export default TableUI;
