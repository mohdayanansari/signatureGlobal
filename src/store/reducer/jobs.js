const initialState = {
  jobs: [],
};

const jobs = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_JOB": {
      const { template, day, sec, min, hour, index } = action.payload;
      const temp = [...state.jobs];
      temp[index] = {
        template: `${template.name}_${template.language}`,
        language: template.language,
        namespace: template.namespace,
        timediff: {
          days: day,
          hrs: hour,
          min: min,
          secs: sec,
        },
      };
      return {
        jobs: temp,
      };
    }
    case "DELETE_JOB": {
      const { index } = action.payload;
      if (index === 0) return state;
      const temp = [...state.jobs];
      temp.splice(index);
      return {
        jobs: temp,
      };
    }
    default:
      return state;
  }
};

export default jobs;
