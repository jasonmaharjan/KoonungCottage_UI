import axios from "axios";

export const filter = async ({ activityTypeOption, activityCategoryOption, startDateOption, endDateOption }) => {
    const url = "https://0r2kabf0lk.execute-api.ap-southeast-2.amazonaws.com/prod/getActivities";
    const filteredData = await axios.get(url, {
        params: {
            activityType: activityTypeOption,
            activityCategory: activityTypeOption ? null : activityCategoryOption,
            startDate: startDateOption ? startDateOption.toISOString() : null,
            endDate: endDateOption ? endDateOption.toISOString() : null,
        },
    });
    return filteredData.data.entries;
};
