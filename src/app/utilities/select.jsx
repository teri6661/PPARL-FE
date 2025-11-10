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

export const selectStyleWithDots = (isError = false) => {
  // Fungsi dot (untuk pseudo-element ::before)
  const dot = (data) => ({
    alignItems: 'center',
    display: 'flex',
    // Pseudo-element ::before yang menjadi dot berwarna
    '::before': {
      backgroundColor: data.color || '#ccc', // Ambil warna dari data.color
      borderRadius: '50%',
      content: '""',
      display: 'block',
      marginRight: '8px',
      height: '10px',
      width: '10px',
      minWidth: '10px',
    },
  });

  return {
    control: (provided, state) => ({
      ...provided,
      minHeight: '38px',
      borderColor: isError ? '#dc3545' : '#ced4da',
      boxShadow: 'none',
      '&:hover': {
        borderColor: isError ? '#dc3545' : '#ced4da',
      },
    }),

    // --- TAMBAHAN UTAMA UNTUK DOT DI NILAI YANG TERPILIH ---
    singleValue: (provided, state) => ({
      ...provided,
      ...dot(state.data), // Terapkan style dot ke nilai yang sudah terpilih
      paddingLeft: '0', // Pastikan padding kiri rapi
      margin: '0',
    }),
    // --------------------------------------------------------

    option: (provided, state) => ({
      ...provided,
      ...dot(state.data), // Style dot untuk opsi di dropdown

      // Background dan warna teks saat selected/focused
      backgroundColor: state.isSelected
        ? '#d0e7ff'
        : state.isFocused
          ? '#f1f9ff'
          : 'white',
      color: 'black',
      cursor: 'pointer',
      paddingLeft: '12px',

      // Style aktif
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
  };
};
