import React from "react";
import "./table.css";
import { Table, Space } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";
import Button from "../Button/Button";

const columns = [
    {
        title: "Activity",
        dataIndex: "activity",
        width: "30%",
    },
    {
        title: "Date",
        dataIndex: "date",
        width: "15%",
        sorter: (a, b) => a.date > b.date,
        render: (record) => {
            return <Space size="middle">{moment(record).format("YYYY-MM-DD")}</Space>;
        },
    },
    {
        title: "Details",
        dataIndex: "details",
        width: "20%",
    },
    {
        title: "Register",
        key: "action",
        width: "10%",
        render: (record) => {
            return (
                <Space size="middle">
                    <Link to={`/${record.key}`}>
                        <Button title="register" />
                    </Link>
                </Space>
            );
        },
    },
];

const showHeader = true;
const pagination = { position: "bottom" };

class TableUII extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        bordered: true,
        pagination,
        size: "default",
        showHeader,
        hasData: true,
        top: "none",
        bottom: "bottomRight",
        tableLayout: "unset",
    };

    render() {
        const data = this.props.activitiesData;

        const newData = data.map((entry, idx) => {
            return {
                key: entry.id,
                activity: entry.name,
                date: entry.startTime,
                details: entry.room[0].value,
            };
        });
        const tableColumns = columns.map((item) => {
            return { ...item };
        });

        return (
            <>
                <Table {...this.state} pagination={{ position: [this.state.top, this.state.bottom] }} columns={tableColumns} dataSource={newData} />
            </>
        );
    }
}

export default TableUII;
