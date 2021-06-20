import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function TypeOfServices({ handleChangeServices, services }) {
  return (
    <FormGroup>
      {services.map((service) => (
        <FormControlLabel
          key={service._id}
          control={(
            <Checkbox
              checked={service.checked}
              onChange={() => handleChangeServices(service)}
              name={service.typeOfService}
            />
          )}
          label={service.serviceName}
        />
      ))}
    </FormGroup>
  );
}

// TypeOfServices.propTypes = {
//   handleChangeServices: PropTypes.func.isRequired,
//   services: PropTypes.arrayOf(
//     PropTypes.shape({
//       _id: PropTypes.string,
//       checked: PropTypes.bool,
//       typeOfService: PropTypes.string,
//       serviceName: PropTypes.string,
//     }).isRequired,
//   ).isRequired,
// };
