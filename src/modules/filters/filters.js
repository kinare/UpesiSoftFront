const filters = [
    {
        name : 'capitalize',
        execute : (value) => {
            if (!value) return '';
            value = value.toString();
            value = value.toLowerCase();
            return value.charAt(0).toUpperCase() + value.slice(1);
        }
    },
    {
        name : 'currency',
        execute : (value) => {
            if (!value) return '';
            value = 'KES ' + parseFloat(value).toFixed(2);
            return value;
        }
    },
    {
        name : 'number',
        execute : (value) => {
            if (!value) return '';
            value = parseFloat(value).toFixed(1);
            return value;
        }
    },
];

export default filters;
