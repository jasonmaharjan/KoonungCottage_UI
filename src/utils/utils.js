import { getEntriesWithParams } from "./api";

export const filter = async ({ activityTypeOption, activityCategoryOption, startDateOption, endDateOption, type }) => {
    const params = {
        activityType: activityTypeOption,
        activityCategory: activityTypeOption ? null : activityCategoryOption,
        startDate: startDateOption ? startDateOption.toISOString() : null,
        endDate: endDateOption ? endDateOption.toISOString() : null,
    };

    if (type === "activity") {
        const filteredData = await getEntriesWithParams("getActivities", params);

        return filteredData;
    } else if (type === "course") {
        const filteredData = await getEntriesWithParams("getCourses", params);

        return filteredData;
    }
};

// export const addTypeKey = (arr, type) => {
//     // put a "type" key in given array
//     const x = arr.map((entry) => {
//         return { ...entry, type };
//     });

//     return x;
// };
