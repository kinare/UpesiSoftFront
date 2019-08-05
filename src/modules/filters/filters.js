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
            value = 'KES ' + value + '.00';
            return value;
        }
    },
];

export default filters;
