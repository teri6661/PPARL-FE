/* eslint-disable @typescript-eslint/no-unused-vars */
export const selectStyle = (isError = false) => ({
  control: (provided, state) => ({
    ...provided,
    minHeight: '38px',
    borderColor: isError ? '#dc3545' : '#ced4da', // garis merah saat error
    boxShadow: 'none',
    '&:hover': {
      borderColor: isError ? '#dc3545' : '#ced4da',
    },
  }),

  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? '#d0e7ff'
      : state.isFocused
        ? '#f1f9ff'
        : 'white',
    color: 'black',
    cursor: 'pointer',
    ':active': {
      backgroundColor: '#f1f9ff',
    },
  }),

  indicatorSeparator: () => ({
    display: 'none',
  }),

  dropdownIndicator: (provided) => ({
    ...provided,
    color: '#333',
    transition: 'all 0.2s',
    ':hover': {
      color: '#333',
    },
  }),

  placeholder: (provided) => ({
    ...provided,
    color: '#212529',
    opacity: 1,
  }),

  menu: (provided) => ({
    ...provided,
    zIndex: 9999,
  }),
});
