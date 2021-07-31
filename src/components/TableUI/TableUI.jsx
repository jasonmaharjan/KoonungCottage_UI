import React from "react";
import "./table.css";
import { Table, Space } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";
import Button from "../Button/Button";

const TableUI = ({ activitiesData }) => {
    const columns = [
        {
            title: "Activity",
            dataIndex: "activity",
            width: "39%",
        },
        {
            title: "Date",
            dataIndex: "date",
            width: "20%",
            sorter: (a, b) => a.date.localeCompare(b.date),
            render: (record) => {
                return <Space size="middle">{moment(record).format("DD/MM/YYYY")}</Space>;
            },
        },
        {
            title: "Details",
            dataIndex: "details",
            width: "25%",
        },
        {
            title: "Register",
            key: "action",
            width: "1%",
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

    const tableData = activitiesData.map((entry, idx) => {
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

    const config = {
        bordered: false,
        pagination,
        size: "default",
        showHeader,
        hasData: true,
        top: "none",
        bottom: "bottomRight",
        tableLayout: "unset",
    };

    return (
        <>
            <Table {...config} pagination={{ position: [config.top, config.bottom] }} columns={tableColumns} dataSource={tableData} />
        </>
    );
};

export default TableUI;
